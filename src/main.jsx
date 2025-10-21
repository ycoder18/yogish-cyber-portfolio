import React, { useState, useEffect, useCallback, useRef } from 'react';
// import ReactDOM from 'react-dom/client'; // Eemaldatud: See import põhjustab arenduskeskkonnas vea

// Chart.js on eeldatavasti globaalselt kättesaadav (või installitud package.json kaudu).

const NEON_BLUE = '#4AD9E8';
const NEON_PURPLE = '#B45FE6';
const NEON_PINK = '#FF6B8B';

// --- DATA STRUCTURES ---

const NAV_ITEMS = [
  { id: 'about', label: 'Minust' }, // Minust
  { id: 'projects', label: 'Projektid' }, // Projektid
  { id: 'skills', label: 'Oskuste Maatriks' }, // Oskuste Maatriks
  { id: 'experience', label: 'Töökogemus' }, // Töökogemus
  { id: 'certifications', label: 'Sertifikaadid' }, // Sertifikaadid
  { id: 'contact', label: 'Kontakt' }, // Kontakt
];

const SKILLS_DATA = {
  core: ['Python', 'SQL', 'ETL', 'BigQuery', 'ML', 'Tableau'],
  languages: [
    { name: 'Python', level: 95, color: NEON_BLUE },
    { name: 'SQL', level: 90, color: NEON_BLUE },
    { name: 'Tableau/PBI', level: 88, color: NEON_PURPLE },
    { name: 'ETL/Pipelines', level: 85, color: NEON_PURPLE },
  ],
  tools: [
    { name: 'GCP/BigQuery', level: 92, color: NEON_PINK },
    { name: 'Pandas/NumPy', level: 90, color: NEON_BLUE },
    { name: 'Scikit-Learn', level: 85, color: NEON_PURPLE },
    { name: 'Feature Eng.', level: 82, color: NEON_PINK },
  ]
};

const GITHUB_HANDLE = 'ycoder18';
const LINKEDIN_HANDLE = 'yogish-bakshi'; 
const EMAIL_CONTACT = 'contact@Yogish';

// Custom Icon for Data Warehouse (Server/Database Rack)
const ServerIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6" y1="6" y2="6"/><line x1="6" x2="6" y1="18" y2="18"/></svg>
);

const PROJECTS_DATA = [
  {
    title: 'Healthcare Insurance Premium Prediction',
    desc: 'Built a predictive machine learning model (Random Forest, XGBoost) on 100k+ records. Developed a Streamlit web app for real-time predictions and visualizations.',
    tech: 'Python, ML (XGBoost/GBM), Streamlit, EDA',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 0-8 4v7.35a1 1 0 0 0 .5.87l7 4.3a1 1 0 0 0 1 0l7-4.3a1 1 0 0 0 .5-.87V6a10 10 0 0 0-8-4z" /><path d="M12 2v20" /></svg>
    ),
    link: `https://github.com/${GITHUB_HANDLE}`, 
  },
  {
    title: 'Data Warehouse / Analytics (SQL Server)',
    desc: 'Built SQL Server ETL pipelines for ERP/CRM CSV data. Modeled a star schema and performed advanced SQL queries to support executive dashboards and insights.',
    tech: 'SQL Server, ETL, Star Schema, Advanced SQL',
    icon: <ServerIcon />,
    link: `https://github.com/${GITHUB_HANDLE}`,
  },
  {
    title: 'Wisdom Pets Digital Transformation',
    desc: 'Migrated and modeled data in BigQuery. Executed analytical SQL queries, built Looker Studio dashboards, and created business reports to support decision-making.',
    tech: 'BigQuery, SQL, Looker Studio, GCP',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 20v-9" /><path d="M16 16l-4 4-4-4" /></svg>
    ),
    link: `https://github.com/${GITHUB_HANDLE}`,
  },
  {
    title: 'Sales Performance Reporting',
    desc: 'Developed SQL Server ETL pipelines and star schema for ERP/CRM data. Delivered Tableau dashboards with sales insights and profitability recommendations.',
    tech: 'SQL, Tableau, ETL, Excel',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7-7.8 7.8" /></svg>
    ),
    link: `https://github.com/${GITHUB_HANDLE}`,
  },
];

// Experience and Education only (Certificates moved to CERTIFICATIONS_DATA)
const EXPERIENCE_EDUCATION_DATA = [
    {
      type: 'Kogemus', // Kogemus
      title: 'Uurimisanalüütik', // Uurimisanalüütik
      institution: 'Humanity Pathways Global (Michigan, USA)',
      time: 'Apr 2025 - Present',
      desc: 'Viis läbi annetaja/kliendi trendianalüüsi veebipõhiste andmebaaside abil. Lõi Looker Studio armatuurlaudu ja parandas teavitusstrateegiaid.', // Viis läbi annetaja/kliendi trendianalüüsi veebipõhiste andmebaaside abil. Lõi Looker Studio armatuurlaudu ja parandas teavitusstrateegiaid.
      color: NEON_PINK,
    },
    {
      type: 'Kogemus', // Kogemus
      title: 'Vabakutseline Andmeanalüütik', // Vabakutseline Andmeanalüütik
      institution: 'Global Clients (Remote)',
      time: 'Feb 2022 - Apr 2024',
      desc: 'Pakkus analüütilisi lahendusi, ehitas automatiseeritud Tableau/Power BI armatuurlaudu ning arendas SQL/Pythoni andmetorusid trendianalüüsiks.', // Pakkus analüütilisi lahendusi, ehitas automatiseeritud Tableau/Power BI armatuurlaudu ning arendas SQL/Pythoni andmetorusid trendianalüüsiks.
      color: NEON_PURPLE,
    },
    {
      type: 'Kogemus', // Kogemus
      title: 'Andmeanalüütiku Praktikant', // Andmeanalüütiku Praktikant
      institution: 'Sarvagya Institute (New Delhi, India)',
      time: 'Jul 2024 - Sep 2024',
      desc: 'Puhastas ja teisendas institutsionaalseid andmeid Pythoni/SQL-i abil. Automatiseeris KPI aruandlust Power BI-s strateegiliseks otsustamiseks.', // Puhastas ja teisendas institutsionaalseid andmeid Pythoni/SQL-i abil. Automatiseeris KPI aruandlust Power BI-s strateegiliseks otsustamiseks.
      color: NEON_BLUE,
    },
    {
      type: 'Akadeemiline', // Akadeemiline
      title: 'Arvutirakenduste bakalaureus (8.88 GPA)', // Arvutirakenduste bakalaureus (8.88 GPA)
      institution: 'Guru Gobind Singh Indraprastha University',
      time: '2022-2025',
      desc: 'Saavutas silmapaistva akadeemilise tulemuse **8.88 GPA**-ga. Keskendumine arvutirakendustele, tugev alus kodeerimises ja algoritmides.', // Saavutas silmapaistva akadeemilise tulemuse **8.88 GPA**-ga. Keskendumine arvutirakendustele, tugev alus kodeerimises ja algoritmides.
      color: NEON_BLUE,
    },
];

const CERTIFICATIONS_DATA = [
    {
        title: 'Advanced SQL',
        issuer: 'HackerRank',
        desc: 'Näitas eksperttasemel oskusi keeruliste SQL-päringute ja andmebaasi manipuleerimise osas.', // Näitas eksperttasemel oskusi keeruliste SQL-päringute ja andmebaasi manipuleerimise osas.
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 17h-8"/><path d="M21 4H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/><path d="M13 10V4"/></svg>
        ),
        color: NEON_BLUE,
    },
    {
        title: 'Career Essentials in Data Analyst',
        issuer: 'Microsoft & LinkedIn',
        desc: 'Lõpetas spetsiaalsed moodulid, mis hõlmavad professionaalse andmeanalüütiku rolli jaoks vajalikke põhioskusi ja tööriistu.', // Lõpetas spetsiaalsed moodulid, mis hõlmavad professionaalse andmeanalüütiku rolli jaoks vajalikke põhioskusi ja tööriistu.
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="4"/><path d="M2 17h20"/><path d="M6 13l2 4 4-4 2 4 4-4 2 4"/></svg>
        ),
        color: NEON_PURPLE,
    },
    {
        title: 'Career Essentials in Generative AI',
        issuer: 'Microsoft & LinkedIn',
        desc: 'Sertifitseeritud generatiivse tehisintellekti alustes ja praktilistes rakendustes.', // Sertifitseeritud generatiivse tehisintellekti alustes ja praktilistes rakendustes.
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="4"/><path d="M2 17h20"/><path d="M6 13l2 4 4-4 2 4 4-4 2 4"/></svg>
        ),
        color: NEON_PINK,
    },
    {
        title: 'Data Science Virtual Internship',
        issuer: 'Quantum, Forage',
        desc: 'Rakendas andmeteaduse põhimõtteid simuleeritud korporatiivses keskkonnas, keskendudes reaalsetele projektidele.', // Rakendas andmeteaduse põhimõtteid simuleeritud korporatiivses keskkonnas, keskendudes reaalsetele projektidele.
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 0-7 7c0 2.8 2.2 5 5 5v5"/><path d="M12 22a7 7 0 0 0 7-7c0-2.8-2.2-5-5-5v-5"/></svg>
        ),
        color: NEON_BLUE,
    },
    {
        title: 'Data Science Job Simulation',
        issuer: 'British Airways, Forage',
        desc: 'Lõpetas spetsiaalsed töösimulatsioonid, mis hõlmasid andmeanalüüsi ja strateegilist probleemide lahendamist.', // Lõpetas spetsiaalsed töösimulatsioonid, mis hõlmasid andmeanalüüsi ja strateegilist probleemide lahendamist.
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3 7 10 7 10-7 10-7-3-7-10-7-10 7-10 7"/><circle cx="12" cy="12" r="3"/></svg>
        ),
        color: NEON_PINK, // Changed color for visual variety
    },
];


// --- UTILITY COMPONENTS & CSS (React, Tailwind, Inline CSS) ---

const customStyles = `
  /* Define custom fonts, prioritizing sleek sans-serif */
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@400;600&display=swap');

  .font-orbitron { font-family: 'Orbitron', sans-serif; }
  .font-rajdhani { font-family: 'Rajdhani', sans-serif; }

  /* Keyframes for the pulsing neon glow effect */
  @keyframes neon-glow-pulse {
    0%, 100% {
      box-shadow: 0 0 5px ${NEON_BLUE}, 0 0 10px ${NEON_PURPLE}, 0 0 15px ${NEON_BLUE};
    }
    50% {
      box-shadow: 0 0 10px ${NEON_PURPLE}, 0 0 20px ${NEON_PINK}, 0 0 30px ${NEON_PURPLE};
    }
  }

  /* Keyframes for the code stream background */
  @keyframes data-stream {
    from { background-position: 0 0; }
    to { background-position: -100px -100px; }
  }

  /* Keyframes for simple up-down float (for AI Assistant) */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }

  /* Apply glow to text and interactive elements */
  .text-neon-blue { color: ${NEON_BLUE}; }
  .text-neon-purple { color: ${NEON_PURPLE}; }
  .text-neon-pink { color: ${NEON_PINK}; }

  .neon-border {
    border: 1px solid ${NEON_BLUE};
    box-shadow: 0 0 5px ${NEON_BLUE};
    transition: all 0.3s ease;
  }
  .neon-border:hover {
    border-color: ${NEON_PINK};
    box-shadow: 0 0 15px ${NEON_PINK};
  }

  .glass-panel {
    background: rgba(10, 15, 30, 0.6); /* Dark semi-transparent background */
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(74, 217, 232, 0.2); /* Neon Blue thin border */
    border-radius: 12px;
    transition: all 0.5s ease;
    animation: neon-glow-pulse 5s infinite alternate; /* Soft pulsing glow */
  }

  .data-bg {
    background: #000000;
    background-image: radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0),
                      radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0);
    background-size: 10px 10px;
    background-position: 0 0, 5px 5px;
    animation: data-stream 60s linear infinite;
  }
`;

const GlassPanel = ({ children, className = '' }) => (
  <div className={`glass-panel p-6 sm:p-8 ${className}`}>
    {children}
  </div>
);

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="cursor-pointer p-3 rounded-full bg-neon-purple/80 hover:bg-neon-purple animation duration-300"
        onClick={() => setIsOpen(!isOpen)}
        style={{ animation: 'float 3s ease-in-out infinite', boxShadow: '0 0 15px #FF6B8B' }}
      >
        {/* Simple AI/Robot Icon (SVG) */}
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={NEON_BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
          <path d="M8 8V6a4 4 0 0 1 8 0v2" />
          <circle cx="12" cy="14" r="2" fill={NEON_BLUE} />
        </svg>
      </div>

      {isOpen && (
        <GlassPanel className="absolute bottom-16 right-0 w-64 p-4 text-sm font-rajdhani border-l-4 border-neon-blue">
          <p className="text-neon-blue text-sm mb-2 font-bold">AURA: AI Navigaator</p> {/* AI Navigaator */}
          <p className="text-gray-200">
            Konnichiwa! Mina olen **AURA**. Avastame Yogishi andmeuniversumit 🌌. Kuidas saan Sinu päringut aidata? {/* Konnichiwa! Mina olen **AURA**. Avastame Yogishi andmeuniversumit 🌌. Kuidas saan Sinu päringut aidata? */}
          </p>
          <button className="mt-3 text-xs text-neon-pink hover:underline" onClick={() => setIsOpen(false)}>
            Sulge Protokoll {/* Sulge Protokoll */}
          </button>
        </GlassPanel>
      )}
    </div>
  );
};


// --- CHART INITIALIZATION ---
// Note: Chart.js global definition is assumed to be available from the environment.
const useSkillRadarChart = (chartRef) => {
  useEffect(() => {
    if (!chartRef.current || typeof window.Chart === 'undefined') return;

    const ctx = chartRef.current.getContext('2d');

    const chartData = {
      labels: SKILLS_DATA.languages.map(s => s.name).concat(SKILLS_DATA.tools.map(s => s.name)),
      datasets: [
        {
          label: 'Andmeekspertiis (%)', // Andmeekspertiis (%)
          data: SKILLS_DATA.languages.map(s => s.level).concat(SKILLS_DATA.tools.map(s => s.level)),
          backgroundColor: `${NEON_BLUE}40`, // 40 is opacity
          borderColor: NEON_BLUE,
          pointBackgroundColor: NEON_PINK,
          pointBorderColor: '#0F172A',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: NEON_PINK,
          borderWidth: 2,
        },
      ],
    };

    // Destroy existing chart instance if it exists
    if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
    }

    chartRef.current.chartInstance = new window.Chart(ctx, {
      type: 'radar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scale: {
          ticks: {
            beginAtZero: true,
            max: 100,
            stepSize: 25,
            color: '#94a3b8',
            backdropColor: 'transparent',
          },
          grid: {
            color: 'rgba(74, 217, 232, 0.2)',
          },
          angleLines: {
            color: 'rgba(74, 217, 232, 0.3)',
          },
          pointLabels: {
            color: NEON_PURPLE,
            font: { size: 14, family: 'Rajdhani' },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

  }, [chartRef]);
};


// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const chartRef = useRef(null);

  // Custom hook usage for Chart.js initialization
  useSkillRadarChart(chartRef);

  const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  // Set up intersection observer for active section detection (for better UX)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0.5 }
    );

    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const Header = () => (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur-md p-3 shadow-lg">
      <nav className="max-w-7xl mx-auto flex justify-center space-x-2 sm:space-x-6 font-rajdhani tracking-wider">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => { e.preventDefault(); scrollToId(item.id); }}
            className={`p-2 rounded-lg text-sm sm:text-base transition duration-300 transform hover:scale-105
              ${activeSection === item.id
                ? 'text-neon-pink font-bold border-b-2 border-neon-pink shadow-md shadow-neon-pink/50'
                : 'text-gray-300 hover:text-neon-blue hover:shadow-sm hover:shadow-neon-blue/50'
              }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );

  const HeroSection = () => (
    <section id="hero" className="relative h-screen flex flex-col justify-center items-center overflow-hidden pt-16 data-bg">
      <div className="absolute inset-0 z-0 opacity-10">
        {/* Simple Starfield/Particle Background Placeholder */}
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://placehold.co/1920x1080/000000/000000?text=)' }} />
      </div>

      {/* Anime Avatar/Silhouette Placeholder */}
      <div className="relative z-10 w-32 h-32 sm:w-48 sm:h-48 mb-6 rounded-full bg-gray-800 border-4 border-neon-purple/50">
        <div className="w-full h-full rounded-full bg-gray-900/90 flex items-center justify-center">
          <span className="font-orbitron text-neon-blue text-4xl sm:text-6xl select-none">YB</span>
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-neon-purple opacity-70 animate-ping-slow"></div>
        {/* Floating Code Streams Placeholder (SVG/CSS animation) */}
      </div>

      <h1 className="font-orbitron text-3xl sm:text-5xl lg:text-7xl font-bold text-center mb-4 leading-tight text-white shadow-lg select-none">
        <span className="text-neon-blue">YOGISH BAKSHI</span>
        <span className="text-neon-pink text-4xl sm:text-6xl block mt-2">ANDMEUNIVERSUM</span> {/* ANDMEUNIVERSUM */}
      </h1>

      <p className="font-rajdhani text-base sm:text-xl text-gray-300 text-center mb-8 max-w-2xl px-4 select-none">
        “Andmete muutmine teadmisteks — segades analüütikat ja täpsust.” {/* “Andmete muutmine teadmisteks — segades analüütikat ja täpsust.” */}
      </p>

      <button
        onClick={() => scrollToId('about')}
        className="neon-border font-orbitron tracking-wider text-lg px-8 py-3 rounded-full bg-gray-900 text-neon-blue transition duration-500 hover:bg-neon-blue hover:text-gray-900 animate-pulse-slow z-10"
      >
        [ Alusta Andmete Skaneerimist 🔍 ] {/* Alusta Andmete Skaneerimist */}
      </button>
    </section>
  );

  const AboutMe = () => (
    <section id="about" className="data-bg py-20 px-4 sm:px-8 lg:px-16 min-h-screen pt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-orbitron text-4xl font-bold mb-10 text-center text-neon-purple border-b-2 border-neon-blue pb-3 shadow-text-sm">
          // 01. TUUMPROTSESSOR {/* TUUMPROTSESSOR */}
        </h2>
        <GlassPanel className="bg-gray-900/70 p-8 sm:p-12 mb-16">
          <p className="font-rajdhani text-lg sm:text-xl text-gray-200 leading-relaxed mb-6">
            Tervitus, Rändur. Mina olen <strong className="text-neon-blue">Yogish Bakshi</strong>, kogenud **Andmeanalüütik** arenenemas **Andmeteadlaseks**, kellel on 2.2+ aastat vabakutselist kogemust kriitiliste teadmiste pakkumisel e-kaubanduses, farmaatsias ja teenustes. Minu missiooniks on dešifreerida keerukust ja juhtida andmepõhist otsustusprotsessi.
            Mulle on omane kogenud eksperdi analüütiline täpsus – oskused **SQL**, **Python**, **BigQuery**, **ETL** protsessides ja erinevates **Andmete visualiseerimise** tööriistades. Olen kirglik probleemide lahendamise, toorandmete kaasahaaravateks narratiivideks muutmisel ning tugevate, tõhusate analüütiliste lahenduste arendamisel. {/* Tervitus, Rändur. Mina olen **Yogish Bakshi**, kogenud **Andmeanalüütik** arenenemas **Andmeteadlaseks**, kellel on 2.2+ aastat vabakutselist kogemust kriitiliste teadmiste pakkumisel e-kaubanduses, farmaatsias ja teenustes. Minu missiooniks on dešifreerida keerukust ja juhtida andmepõhist otsustusprotsessi. Mulle on omane kogenud eksperdi analüütiline täpsus – oskused **SQL**, **Python**, **BigQuery**, **ETL** protsessides ja erinevates **Andmete visualiseerimise** tööriistades. Olen kirglik probleemide lahendamise, toorandmete kaasahaaravateks narratiivideks muutmisel ning tugevate, tõhusate analüütiliste lahenduste arendamisel. */}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <HighlightCard title="Analüütiline Mootor" items={['Probleemide Lahendamine', 'ETL Andmetorud', 'Ennustav Modelleerimine']} color={NEON_BLUE} /> {/* Analüütiline Mootor, Probleemide Lahendamine, ETL Andmetorud, Ennustav Modelleerimine */}
            <HighlightCard title="Andmearsenali" items={['BigQuery/GCP', 'Tableau/PBI', 'Looker Studio']} color={NEON_PURPLE} /> {/* Andmearsenali */}
            <HighlightCard title="Tugevused" items={['Visuaalne Aruandlus', 'Tunnuste Arendamine', 'Andmete Puhastamine/Wrangling']} color={NEON_PINK} /> {/* Tugevused, Visuaalne Aruandlus, Tunnuste Arendamine, Andmete Puhastamine/Wrangling */}
          </div>
        </GlassPanel>
        <div className="flex justify-center">
          <a
            href="Yogish_DS_resume.pdf"
            download="Yogish_Bakshi_CV_Protocol.pdf"
            className="neon-border font-orbitron tracking-wider px-8 py-3 rounded-full bg-gray-900 text-neon-pink transition duration-500 hover:bg-neon-pink hover:text-gray-900"
          >
            [ Lae CV Protokoll Alla 📄 ] {/* Lae CV Protokoll Alla */}
          </a>
        </div>
      </div>
    </section>
  );

  const HighlightCard = ({ title, items, color }) => (
    <div className={`p-4 border-l-4 rounded-lg`} style={{ borderColor: color, boxShadow: `0 0 10px ${color}40` }}>
      <h3 className="font-orbitron text-xl mb-3" style={{ color: color }}>{title}</h3>
      <ul className="font-rajdhani text-gray-300 space-y-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="mr-2 text-neon-blue text-lg" style={{ color }}>»</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const Projects = () => (
    <section id="projects" className="data-bg py-20 px-4 sm:px-8 lg:px-16 min-h-screen pt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-orbitron text-4xl font-bold mb-10 text-center text-neon-blue border-b-2 border-neon-pink pb-3 shadow-text-sm">
          // 02. KOODIMAATRIKS {/* KOODIMAATRIKS */}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <a
            href="#"
            className="neon-border font-orbitron tracking-wider px-8 py-3 rounded-full bg-gray-900 text-neon-purple transition duration-500 hover:bg-neon-purple hover:text-gray-900"
          >
            [ Uuri Kõiki Andmelogisid 💾 ] {/* Uuri Kõiki Andmelogisid */}
          </a>
        </div>
      </div>
    </section>
  );

  const ProjectCard = ({ project, index }) => {
    // Adjusted color assignment for 4 projects
    const colors = [NEON_BLUE, NEON_PURPLE, NEON_PINK, NEON_BLUE];
    const color = colors[index % colors.length];

    return (
      <GlassPanel
        className="transform transition duration-500 hover:scale-[1.03] hover:shadow-2xl hover:z-10"
        style={{ animation: 'none', borderLeftColor: color, borderLeftWidth: '4px' }}
      >
        <div className="flex items-start mb-4">
          <div className="p-3 rounded-full mr-4" style={{ backgroundColor: `${color}40`, boxShadow: `0 0 8px ${color}60` }}>
            {React.cloneElement(project.icon, { stroke: color })}
          </div>
          <h3 className="font-orbitron text-2xl font-semibold mt-1" style={{ color }}>{project.title}</h3>
        </div>
        <p className="font-rajdhani text-gray-300 mb-4">{project.desc}</p>
        <div className="text-sm font-rajdhani mb-4">
          <strong className="text-gray-400">Tehnoloogiapakk:</strong> <span className="text-neon-blue">{project.tech}</span> {/* Tehnoloogiapakk: */}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-neon-pink font-semibold hover:text-neon-purple transition duration-300"
        >
          Vaata Mudelit ja Koodi {/* Vaata Mudelit ja Koodi */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.74 1.74" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.74-1.74" />
          </svg>
        </a>
      </GlassPanel>
    );
  };

  const Skills = () => (
    <section id="skills" className="data-bg py-20 px-4 sm:px-8 lg:px-16 min-h-screen pt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-orbitron text-4xl font-bold mb-10 text-center text-neon-pink border-b-2 border-neon-purple pb-3 shadow-text-sm">
          // 03. OSKUSTE MAATRIKS {/* OSKUSTE MAATRIKS */}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Skill Radar Chart (Holographic Effect) */}
          <GlassPanel className="lg:col-span-2 h-96 lg:h-auto flex items-center justify-center relative">
            <div className="absolute inset-0 z-0 rounded-xl" style={{ boxShadow: `0 0 20px ${NEON_BLUE}60, inset 0 0 10px ${NEON_PURPLE}60` }}></div>
            <div className="w-full h-full relative z-10 p-2">
              <canvas ref={chartRef} id="skill-radar" className="w-full h-full"></canvas>
            </div>
          </GlassPanel>

          {/* Right: Core Skills & Proficiency Bars */}
          <div className="lg:col-span-1 space-y-8">
            <GlassPanel className="p-6">
              <h3 className="font-orbitron text-xl text-neon-blue mb-4">ANDME PÕHILOGID</h3> {/* ANDME PÕHILOGID */}
              <div className="flex flex-wrap gap-3">
                {SKILLS_DATA.core.map((skill, index) => (
                  <span
                    key={index}
                    className="font-rajdhani text-sm px-3 py-1 rounded-full text-gray-900 font-semibold transition duration-300 hover:scale-105"
                    style={{ backgroundColor: index % 3 === 0 ? NEON_BLUE : index % 3 === 1 ? NEON_PURPLE : NEON_PINK, boxShadow: `0 0 8px ${NEON_PINK}40` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="p-6">
              <h3 className="font-orbitron text-xl text-neon-purple mb-4">PEHMETE OSKUSTE PROTOKOLLID</h3> {/* PEHMETE OSKUSTE PROTOKOLLID */}
              {['Probleemide Lahendamine', 'Analüütiline Mõtlemine', 'Suhtlemine', 'Aja Juhtimine'].map((skill, index) => ( // Probleemide Lahendamine, Analüütiline Mõtlemine, Suhtlemine, Aja Juhtimine
                <div key={index} className="mb-4">
                  <p className="font-rajdhani text-sm text-gray-300 mb-1">{skill}</p>
                  <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
                    {/* Simple animated bar fill */}
                    <div
                      className="h-full bg-neon-pink"
                      style={{ width: `${90 - index * 5}%`, boxShadow: `0 0 5px ${NEON_PINK}`, animation: 'bar-fill 2s ease-out forwards' }}
                    ></div>
                  </div>
                </div>
              ))}
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );

  const TimelineCard = ({ data, isOdd }) => (
    <div
      className={`relative mb-8 flex ${isOdd ? 'justify-end' : 'justify-start'} w-full group`}
      style={{
        '--line-color': data.color,
        '--shadow-color': data.color + '60',
        '--pulse-color': data.color + '80',
      }}
    >
      <div className={`hidden md:flex w-1/2`}></div> {/* Spacer for timeline line */}

      <div className={`md:absolute w-full md:w-1/2 ${isOdd ? 'md:left-0' : 'md:right-0'}`}>
        <GlassPanel
          className={`p-6 transform transition duration-500 group-hover:scale-[1.05] group-hover:z-10 border-l-4`}
          style={{ borderColor: data.color, boxShadow: `0 0 10px var(--shadow-color)`, animation: 'none' }}
        >
          <div className="font-orbitron text-sm mb-1" style={{ color: data.color }}>{data.time} - {data.type.toUpperCase()}</div>
          <h3 className="font-orbitron text-2xl font-bold text-gray-100 mb-1">{data.title}</h3>
          <p className="font-rajdhani text-neon-purple mb-3">{data.institution}</p>
          <p className="font-rajdhani text-gray-300 text-sm">{data.desc}</p>
        </GlassPanel>
      </div>

      {/* Timeline Dot (Pulse) - Absolute positioning */}
      <div
        className={`absolute top-0 w-4 h-4 rounded-full border-2 transform -translate-x-1/2 ${isOdd ? 'md:left-[50%]' : 'md:left-[50%]'}`}
        style={{ left: isOdd ? '1rem' : 'calc(50% + 1rem)', backgroundColor: data.color, borderColor: data.color, boxShadow: `0 0 15px var(--pulse-color)`, zIndex: 20 }}
      >
        <div className="absolute w-full h-full rounded-full animate-ping-slow" style={{ backgroundColor: data.color, opacity: 0.7 }}></div>
      </div>
    </div>
  );


  const Experience = () => (
    <section id="experience" className="data-bg py-20 px-4 sm:px-8 lg:px-16 min-h-screen pt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-orbitron text-4xl font-bold mb-16 text-center text-neon-purple border-b-2 border-neon-blue pb-3 shadow-text-sm">
          // 04. KOGEMUSTE JA HARIDUSE LOGI {/* KOGEMUSTE JA HARIDUSE LOGI */}
        </h2>

        <div className="relative border-l-2 border-dashed mx-auto md:mx-0 w-0 md:w-full" style={{ borderColor: NEON_BLUE }}>
          {EXPERIENCE_EDUCATION_DATA.map((item, index) => (
            <TimelineCard key={index} data={item} isOdd={index % 2 === 0} />
          ))}
        </div>

      </div>
    </section>
  );

  const Certifications = () => (
    <section id="certifications" className="data-bg py-20 px-4 sm:px-8 lg:px-16 min-h-screen pt-20">
        <div className="max-w-6xl mx-auto">
            <h2 className="font-orbitron text-4xl font-bold mb-10 text-center text-neon-pink border-b-2 border-neon-purple pb-3 shadow-text-sm">
                // 05. SERTIFIKAATIDE ARHIIV {/* SERTIFIKAATIDE ARHIIV */}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {CERTIFICATIONS_DATA.map((cert, index) => (
                    <GlassPanel
                        key={index}
                        className="p-6 transition duration-500 hover:scale-[1.03]"
                        style={{ animation: 'none', borderLeftColor: cert.color, borderLeftWidth: '4px' }}
                    >
                        <div className="flex items-start">
                            <div className="p-3 mr-4 rounded-full" style={{ backgroundColor: `${cert.color}40`, boxShadow: `0 0 8px ${cert.color}60` }}>
                                {React.cloneElement(cert.icon, { stroke: cert.color })}
                            </div>
                            <div>
                                <h3 className="font-orbitron text-xl font-semibold mb-1" style={{ color: cert.color }}>{cert.title}</h3>
                                <p className="font-rajdhani text-gray-400 text-sm mb-3">Väljaandja: {cert.issuer}</p> {/* Väljaandja: */}
                            </div>
                        </div>
                        <p className="font-rajdhani text-gray-300 text-sm">{cert.desc}</p>
                    </GlassPanel>
                ))}
            </div>
        </div>
    </section>
  );

  const Contact = () => {
    // Define external URLs and Email Constant
    const GITHUB_URL = `https://github.com/${GITHUB_HANDLE}`;
    const LINKEDIN_URL = `https://linkedin.com/in/${LINKEDIN_HANDLE}`;
    const EMAIL_ADDRESS = EMAIL_CONTACT;

    const Alert = ({ message, type }) => {
        const bgColor = type === 'success' ? 'bg-neon-blue' : 'bg-neon-pink';
        const borderColor = type === 'success' ? NEON_BLUE : NEON_PINK;
        return (
            <div className={`fixed top-20 right-4 p-4 rounded-lg font-rajdhani text-gray-900 font-bold z-50 transition-transform duration-300 transform translate-x-0 ${bgColor}`}
                style={{border: `2px solid ${borderColor}`, boxShadow: `0 0 10px ${borderColor}`}}>
                {message}
            </div>
        );
    };
    const [message, setMessage] = useState(null);

    const showMessage = (msg, type = 'success') => {
        setMessage({ text: msg, type });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleCopyEmail = () => {
        const tempInput = document.createElement('input');
        tempInput.value = EMAIL_ADDRESS;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showMessage('E-posti aadress kopeeritud! Käivitamine turvalise sideprotokolli.', 'success'); // E-posti aadress kopeeritud! Käivitamine turvalise sideprotokolli.
    };


    const ContactIcon = ({ Icon, label, link, action }) => (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={action}
        className="flex flex-col items-center p-4 transition duration-300 transform hover:scale-110 cursor-pointer"
      >
        <div className="p-4 rounded-full border-2 border-neon-blue/50 hover:border-neon-pink/80"
             style={{ boxShadow: `0 0 15px ${NEON_BLUE}40` }}>
          <Icon className="w-8 h-8" style={{ color: NEON_PINK }} />
        </div>
        <span className="mt-3 font-rajdhani text-sm text-gray-300 group-hover:text-neon-pink">{label}</span>
      </a>
    );

    const GithubIcon = (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 2c0 0-1.25-.52-4.14 1.35A13.37 13.37 0 0 0 12 3.5c-1.81 0-3.56.33-5.12.91C3.12 1.48 1.87 2 1.87 2A5.07 5.07 0 0 0 2 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    );
    const LinkedinIcon = (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 8a6 6 0 0 0-6 6v7H6v-7a6 6 0 0 1 6-6h.05z" /><rect x="2" y="9" width="4" height="12" rx="1" /><circle cx="4" cy="4" r="2" />
      </svg>
    );
    const MailIcon = (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );

    return (
      <section id="contact" className="data-bg py-20 px-4 sm:px-8 lg:px-16 min-h-screen flex items-center pt-20">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="font-orbitron text-4xl font-bold mb-10 text-center text-neon-blue border-b-2 border-neon-pink pb-3 shadow-text-sm">
            // 06. LOO ÜHENDUS {/* LOO ÜHENDUS */}
          </h2>

          <GlassPanel className="p-8 sm:p-12">
            <h3 className="font-orbitron text-3xl mb-8 text-neon-purple">Alusta Turvalist Edastust</h3> {/* Alusta Turvalist Edastust */}
            <div className="flex justify-center space-x-6 sm:space-x-12 mb-10">
              <ContactIcon Icon={GithubIcon} label="GitHub Portaal" link={GITHUB_URL} /> {/* GitHub Portaal */}
              <ContactIcon Icon={LinkedinIcon} label="LinkedIn Võrgustik" link={LINKEDIN_URL} /> {/* LinkedIn Võrgustik */}
              <ContactIcon Icon={MailIcon} label="Otsene E-post" link={`mailto:${EMAIL_ADDRESS}`} action={(e) => { e.preventDefault(); handleCopyEmail(); }} /> {/* Otsene E-post */}
            </div>

            <button
              onClick={() => showMessage('Koostöö protokoll käivitatud!', 'success')} // Koostöö protokoll käivitatud!
              className="font-orbitron tracking-widest text-lg px-10 py-4 rounded-full bg-gray-900 text-neon-pink transition duration-500 hover:bg-neon-pink hover:text-gray-900 animate-pulse-slow mt-8"
              style={{ boxShadow: '0 0 20px #FF6B8B' }}
            >
              [ AKTIVEERI KOOSTÖÖ REŽIIM ✨ ] {/* AKTIVEERI KOOSTÖÖ REŽIIM */}
            </button>
          </GlassPanel>

        </div>
        {message && <Alert message={message.text} type={message.type} />}
      </section>
    );
  };


  const RootApp = () => (
    <div className="min-h-screen bg-gray-900 text-white leading-relaxed antialiased">
      <style>{customStyles}</style>
      <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
      <Header />
      <main className="font-rajdhani">
        <HeroSection />
        <AboutMe />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <AIAssistant />
    </div>
  );

  return <RootApp />;
};

// --- Deployment Entry Point ---
// Parandus: Eemalda "import ReactDOM" ja kasuta globaalset ReactDOM-i
// See koodiosa on ülioluline Reacti rakenduse käivitamiseks.
const ReactDOM = window.ReactDOM;
const rootElement = document.getElementById('root');
if (rootElement && ReactDOM) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
