// ==UserScript==
// @name         CEU Slides → PDF
// @namespace    https://ceuimpactlab.es/
// @version      2.0
// @description  Captures each slide of the IA-Operaciones deck at 1920×1080 and assembles a high-res PDF. Runs in TM sandbox to bypass CSP.
// @match        *://localhost:*/presentacion/retos/ia-operaciones*
// @match        *://ceuimpactlab.es/presentacion/retos/ia-operaciones*
// @match        *://*.ceuimpactlab.es/presentacion/retos/ia-operaciones*
// @require      https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
// @grant        GM_registerMenuCommand
// @grant        unsafeWindow
// ==/UserScript==

(function () {
  "use strict";

  /* ── Libraries (loaded by TM sandbox via @require, CSP-proof) ── */
  const h2c = window.html2canvas;
  const jsPDF = window.jspdf?.jsPDF;

  if (!h2c) throw new Error("[Deck→PDF] html2canvas not loaded.");
  if (!jsPDF) throw new Error("[Deck→PDF] jsPDF not loaded.");

  // Expose for console debugging: __h2c && __jsPDF
  unsafeWindow.__h2c = h2c;
  unsafeWindow.__jsPDF = jsPDF;

  /* ── Configuration ─────────────────────────────────────────────── */
  const TOTAL_SLIDES = 12;
  const SLIDE_W = 1920;
  const SLIDE_H = 1080;
  const SCALE_FACTOR = 2;    // 2× for retina-quality
  const FILENAME = "ia-operaciones.pdf";

  /* ── Helpers ───────────────────────────────────────────────────── */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /** Wait for two rAF ticks so the browser has actually painted. */
  function waitForPaint() {
    return new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
  }

  /** Find a DOM node whose class attribute contains `keyword`. */
  function qs(root, keyword) {
    return root.querySelector(`[class*="${keyword}"]`);
  }

  /* ── Floating trigger button ───────────────────────────────────── */
  function injectButton() {
    const btn = document.createElement("button");
    btn.id = "__deckPdfBtn";
    btn.textContent = "📥 Export PDF";
    Object.assign(btn.style, {
      position: "fixed",
      top: "12px",
      right: "12px",
      zIndex: "99999",
      padding: "10px 18px",
      border: "2px solid #003CA3",
      borderRadius: "10px",
      background: "rgba(255,255,255,0.92)",
      color: "#003CA3",
      fontFamily: "Poppins, Verdana, sans-serif",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
      backdropFilter: "blur(8px)",
      transition: "opacity .2s",
    });
    btn.addEventListener("click", () => runExport(btn));
    document.body.appendChild(btn);
  }

  /* ── Main export flow ──────────────────────────────────────────── */
  async function runExport(btn) {
    if (btn) {
      btn.disabled = true;
      btn.textContent = "⏳ Capturing…";
    }
    console.log("[Deck→PDF] Starting export…");

    try {
      const stage = qs(document, "stage");
      const canvas = qs(stage, "deckCanvas");
      const track = qs(canvas, "track");
      const controls = qs(canvas, "controls");

      if (!stage || !canvas || !track) {
        throw new Error("Could not find slide elements (.stage / .deckCanvas / .track).");
      }

      /* ── Save original inline styles ── */
      const orig = {
        stage: {
          position: stage.style.position,
          overflow: stage.style.overflow,
          width: stage.style.width,
          height: stage.style.height,
          inset: stage.style.inset,
          display: stage.style.display,
        },
        canvas: {
          transform: canvas.style.transform,
          overflow: canvas.style.overflow,
          willChange: canvas.style.willChange,
        },
        track: {
          transform: track.style.transform,
          transition: track.style.transition,
        },
        controls: controls ? controls.style.display : "",
      };

      /* ── Flatten layout for capture ── */
      stage.style.position = "relative";
      stage.style.overflow = "visible";
      stage.style.width = SLIDE_W + "px";
      stage.style.height = SLIDE_H + "px";
      stage.style.inset = "auto";
      stage.style.display = "block";

      canvas.style.transform = "none";
      canvas.style.overflow = "hidden";
      canvas.style.willChange = "auto";

      track.style.transition = "none";

      if (controls) controls.style.display = "none";

      await sleep(300);

      /* ── Create PDF up front ── */
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [SLIDE_W, SLIDE_H],
        compress: true,
      });

      /* ── Capture each slide and add to PDF immediately ── */
      for (let i = 0; i < TOTAL_SLIDES; i++) {
        const label = `Slide ${i + 1}/${TOTAL_SLIDES}`;
        if (btn) btn.textContent = `⏳ ${label}…`;
        console.log(`[Deck→PDF] Capturing ${label}`);

        track.style.transform = `translateX(-${i * 100}%)`;
        await waitForPaint();
        await sleep(250);

        const captured = await h2c(canvas, {
          width: SLIDE_W,
          height: SLIDE_H,
          scale: SCALE_FACTOR,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: false,
          x: 0,
          y: 0,
          scrollX: 0,
          scrollY: 0,
          windowWidth: SLIDE_W,
          windowHeight: SLIDE_H,
        });

        // Add page (skip for the first — jsPDF starts with one page)
        if (i > 0) pdf.addPage([SLIDE_W, SLIDE_H], "landscape");

        const imgData = captured.toDataURL("image/jpeg", 0.92);
        pdf.addImage(imgData, "JPEG", 0, 0, SLIDE_W, SLIDE_H, `slide${i}`, "FAST");

        // Release the canvas to free ~33 MB per slide
        captured.width = 0;
        captured.height = 0;

        // Yield to browser so it can GC and stay responsive
        await sleep(50);
      }

      /* ── Save PDF ── */
      if (btn) btn.textContent = "⏳ Saving…";
      console.log("[Deck→PDF] Saving PDF…");
      await sleep(50);

      pdf.save(FILENAME);
      console.log("[Deck→PDF] Saved:", FILENAME);

      /* ── Restore original state ── */
      Object.assign(stage.style, orig.stage);
      Object.assign(canvas.style, orig.canvas);
      Object.assign(track.style, orig.track);
      if (controls) controls.style.display = orig.controls;

      if (btn) {
        btn.textContent = "✅ Done!";
        setTimeout(() => {
          btn.textContent = "📥 Export PDF";
          btn.disabled = false;
        }, 2000);
      }
    } catch (err) {
      console.error("[Deck→PDF]", err);
      alert("Export failed — check the console.\n\n" + err.message);
      if (btn) {
        btn.textContent = "📥 Export PDF";
        btn.disabled = false;
      }
    }
  }

  /* ── Init ── */
  // 1) Floating button on the page
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(injectButton, 500));
  } else {
    setTimeout(injectButton, 500);
  }

  // 2) Tampermonkey menu command (right-click TM icon → "Export deck to PDF")
  GM_registerMenuCommand("Export deck to PDF", () => {
    const btn = document.getElementById("__deckPdfBtn");
    runExport(btn);
  });
})();
