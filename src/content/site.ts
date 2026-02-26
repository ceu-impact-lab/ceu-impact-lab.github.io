const hardFreezeTime = "XX:XX";
const submissionDeadlineTime = "XX:XX";
const pitchDuration = "X/Y minutos";

export const siteContent = {
  eventName: "CEU Impact Lab",
  dates: "25-26 Abril 2026",
  awardsDate: "Martes 28 Abril 2026",
  location: "Campus Monteprincipe, CEU Madrid",
  primaryCTAs: {
    studentRegistrationUrl: "",
    companyContactUrl: "mailto:impactlab@ceu.es",
  },
  themeTokens: {
    primary: "#0B57D0",
    secondary: "#1B5E20",
  },
  scheduleBlocks: [
    {
      day: "Sabado",
      date: "25 Abril",
      label: "Kickoff y definicion de equipos",
      items: [
        "Bienvenida y presentacion de retos",
        "Formacion de equipos multidisciplinares",
        "Mentorias iniciales con empresas",
        "Inicio del desarrollo",
      ],
    },
    {
      day: "Domingo",
      date: "26 Abril",
      label: "Build + entregas",
      items: [
        "Trabajo intensivo y mentoring",
        "Hard freeze y cierre de repositorios",
        "Preparacion de pitch y demo",
      ],
    },
    {
      day: "Martes",
      date: "28 Abril",
      label: "Awards institucionales",
      items: [
        "Demo day y presentaciones finales",
        "Deliberacion del jurado",
        "Premios y cierre institucional",
      ],
    },
  ],
  keyStats: [
    { value: "50", label: "plazas iniciales (escalable)" },
    { value: "5", label: "maximo por equipo" },
    { value: "2", label: "dias de build" },
    { value: "MVP", label: "entregable funcional" },
  ],
  howItWorksSteps: [
    "Aplica y seleccion",
    "Formacion de equipos",
    "Presentacion de retos",
    "Build intensivo",
    "Hard freeze",
    "Pitch + demo",
    "Awards",
  ],
  rubric: [
    { category: "Impacto y viabilidad", weight: 30 },
    { category: "Innovacion", weight: 30 },
    { category: "Ejecucion tecnica", weight: 25 },
    { category: "Presentacion", weight: 15 },
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
          { text: "Participacion por invitacion o seleccion previa." },
          { text: "Equipos de hasta 5 personas, multidisciplinares." },
        ],
      },
      {
        id: "conflictos",
        title: "Conflicto de interes",
        items: [
          { text: "Declarar relaciones directas con empresas patrocinadoras." },
          { text: "El jurado podra aplicar recusacion si procede." },
        ],
      },
      {
        id: "asistencia",
        title: "Asistencia externa",
        items: [
          { text: "No se permite asistencia externa al equipo.", highlight: true },
          { text: "Mentores oficiales son la unica ayuda permitida." },
        ],
      },
      {
        id: "entregable",
        title: "Entregable funcional",
        items: [
          { text: "Se requiere un prototipo funcional (MVP)." },
          { text: "La demo debe ser en vivo, no grabada.", highlight: true },
        ],
      },
      {
        id: "originalidad",
        title: "Originalidad",
        items: [
          { text: "Trabajo desarrollado durante el evento." },
          { text: "Se permite reutilizar piezas open source.", highlight: true },
        ],
      },
      {
        id: "open-source",
        title: "Open source y repositorio",
        items: [
          { text: "Repositorio GitHub publico obligatorio.", highlight: true },
          { text: "Licencia MIT obligatoria.", highlight: true },
          { text: "Incluir pitch en PDF en la raiz del repo." },
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
          { text: "No se aceptan commits posteriores." },
        ],
      },
      {
        id: "entrega",
        title: "Entrega",
        items: [
          { text: "Entrega unica mediante repo publico." },
          {
            text: `La hora limite de entrega es ${submissionDeadlineTime}.`,
          },
        ],
      },
      {
        id: "pitch",
        title: "Pitch",
        items: [
          {
            text: `Pitch de ${pitchDuration} incluyendo demo en vivo.`,
            highlight: true,
          },
        ],
      },
      {
        id: "conducta",
        title: "Codigo de conducta",
        items: [
          { text: "Respeto, inclusion y colaboracion." },
          { text: "Incumplimientos pueden resultar en descalificacion." },
        ],
      },
    ],
  },
  faq: [
    {
      question: "Quien puede participar?",
      answer:
        "Estudiantes seleccionados de perfiles tecnicos y de negocio, con cupos iniciales de 50 plazas.",
    },
    {
      question: "Necesito equipo previo?",
      answer:
        "No. Facilitamos dinamicas para formar equipos balanceados el primer dia.",
    },
    {
      question: "Puedo reutilizar codigo open source?",
      answer:
        "Si, siempre que se declare y se mantenga el repositorio publico con licencia MIT.",
    },
    {
      question: "Habra mentoring?",
      answer:
        "Si, mentores de empresas acompanaran durante todo el build.",
    },
    {
      question: "Como se evalua?",
      answer:
        "Aplicamos una rubrica ponderada centrada en impacto, innovacion, ejecucion y presentacion.",
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
      description: "Herramientas para educacion financiera y transparencia.",
      roles: ["Data", "Backend", "UX", "Business"],
    },
    {
      title: "Salud Digital",
      description: "Soluciones para bienestar y prevencion.",
      roles: ["Frontend", "Data", "UX", "Business"],
    },
    {
      title: "IA para Operaciones",
      description: "Automatizacion y optimizacion de procesos.",
      roles: ["Backend", "Data", "Frontend"],
    },
    {
      title: "Sostenibilidad",
      description: "Medicion y accion sobre impacto ambiental.",
      roles: ["Data", "UX", "Business"],
    },
  ],
};
