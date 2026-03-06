"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { Children, useEffect, useMemo, useRef, useState } from "react";
import { siteContent } from "@/content/site";
import styles from "./slides.module.css";
import logo from "../../../../../img/CEU_Impact_Lab-Logo-Marginless.png";
import { useHaptics } from "@/hooks/useHaptics";

type SlideFrameProps = {
  children: ReactNode;
};

function SlideFrame({ children }: SlideFrameProps) {
  return (
    <div className={styles.slideFrame}>
      {children}
    </div>
  );
}

export function ClientSlides() {
  const totalSlides = 12;
  const [activeSlide, setActiveSlide] = useState(0);
  const visibleDotCount = 3;
  const rafRef = useRef<number | null>(null);
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const isExport = searchParams.get("export") === "1";
  const { boop } = useHaptics();

  const visibleDots = (() => {
    if (totalSlides <= visibleDotCount) {
      return Array.from({ length: totalSlides }, (_, index) => index);
    }
    if (activeSlide <= 0) {
      return [0, 1, 2];
    }
    if (activeSlide >= totalSlides - 1) {
      return [totalSlides - 3, totalSlides - 2, totalSlides - 1];
    }
    return [activeSlide - 1, activeSlide, activeSlide + 1];
  })();

  useEffect(() => {
    if (isExport) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveSlide((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === "Home") {
        event.preventDefault();
        setActiveSlide(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        setActiveSlide(totalSlides - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isExport, totalSlides]);

  useEffect(() => {
    if (isExport) {
      return;
    }
    // Base canvas size (PPT-style): keep all slide layout values aligned to this.
    const baseWidth = 1920;
    const baseHeight = 1080;

    const updateScale = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = window.requestAnimationFrame(() => {
        // Scale = min(viewport/base) to keep aspect ratio without reflow.
        const stage = stageRef.current;
        if (!stage) {
          return;
        }
        const nextScale = Math.min(
          stage.clientWidth / baseWidth,
          stage.clientHeight / baseHeight
        );
        setScale(Math.max(Number(nextScale.toFixed(4)), 0.1));
      });
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    window.visualViewport?.addEventListener("resize", updateScale);
    return () => {
      window.removeEventListener("resize", updateScale);
      window.visualViewport?.removeEventListener("resize", updateScale);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isExport]);

  useEffect(() => {
    if (!isExport) {
      return;
    }
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlHeight = html.style.height;
    const prevBodyHeight = body.style.height;

    html.style.overflow = "visible";
    body.style.overflow = "visible";
    html.style.height = "auto";
    body.style.height = "auto";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.height = prevHtmlHeight;
      body.style.height = prevBodyHeight;
    };
  }, [isExport]);

  useEffect(() => {
    if (!isExport) {
      return;
    }
    let cancelled = false;
    const markReady = async () => {
      try {
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }
      } catch {
        // Ignore font readiness failures.
      }
      if (!cancelled) {
        (window as Window & { __EXPORT_READY__?: boolean }).__EXPORT_READY__ = true;
      }
    };
    void markReady();
    return () => {
      cancelled = true;
    };
  }, [isExport]);

  const slides = (
    <>
      <section key="slide-1" className={styles.slide} aria-label="Diapositiva 1: Portada">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <Image src={logo} alt="CEU Impact Lab" className={styles.logo} />
                </div>
                <div className={styles.slideHeaderRight}>
                  <span className={styles.slideNumber}>01 / 12</span>
                </div>
              </header>
              <div className={styles.slideBody}>
                <div>
                  <div className={styles.coverTag}>Reto 00</div>
                  <h1 className={styles.slideTitle}>IA para Operaciones</h1>
                  <div className={styles.coverDivider} />
                  <p className={styles.slideSubtitle}>
                    Mira tus ventas, sabe qué pedir y cuándo
                  </p>
                </div>
                <p className={styles.lead}>
                  Construye una herramienta que lea datos de ventas y stock, detecte lo que se va a quedar
                  sin existencias y recomiende qué reponer. Sin Excel, sin intuición.
                </p>
                <div className={styles.col3}>
                  <div className={`${styles.card} ${styles.cardAccent}`}>
                    <strong>Datos</strong>
                    <span>Historial de ventas y stock real</span>
                  </div>
                  <div className={`${styles.card} ${styles.cardCyan}`}>
                    <strong>Análisis</strong>
                    <span>Lee patrones, detecta picos y avisa</span>
                  </div>
                  <div className={`${styles.card} ${styles.cardGreen}`}>
                    <strong>Resultado</strong>
                    <span>Te dice qué pedir y cuándo</span>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>{siteContent.dates}</span>
                <span>Presentación de retos · CEU Impact Lab</span>
              </footer>
            </SlideFrame>
      </section>

      <section key="slide-2" className={styles.slide} aria-label="Diapositiva 2: Enunciado del reto">
        <SlideFrame>
          <header className={styles.slideHeader}>
            <div className={styles.slideMeta}><span>Enunciado del reto</span></div>
            <div className={styles.slideHeaderRight}>
              <Image src={logo} alt="" className={styles.headerLogo} aria-hidden="true" />
              <span className={styles.slideNumber}>02 / 12</span>
            </div>
          </header>
          <div className={styles.slideBody}>
            <p className={styles.lead}>
              Las pymes gestionan el inventario con hojas de cálculo. El resultado: tres problemas que se repiten y cuestan dinero.
            </p>
            {/* Infografía: mapa del problema */}
            <div className={styles.problemGrid}>
              <div className={`${styles.problemCard} ${styles.problemCardRed}`}>
                <div className={`${styles.problemIcon} ${styles.problemIconRed}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#003CA3" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3z" />
                  </svg>
                </div>
                <p className={styles.problemTitle}>Exceso de stock</p>
                <p className={styles.problemDesc}>Capital parado en productos de baja rotación. Espacio y coste financiero sin retorno.</p>
              </div>
              <div className={`${styles.problemCard} ${styles.problemCardAmber}`}>
                <div className={`${styles.problemIcon} ${styles.problemIconAmber}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#188FF1" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <p className={styles.problemTitle}>Ventas irregulares</p>
                <p className={styles.problemDesc}>Picos de demanda que no se ven venir. Se compra por intuición, no por datos.</p>
              </div>
              <div className={`${styles.problemCard} ${styles.problemCardOrange}`}>
                <div className={`${styles.problemIcon} ${styles.problemIconOrange}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#52A095" strokeWidth="2" strokeLinecap="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <p className={styles.problemTitle}>Rotura de stock</p>
                <p className={styles.problemDesc}>Productos muy vendidos sin reponer a tiempo. Venta perdida y cliente insatisfecho.</p>
              </div>
            </div>
            <div className={styles.impactRow}>
              <div className={styles.impactCard}>
                <span className={styles.impactLabel}>Impacto real</span>
                <span className={styles.impactDesc}>Pérdidas evitables en cada ciclo de compras</span>
              </div>
              <div className={styles.impactCard}>
                <span className={styles.impactLabel}>Por qué pasa</span>
                <span className={styles.impactDesc}>Nadie ha puesto una herramienta que lea los datos por ellos</span>
              </div>
            </div>
          </div>
          <footer className={styles.slideFooter}>
            <span>Reto 00</span>
            <span>IA para Operaciones</span>
          </footer>
        </SlideFrame>
      </section>

          <section key="slide-3" className={styles.slide} aria-label="Diapositiva 3: Contexto del reto">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Contexto del reto</span>
                </div>
                <div className={styles.slideHeaderRight}>
                  <Image src={logo} alt="" className={styles.headerLogo} aria-hidden="true" />
                  <span className={styles.slideNumber}>03 / 12</span>
                </div>
              </header>
              <div className={styles.slideBody}>
                <p className={styles.lead}>
                  Los pequeños comercios llevan años generando datos. El problema es que no tienen herramientas para sacar partido.
                </p>
                <div className={styles.col3}>
                  <div className={styles.card}>
                    <strong>Lo que hay ahora</strong>
                    <ul className={styles.list}>
                      <li>Herramientas del mercado demasiado complejas.</li>
                      <li>Costes de implantación fuera de su alcance.</li>
                      <li>Sin soporte ni formación para usarlas.</li>
                    </ul>
                  </div>
                  <div className={styles.card}>
                    <strong>La oportunidad</strong>
                    <ul className={styles.list}>
                      <li>APIs abiertas y gratuitas, listas para usar.</li>
                      <li>Cada negocio ya tiene años de datos.</li>
                      <li>Coste de entrada prácticamente cero.</li>
                    </ul>
                  </div>
                  <div className={`${styles.card} ${styles.cardAccent}`}>
                    <strong>¿Por qué tiene sentido ahora?</strong>
                    <ul className={styles.list}>
                      <li>Modelos de lenguaje maduros y fáciles de integrar.</li>
                      <li>Librerías open-source estables y bien documentadas.</li>
                      <li>Pymes con datos reales esperando un análisis.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Contexto</span>
                <span>Digitalización y accesibilidad</span>
              </footer>
            </SlideFrame>
          </section>

          <section key="slide-4" className={styles.slide} aria-label="Diapositiva 4: Objetivo del reto">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Objetivo del reto</span>
                </div>
                <div className={styles.slideHeaderRight}>
                  <Image src={logo} alt="" className={styles.headerLogo} aria-hidden="true" />
                  <span className={styles.slideNumber}>04 / 12</span>
                </div>
              </header>
              <div className={styles.slideBody}>
                <div className={styles.split6040}>
                  {/* ── Left 60 % ── */}
                  <div className={styles.split6040Left}>
                    <p className={styles.lead}>
                      Queremos una herramienta que mire ventas y stock y te avise a tiempo:
                      qué se va a agotar, qué se te está quedando parado y qué conviene pedir.
                    </p>
                    <ul className={styles.list}>
                      <li>Leer ventas y stock por producto.</li>
                      <li>Detectar picos y cambios de demanda.</li>
                      <li>Proponer reposición con una recomendación clara.</li>
                    </ul>
                    {/* 2×2 skill cards */}
                    <div className={styles.skillGrid}>
                      <div className={`${styles.card} ${styles.cardAccent}`}>
                        <strong>Programación</strong>
                        <ul className={styles.list}>
                          <li>Cargar datos (CSV/JSON).</li>
                          <li>Reglas y métricas básicas.</li>
                        </ul>
                      </div>
                      <div className={`${styles.card} ${styles.cardCyan}`}>
                        <strong>Sistemas</strong>
                        <ul className={styles.list}>
                          <li>Procesos batch + errores.</li>
                          <li>Logs y trazabilidad.</li>
                        </ul>
                      </div>
                      <div className={`${styles.card} ${styles.cardAmber}`}>
                        <strong>Negocio</strong>
                        <ul className={styles.list}>
                          <li>Rotación y exceso / rotura.</li>
                          <li>Priorizar lo que más duele.</li>
                        </ul>
                      </div>
                      <div className={`${styles.card} ${styles.cardGreen}`}>
                        <strong>Gestión</strong>
                        <ul className={styles.list}>
                          <li>Entregables claros.</li>
                          <li>Cómo medir si funciona.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* ── Right 40 % ── */}
                  <div className={styles.split6040Right}>
                    <div className={`${styles.card} ${styles.cardAccent}`}>
                      <strong>Valor en una frase</strong>
                      <p>Menos tiempo con Excel y más decisiones claras para comprar lo justo.</p>
                    </div>
                    <div className={`${styles.card} ${styles.cardCyan}`}>
                      <strong>Ejemplo de salida</strong>
                      <p>«Producto X»: quedan 6 uds (≈ 2 días). Esta semana sube la demanda.</p>
                      <ul className={styles.list}>
                        <li><strong>Recomendación:</strong> pedir 40 uds.</li>
                        <li><strong>Motivo:</strong> evitar rotura.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Objetivo</span>
                <span>Inventario inteligente</span>
              </footer>
            </SlideFrame>
          </section>

          <section key="slide-5" className={styles.slide} aria-label="Diapositiva 5: Meta del reto">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Meta del reto</span>
                </div>
                <div className={styles.slideHeaderRight}>
                  <Image src={logo} alt="" className={styles.headerLogo} aria-hidden="true" />
                  <span className={styles.slideNumber}>05 / 12</span>
                </div>
              </header>
              <div className={styles.slideBody}>
                <p className={styles.lead}>
                  Crear un sistema capaz de analizar datos comerciales y generar recomendaciones claras
                  y comprensibles para la gestión del inventario.
                </p>
                <div className={styles.col2}>
                  <div className={styles.card}>
                    <strong>Preguntas clave</strong>
                    <ul className={styles.list}>
                      <li>¿Qué productos deberían reponerse pronto?</li>
                      <li>¿Qué productos tienen exceso de stock?</li>
                      <li>¿Qué productos generan más ingresos?</li>
                      <li>¿Qué patrones de venta se repiten en el tiempo?</li>
                    </ul>
                  </div>
                  <div className={`${styles.card} ${styles.cardCyan}`}>
                    <strong>Ejemplo de salida del sistema</strong>
                    <ul className={styles.list}>
                      <li>«Producto A: reponer ≥ 50 uds. antes del viernes.»</li>
                      <li>«Producto B: exceso de 120 uds. — pausar pedido.»</li>
                      <li>«Pico de demanda previsto: +18 % las próximas 2 semanas.»</li>
                    </ul>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Meta</span>
                <span>Cuatro preguntas, respuestas claras</span>
              </footer>
            </SlideFrame>
          </section>

          <section key="slide-6" className={styles.slide} aria-label="Diapositiva 6: Requisitos funcionales">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Requisitos funcionales del sistema</span>
                </div>
                <div className={styles.slideHeaderRight}>
                  <Image src={logo} alt="" className={styles.headerLogo} aria-hidden="true" />
                  <span className={styles.slideNumber}>06 / 12</span>
                </div>
              </header>
              <div className={styles.slideBody}>
                <div className={styles.columns}>
                  <div className={styles.card}>
                    <strong>Datos de entrada</strong>
                    <ul className={styles.list}>
                      <li>Producto y referencia (SKU).</li>
                      <li>Fecha y cantidad vendida.</li>
                      <li>Stock actual y precio unitario.</li>
                    </ul>
                    <div className={styles.miniDash}>
                      <div className={`${styles.miniTableRow} ${styles.miniTableHead}`}>
                        <span>SKU</span><span>Fecha</span><span>Venta</span><span>Stock</span>
                      </div>
                      <div className={styles.miniTable}>
                        <div className={styles.miniTableRow}>
                          <span>A-001</span><span>03/03</span><span>12</span><span>8</span>
                        </div>
                        <div className={styles.miniTableRow}>
                          <span>B-042</span><span>03/03</span><span>3</span><span>2</span>
                        </div>
                        <div className={styles.miniTableRow}>
                          <span>C-118</span><span>03/03</span><span>7</span><span>24</span>
                        </div>
                      </div>
                      <div className={styles.tagRow}>
                        <span className={styles.tag}>CSV</span>
                        <span className={styles.tag}>JSON</span>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.card} ${styles.cardCyan}`}>
                    <strong>Qué analiza</strong>
                    <ul className={styles.list}>
                      <li>Ventas medias y tendencias por periodo.</li>
                      <li>Rotación alta y baja por producto.</li>
                      <li>Cuánto stock hace falta reponer y cuándo.</li>
                    </ul>
                    <div className={styles.miniDash}>
                      <div className={styles.chartBars} aria-hidden="true">
                        <span style={{ height: "40%" }} />
                        <span style={{ height: "70%" }} />
                        <span style={{ height: "55%" }} />
                        <span style={{ height: "85%" }} />
                        <span style={{ height: "30%" }} />
                      </div>
                      <div className={styles.miniAlert}>⚠ Alerta: 3 productos en riesgo de rotura</div>
                      <div className={styles.miniRank}>
                        <span>↑ Más vendido: Producto A</span>
                        <span>↓ Sin rotar: Producto D</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <strong>Qué te dice el sistema</strong>
                    <ul className={styles.list}>
                      <li>Qué reponer y cuánto pedir.</li>
                      <li>Qué pausar o reducir.</li>
                      <li>Siempre basado en los datos cargados.</li>
                    </ul>
                    <div className={styles.miniDash}>
                      <div className={styles.miniRec}>
                        <span className={styles.miniRecIcon}>↑</span>
                        <span>Reponer: Producto A (40 uds.)</span>
                      </div>
                      <div className={styles.miniRec}>
                        <span className={styles.miniRecIcon}>↓</span>
                        <span>Reducir: Producto B</span>
                      </div>
                      <div className={styles.miniRec}>
                        <span className={styles.miniRecIcon}>⚠</span>
                        <span>Alerta: riesgo de rotura</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Requisitos</span>
                <span>Datos → Análisis → Resultado</span>
              </footer>
            </SlideFrame>
          </section>

          <section key="slide-7" className={styles.slide} aria-label="Diapositiva 7: Reglas del reto">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Reglas del reto (criterios técnicos)</span>
                </div>
                <div className={styles.slideHeaderRight}>
                  <Image src={logo} alt="" className={styles.headerLogo} aria-hidden="true" />
                  <span className={styles.slideNumber}>07 / 12</span>
                </div>
              </header>
              <div className={styles.slideBody}>
                <div className={styles.columns}>
                  <div className={styles.card}>
                    <strong>Cómo debe estar montado</strong>
                    <ul className={styles.list}>
                      <li>Backend en cualquier lenguaje.</li>
                      <li>Procesamiento automático de los datos.</li>
                      <li>Arquitectura del sistema documentada y clara.</li>
                    </ul>
                  </div>
                  <div className={styles.card}>
                    <strong>Análisis y lógica</strong>
                    <ul className={styles.list}>
                      <li>Ventas medias y rotación de inventario.</li>
                      <li>Detección de situaciones fuera de lo normal.</li>
                      <li>Opcional: predicción, agrupación, análisis temporal.</li>
                    </ul>
                  </div>
                  <div className={styles.card}>
                    <strong>Cómo se presenta el resultado</strong>
                    <ul className={styles.list}>
                      <li>Dashboard o informe generado solo.</li>
                      <li>Interfaz web, CLI o notebook.</li>
                      <li>Resultados que se puedan exportar.</li>
                    </ul>
                  </div>
                </div>
                <div className={`${styles.card} ${styles.cardRed}`}>
                  <strong>Fuera de alcance — no se evalúa</strong>
                  <div className={styles.colStack}>
                    <span className={styles.tagFull}>Integración con proveedores externos</span>
                    <span className={styles.tagFull}>La interfaz no decide la nota</span>
                    <span className={styles.tagFull}>No hace falta conectar a un ERP</span>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Comparabilidad</span>
                <span>Requisitos técnicos mínimos</span>
              </footer>
            </SlideFrame>
          </section>

          <section key="slide-8" className={styles.slide} aria-label="Diapositiva 8: Entrada y salida">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}><span>Arquitectura del sistema</span></div>
                <div className={styles.slideHeaderRight}>
                  <Image src={logo} alt="" className={styles.headerLogo} aria-hidden="true" />
                  <span className={styles.slideNumber}>08 / 12</span>
                </div>
              </header>
              <div className={styles.slideBody}>
                <div className={styles.col2}>
                  <div className={`${styles.card} ${styles.cardAccent}`}>
                    <strong>Datos de entrada</strong>
                    <ul className={styles.list}>
                      <li>Producto y SKU.</li>
                      <li>Fecha y cantidad vendida.</li>
                      <li>Stock actual y precio unitario.</li>
                    </ul>
                    <div className={styles.tagRow}>
                      <span className={styles.tag}>CSV</span>
                      <span className={styles.tag}>JSON</span>
                    </div>
                  </div>
                  <div className={`${styles.card} ${styles.cardGreen}`}>
                    <strong>Lo que devuelve el sistema</strong>
                    <ul className={styles.list}>
                      <li>Qué productos tienen riesgo de rotura.</li>
                      <li>Qué hay en exceso y se puede pausar.</li>
                      <li>Recomendación de qué pedir y cuánto.</li>
                      <li>Informe o visualización del análisis.</li>
                    </ul>
                  </div>
                </div>
                {/* Infografía: flujo del sistema */}
                <div className={styles.flowDiagram}>
                  <div className={`${styles.flowNode} ${styles.flowStep0}`}>
                    <div className={styles.flowNodeIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 21V9" />
                      </svg>
                    </div>
                    <span className={styles.flowNodeLabel}>Datos de ventas</span>
                    <span className={styles.flowNodeSub}>CSV / JSON / API</span>
                  </div>
                  <div className={styles.flowArrowSvg}>
                    <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                      <path d="M0 8h26" stroke="rgba(7,8,80,0.85)" strokeWidth="1.5"/>
                      <path d="M20 2l8 6-8 6" stroke="rgba(7,8,80,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={`${styles.flowNode} ${styles.flowStep1}`}>
                    <div className={styles.flowNodeIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <span className={styles.flowNodeLabel}>Procesamiento</span>
                    <span className={styles.flowNodeSub}>Limpieza y cálculo</span>
                  </div>
                  <div className={styles.flowArrowSvg}>
                    <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                      <path d="M0 8h26" stroke="rgba(7,8,80,0.85)" strokeWidth="1.5"/>
                      <path d="M20 2l8 6-8 6" stroke="rgba(7,8,80,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={`${styles.flowNode} ${styles.flowStep2}`}>
                    <div className={styles.flowNodeIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <span className={styles.flowNodeLabel}>Análisis IA</span>
                    <span className={styles.flowNodeSub}>Patrones · anomalías</span>
                  </div>
                  <div className={styles.flowArrowSvg}>
                    <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                      <path d="M0 8h26" stroke="rgba(7,8,80,0.85)" strokeWidth="1.5"/>
                      <path d="M20 2l8 6-8 6" stroke="rgba(7,8,80,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={`${styles.flowNode} ${styles.flowStep3}`}>
                    <div className={styles.flowNodeIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                    </div>
                    <span className={styles.flowNodeLabel}>Recomendaciones</span>
                    <span className={styles.flowNodeSub}>Acciones concretas</span>
                  </div>
                  <div className={styles.flowArrowSvg}>
                    <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                      <path d="M0 8h26" stroke="rgba(7,8,80,0.85)" strokeWidth="1.5"/>
                      <path d="M20 2l8 6-8 6" stroke="rgba(7,8,80,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={`${styles.flowNode} ${styles.flowStep4}`}>
                    <div className={styles.flowNodeIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M3 9h18"/>
                        <path d="M9 21V9"/>
                        <path d="M7 13h4v4H7z" fill="currentColor" opacity="0.3"/>
                      </svg>
                    </div>
                    <span className={styles.flowNodeLabel}>Dashboard</span>
                    <span className={styles.flowNodeSub}>Visualización final</span>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Entrada / Salida</span>
                <span>Datos → Análisis → Resultado</span>
              </footer>
            </SlideFrame>
          </section>

          <section key="slide-9" className={styles.slide} aria-label="Diapositiva 9: Criterios de evaluación">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}><span>Criterios de evaluación</span></div>
                <div className={styles.slideHeaderRight}>
                  <Image src={logo} alt="" className={styles.headerLogo} aria-hidden="true" />
                  <span className={styles.slideNumber}>09 / 12</span>
                </div>
              </header>
              <div className={styles.slideBody}>
                <p className={styles.lead}>
                  100 puntos en total. El jurado mira cuatro cosas, por este orden de importancia.
                </p>
                {/* Infografía: barras de evaluación */}
                <div className={styles.evalChart}>
                  {[
                    { label: "Adecuación al reto y a la empresa", pct: 35, color: "#003CA3", bg: "rgba(0,60,163,0.15)" },
                    { label: "Arquitectura, robustez y escalabilidad", pct: 35, color: "#188FF1", bg: "rgba(24,143,241,0.15)" },
                    { label: "Implementación y código", pct: 15, color: "#52A095", bg: "rgba(82,160,149,0.15)" },
                    { label: "Pitch, demo en directo y Q&A", pct: 15, color: "#755B77", bg: "rgba(117,91,119,0.15)" },
                  ].map((item) => (
                    <div key={item.label} className={styles.evalItem}>
                      <span className={styles.evalLabel}>{item.label}</span>
                      <div className={styles.evalBarTrack}>
                        <div
                          className={styles.evalBarFill}
                          style={{ width: `${item.pct}%`, background: `linear-gradient(90deg, ${item.color} 0%, ${item.bg.replace('0.15','0.6')} 100%)` }}
                        />
                      </div>
                      <span className={styles.evalPct} style={{ color: item.color }}>{item.pct}%</span>
                    </div>
                  ))}
                </div>
                <div className={`${styles.card} ${styles.cardCyan}`}>
                  <strong>Lo más importante</strong>
                  <p>70 de los 100 puntos se juegan en si la solución resuelve bien el reto y si el sistema está bien construido. La demo y el código importan, pero lo primero es que tenga sentido para el negocio.</p>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Evaluación</span>
                <span>100 puntos totales</span>
              </footer>
            </SlideFrame>
          </section>

          <section key="slide-10" className={styles.slide} aria-label="Diapositiva 10: Entregables">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Entregables</span>
                </div>
                <div className={styles.slideHeaderRight}>
                  <Image src={logo} alt="" className={styles.headerLogo} aria-hidden="true" />
                  <span className={styles.slideNumber}>10 / 12</span>
                </div>
              </header>
              <div className={styles.slideBody}>
                <div className={styles.col2}>
                  <div className={`${styles.card} ${styles.cardAccent}`}>
                    <strong>Demo funcional</strong>
                    <p>Prototipo que procese datos reales y genere recomendaciones en vivo durante el pitch.</p>
                    <ul className={styles.list}>
                      <li>Entrada: CSV o JSON de ventas y stock.</li>
                      <li>Salida: alertas y recomendaciones claras.</li>
                    </ul>
                  </div>
                  <div className={`${styles.card} ${styles.cardCyan}`}>
                    <strong>Repositorio público (GitHub)</strong>
                    <p>Código fuente accesible y documentado antes de la presentación.</p>
                    <ul className={styles.list}>
                      <li>README con instrucciones de ejecución.</li>
                      <li>Dependencias y arquitectura explicadas.</li>
                    </ul>
                  </div>
                  <div className={`${styles.card} ${styles.cardGreen}`}>
                    <strong>Pitch deck en PDF</strong>
                    <p>Presentación exportada en PDF, subida a la raíz del repositorio antes del evento.</p>
                    <ul className={styles.list}>
                      <li>Máximo 10 diapositivas.</li>
                      <li>No se aceptan archivos PPTX.</li>
                    </ul>
                  </div>
                  <div className={`${styles.card} ${styles.cardAmber}`}>
                    <strong>Dataset de ejemplo</strong>
                    <p>Demo con datos de muestra: mínimo 3 productos y 30 días de historial de ventas.</p>
                    <ul className={styles.list}>
                      <li>Datos pueden ser sintéticos pero realistas.</li>
                      <li>Recomendaciones visibles y explicadas en la demo.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Entrega</span>
                <span>Demo + repo + PDF</span>
              </footer>
            </SlideFrame>
          </section>

          <section key="slide-11" className={styles.slide} aria-label="Diapositiva 11: Formato del pitch final">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Formato del pitch final</span>
                </div>
                <div className={styles.slideHeaderRight}>
                  <Image src={logo} alt="" className={styles.headerLogo} aria-hidden="true" />
                  <span className={styles.slideNumber}>11 / 12</span>
                </div>
              </header>
              <div className={styles.slideBody}>
                <p className={styles.lead}>
                  Tienes {siteContent.rulebook.pitchDuration} para explicar el problema, mostrar el sistema y convencer al jurado.
                </p>
                <div className={styles.col3}>
                  <div className={styles.card}>
                    <strong>Tiempo disponible</strong>
                    <ul className={styles.list}>
                      <li>{siteContent.rulebook.pitchDuration} de pitch, tiempo estricto.</li>
                      <li>La demo va incluida en ese tiempo.</li>
                      <li>El jurado pregunta después.</li>
                    </ul>
                  </div>
                  <div className={styles.card}>
                    <strong>Guion de la presentación</strong>
                    <ol className={styles.listOl}>
                      <li>Qué problema resuelve.</li>
                      <li>Cómo funciona y por qué.</li>
                      <li>Demo en vivo — los datos hablan.</li>
                      <li>Por qué vale la pena para un negocio real.</li>
                    </ol>
                  </div>
                  <div className={`${styles.card} ${styles.cardCyan}`}>
                    <strong>Consejo para la demo</strong>
                    <ul className={styles.list}>
                      <li>Muestra una recomendación real generada.</li>
                      <li>Habla de lo que gana el negocio, no del código.</li>
                      <li>Ten los datos listos y cargados antes de empezar.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Pitch</span>
                <span>Tiempo estricto</span>
              </footer>
            </SlideFrame>
          </section>

          <section key="slide-12" className={styles.slide} aria-label="Diapositiva 12: Impacto potencial">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}><span>Impacto potencial</span></div>
                <div className={styles.slideHeaderRight}>
                  <Image src={logo} alt="" className={styles.headerLogo} aria-hidden="true" />
                  <span className={styles.slideNumber}>12 / 12</span>
                </div>
              </header>
              <div className={styles.slideBody}>
                {/* Infografía: KPI dashboard */}
                <div className={styles.kpiGrid}>
                  <div className={`${styles.kpiCard} ${styles.kpiBlue}`}>
                    <p className={styles.kpiValue}>12+</p>
                    <span className={styles.kpiLabel}>Productos en riesgo</span>
                    <span className={styles.kpiSub}>Con rotura probable en 7 días</span>
                  </div>
                  <div className={`${styles.kpiCard} ${styles.kpiCyan}`}>
                    <p className={styles.kpiValue}>94 %</p>
                    <span className={styles.kpiLabel}>Acierto de reposición</span>
                    <span className={styles.kpiSub}>Stock justo estimado por producto</span>
                  </div>
                  <div className={`${styles.kpiCard} ${styles.kpiAmber}`}>
                    <p className={styles.kpiValue}>×3</p>
                    <span className={styles.kpiLabel}>Top rotación</span>
                    <span className={styles.kpiSub}>Venden 3 veces más que la media</span>
                  </div>
                  <div className={`${styles.kpiCard} ${styles.kpiRed}`}>
                    <p className={styles.kpiValue}>5</p>
                    <span className={styles.kpiLabel}>Alertas activas</span>
                    <span className={styles.kpiSub}>Situaciones fuera de lo normal</span>
                  </div>
                </div>
                <div className={styles.col2}>
                  <div className={`${styles.card} ${styles.cardAccent}`}>
                    <strong>Sectores beneficiados</strong>
                    <div className={styles.tagRow}>
                      <span className={styles.tag}>Retail local</span>
                      <span className={styles.tag}>E-commerce</span>
                      <span className={styles.tag}>Startups</span>
                      <span className={styles.tag}>Distribución</span>
                    </div>
                  </div>
                  <div className={`${styles.card} ${styles.cardGreen}`}>
                    <strong>En una frase</strong>
                    <p>Que el sistema te diga qué comprar, cuándo y por qué, sin complicarte.</p>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>IA para Operaciones</span>
                <span>CEU Impact Lab · {siteContent.dates}</span>
              </footer>
            </SlideFrame>
          </section>
    </>
  );

  const slideNodes = Children.toArray(
    (slides as React.ReactElement<{ children: ReactNode }>).props.children
  );
  const exportDeckClassName = useMemo(() => {
    if (!isExport || typeof document === "undefined") {
      return styles.exportDeck;
    }
    const htmlClasses = document.documentElement.className;
    const bodyClasses = document.body.className;
    return `${styles.exportDeck} ${htmlClasses} ${bodyClasses}`.trim();
  }, [isExport]);

  if (isExport) {
    return (
      <main id="exportDeck" className={exportDeckClassName}>
        {slideNodes.map((slide, index) => (
          <section className={styles.exportPage} key={`export-${index}`}>
            <div className={styles.exportCanvas}>{slide}</div>
          </section>
        ))}
      </main>
    );
  }

  return (
    <main className={styles.stage} ref={stageRef}>
        <div
          className={styles.deckCanvas}
          ref={canvasRef}
          style={{ transform: `scale(${scale})` }}
        >
          {/* Add new slides as <section className={styles.slide}> inside this track. */}
          <div
            className={styles.track}
            ref={trackRef}
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides}
          </div>
          <div className={styles.controls} aria-label="Controles de diapositivas">
            <button
              type="button"
              className={styles.controlButton}
              onClick={() => { boop(); setActiveSlide((prev) => Math.max(prev - 1, 0)); }}
              aria-label="Diapositiva anterior"
              disabled={activeSlide === 0}
            >
              <span className={styles.controlArrow} aria-hidden="true">
                &lt;
              </span>
            </button>
            <div className={styles.dotRow} aria-hidden="true">
              {visibleDots.map((index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.dot} ${index === activeSlide ? styles.dotActive : ""}`}
                  onClick={() => { boop(); setActiveSlide(index); }}
                  aria-label={`Ir a la diapositiva ${index + 1}`}
                  aria-pressed={index === activeSlide}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.controlButton}
              onClick={() => { boop(); setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1)); }}
              aria-label="Diapositiva siguiente"
              disabled={activeSlide === totalSlides - 1}
            >
              <span className={styles.controlArrow} aria-hidden="true">
                &gt;
              </span>
            </button>
          </div>
        </div>
    </main>
  );
}
