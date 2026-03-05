"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { siteContent } from "@/content/site";
import styles from "./slides.module.css";
import logo from "../../../../../img/CEU_Impact_Lab-Logo-Marginless.png";

const evaluationCriteria = [
  { label: "Adecuación al reto y a la empresa", value: 35 },
  { label: "Arquitectura, robustez y escalabilidad", value: 35 },
  { label: "Implementación y código", value: 15 },
  { label: "Pitch, demo en directo y Q&A", value: 15 },
];

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

  return (
    <main className={styles.deck}>
      <div className={styles.deckInner}>
        <div className={styles.track} style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          <section className={styles.slide} aria-label="Diapositiva 1: Portada">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <Image src={logo} alt="CEU Impact Lab" className={styles.logo} />
                  <span></span>
                </div>
                <span className={styles.slideNumber}>01</span>
              </header>
              <div className={styles.slideBody}>
                <div>
                  <h1 className={styles.slideTitle}>Reto 00 — IA para Operaciones</h1>
                  <p className={styles.slideSubtitle}>
                    Transformando datos en decisiones de inventario inteligentes
                  </p>
                </div>
                <p className={styles.lead}>
                  Desarrolla una solución basada en IA capaz de analizar datos de ventas y stock para
                  ayudar a pequeñas empresas a tomar mejores decisiones de inventario, reducir pérdidas
                  y mejorar su rentabilidad.
                </p>
                <div className={styles.columns}>
                  <div className={styles.card}>
                    <strong>Datos</strong>
                    <span>Ventas y stock en tiempo real</span>
                  </div>
                  <div className={styles.card}>
                    <strong>IA aplicada</strong>
                    <span>Patrones, predicción y alertas</span>
                  </div>
                  <div className={styles.card}>
                    <strong>Decisión</strong>
                    <span>Reposición inteligente y rentable</span>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>{siteContent.dates}</span>
                <span>Presentación de retos</span>
              </footer>
            </SlideFrame>
          </section>

          <section className={styles.slide} aria-label="Diapositiva 2: Enunciado del reto">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Enunciado del reto</span>
                </div>
                <span className={styles.slideNumber}>02</span>
              </header>
              <div className={styles.slideBody}>
                <p className={styles.lead}>
                  Las pequeñas y medianas empresas suelen gestionar su inventario con herramientas muy
                  básicas o mediante hojas de cálculo.
                </p>
                <div className={styles.columns}>
                  <ul className={styles.list}>
                    <li>Exceso de stock en productos con poca demanda.</li>
                    <li>Roturas de stock en productos con alta demanda.</li>
                    <li>Decisiones de compra basadas en intuición y no en datos.</li>
                    <li>Pérdidas económicas e ineficiencia operativa.</li>
                  </ul>
                  <div className={styles.card}>
                    <strong>Problema triangular</strong>
                    <div className={styles.triangle}>
                      <span className={`${styles.triangleLabel} ${styles.top}`}>EXCESO DE STOCK</span>
                      <span className={`${styles.triangleLabel} ${styles.middle}`}>VENTAS IRREGULARES</span>
                      <span className={`${styles.triangleLabel} ${styles.bottom}`}>ROTURA DE STOCK</span>
                    </div>
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
                  <div className={styles.card}>
                    <strong>2. Análisis de datos</strong>
                    <ul className={styles.list}>
                      <li>Calcular métricas básicas de negocio.</li>
                      <li>Detectar tendencias de venta.</li>
                      <li>Identificar productos con alta o baja rotación.</li>
                      <li>Estimar necesidades futuras de reposición.</li>
                    </ul>
                    <div className={styles.dashboard}>
                      <div className={styles.chartBars} aria-hidden="true">
                        <span style={{ height: "40%" }} />
                        <span style={{ height: "70%" }} />
                        <span style={{ height: "55%" }} />
                        <span style={{ height: "85%" }} />
                        <span style={{ height: "30%" }} />
                      </div>
                      <div className={styles.alert}>Alerta: stock crítico</div>
                      <div className={styles.rank}>
                        <span>Top ventas: Producto A</span>
                        <span>Rotación baja: Producto D</span>
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
                <div className={styles.slideMeta}>
                  <span>Entrada y salida del sistema</span>
                </div>
                <span className={styles.slideNumber}>08</span>
              </header>
              <div className={styles.slideBody}>
                <div className={styles.columns}>
                  <div className={styles.card}>
                    <strong>Entrada</strong>
                    <ul className={styles.list}>
                      <li>Producto.</li>
                      <li>Fecha de venta.</li>
                      <li>Cantidad vendida.</li>
                      <li>Stock actual.</li>
                      <li>Precio unitario.</li>
                    </ul>
                  </div>
                  <div className={styles.card}>
                    <strong>Salida</strong>
                    <ul className={styles.list}>
                      <li>Análisis de inventario.</li>
                      <li>Identificación de riesgos de stock.</li>
                      <li>Recomendaciones de compra o reposición.</li>
                      <li>Visualización o informe de resultados.</li>
                    </ul>
                  </div>
                  <div className={styles.card}>
                    <strong>Arquitectura sugerida</strong>
                    <div className={styles.flow}>
                      <div className={styles.flowStep}>Datos de ventas</div>
                      <div className={styles.flowArrow}>→</div>
                      <div className={styles.flowStep}>Procesamiento</div>
                      <div className={styles.flowArrow}>→</div>
                      <div className={styles.flowStep}>Análisis IA</div>
                      <div className={styles.flowArrow}>→</div>
                      <div className={styles.flowStep}>Recomendaciones</div>
                      <div className={styles.flowArrow}>→</div>
                      <div className={styles.flowStep}>Dashboard</div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>Input / Output</span>
                <span>Datos -&gt; Insight</span>
              </footer>
            </SlideFrame>
          </section>

          <section className={styles.slide} aria-label="Diapositiva 9: Criterios de evaluación">
            <SlideFrame>
              <header className={styles.slideHeader}>
                <div className={styles.slideMeta}>
                  <span>Criterios de evaluación</span>
                </div>
                <span className={styles.slideNumber}>09</span>
              </header>
              <div className={styles.slideBody}>
                <div className={styles.columns}>
                  <div className={styles.card}>
                    <strong>Rúbrica oficial</strong>
                    <p>
                      La evaluación sigue la rúbrica oficial del evento. Se prioriza el encaje con el
                      reto y la robustez técnica.
                    </p>
                  </div>
                  <div className={styles.card}>
                    <strong>Distribución de puntos</strong>
                    <div className={styles.evaluation}>
                      {evaluationCriteria.map((item) => (
                        <div key={item.label} className={styles.evalRow}>
                          <span>{item.label}</span>
                          <div className={styles.evalBar}>
                            <span style={{ width: `${item.value}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                  <ol className={styles.list}>
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
                <div className={styles.slideMeta}>
                  <span>Impacto potencial</span>
                </div>
                <span className={styles.slideNumber}>12</span>
              </header>
              <div className={styles.slideBody}>
                <p className={styles.lead}>
                  Soluciones como esta pueden ayudar a pequeñas empresas, comercios locales, negocios de
                  e-commerce y startups en crecimiento a tomar decisiones más inteligentes basadas en
                  datos.
                </p>
                <div className={styles.iconRow}>
                  <div className={styles.iconCard}>
                    <div className={styles.iconGlyph}>TI</div>
                    <strong>Tienda</strong>
                    <span>Retail local</span>
                  </div>
                  <div className={styles.iconCard}>
                    <div className={styles.iconGlyph}>EC</div>
                    <strong>E-commerce</strong>
                    <span>Ventas online</span>
                  </div>
                  <div className={styles.iconCard}>
                    <div className={styles.iconGlyph}>ST</div>
                    <strong>Startup</strong>
                    <span>Crecimiento</span>
                  </div>
                  <div className={styles.iconCard}>
                    <div className={styles.iconGlyph}>AI</div>
                    <strong>Analítica</strong>
                    <span>Data-driven</span>
                  </div>
                </div>
                <div className={styles.card}>
                  <strong>Mensaje final</strong>
                  <p>Data-driven decisions for every business.</p>
                </div>
              </div>
              <footer className={styles.slideFooter}>
                <span>IA para Operaciones</span>
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
