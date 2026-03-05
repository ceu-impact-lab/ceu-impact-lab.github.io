const hardFreezeTime = "10:00";
const submissionDeadlineTime = "10:00";
const pitchDuration = "X/Y minutos";

export const siteContent = {
  eventName: "CEU Impact Lab",
  dates: "18-19 abril 2026",
  awardsDate: "Domingo 19 abril 2026",
  location: "Campus Montepríncipe, CEU Madrid",
  primaryCTAs: {
    studentRegistrationUrl: "",
    companyContactUrl: "mailto:impactlab@ceu.es",
  },
  themeTokens: {
    primary: "#003CA3",
    secondary: "#070850",
  },
  scheduleBlocks: [
    {
      day: "Sábado",
      date: "18 abril",
      label: "Kickoff y build",
      items: [
        "10:00-10:30 Recepción de participantes y empresas",
        "10:30-11:30 Presentación del evento y retos",
        "11:30-14:00 Bloque de trabajo I",
        "14:00-15:00 Comida + networking",
        "15:00-20:00 Bloque de trabajo II + cierre en campus",
      ],
    },
    {
      day: "Domingo",
      date: "19 abril",
      label: "Cierre de entregas y pitches",
      items: [
        "10:00 Hard freeze y cierre de entregas",
        "10:30-12:00 Presentaciones de proyectos",
        "12:00-13:00 Cierre en Aula Magna",
      ],
    },
    {
      day: "Domingo",
      date: "19 abril",
      label: "Awards institucionales",
      items: [
        "Acto oficial de 1h-1:30h",
        "Premios con Vicerrectorado y empresas",
        "Cobertura institucional CEU Media",
      ],
    },
  ],
  keyStats: [
    { value: "75", label: "participantes seleccionados" },
    { value: "24h", label: "desarrollo intensivo" },
    { value: "5", label: "retos" },
    { value: "MVP", label: "prototipo funcional" },
  ],
  howItWorksSteps: [
    "Inscripcion y seleccion",
    "Formacion de equipos",
    "Asignacion de retos",
    "Build intensivo",
    "Entrega y hard freeze",
    "Pitch + demo en vivo",
    "Cierre y awards",
  ],
  howItWorksDetails: [
    "Seleccion de participantes del CEU con foco en ingenieria, datos, economia y marketing. Cupo inicial de 75 plazas con prioridad a perfiles que busquen experiencia practica en entorno real.",
    "La inscripcion puede ser con equipo ya formado o individual. Si no tienes equipo, se te asignara uno en el kickoff, con un maximo de cinco personas y mezcla de perfiles tecnicos y de negocio.",
    "Cada equipo elige empresa patrocinadora y recibe un reto asignado. El objetivo es resolver un problema real con un MVP funcional conectado a necesidades de mercado.",
    "24 horas de trabajo intensivo con bloques definidos, networking y mentoring. El desarrollo ocurre en aulas de trabajo con apoyo logistico y WiFi.",
    "Entrega en repo publico y hard freeze estricto: no se permiten commits ni cambios en repositorios, APIs o bases de datos despues de la hora limite.",
    "Presentacion en vivo con demo funcional y Q&A. El pitch deck debe entregarse en PDF en la raiz del repositorio.",
    "Cierre institucional con entrega de premios junto a Vicerrectorado y empresas. Se reconoce el trabajo y se potencia la visibilidad del evento.",
  ],
  rubricIntroTitle: "Rúbrica Oficial de Evaluación del Jurado (Sobre 100 Puntos)",
  rubricIntroText:
    "Instrucciones para el Jurado: Evalúe cada proyecto asignando una puntuación en las siguientes cuatro categorías. La puntuación máxima posible es de 100 puntos. En esta competición se prioriza que la solución responda fielmente a los requisitos del reto, la robustez tecnica y la credibilidad de la arquitectura propuesta en un contexto real. El codigo debe funcionar, pero no se espera un producto perfecto. La presentacion tambien es relevante, ya que el equipo debe ser capaz de explicar y defender su solucion.",
  rubric: [
    {
      category: "Adecuación al Reto y a la Empresa",
      maxPoints: 35,
      description:
        "Es el criterio mas importante. Se evalua hasta que punto la solucion responde a los requisitos del enunciado del reto y si encaja con el contexto real de la empresa patrocinadora. No se trata solo de tener una buena idea, sino de resolver exactamente el problema planteado.",
      levels: [
        {
          range: "0 - 12 pts",
          label: "Pobre",
          text:
            "La solucion ignora parte importante del enunciado o responde solo parcialmente al problema. El equipo ha reinterpretado el reto de forma demasiado libre.",
        },
        {
          range: "13 - 24 pts",
          label: "Bueno",
          text:
            "La propuesta responde correctamente al reto planteado, aunque algunos requisitos clave no estan completamente cubiertos o necesitarian bastante trabajo adicional para encajar en la empresa.",
        },
        {
          range: "25 - 35 pts",
          label: "Excelente",
          text:
            "La solucion responde claramente a los requisitos del reto. Se nota que el equipo ha entendido el problema real de la empresa. El encaje con su contexto operativo y de negocio es creible.",
        },
      ],
    },
    {
      category: "Arquitectura, Robustez y Escalabilidad",
      maxPoints: 35,
      description:
        "Se evalua la calidad de la arquitectura y si la solucion tendria sentido en un entorno real. No se trata solo de que funcione en una demo, sino de si el sistema podria crecer, mantenerse y operar en produccion.",
      levels: [
        {
          range: "0 - 12 pts",
          label: "Pobre",
          text:
            "Arquitectura improvisada o poco realista. Componentes mal justificados o sistema pensado unicamente para la demo.",
        },
        {
          range: "13 - 24 pts",
          label: "Bueno",
          text:
            "Arquitectura razonable con una base tecnica solida. El sistema podria funcionar en un entorno real, aunque habria que reforzar varios aspectos para soportar carga, mantenimiento o integracion.",
        },
        {
          range: "25 - 35 pts",
          label: "Excelente",
          text:
            "Arquitectura muy bien pensada. Tecnologias bien elegidas y justificadas. El diseno muestra claramente como el sistema podria escalar, integrarse y mantenerse como un producto real.",
        },
      ],
    },
    {
      category: "Implementación y Código",
      maxPoints: 15,
      description:
        "El codigo debe funcionar y demostrar que la solucion es tecnicamente viable. No se exige un producto completamente terminado, pero si un prototipo real que funcione durante la demo.",
      note:
        "Regla importante: si el prototipo no funciona durante la demo en directo, la puntuacion en esta categoria no puede superar los 5 puntos. No se aceptan videos de demostracion como sustituto de una demo funcional.",
      levels: [
        {
          range: "0 - 5 pts",
          label: "Pobre",
          text:
            "El prototipo no funciona correctamente, esta incompleto o apenas hay logica implementada.",
        },
        {
          range: "6 - 10 pts",
          label: "Bueno",
          text:
            "El prototipo funciona y demuestra las funcionalidades principales. El codigo cumple su objetivo aunque podria mejorar en estructura o calidad.",
        },
        {
          range: "11 - 15 pts",
          label: "Excelente",
          text:
            "Implementacion solida. Codigo claro, funcional y con una estructura razonable para un proyecto desarrollado en el tiempo disponible.",
        },
      ],
    },
    {
      category: "Pitch, Demo en Directo y Q&A",
      maxPoints: 15,
      description:
        "Se evalua la claridad de la presentacion y la capacidad del equipo para explicar y defender su solucion. Un buen proyecto tambien necesita ser entendido y vendido correctamente.",
      levels: [
        {
          range: "0 - 5 pts",
          label: "Pobre",
          text:
            "Presentacion desorganizada, problemas graves en la demo o respuestas poco claras durante el Q&A.",
        },
        {
          range: "6 - 10 pts",
          label: "Bueno",
          text:
            "Pitch claro, demo funcional y respuestas razonables a las preguntas del jurado.",
        },
        {
          range: "11 - 15 pts",
          label: "Excelente",
          text:
            "Presentacion muy clara y convincente. Demo fluida que demuestra las funcionalidades clave. El equipo defiende bien las decisiones tecnicas y de producto.",
        },
      ],
    },
  ],
  rulebook: {
    submissionDeadlineTime,
    pitchDuration,
    hardFreezeTime,
    sections: [
      {
        id: "elegibilidad",
        title: "Elegibilidad y participación",
        summary:
          "Inscripción individual o en equipos de cinco, elección de empresa y prohibición de conflictos de interés o asistencia externa.",
        items: [
          {
            text:
              "Formación y asignación de equipos: los participantes podrán inscribirse en equipos cerrados de cinco (5) personas o de forma individual, en cuyo caso la organización se encargará de agruparlos para conformar los equipos restantes. Una vez establecidos los grupos, cada equipo tendrá la oportunidad de elegir a qué empresa patrocinadora desea enfrentarse, aunque el reto específico y detallado no se desvelará hasta el día del evento.",
          },
          {
            text:
              "Conflicto de intereses: queda estrictamente prohibida la participación de cualquier persona vinculada a la organización del evento, incluyendo organizadores principales, voluntarios, miembros del jurado y mentores de las empresas.",
          },
          {
            text:
              "Prohibición de asistencia externa (la regla \"Sin Autores Fantasma\"): todo el desarrollo del proyecto, incluyendo programación, diseño UI/UX, depuración de errores y creación de recursos, debe ser ejecutado exclusivamente por los miembros registrados del equipo durante el periodo oficial del hackathon. El uso de colaboradores externos, revisiones de código a distancia, soporte algorítmico no autorizado o trabajo subcontratado está terminantemente prohibido y supondrá la descalificación inmediata.",
            highlight: true,
          },
        ],
      },
      {
        id: "proyecto",
        title: "Proyecto y desarrollo",
        summary:
          "Entrega de prototipo funcional con código desarrollado durante el hackathon y uso de FOSS únicamente como apoyo.",
        items: [
          {
            text:
              "Prototipo funcional: el objetivo principal es la entrega de un prototipo funcional. Aunque no se exige un acabado perfecto o listo para salir al mercado, la mecánica principal o la solución propuesta debe ser plenamente operativa.",
          },
          {
            text:
              "Originalidad del código: todo el código principal (core) debe escribirse durante el fin de semana del hackathon. Queda expresamente prohibido presentar proyectos ya existentes, utilizar el trabajo de otra persona o alterar meramente la estética de un repositorio existente (\"hacer un fork y cambiarle el color\").",
            highlight: true,
          },
          {
            text:
              "Herramientas de terceros y código abierto: se permite y fomenta el uso de frameworks, APIs y fragmentos de Software Libre y de Código Abierto (FOSS) para complementar los proyectos (por ejemplo, librerías OCR, bibliotecas de componentes de interfaz o APIs de mapas). Sin embargo, la lógica principal y la integración de la arquitectura deben ser creadas íntegramente por el equipo participante.",
          },
        ],
      },
      {
        id: "entrega",
        title: "Entrega y hard freeze",
        summary:
          "Repositorio público, hard freeze estricto sin cambios posteriores y pitch deck en PDF.",
        items: [
          {
            text:
              "Requisito del repositorio: todos los equipos deben entregar su proyecto final a través de un repositorio público de GitHub.",
            highlight: true,
          },
          {
            text:
              `Política de "bloqueo total" (hard freeze): la fecha y hora límite de entrega (domingo a las ${submissionDeadlineTime} h) es inamovible. Al llegar a este límite, todo el desarrollo debe detenerse por completo. El bloqueo se aplica a todos los niveles: queda estrictamente prohibido hacer commits en los repositorios, alterar servidores backend, modificar bases de datos en la nube (ej. Firebase), cambiar APIs externas en caliente o subir actualizaciones al código frontend ya desplegado. Cualquier modificación posterior detectada antes o durante la presentación conllevará penalizaciones graves o la descalificación directa.`,
            highlight: true,
          },
          {
            text:
              "Entrega del pitch deck: las presentaciones pueden diseñarse con cualquier software (ej. Canva, Google Slides, Figma). No obstante, la presentación final debe exportarse en PDF y subirse directamente a la carpeta raíz (root) del repositorio. No se aceptarán archivos PPTX ni enlaces web en directo.",
          },
        ],
      },
      {
        id: "pitch",
        title: "Pitch y demo en directo",
        summary:
          "Tiempo estricto y demostración en vivo obligatoria, sin vídeos pregrabados.",
        items: [
          {
            text:
              `Formato de la presentación: las presentaciones tienen un límite estricto de ${pitchDuration} para el pitch y la demostración del prototipo, seguidos de una sesión de preguntas y respuestas. Los límites de tiempo se aplicarán a rajatabla; se cortará el micrófono al agotarse el tiempo asignado.`,
          },
          {
            text:
              "Requisito de demostración en directo: los prototipos deben demostrarse en vivo. Los presentadores tendrán que navegar activamente por la aplicación y ejecutar el código durante el pitch. Quedan estrictamente prohibidas las demostraciones pregrabadas (ej. vídeos MP4) que simulen el funcionamiento. Los fallos técnicos durante la demo en directo se asumen como parte normal del proceso; el jurado espera evaluar software real, no humo (vaporware).",
            highlight: true,
          },
        ],
      },
      {
        id: "propiedad",
        title: "Propiedad intelectual y licencias",
        summary:
          "Publicación obligatoria del proyecto como open source bajo licencia MIT.",
        items: [
          {
            text:
              "Mandato de código abierto: para fomentar la innovación, evitar disputas entre los miembros del equipo y esquivar trampas legales complejas, todo el código y las soluciones presentadas en este hackathon deberán publicarse como Software de Código Abierto (OSS).",
            highlight: true,
          },
          {
            text:
              "La Licencia MIT: al enviar un proyecto a este hackathon, los equipos aceptan por defecto licenciar su repositorio bajo la Licencia MIT. Esto garantiza que los creadores conservan sus respectivos derechos de autor, al tiempo que otorgan al público (incluidas las empresas patrocinadoras, otros estudiantes y el público en general) el derecho sin restricciones a usar, modificar y distribuir el código.",
          },
        ],
      },
      {
        id: "conducta",
        title: "Código de conducta y régimen disciplinario",
        summary:
          "Régimen estricto frente a plagio, sabotaje, conducta inapropiada o incumplimiento de normas.",
        items: [
          {
            text:
              "El comité organizador se reserva el derecho absoluto e inapelable de penalizar o descalificar a cualquier individuo o equipo que sea sorprendido incurriendo en lo siguiente:",
          },
          {
            text:
              "Competencia desleal: plagio, presentación de código principal preescrito, vulneración de la política de \"bloqueo total\" o sabotaje del hardware o software de otros equipos.",
            highlight: true,
          },
          {
            text:
              "Toxicidad: acoso, discriminación o cualquier forma de comportamiento irrespetuoso hacia otros participantes, mentores, organizadores o personal del recinto.",
          },
          {
            text:
              "Incumplimiento de las normas: no respetar los formatos de entrega o cualquier intento deliberado de eludir la normativa aquí establecida.",
          },
        ],
      },
    ],
  },
  faq: [
    {
      question: "¿Quién puede participar?",
      answer:
        "Estudiantes seleccionados de perfiles técnicos y de negocio, con cupo inicial de 75 plazas.",
    },
    {
      question: "¿Necesito equipo previo?",
      answer:
        "No es obligatorio. Puedes inscribirte con tu equipo o individual; si no tienes, se te asignara uno al azar en el kickoff.",
    },
    {
      question: "¿Puedo reutilizar código open source?",
      answer:
        "Si, siempre que el repositorio sea publico y con licencia MIT, y que la logica principal sea creada por el equipo durante el hackathon. Consulta las [bases oficiales](/bases?tab=proyecto&highlight=1).",
    },
    {
      question: "¿Habrá mentoring?",
      answer:
        "Si, mentores de empresas acompanaran durante todo el build.",
    },
    {
      question: "¿Cómo se evalúa?",
      answer:
        "Aplicamos una rubrica ponderada centrada en adecuacion al reto, arquitectura, implementacion y pitch. Puedes revisar la seccion de [rubrica](/#rubrica).",
    },
    {
      question: "¿Cuál es el formato del pitch y la demo?",
      answer:
        "El pitch es en directo, con demo funcional y Q&A, dentro de un tiempo estricto. No se permiten demos pregrabadas. Ver detalles en [pitch y demo](/bases?tab=pitch&highlight=1).",
    },
    {
      question: "¿Qué ocurre si el prototipo falla en la demo?",
      answer:
        "Se espera una demo real; los fallos tecnicos forman parte del proceso. En la categoria de implementacion, un prototipo que no funcione limita la puntuacion maxima. Revisa la [rubrica](/#rubrica) para criterios completos.",
    },
    {
      question: "¿Cómo y cuándo se entrega el proyecto?",
      answer:
        "La entrega es por repositorio publico en GitHub y con hard freeze estricto en la hora limite. El pitch deck debe subirse en PDF a la raiz del repo. Consulta [entrega y hard freeze](/bases?tab=entrega&highlight=1).",
    },
    {
      question: "¿Se permite ayuda externa o revisiones remotas?",
      answer:
        "No. Todo el desarrollo debe realizarlo el equipo registrado durante el evento. La asistencia externa implica descalificacion inmediata. Mas info en [elegibilidad](/bases?tab=elegibilidad&highlight=1).",
    },
    {
      question: "¿Qué licencia debe tener el proyecto?",
      answer:
        "La licencia obligatoria es MIT y el proyecto debe publicarse como open source. Consulta [propiedad intelectual y licencias](/bases?tab=propiedad&highlight=1).",
    },
    {
      question: "¿Qué pasa si se incumplen las normas?",
      answer:
        "El comite puede penalizar o descalificar por plagio, sabotaje o conductas inapropiadas. Ver [codigo de conducta](/bases?tab=conducta&highlight=1).",
    },
  ],
  sponsors: [
    { name: "Sponsor A" },
    { name: "Sponsor B" },
    { name: "Sponsor C" },
    { name: "Sponsor D" },
  ],
  challengeCategories: [
    {
      title: "Smart Campus",
      description: "Experiencias conectadas para estudiantes y staff.",
      roles: ["Frontend", "Backend", "UX", "Business"],
    },
    {
      title: "FinTech Responsable",
      description: "Herramientas para educación financiera y transparencia.",
      roles: ["Data", "Backend", "UX", "Business"],
    },
    {
      title: "Salud Digital",
      description: "Soluciones para bienestar y prevención.",
      roles: ["Frontend", "Data", "UX", "Business"],
    },
    {
      title: "IA para Operaciones",
      description: "Automatización y optimización de procesos.",
      roles: ["Backend", "Data", "Frontend"],
    },
    {
      title: "Sostenibilidad",
      description: "Medición y acción sobre impacto ambiental.",
      roles: ["Data", "UX", "Business"],
    },
  ],
};
