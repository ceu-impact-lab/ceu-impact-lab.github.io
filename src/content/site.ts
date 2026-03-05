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
    "Aplica y selección",
    "Formación de equipos",
    "Presentación de retos",
    "Build intensivo",
    "Hard freeze",
    "Pitch + demo",
    "Awards",
  ],
  howItWorksDetails: [
    "Selección de participantes del CEU, con foco en ingeniería, datos, economía y marketing. El cupo inicial es de 50 plazas y se da prioridad a perfiles que quieran una primera experiencia práctica en entorno real.",
    "La inscripción puede ser con equipo ya formado o individual. Si no tienes equipo, se te asignará uno al azar en el kickoff, con un máximo de cinco personas. La mezcla de perfiles técnicos y de negocio busca simular equipos reales y favorecer el aprendizaje transversal.",
    "Empresas colaboradoras presentan retos de su sector y cada equipo recibe uno asignado. El objetivo es resolver un problema real con un MVP funcional, conectado a necesidades de mercado.",
    "24 horas de trabajo intensivo con bloques definidos, espacios de networking y mentoring de representantes técnicos y RRHH. El desarrollo sucede en aulas de trabajo con apoyo logístico y WiFi.",
    "El domingo a las 10:00 se aplica el hard freeze: se detiene el código y no se permiten commits ni cambios en repositorios, APIs o bases de datos. Todo se entrega vía repo público.",
    "Cada equipo presenta en vivo su prototipo con demo funcional y una sesión de preguntas. La presentación se entrega en PDF dentro del repositorio y se valora claridad, viabilidad y ejecución.",
    "Cierre institucional el martes con entrega de premios junto a Vicerrectorado y empresas. Se reconoce el trabajo, se potencia la empleabilidad y se refuerza la visibilidad del evento.",
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
        title: "Elegibilidad",
        items: [
          {
            text:
              "Inscripción individual o con equipo ya formado, con un máximo de 5 personas.",
          },
          { text: "Si no tienes equipo, se te asignará uno al azar." },
          { text: "Cada equipo recibe un reto asignado de una empresa patrocinadora." },
        ],
      },
      {
        id: "conflictos",
        title: "Conflicto de interés",
        items: [
          {
            text:
              "Organizadores, voluntarios, jurado y mentores de empresa no pueden competir.",
          },
        ],
      },
      {
        id: "asistencia",
        title: "Asistencia externa",
        items: [
          { text: "Prohibida toda asistencia externa al equipo.", highlight: true },
          { text: "No se permiten revisiones remotas ni trabajo subcontratado." },
        ],
      },
      {
        id: "entregable",
        title: "Entregable funcional",
        items: [
          { text: "Se requiere un prototipo funcional (MVP) operativo." },
          { text: "La demo debe ser en vivo, no grabada.", highlight: true },
        ],
      },
      {
        id: "originalidad",
        title: "Originalidad",
        items: [
          { text: "El código principal debe escribirse durante el hackathon." },
          {
            text:
              "Se permite usar frameworks, APIs y software open source como apoyo.",
            highlight: true,
          },
        ],
      },
      {
        id: "open-source",
        title: "Open source y repositorio",
        items: [
          { text: "Repositorio GitHub público obligatorio.", highlight: true },
          { text: "Licencia MIT obligatoria.", highlight: true },
          { text: "Incluir pitch en PDF en la raíz del repo." },
        ],
      },
      {
        id: "freeze",
        title: "Hard freeze",
        items: [
          {
            text: `Hard freeze a las ${hardFreezeTime} del domingo.`,
            highlight: true,
          },
          { text: "No se aceptan commits ni cambios posteriores (repos, APIs, BD)." },
        ],
      },
      {
        id: "entrega",
        title: "Entrega",
        items: [
          { text: "Entrega única mediante repo público." },
          {
            text: `La hora límite de entrega es ${submissionDeadlineTime} del domingo.`,
          },
        ],
      },
      {
        id: "pitch",
        title: "Pitch",
        items: [
          {
            text: `Pitch de ${pitchDuration} + demo en vivo + Q&A.`,
            highlight: true,
          },
        ],
      },
      {
        id: "conducta",
        title: "Código de conducta",
        items: [
          { text: "Respeto absoluto a participantes, mentores y staff." },
          { text: "Plagio, sabotaje o toxicidad conlleva descalificación." },
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
        "Sí, siempre que el repositorio sea público y con licencia MIT.",
    },
    {
      question: "¿Habrá mentoring?",
      answer:
        "Sí, mentores de empresas acompañarán durante todo el build.",
    },
    {
      question: "¿Cómo se evalúa?",
      answer:
        "Aplicamos una rúbrica ponderada centrada en impacto, innovación, ejecución y presentación.",
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
