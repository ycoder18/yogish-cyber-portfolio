// src/components/YourChartComponent.jsx

import { Bar } from 'react-chartjs-2'; // Or Line, Pie, etc.
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// --- THIS IS THE CRITICAL FIX ---
// You must register the components you want to use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// ---------------------------------

// Now, you can define and export your component
export const MyChart = () => {
  const data = {
    // ... your chart data
  };

  const options = {
    // ... your chart options
  };

  return <Bar options={options} data={data} />;
};

export default MyChart;
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './index.css'; // <-- ADD THIS LINE
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
import ReactDOM from 'react-dom/client'
// ...your other imports like App
// --- GLOBAL CONSTANTS ---

// Color palette definitions
const NEON_BLUE = '#4AD9E8';
const NEON_PURPLE = '#B45FE6';
const NEON_PINK = '#FF6B8B';

// Contact Handles
const GITHUB_HANDLE = 'ycoder18';
const LINKEDIN_HANDLE = 'yogish-bakshi';
const EMAIL_CONTACT = 'contact@Yogish';

// --- DATA STRUCTURES ---

const NAV_ITEMS = [
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Cert. Log' },
  { id: 'skills', label: 'Skills Matrix' },
  { id: 'experience', label: 'Timeline Log' },
  { id: 'contact', label: 'Connection Port' },
];

const SKILLS_DATA = {
  core: ['Python', 'SQL', 'ETL', 'BigQuery', 'ML', 'Tableau', 'Power BI'],
  languages: [
    { name: 'Python', level: 95, color: NEON_BLUE },
    { name: 'SQL', level: 90, color: NEON_BLUE },
    { name: 'Pandas/NumPy', level: 88, color: NEON_PURPLE },
    { name: 'Scikit-Learn', level: 85, color: NEON_PURPLE },
  ],
  tools: [
    { name: 'Tableau/PBI', level: 88, color: NEON_PINK },
    { name: 'GCP/BigQuery', level: 92, color: NEON_PINK },
    { name: 'Looker Studio', level: 80, color: NEON_BLUE },
    { name: 'Feature Eng.', level: 85, color: NEON_PURPLE },
  ]
};

const ServerIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6" y1="6" y2="6"/><line x1="6" x2="6" y1="18" y2="18"/></svg>
);

const PROJECTS_DATA = [
  {
    title: 'Healthcare Premium Predictor',
    desc: 'Built a predictive machine learning model (XGBoost, GBM) on 100k+ records, analyzing factors like BMI and smoking status. Developed a Streamlit app for real-time predictions and visualization.',
    tech: 'Python, ML (XGBoost, GBM, NN), Streamlit',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 0-8 4v7.35a1 1 0 0 0 .5.87l7 4.3a1 1 0 0 0 1 0l7-4.3a1 1 0 0 0 .5-.87V6a10 10 0 0 0-8-4z" /><path d="M12 2v20" /></svg>
    ),
    link: `https://github.com/${GITHUB_HANDLE}`,
  },
  {
    title: 'Data Warehouse / Analytics',
    desc: 'Designed and implemented SQL Server ETL pipelines for ERP/CRM data. Successfully modeled a star schema and executed advanced SQL queries to generate insights for executive dashboards.',
    tech: 'SQL Server, ETL, Star Schema, Advanced SQL',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12h18"/><path d="M3 19h18"/></svg>
    ),
    link: `https://github.com/${GITHUB_HANDLE}`,
  },
  {
    title: 'Wisdom Pets Digital Transformation',
    desc: 'Migrated and modeled data in BigQuery for a digital transformation project. Executed analytical SQL and built Looker Studio dashboards for data-driven business reports.',
    tech: 'BigQuery, SQL, Looker Studio',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 20v-9" /><path d="M16 16l-4 4-4-4" /></svg>
    ),
    link: `https://github.com/${GITHUB_HANDLE}`,
  },
  {
    title: 'Sales Performance Reporting',
    desc: 'Developed SQL Server ETL pipelines and star schema for ERP/CRM data. Delivered Tableau dashboards with sales insights and profitability recommendations.',
    tech: 'SQL Server, ETL, Tableau, Excel',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7-7.8 7.8" /></svg>
    ),
    link: `https://github.com/${GITHUB_HANDLE}`,
  },
];

const CERTIFICATIONS_DATA = [
  { title: 'Career Essentials in Data Analyst', provider: 'Microsoft & LinkedIn', color: NEON_BLUE },
  { title: 'Career Essentials in Generative AI', provider: 'Microsoft & LinkedIn', color: NEON_PURPLE },
  { title: 'Data Science Virtual Internship', provider: 'Quantum, Forage', color: NEON_PINK },
  { title: 'Data Science Virtual Experience', provider: 'HP', color: NEON_BLUE },
  { title: 'Data Science Job Simulation', provider: 'British Airways, Forage', color: NEON_PURPLE },
  { title: 'Advanced SQL', provider: 'HackerRank', color: NEON_PINK },
];

const TIMELINE_DATA = [
  {
    type: 'Experience',
    title: 'Research Analyst',
    institution: 'Humanity Pathways Global',
    time: 'Apr 2025 - Present',
    desc: 'Conducted donor and client trend analysis; created Looker Studio dashboards for internal reporting.',
    color: NEON_PINK,
  },
  {
    type: 'Experience',
    title: 'Freelance Data Analyst',
    institution: 'Global Clients (Remote)',
    time: 'Feb 2022 - Apr 2024',
    desc: 'Delivered analytics solutions, built automated Tableau/Power BI dashboards, and standardized insight delivery.',
    color: NEON_PURPLE,
  },
  {
    type: 'Experience',
    title: 'Data Analyst Intern',
    institution: 'Sarvagya Institute',
    time: 'Jul 2024 - Sep 2024',
    desc: 'Cleaned and transformed institutional data. Automated KPI reporting processes in Power BI.',
    color: NEON_BLUE,
  },
  {
    type: 'Education',
    title: 'Bachelor in Computer Application (8.88 GPA)',
    institution: 'Guru Gobind Singh Indraprastha University',
    time: '2022-2025',
    desc: 'Focus on Computer Applications, strong foundation in coding and algorithms.',
    color: NEON_BLUE,
  },
];


// --- UTILITY COMPONENTS & CSS (React, Tailwind, Inline CSS) ---
// CSS is now defined inside the App component for structural cleanliness.


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
        className="cursor-pointer p-3 rounded-full bg-neon-purple/80 hover:bg-neon-purple transition duration-300"
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
          <p className="text-neon-blue text-sm mb-2 font-bold">AURA: AI Navigator</p>
          <p className="text-gray-200">
            Konnichiwa! I am **AURA**. Let's explore Yogish’s universe of data and code 🌌. How may I assist your query?
          </p>
          <button className="mt-3 text-xs text-neon-pink hover:underline" onClick={() => setIsOpen(false)}>
            Close Protocol
          </button>
        </GlassPanel>
      )}
    </div>
  );
};


// --- CHART INITIALIZATION ---
const useSkillRadarChart = (chartRef) => {
  useEffect(() => {
    if (!chartRef.current || typeof window.Chart === 'undefined') {
        console.error("Chart.js not found. Ensure it's loaded in index.html.");
        return;
    }

    const ctx = chartRef.current.getContext('2d');

    const chartData = {
      labels: SKILLS_DATA.languages.map(s => s.name).concat(SKILLS_DATA.tools.map(s => s.name)),
      datasets: [
        {
          label: 'Data Expertise (%)',
          data: SKILLS_DATA.languages.map(s => s.level).concat(SKILLS_DATA.tools.map(s => s.level)),
          backgroundColor: `${NEON_BLUE}40`, 
          borderColor: NEON_BLUE,
          pointBackgroundColor: NEON_PINK,
          pointBorderColor: '#0F172A',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: NEON_PINK,
          borderWidth: 2,
        },
      ],
    };

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

  useSkillRadarChart(chartRef);

  const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

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
        <div className="w-full h-full bg-cover bg-center" />
      </div>

      <div className="relative z-10 w-32 h-32 sm:w-48 sm:h-48 mb-6 rounded-full bg-gray-800 border-4 border-neon-purple/50">
        <div className="w-full h-full rounded-full bg-gray-900/90 flex items-center justify-center">
          <span className="font-orbitron text-neon-blue text-4xl sm:text-6xl select-none">YB</span>
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-neon-purple opacity-70 animate-ping-slow"></div>
      </div>

      <h1 className="font-orbitron text-3xl sm:text-5xl lg:text-7xl font-bold text-center mb-4 leading-tight text-white shadow-lg select-none">
        <span className="text-neon-blue">YOGISH BAKSHI</span>
        <span className="text-neon-pink text-4xl sm:text-6xl block mt-2">DATA UNIVERSE</span>
      </h1>

      <p className="font-rajdhani text-base sm:text-xl text-gray-300 text-center mb-8 max-w-2xl px-4 select-none">
        “Transforming Data into Insight — Blending Analytics, Skills & Strategy.”
      </p>

      <button
        onClick={() => scrollToId('about')}
        className="neon-border font-orbitron tracking-wider text-lg px-8 py-3 rounded-full bg-gray-900 text-neon-blue transition duration-500 hover:bg-neon-blue hover:text-gray-900 animate-pulse-slow z-10"
      >
        [ Begin Data Scan 🔍 ]
      </button>
    </section>
  );

  const AboutMe = () => (
    <section id="about" className="data-bg py-20 px-4 sm:px-8 lg:px-16 min-h-screen pt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-orbitron text-4xl font-bold mb-10 text-center text-neon-purple border-b-2 border-neon-blue pb-3 shadow-text-sm">
          // 01. THE CORE PROCESSOR
        </h2>
        <GlassPanel className="bg-gray-900/70 p-8 sm:p-12 mb-16">
          <p className="font-rajdhani text-lg sm:text-xl text-gray-200 leading-relaxed mb-6">
            Greetings, Traveler. I am <strong className="text-neon-blue">Yogish Bakshi</strong>, a Data Analyst with 2.2+ years of freelance experience delivering deep insights for clients in e-commerce, pharma, and services. My mission is to decode complexity.
            I possess the analytical precision of a seasoned professional—skilled in <strong className="text-neon-blue">SQL, Python, BigQuery, Tableau, and Power BI</strong>. I’m passionate about solving problems through data-driven decision-making, turning raw data into compelling narratives and effective strategic action.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <HighlightCard title="Analytical Engine" items={['Problem Solving', 'ETL Pipelines', 'Predictive Modeling']} color={NEON_BLUE} />
            <HighlightCard title="Data Arsenal" items={['BigQuery/GCP', 'Tableau/PBI', 'Looker Studio']} color={NEON_PURPLE} />
            <HighlightCard title="Methodology Focus" items={['Data Cleaning', 'Feature Engineering', 'Structured Reporting']} color={NEON_PINK} />
          </div>
        </GlassPanel>
        <div className="flex justify-center">
          <a
            href="Yogish_DS_resume.pdf"
            download="Yogish_Bakshi_CV_Protocol.pdf"
            className="neon-border font-orbitron tracking-wider px-8 py-3 rounded-full bg-gray-900 text-neon-pink transition duration-500 hover:bg-neon-pink hover:text-gray-900"
          >
            [ Download CV Protocol 📄 ]
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
          // 02. THE CODE MATRIX
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <a
            href={`https://github.com/${GITHUB_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-border font-orbitron tracking-wider px-8 py-3 rounded-full bg-gray-900 text-neon-purple transition duration-500 hover:bg-neon-purple hover:text-gray-900"
          >
            [ Explore All Data Logs 💾 ]
          </a>
        </div>
      </div>
    </section>
  );

  const ProjectCard = ({ project, index }) => {
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
          <strong className="text-gray-400">Tech Stack:</strong> <span className="text-neon-blue">{project.tech}</span>
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-neon-pink font-semibold hover:text-neon-purple transition duration-300"
        >
          View Code Protocol
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.74 1.74" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.74-1.74" />
          </svg>
        </a>
      </GlassPanel>
    );
  };

  const Certifications = () => (
    <section id="certifications" className="data-bg py-20 px-4 sm:px-8 lg:px-16 pt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-orbitron text-4xl font-bold mb-10 text-center text-neon-pink border-b-2 border-neon-purple pb-3 shadow-text-sm">
          // 03. CERTIFICATION LOG
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <CertCard key={index} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );

  const CertCard = ({ cert }) => (
    <GlassPanel
      className="p-5 flex flex-col justify-between transform transition duration-300 hover:translate-y-[-4px]"
      style={{ animation: 'none', borderTop: `4px solid ${cert.color}` }}
    >
      <h3 className="font-orbitron text-lg font-semibold" style={{ color: cert.color }}>
        {cert.title}
      </h3>
      <p className="font-rajdhani text-sm text-gray-400 mt-2">
        <strong className="text-gray-300">Provider:</strong> {cert.provider}
      </p>
    </GlassPanel>
  );

  const Skills = () => {
    return (
      <section id="skills" className="data-bg py-20 px-4 sm:px-8 lg:px-16 min-h-screen pt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-orbitron text-4xl font-bold mb-10 text-center text-neon-pink border-b-2 border-neon-purple pb-3 shadow-text-sm">
            // 04. SKILLS MATRIX
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <GlassPanel className="lg:col-span-2 h-96 lg:h-auto flex items-center justify-center relative">
              <div className="absolute inset-0 z-0 rounded-xl" style={{ boxShadow: `0 0 20px ${NEON_BLUE}60, inset 0 0 10px ${NEON_PURPLE}60` }}></div>
              <div className="w-full h-full relative z-10 p-2">
                <canvas ref={chartRef} id="skill-radar" className="w-full h-full"></canvas>
              </div>
            </GlassPanel>

            <div className="lg:col-span-1 space-y-8">
              <GlassPanel className="p-6">
                <h3 className="font-orbitron text-xl text-neon-blue mb-4">CORE DATA LOGS</h3>
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
                <h3 className="font-orbitron text-xl text-neon-purple mb-4">SOFT SKILL PROTOCOLS</h3>
                {['Problem Solving', 'Analytical Thinking', 'Communication', 'Teamwork'].map((skill, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-rajdhani text-sm text-gray-300 mb-1">{skill}</p>
                    <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
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
  };

  const TimelineCard = ({ data, isOdd }) => (
    <div
      className={`relative mb-8 flex ${isOdd ? 'justify-end' : 'justify-start'} w-full group`}
      style={{
        '--line-color': data.color,
        '--shadow-color': data.color + '60',
        '--pulse-color': data.color + '80',
      }}
    >
      <div className={`hidden md:flex w-1/2`}></div> 

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
          // 05. TEMPORAL TIMELINE LOG
        </h2>

        <div className="relative border-l-2 border-dashed mx-auto md:mx-0 w-0 md:w-full" style={{ borderColor: NEON_BLUE }}>
          {TIMELINE_DATA.map((item, index) => (
            <TimelineCard key={index} data={item} isOdd={index % 2 === 0} />
          ))}
        </div>

      </div>
    </section>
  );

  const Contact = () => {
    const EMAIL_ADDRESS = EMAIL_CONTACT;

    const Alert = ({ message, type }) => {
        const bgColor = type === 'success' ? 'bg-neon-blue' : 'bg-neon-pink';
        const borderColor = type === 'success' ? NEON_BLUE : NEON_PINK;
        return (
            <div className={`p-4 rounded-lg font-rajdhani text-gray-900 font-bold mt-4 ${bgColor}`}
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

    const handleCopyEmail = (e) => {
        e.preventDefault();
        const email = EMAIL_ADDRESS;
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
            showMessage('Email ID copied! Initiating secure communication protocol.', 'success');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            showMessage('Failed to copy. Please copy manually: contact@Yogish', 'error');
        }
        document.body.removeChild(tempInput);
    };


    const ContactIcon = ({ Icon, label, link, action }) => (
      <a
        href={link}
        target={action ? '_self' : '_blank'}
        rel={action ? '' : 'noopener noreferrer'}
        onClick={action}
        className="flex flex-col items-center p-4 transition duration-300 transform hover:scale-110 cursor-pointer group"
      >
        <div className="p-4 rounded-full border-2 border-neon-blue/50 group-hover:border-neon-pink/80"
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
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97-5.98a4 4 0 0 0-4.06 0L2 7" />
      </svg>
    );

    return (
      <section id="contact" className="data-bg py-20 px-4 sm:px-8 lg:px-16 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-orbitron text-4xl font-bold mb-10 text-neon-blue border-b-2 border-neon-pink pb-3 shadow-text-sm">
            // 06. ESTABLISH CONNECTION
          </h2>
          <GlassPanel className="p-8 sm:p-12 mb-8 flex flex-col items-center" style={{ animation: 'none', border: `1px solid ${NEON_PINK}30` }}>
            <p className="font-rajdhani text-xl text-gray-200 mb-8">
              Initiating secure transmission protocol. Let's collaborate to transform your data challenges into strategic solutions.
            </p>

            <div className="flex justify-center space-x-6 sm:space-x-12 mb-8">
              <ContactIcon
                Icon={GithubIcon}
                label="GitHub Log"
                link={`https://github.com/${GITHUB_HANDLE}`}
              />
              <ContactIcon
                Icon={LinkedinIcon}
                label="LinkedIn Protocol"
                link={`https://www.linkedin.com/in/${LINKEDIN_HANDLE}/`}
              />
              <ContactIcon
                Icon={MailIcon}
                label="Direct Email"
                link="#"
                action={handleCopyEmail}
              />
            </div>

            <button
              onClick={handleCopyEmail}
              className="neon-border font-orbitron tracking-wider text-xl px-10 py-4 rounded-full bg-gray-900 text-neon-pink transition duration-500 hover:bg-neon-pink hover:text-gray-900 animate-pulse-slow"
            >
              [ ACTIVATE COLLABORATION MODE ✨ ]
            </button>
            
            {message && <Alert message={message.text} type={message.type} />}

          </GlassPanel>
        </div>
        <footer className="mt-20 text-center font-rajdhani text-xs text-gray-500">
          <p>Data Stream Footer Protocol v1.0 | Designed by Gemini, Developed by Yogish Bakshi.</p>
        </footer>
      </section>
    );
  };


  const RootApp = () => {
    // Defines custom CSS styles within the component for a single-file application structure.
    const customStyles = `
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@400;600&display=swap');
      .font-orbitron { font-family: 'Orbitron', sans-serif; }
      .font-rajdhani { font-family: 'Rajdhani', sans-serif; }

      @keyframes neon-glow-pulse {
        0%, 100% { box-shadow: 0 0 5px ${NEON_BLUE}, 0 0 10px ${NEON_PURPLE}, 0 0 15px ${NEON_BLUE}; }
        50% { box-shadow: 0 0 10px ${NEON_PURPLE}, 0 0 20px ${NEON_PINK}, 0 0 30px ${NEON_PURPLE}; }
      }

      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
        100% { transform: translateY(0px); }
      }

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
        background: rgba(10, 15, 30, 0.6);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(74, 217, 232, 0.2);
        border-radius: 12px;
        transition: all 0.5s ease;
        animation: neon-glow-pulse 5s infinite alternate;
      }

      .data-bg {
        background: #000000;
        background-image: radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0),
                          radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0);
        background-size: 10px 10px;
        background-position: 0 0, 5px 5px;
      }
    `;

    return (
      <div className="min-h-screen bg-gray-900 text-white select-none">
        <style>{customStyles}</style>
        <Header />
        <main className="pt-16">
          <HeroSection />
          <AboutMe />
          <Projects />
          <Certifications />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <AIAssistant />
      </div>
    );
  };

  return <RootApp />;
};

// --- FINAL DEPLOYMENT ENTRY POINT FIX ---
const rootElement = document.getElementById('root');
if (rootElement) {
    // Dynamic import is the robust solution for Vercel/Cloudflare blank pages.
    import('react-dom/client').then(({ createRoot }) => {
        createRoot(rootElement).render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    }).catch(e => console.error("Failed to initialize React root:", e));
}

export default App;
