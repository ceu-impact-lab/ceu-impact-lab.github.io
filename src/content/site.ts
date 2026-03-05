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
  rubric: [
    { category: "Innovación y valor de la idea", weight: 30 },
    { category: "Dificultad técnica y arquitectura", weight: 30 },
    { category: "Adecuación al reto y a la empresa", weight: 25 },
    { category: "Pitch, demo y Q&A", weight: 15 },
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
