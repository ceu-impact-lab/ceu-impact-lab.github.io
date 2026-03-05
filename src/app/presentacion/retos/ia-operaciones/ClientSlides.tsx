"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/content/site";
import styles from "./slides.module.css";
import logo from "../../../../../img/CEU_Impact_Lab-Logo-Marginless.png";

type SlideFrameProps = {
  children: ReactNode;
};

function SlideFrame({ children }: SlideFrameProps) {
  return (
    <div className={styles.slideFrame}>
      <Image src={logo} alt="" className={styles.cornerLogo} aria-hidden="true" />
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
  }, [totalSlides]);

  useEffect(() => {
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
  }, []);

  return (
    <main className={styles.stage} ref={stageRef}>
        <div className={styles.deckCanvas} style={{ transform: `scale(${scale})` }}>
          {/* Add new slides as <section className={styles.slide}> inside this track. */}
          <div className={styles.track} style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          <section className={styles.slide} aria-label="Diapositiva 1: Portada">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <Image src={logo} alt="CEU Impact Lab" className={styles.logo} />
                </div>
                <span className={styles.slideNumber}>01 / 12</span>
              </header>
              <div className={styles.slideBody}>
                <div>
                  <div className={styles.coverTag}>Reto 00</div>
                  <h1 className={styles.slideTitle}>IA para Operaciones</h1>
                  <div className={styles.coverDivider} />
                  <p className={styles.slideSubtitle}>
                    Transformando datos en decisiones de inventario inteligentes
                  </p>
                </div>
                <p className={styles.lead}>
                  Desarrolla una solución basada en IA capaz de analizar datos de ventas y stock para
                  ayudar a pequeñas empresas a tomar mejores decisiones de inventario, reducir pérdidas
                  y mejorar su rentabilidad.
                </p>
                <div className={styles.col3}>
                  <div className={`${styles.card} ${styles.cardAccent}`}>
                    <strong>Datos</strong>
                    <span>Ventas y stock en tiempo real</span>
                  </div>
                  <div className={`${styles.card} ${styles.cardCyan}`}>
                    <strong>IA aplicada</strong>
                    <span>Patrones, predicción y alertas</span>
                  </div>
                  <div className={`${styles.card} ${styles.cardGreen}`}>
                    <strong>Decisión</strong>
                    <span>Reposición inteligente y rentable</span>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>{siteContent.dates}</span>
                <span>Presentación de retos · CEU Impact Lab</span>
              </footer>
            </SlideFrame>
          </section>

          <section className={styles.slide} aria-label="Diapositiva 2: Enunciado del reto">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}><span>Enunciado del reto</span></div>
                <span className={styles.slideNumber}>02 / 12</span>
              </header>
              <div className={styles.slideBody}>
                <p className={styles.lead}>
                  Las pymes gestionan su inventario con hojas de cálculo. El resultado: tres problemas encadenados que generan pérdidas sistemáticas.
                </p>
                {/* Infografía: mapa del problema */}
                <div className={styles.problemGrid}>
                  <div className={`${styles.problemCard} ${styles.problemCardRed}`}>
                    <div className={`${styles.problemIcon} ${styles.problemIconRed}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round">
                        <path d="M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3z" />
                      </svg>
                    </div>
                    <p className={styles.problemTitle}>Exceso de stock</p>
                    <p className={styles.problemDesc}>Capital inmovilizado en productos de baja rotación. Espacio ocupado, coste financiero elevado.</p>
                  </div>
                  <div className={`${styles.problemCard} ${styles.problemCardAmber}`}>
                    <div className={`${styles.problemIcon} ${styles.problemIconAmber}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <p className={styles.problemTitle}>Ventas irregulares</p>
                    <p className={styles.problemDesc}>Patrones de demanda no detectados. Decisiones de compra basadas en intuición, no en datos.</p>
                  </div>
                  <div className={`${styles.problemCard} ${styles.problemCardOrange}`}>
                    <div className={`${styles.problemIcon} ${styles.problemIconOrange}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </div>
                    <p className={styles.problemTitle}>Rotura de stock</p>
                    <p className={styles.problemDesc}>Productos de alta demanda sin reposición a tiempo. Ventas perdidas e insatisfacción del cliente.</p>
                  </div>
                </div>
                <div className={styles.impactRow}>
                  <div className={styles.impactCard}>
                    <span className={styles.impactLabel}>Impacto directo</span>
                    <span className={styles.impactDesc}>Pérdidas económicas evitables en cada ciclo de compra</span>
                  </div>
                  <div className={styles.impactCard}>
                    <span className={styles.impactLabel}>Causa raíz</span>
                    <span className={styles.impactDesc}>Ausencia de análisis de datos automatizado y accesible</span>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Reto 00</span>
                <span>IA para Operaciones</span>
              </footer>
            </SlideFrame>
          </section>

          <section className={styles.slide} aria-label="Diapositiva 3: Contexto del reto">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Contexto del reto</span>
                </div>
                <span className={styles.slideNumber}>00</span>
              </header>
              <div className={styles.slideBody}>
                <p className={styles.lead}>
                  La digitalización de los pequeños comercios y negocios es uno de los grandes retos del
                  tejido empresarial actual.
                </p>
                <div className={styles.columns}>
                  <div className={styles.card}>
                    <strong>Limitaciones actuales</strong>
                    <ul className={styles.list}>
                      <li>Soluciones demasiado complejas.</li>
                      <li>Costes elevados para pymes.</li>
                      <li>Poca adaptación a negocios pequeños.</li>
                    </ul>
                  </div>
                  <div className={styles.card}>
                    <strong>Oportunidad</strong>
                    <p>
                      La IA puede democratizar el acceso a herramientas de análisis empresarial y mejorar
                      decisiones operativas con datos reales.
                    </p>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Contexto</span>
                <span>Digitalización y accesibilidad</span>
              </footer>
            </SlideFrame>
          </section>

          <section className={styles.slide} aria-label="Diapositiva 4: Objetivo del reto">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Objetivo del reto</span>
                </div>
                <span className={styles.slideNumber}>04</span>
              </header>
              <div className={styles.slideBody}>
                <p className={styles.lead}>
                  Desarrollar una herramienta inteligente de análisis de inventario que permita:
                </p>
                <ul className={styles.list}>
                  <li>Analizar datos históricos de ventas.</li>
                  <li>Identificar patrones de demanda.</li>
                  <li>Detectar posibles problemas de stock.</li>
                  <li>Sugerir decisiones de reposición de inventario.</li>
                </ul>
                <div className={styles.tagRow}>
                  <span className={styles.tag}>Programación</span>
                  <span className={styles.tag}>Sistemas</span>
                  <span className={styles.tag}>Negocio</span>
                  <span className={styles.tag}>Gestión</span>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Objetivo</span>
                <span>Inventario inteligente</span>
              </footer>
            </SlideFrame>
          </section>

          <section className={styles.slide} aria-label="Diapositiva 5: Meta del reto">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Meta del reto</span>
                </div>
                <span className={styles.slideNumber}>05</span>
              </header>
              <div className={styles.slideBody}>
                <p className={styles.lead}>
                  Crear un sistema capaz de analizar datos comerciales y generar recomendaciones claras
                  y comprensibles para la gestión del inventario.
                </p>
                <div className={styles.card}>
                  <strong>Preguntas clave</strong>
                  <ul className={styles.list}>
                    <li>¿Qué productos deberían reponerse pronto?</li>
                    <li>¿Qué productos tienen exceso de stock?</li>
                    <li>¿Qué productos generan más ingresos?</li>
                    <li>¿Qué patrones de venta se repiten en el tiempo?</li>
                  </ul>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Meta</span>
                <span>Recomendaciones accionables</span>
              </footer>
            </SlideFrame>
          </section>

          <section className={styles.slide} aria-label="Diapositiva 6: Requisitos funcionales">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Requisitos funcionales del sistema</span>
                </div>
                <span className={styles.slideNumber}>06</span>
              </header>
              <div className={styles.slideBody}>
                <div className={styles.columns}>
                  <div className={styles.card}>
                    <strong>1. Ingesta de datos</strong>
                    <ul className={styles.list}>
                      <li>Ventas por producto.</li>
                      <li>Fechas de venta.</li>
                      <li>Cantidad vendida.</li>
                      <li>Stock actual.</li>
                      <li>Formato sugerido: CSV o JSON.</li>
                    </ul>
                  </div>
                  <div className={`${styles.card} ${styles.cardCyan}`}>
                    <strong>2. Análisis de datos</strong>
                    <ul className={styles.list}>
                      <li>Calcular métricas básicas de negocio.</li>
                      <li>Detectar tendencias de venta.</li>
                      <li>Identificar productos con alta o baja rotación.</li>
                      <li>Estimar necesidades futuras de reposición.</li>
                    </ul>
                    <div className={styles.miniDash}>
                      <div className={styles.chartBars} aria-hidden="true">
                        <span style={{ height: "40%" }} />
                        <span style={{ height: "70%" }} />
                        <span style={{ height: "55%" }} />
                        <span style={{ height: "85%" }} />
                        <span style={{ height: "30%" }} />
                      </div>
                      <div className={styles.miniAlert}>⚠ Alerta: stock crítico detectado</div>
                      <div className={styles.miniRank}>
                        <span>↑ Top ventas: Producto A</span>
                        <span>↓ Rotación baja: Producto D</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <strong>3. Recomendaciones</strong>
                    <ul className={styles.list}>
                      <li>Reponer producto X en los próximos días.</li>
                      <li>Reducir pedido del producto Y.</li>
                      <li>Tendencias crecientes de demanda.</li>
                      <li>Basadas siempre en datos analizados.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Requisitos</span>
                <span>Datos -&gt; Análisis -&gt; Acción</span>
              </footer>
            </SlideFrame>
          </section>

          <section className={styles.slide} aria-label="Diapositiva 7: Reglas del reto">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Reglas del reto (criterios técnicos)</span>
                </div>
                <span className={styles.slideNumber}>07</span>
              </header>
              <div className={styles.slideBody}>
                <div className={styles.columns}>
                  <div className={styles.card}>
                    <strong>Estructura técnica</strong>
                    <ul className={styles.list}>
                      <li>Backend programado en cualquier lenguaje.</li>
                      <li>Procesamiento automático de datos.</li>
                      <li>Arquitectura clara del sistema.</li>
                    </ul>
                  </div>
                  <div className={styles.card}>
                    <strong>Análisis y lógica</strong>
                    <ul className={styles.list}>
                      <li>Cálculo de ventas medias.</li>
                      <li>Rotación de inventario.</li>
                      <li>Detección de anomalías simples.</li>
                      <li>Opcional: predicción, clustering, análisis temporal.</li>
                    </ul>
                  </div>
                  <div className={styles.card}>
                    <strong>Presentación de resultados</strong>
                    <ul className={styles.list}>
                      <li>Dashboard.</li>
                      <li>Informe automático.</li>
                      <li>Interfaz web o CLI.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Comparabilidad</span>
                <span>Requisitos técnicos mínimos</span>
              </footer>
            </SlideFrame>
          </section>

          <section className={styles.slide} aria-label="Diapositiva 8: Entrada y salida">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}><span>Arquitectura del sistema</span></div>
                <span className={styles.slideNumber}>08 / 12</span>
              </header>
              <div className={styles.slideBody}>
                <div className={styles.col2}>
                  <div className={`${styles.card} ${styles.cardAccent}`}>
                    <strong>Entrada de datos</strong>
                    <ul className={styles.list}>
                      <li>Producto y SKU</li>
                      <li>Fecha de venta</li>
                      <li>Cantidad vendida</li>
                      <li>Stock actual</li>
                      <li>Precio unitario</li>
                    </ul>
                    <div className={styles.tagRow}>
                      <span className={styles.tag}>CSV</span>
                      <span className={styles.tag}>JSON</span>
                    </div>
                  </div>
                  <div className={`${styles.card} ${styles.cardGreen}`}>
                    <strong>Salida del sistema</strong>
                    <ul className={styles.list}>
                      <li>Análisis de inventario</li>
                      <li>Identificación de riesgos de stock</li>
                      <li>Recomendaciones de reposición</li>
                      <li>Visualización / informe</li>
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
                      <path d="M0 8h26" stroke="rgba(7,8,80,0.2)" strokeWidth="1.5"/>
                      <path d="M20 2l8 6-8 6" stroke="rgba(7,8,80,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                      <path d="M0 8h26" stroke="rgba(7,8,80,0.2)" strokeWidth="1.5"/>
                      <path d="M20 2l8 6-8 6" stroke="rgba(7,8,80,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                      <path d="M0 8h26" stroke="rgba(7,8,80,0.2)" strokeWidth="1.5"/>
                      <path d="M20 2l8 6-8 6" stroke="rgba(7,8,80,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                      <path d="M0 8h26" stroke="rgba(7,8,80,0.2)" strokeWidth="1.5"/>
                      <path d="M20 2l8 6-8 6" stroke="rgba(7,8,80,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                <span>Input / Output</span>
                <span>Datos → Insight → Acción</span>
              </footer>
            </SlideFrame>
          </section>

          <section className={styles.slide} aria-label="Diapositiva 9: Criterios de evaluación">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}><span>Criterios de evaluación</span></div>
                <span className={styles.slideNumber}>09 / 12</span>
              </header>
              <div className={styles.slideBody}>
                <p className={styles.lead}>
                  La rúbrica oficial prioriza la adecuación al reto y la solidez técnica. 100 puntos totales distribuidos en cuatro dimensiones.
                </p>
                {/* Infografía: barras de evaluación */}
                <div className={styles.evalChart}>
                  {[
                    { label: "Adecuación al reto y a la empresa", pct: 35, color: "#4f8ef7", bg: "rgba(79,142,247,0.15)" },
                    { label: "Arquitectura, robustez y escalabilidad", pct: 35, color: "#06b6d4", bg: "rgba(6,182,212,0.15)" },
                    { label: "Implementación y código", pct: 15, color: "#34d399", bg: "rgba(52,211,153,0.15)" },
                    { label: "Pitch, demo en directo y Q&A", pct: 15, color: "#fbbf24", bg: "rgba(251,191,36,0.15)" },
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
                  <strong>Nota clave</strong>
                  <p>La evaluación sigue la rúbrica oficial del evento. El encaje con el reto de empresa y la robustez técnica suman el 70% de la nota.</p>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Evaluación</span>
                <span>100 puntos totales</span>
              </footer>
            </SlideFrame>
          </section>

          <section className={styles.slide} aria-label="Diapositiva 10: Entregables">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Entregables</span>
                </div>
                <span className={styles.slideNumber}>10</span>
              </header>
              <div className={styles.slideBody}>
                <div className={styles.columns}>
                  <div className={styles.card}>
                    <strong>Demo funcional</strong>
                    <p>Prototipo que procese datos y genere recomendaciones en vivo.</p>
                  </div>
                  <div className={styles.card}>
                    <strong>Repositorio público</strong>
                    <p>Código y documentación en un repositorio público de GitHub.</p>
                  </div>
                  <div className={styles.card}>
                    <strong>Pitch deck en PDF</strong>
                    <p>
                      Presentación exportada en PDF y subida a la raíz del repositorio. No se aceptan
                      archivos PPTX.
                    </p>
                  </div>
                  <div className={styles.card}>
                    <strong>Ejemplo de uso</strong>
                    <p>Demostración con datos reales o de ejemplo.</p>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Entrega</span>
                <span>Demo + repo + PDF</span>
              </footer>
            </SlideFrame>
          </section>

          <section className={styles.slide} aria-label="Diapositiva 11: Formato del pitch final">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Formato del pitch final</span>
                </div>
                <span className={styles.slideNumber}>11</span>
              </header>
              <div className={styles.slideBody}>
                <p className={styles.lead}>
                  Pitch de {siteContent.rulebook.pitchDuration} + demo en vivo + Q&A.
                </p>
                <div className={styles.card}>
                  <strong>Estructura recomendada</strong>
                <ol className={styles.listOl}>
                    <li>Problema que resuelve la solución.</li>
                    <li>Funcionamiento del sistema.</li>
                    <li>Demostración rápida.</li>
                    <li>Valor para un negocio real.</li>
                  </ol>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Pitch</span>
                <span>Tiempo estricto</span>
              </footer>
            </SlideFrame>
          </section>

          <section className={styles.slide} aria-label="Diapositiva 12: Impacto potencial">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}><span>Impacto potencial</span></div>
                <span className={styles.slideNumber}>12 / 12</span>
              </header>
              <div className={styles.slideBody}>
                {/* Infografía: KPI dashboard */}
                <div className={styles.kpiGrid}>
                  <div className={`${styles.kpiCard} ${styles.kpiBlue}`}>
                    <p className={styles.kpiValue}>12+</p>
                    <span className={styles.kpiLabel}>Productos en riesgo detectados</span>
                    <span className={styles.kpiSub}>Con stock crítico en los próximos 7 días</span>
                  </div>
                  <div className={`${styles.kpiCard} ${styles.kpiCyan}`}>
                    <p className={styles.kpiValue}>94%</p>
                    <span className={styles.kpiLabel}>Precisión de reposición</span>
                    <span className={styles.kpiSub}>Estimación de stock óptimo por producto</span>
                  </div>
                  <div className={`${styles.kpiCard} ${styles.kpiAmber}`}>
                    <p className={styles.kpiValue}>×3</p>
                    <span className={styles.kpiLabel}>Top rotación identificado</span>
                    <span className={styles.kpiSub}>Productos con ventas 3× la media</span>
                  </div>
                  <div className={`${styles.kpiCard} ${styles.kpiRed}`}>
                    <p className={styles.kpiValue}>5</p>
                    <span className={styles.kpiLabel}>Alertas activas</span>
                    <span className={styles.kpiSub}>Anomalías detectadas automáticamente</span>
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
                    <strong>Mensaje final</strong>
                    <p>Data-driven decisions for every business — accesible, automatizado y escalable.</p>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>IA para Operaciones</span>
                <span>CEU Impact Lab · {siteContent.dates}</span>
              </footer>
            </SlideFrame>
          </section>
          </div>
          <div className={styles.controls} aria-label="Controles de diapositivas">
            <button
              type="button"
              className={styles.controlButton}
              onClick={() => setActiveSlide((prev) => Math.max(prev - 1, 0))}
              aria-label="Diapositiva anterior"
              disabled={activeSlide === 0}
            >
              <span className={styles.controlArrow} aria-hidden="true">
                &lt;
              </span>
            </button>
            <div className={styles.dotRow} aria-hidden="true">
              {visibleDots.map((index) => (
                <span
                  key={index}
                  className={`${styles.dot} ${index === activeSlide ? styles.dotActive : ""}`}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.controlButton}
              onClick={() => setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1))}
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
