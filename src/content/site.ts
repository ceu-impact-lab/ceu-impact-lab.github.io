const hardFreezeTime = "12:30";
const submissionDeadlineTime = "12:30";
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
    primary: "#003CA3",
    secondary: "#070850",
  },
  scheduleBlocks: [
    {
      day: "Sabado",
      date: "25 Abril",
      label: "Kickoff y build",
      items: [
        "09:00-09:30 Recepcion de participantes y empresas",
        "09:30-10:30 Presentacion del evento y retos",
        "10:30-14:00 Bloque de trabajo I",
        "14:00-15:00 Comida + networking",
        "15:00-19:00 Bloque de trabajo II",
        "19:00-20:00 Cierre del dia + networking",
      ],
    },
    {
      day: "Domingo",
      date: "26 Abril",
      label: "Pitches y cierre",
      items: [
        "09:00-09:30 Llegada de participantes",
        "09:30-12:30 Bloque de trabajo final",
        "12:30 Hard freeze y cierre de entregas",
        "13:00-14:00 Presentaciones de proyectos",
        "14:00-15:00 Cierre en Aula Magna",
      ],
    },
    {
      day: "Martes",
      date: "28 Abril",
      label: "Awards institucionales",
      items: [
        "Acto oficial de 1h-1:30h",
        "Premios con Vicerrectorado y empresas",
        "Cobertura institucional CEU Media",
      ],
    },
  ],
  keyStats: [
    { value: "50", label: "participantes seleccionados" },
    { value: "48h", label: "desarrollo intensivo" },
    { value: "1", label: "campus" },
    { value: "MVP", label: "prototipo funcional" },
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
  howItWorksDetails: [
    "Seleccion de participantes del CEU, con foco en ingenieria, datos, economia y marketing. El cupo inicial es de 50 plazas y se da prioridad a perfiles que quieran una primera experiencia practica en entorno real.",
    "Los equipos se asignan aleatoriamente en el kickoff, con un maximo de cinco personas. La mezcla de perfiles tecnicos y de negocio busca simular equipos reales y favorecer el aprendizaje transversal.",
    "Empresas colaboradoras presentan retos de su sector y cada equipo recibe uno asignado. El objetivo es resolver un problema real con un MVP funcional, conectado a necesidades de mercado.",
    "Dos dias de trabajo intensivo con bloques definidos, espacios de networking y mentoring de representantes tecnicos y RRHH. El desarrollo sucede en aulas de trabajo con apoyo logistico y WiFi.",
    "El domingo a las 12:30 se aplica el hard freeze: se detiene el codigo y no se permiten commits ni cambios en repositorios, APIs o bases de datos. Todo se entrega via repo publico.",
    "Cada equipo presenta en vivo su prototipo con demo funcional y una sesion de preguntas. La presentacion se entrega en PDF dentro del repositorio y se valora claridad, viabilidad y ejecucion.",
    "Cierre institucional el martes con entrega de premios junto a Vicerrectorado y empresas. Se reconoce el trabajo, se potencia la empleabilidad y se refuerza la visibilidad del evento.",
  ],
  rubric: [
    { category: "Innovacion y valor de la idea", weight: 30 },
    { category: "Dificultad tecnica y arquitectura", weight: 30 },
    { category: "Adecuacion al reto y a la empresa", weight: 25 },
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
          { text: "Participantes asignados aleatoriamente en equipos de hasta 5." },
          { text: "Cada equipo recibe un reto asignado de una empresa patrocinadora." },
        ],
      },
      {
        id: "conflictos",
        title: "Conflicto de interes",
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
          { text: "El codigo principal debe escribirse durante el hackathon." },
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
          { text: "No se aceptan commits ni cambios posteriores (repos, APIs, BD)." },
        ],
      },
      {
        id: "entrega",
        title: "Entrega",
        items: [
          { text: "Entrega unica mediante repo publico." },
          {
            text: `La hora limite de entrega es ${submissionDeadlineTime} del domingo.`,
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
        title: "Codigo de conducta",
        items: [
          { text: "Respeto absoluto a participantes, mentores y staff." },
          { text: "Plagio, sabotaje o toxicidad conlleva descalificacion." },
        ],
      },
    ],
  },
  faq: [
    {
      question: "Quien puede participar?",
      answer:
        "Estudiantes seleccionados de perfiles tecnicos y de negocio, con cupo inicial de 50 plazas.",
    },
    {
      question: "Necesito equipo previo?",
      answer:
        "No. Los equipos se asignan aleatoriamente en el kickoff.",
    },
    {
      question: "Puedo reutilizar codigo open source?",
      answer:
        "Si, siempre que el repositorio sea publico y con licencia MIT.",
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
