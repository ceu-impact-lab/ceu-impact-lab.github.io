// ==UserScript==
// @name         CEU Slides → PDF
// @namespace    https://ceuimpactlab.es/
// @version      1.0
// @description  Captures each slide of the IA-Operaciones deck at 1920×1080 and assembles a high-res PDF.
// @match        *://localhost:*/presentacion/retos/ia-operaciones*
// @match        *://ceuimpactlab.es/presentacion/retos/ia-operaciones*
// @match        *://*.ceuimpactlab.es/presentacion/retos/ia-operaciones*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js
// ==/UserScript==

(function () {
  "use strict";

  /* ── Configuration ─────────────────────────────────────────────── */
  const TOTAL_SLIDES = 12;
  const SLIDE_W = 1920;      // native design width
  const SLIDE_H = 1080;      // native design height
  const SCALE_FACTOR = 2;    // 2× for retina-quality output
  const FILENAME = "ia-operaciones.pdf";

  /* ── Helpers ───────────────────────────────────────────────────── */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /** Find DOM nodes by partial class-name match (CSS Modules hashes). */
  function qsByClass(root, keyword) {
    return root.querySelector(`[class*="${keyword}"]`);
  }
  function qsAllByClass(root, keyword) {
    return root.querySelectorAll(`[class*="${keyword}"]`);
  }

  /* ── Floating trigger button ───────────────────────────────────── */
  function injectButton() {
    const btn = document.createElement("button");
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
    btn.disabled = true;
    btn.textContent = "⏳ Capturing…";

    try {
      const stage = qsByClass(document, "stage");
      const canvas = qsByClass(stage, "deckCanvas");
      const track = qsByClass(canvas, "track");
      const controls = qsByClass(canvas, "controls");

      if (!stage || !canvas || !track) {
        alert("Could not find slide elements. Are you on the presentation page?");
        btn.disabled = false;
        btn.textContent = "📥 Export PDF";
        return;
      }

      /* ── Save original state ── */
      const origStagePos = stage.style.position;
      const origStageOverflow = stage.style.overflow;
      const origStageWidth = stage.style.width;
      const origStageHeight = stage.style.height;
      const origStageInset = stage.style.inset;
      const origStageDisplay = stage.style.display;

      const origCanvasTransform = canvas.style.transform;
      const origCanvasOverflow = canvas.style.overflow;
      const origCanvasWillChange = canvas.style.willChange;

      const origTrackTransform = track.style.transform;
      const origTrackTransition = track.style.transition;
      const origTrackDisplay = track.style.display;

      const origControlsDisplay = controls ? controls.style.display : "";

      /* ── Prepare stage for capture ── */
      // Make stage static so html2canvas can measure it
      stage.style.position = "relative";
      stage.style.overflow = "visible";
      stage.style.width = SLIDE_W + "px";
      stage.style.height = SLIDE_H + "px";
      stage.style.inset = "auto";
      stage.style.display = "block";

      // Remove scale transform so we capture at native 1920×1080
      canvas.style.transform = "none";
      canvas.style.overflow = "hidden";
      canvas.style.willChange = "auto";

      // Disable transition on track so slides snap instantly
      track.style.transition = "none";

      // Hide controls
      if (controls) controls.style.display = "none";

      // Wait for layout reflow
      await sleep(200);

      /* ── Capture each slide ── */
      const captures = [];

      for (let i = 0; i < TOTAL_SLIDES; i++) {
        btn.textContent = `⏳ Slide ${i + 1}/${TOTAL_SLIDES}…`;

        // Move track to show slide i
        track.style.transform = `translateX(-${i * 100}%)`;
        await sleep(350); // allow paint + any CSS transitions/animations

        const captured = await html2canvas(canvas, {
          width: SLIDE_W,
          height: SLIDE_H,
          scale: SCALE_FACTOR,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null, // keep gradients
          logging: false,
          // Capture exactly the canvas area
          x: 0,
          y: 0,
          scrollX: 0,
          scrollY: 0,
          windowWidth: SLIDE_W,
          windowHeight: SLIDE_H,
        });

        captures.push(captured);
      }

      /* ── Assemble PDF (landscape A4-ish at 1920×1080 ratio) ── */
      btn.textContent = "⏳ Building PDF…";
      await sleep(50);

      const { jsPDF } = window.jspdf;
      // Custom page size in mm (1920×1080 px at 96 DPI → ~508×285.75 mm).
      // We use points for precision: 1920 px / 96 * 72 = 1440 pt, 1080/96*72 = 810 pt
      const ptW = (SLIDE_W / 96) * 72;
      const ptH = (SLIDE_H / 96) * 72;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [ptW, ptH],
        compress: true,
      });

      for (let i = 0; i < captures.length; i++) {
        if (i > 0) pdf.addPage([ptW, ptH], "landscape");
        const imgData = captures[i].toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0, ptW, ptH, undefined, "FAST");
      }

      pdf.save(FILENAME);

      /* ── Restore original state ── */
      stage.style.position = origStagePos;
      stage.style.overflow = origStageOverflow;
      stage.style.width = origStageWidth;
      stage.style.height = origStageHeight;
      stage.style.inset = origStageInset;
      stage.style.display = origStageDisplay;

      canvas.style.transform = origCanvasTransform;
      canvas.style.overflow = origCanvasOverflow;
      canvas.style.willChange = origCanvasWillChange;

      track.style.transform = origTrackTransform;
      track.style.transition = origTrackTransition;
      track.style.display = origTrackDisplay;

      if (controls) controls.style.display = origControlsDisplay;

      btn.textContent = "✅ Done!";
      setTimeout(() => {
        btn.textContent = "📥 Export PDF";
        btn.disabled = false;
      }, 2000);
    } catch (err) {
      console.error("[Slides→PDF]", err);
      alert("Export failed — check the console for details.\n\n" + err.message);
      btn.textContent = "📥 Export PDF";
      btn.disabled = false;
    }
  }

  /* ── Init ── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(injectButton, 500));
  } else {
    setTimeout(injectButton, 500);
  }
})();
