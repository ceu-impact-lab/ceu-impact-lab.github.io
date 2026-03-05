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
    "Instrucciones para el Jurado: Evalúe cada proyecto asignando una puntuación en las siguientes cuatro categorías. La puntuación máxima posible es de 100 puntos. Se busca un equilibrio entre la excelencia técnica, la viabilidad real de la idea y la capacidad de comunicación del equipo.",
  rubric: [
    {
      category: "Innovación y Valor de la Idea",
      maxPoints: 30,
      description:
        "Se evalúa la originalidad de la solución propuesta y si realmente resuelve el \"pain point\" (problema) planteado de forma inteligente.",
      levels: [
        {
          range: "0 - 10 pts",
          label: "Pobre",
          text:
            "La idea es un clon de algo que ya existe o no resuelve el problema central del reto.",
        },
        {
          range: "11 - 20 pts",
          label: "Bueno",
          text:
            "La idea es sólida y útil, aunque algo conservadora o predecible.",
        },
        {
          range: "21 - 30 pts",
          label: "Excelente",
          text:
            "Solución altamente creativa, \"fuera de la caja\". Aporta un valor diferencial altísimo que a la empresa no se le había ocurrido.",
        },
      ],
    },
    {
      category: "Dificultad Técnica y Arquitectura",
      maxPoints: 30,
      description:
        "El código importa. Se evalúa la complejidad del desarrollo, las tecnologías elegidas y si el sistema está pensado para escalar, no solo para sobrevivir a la demo.",
      levels: [
        {
          range: "0 - 10 pts",
          label: "Pobre",
          text:
            "Desarrollo muy superficial. Casi todo es frontend sin lógica detrás, o la arquitectura elegida no tiene ningún sentido para el problema.",
        },
        {
          range: "11 - 20 pts",
          label: "Bueno",
          text:
            "El prototipo tiene una base técnica decente, uso correcto de APIs y bases de datos, pero la arquitectura podría sufrir si se escala a miles de usuarios.",
        },
        {
          range: "21 - 30 pts",
          label: "Excelente",
          text:
            "Código limpio, stack tecnológico perfectamente justificado. Han montado una arquitectura robusta (backend, frontend, BD, integración de terceros) digna de un proyecto real.",
        },
      ],
    },
    {
      category: "Adecuación al Reto y a la Empresa",
      maxPoints: 25,
      description:
        "¿Han escuchado lo que pedía el patrocinador? Se evalúa si la solución se alinea con los valores de la empresa y si sería viable comercialmente.",
      levels: [
        {
          range: "0 - 8 pts",
          label: "Pobre",
          text:
            "El equipo ha hecho \"lo que le apetecía\" ignorando gran parte de los requisitos o la cultura de la empresa patrocinadora.",
        },
        {
          range: "9 - 17 pts",
          label: "Bueno",
          text:
            "Resuelve el reto de la empresa, pero requeriría bastantes adaptaciones para ser viable económicamente o encajar en su modelo de negocio.",
        },
        {
          range: "18 - 25 pts",
          label: "Excelente",
          text:
            "Encaje perfecto. La empresa podría coger este prototipo mañana mismo, inyectarle presupuesto y tendría todo el sentido comercial y estratégico del mundo.",
        },
      ],
    },
    {
      category: "Pitch, Demo en Directo y Q&A",
      maxPoints: 15,
      description:
        "Saber venderlo es vital. Se evalúa la claridad de la presentación, que la demo técnica funcione y cómo defienden el proyecto ante las preguntas.",
      levels: [
        {
          range: "0 - 5 pts",
          label: "Pobre",
          text:
            "Pitch desorganizado, se han pasado de tiempo o el prototipo ha crasheado de forma catastrófica durante la demo. Respuestas muy flojas en el Q&A.",
        },
        {
          range: "6 - 10 pts",
          label: "Bueno",
          text:
            "Presentación clara. La demo ha funcionado (con algún bug menor aceptable). Han sabido responder a las preguntas del jurado con coherencia.",
        },
        {
          range: "11 - 15 pts",
          label: "Excelente",
          text:
            "Pitch nivel startup buscando inversión. Control perfecto del tiempo, demo fluida demostrando las core features y defensa brillante y segura durante las preguntas del jurado.",
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
