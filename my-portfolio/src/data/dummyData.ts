// src/data/dummyData.ts

// Define interfaces if not already in a separate file
export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string; // Path relative to /public
  tags: string[];
  screenshots?: string[]; // Array of image URLs for modal gallery
  longDescription?: string;
  liveUrl?: string;
  repoUrl?: string;
  company?: string; // Optional: associate project with a company/client
  date?: string;    // Optional: project date range
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Experience {
    id: number;
    role: string;
    company: string;
    location: string;
    date: string;
    description: string[]; // Use an array for bullet points
    logoUrl?: string; // Path relative to /public
}

export interface EducationItem {
    id: number;
    degree: string;
    school: string;
    location: string;
    date: string;
    description?: string; // Optional details
    logoUrl?: string; // Path relative to /public
}


export interface PersonalInfo {
    name: string;
    title: string;
    bio: string;
    shortBio: string;
    email: string;
    phone?: string; // Added from CV
    location?: string; // Added from CV
    availability?: string; // Added from CV
    
    linkedin: string;
    github: string;
    portfolioUrl?: string; // Added from CV
    heroImageUrl: string; // Path relative to /public
    aboutImageUrl: string; // Path relative to /public
}

// --- Personal Information ---
export const personalInfo: PersonalInfo = {
  name: "Malick Wane",
  title: "Développeur Fullstack | Web, Web3 & Architecture Logicielle",
  // Combined bio from CV sections
  bio: "Développeur Fullstack passionné avec une expérience chez des acteurs majeurs (LVMH, Ingérop). Je combine expertise technique et vision innovante. Formé à l'École 42 (titre RNCP niveau 6 en cours), je suis spécialisé dans le développement Fullstack et Web3, avec une expérience concrète dans la conception et le déploiement de solutions innovantes pour des grands groupes. Mon objectif est de contribuer à des projets ambitieux tout en continuant à développer mes compétences techniques.",
  shortBio: "Passionné par le développement Fullstack, Web3 et l'architecture logicielle.",
  email: "Baidyfall319@gmail.com",
  phone: "07 84 08 01 33", // From CV
  location: "Colombes, France", // Derived from CV address
  availability: "Disponible à partir de mars 2025", // From CV
  linkedin: "https://www.linkedin.com/in/malick-wane-729b63198/",
  github: "https://github.com/Misterwayne",
  portfolioUrl: "https://mwane.onrender.com/", // From CV
  heroImageUrl: "/images/placeholder-hero.svg", // Replace with your actual hero image path
  aboutImageUrl: "/images/profile.png", // Replace with your actual profile picture path
};

// --- Projects (from Experiences) ---
export const projects: Project[] = [
  {
    id: 1,
    title: "Plateforme QR Codes & Interopérabilité Blockchain",
    description: "Création d'une plateforme de QR codes dynamiques (Express.js, Next.js) conforme aux normes EU pour passeports produits digitaux. \
    Mise en place de l'interopérabilité entre l'ERP Cegid et l'API Web3 (blockchain Aura) améliorant authentification et traçabilité. \
    Développement d'outils modulaires (Node.js, React, TypeScript).",
    imageUrl: "/logos/lvmh.png", // Replace with actual LVMH logo path
    tags: ["Next.js", "Express.js", "Node.js", "React", "TypeScript", "Web3", "Blockchain", "API", "ERP", "Architecture Modulaire"],
    longDescription: "Développement complet d'une plateforme de gestion de QR codes dynamiques pour les passeports produits digitaux, respectant les normes européennes.\
     Intégration avec l'ERP Cegid et l'API Web3 de la blockchain Aura pour améliorer l'authentification et la traçabilité des produits de luxe. \
     Conception et développement d'outils backend modulaires en Node.js, Express.js, et Nest.js, avec une interface frontend en React et TypeScript, \
     assurant l'adaptabilité aux besoins spécifiques des différentes Maisons du groupe LVMH.",
    company: "Groupe LVMH",
    date: "Septembre 2024 – Mars 2025",
    screenshots: [
      "https://via.placeholder.com/800x600/cccccc/888888?text=Project+Screenshot+1", // Replace
      "https://via.placeholder.com/800x600/dddddd/777777?text=Project+Screenshot+2", // Replace
      "https://via.placeholder.com/800x600/eeeeee/666666?text=Project+Screenshot+3", // Replace
  ],
    // repoUrl: "#", // Private likely
  },
  {
    id: 2,
    title: "Application Gestion Temps & Budget 'Taskin'",
    description: "Participation au développement backend (Node.js) et frontend (Vue.js) d'une application de gestion du temps de travail et de budget pour les chefs de projet.",
    imageUrl: "/logos/ingerop.png", // Replace with actual Ingérop logo path
    tags: ["Node.js", "Vue.js", "Backend", "Frontend", "Gestion de projet"],
    company: "Ingérop",
    date: "Septembre 2023 – Mars 2024 (Stage)",
    screenshots: [
      "/projets/About4.png",
      "/projets/Taskin2.png" // Replace with actual screenshot path
  ],
  },
    {
    id: 3,
    title: "Calculatrice Empreinte Carbone 'Infracost'",
    description: "Contribution au frontend (HTML/CSS/JS/Django) d'une calculatrice d'empreinte carbone pour projets d'infrastructure, permettant calculs ajustables.",
    imageUrl: "/logos/ingerop.png", // Replace with actual Ingérop logo path
    tags: ["HTML", "CSS", "JavaScript", "Django", "Frontend", "Infrastructure"],
    company: "Ingérop",
    date: "Septembre 2023 – Mars 2024 (Stage)",
    screenshots: [
      "/projets/synthese2.png",
  ],
  },
  {
    id: 4,
    title: "Outil Scraping Offres SNCF 'Ingebot'",
    description: "Développement complet (frontend et backend en Python) d'une application de scraping automatisant la recherche d'offres publiques de la SNCF.",
    imageUrl: "/logos/ingerop.png", // Replace with actual Ingérop logo path
    tags: ["Python", "Web Scraping", "Frontend", "Backend", "Automatisation"],
    screenshots: [
      "/projets/scrapping.png",
  ],
    company: "Ingérop",
    date: "Septembre 2023 – Mars 2024 (Stage)",
  },
  {
    id: 5,
    title: "Plateforme Web & Mobile (Freelance)",
    description: "Création et déploiement d'une plateforme pour une entreprise de désinsectisation, dératisation et désinfection, utilisant Node.js pour le backend et React pour le frontend.",
    imageUrl: "/logos/placeholder-logo.svg", // Replace with actual client logo or generic freelance icon
    tags: ["Node.js", "React", "Mobile", "Web Platform", "Freelance", "Déploiement"],
    company: "Stop Nuisibles IDF",
    date: "Janvier 2024 – Février 2024",
  },
   {
    id: 6, // Keep portfolio project or remove if redundant
    title: "Portfolio Personnel (Ce Site)",
    description: "Mon portfolio personnel créé avec Next.js, Chakra UI, TypeScript, et Docker, intégrant un défilement par page et mes données réelles.",
    imageUrl: "/images/placeholder-portfolio.svg", // Replace with a screenshot?
    tags: ["Next.js", "Chakra UI", "TypeScript", "Docker", "Scroll Snap", "React Icons"],
    repoUrl: personalInfo.github + "/my-portfolio-app", // Example link, replace with actual if public
    liveUrl: personalInfo.portfolioUrl,
  },
];

// --- Skills (from Compétences) ---
export const skillCategories: SkillCategory[] = [
  {
    category: "Langages & Frameworks",
    skills: [
        "JavaScript", "TypeScript", "Node.js", "Express.js", "Next.js", "Nest.js", "React", "Vue.js", // JS ecosystem
        "Python", "Django", "FastAPI", // Python ecosystem
        "Solidity", // Blockchain
        "HTML5", "CSS3", // Frontend basics
        "C/C++" // System/Low-level
    ],
  },
   {
    category: "Bases de Données",
    skills: ["SQL", "MariaDB", "PostgreSQL", "NoSQL", "MongoDB"],
  },
  {
    category: "Outils & DevOps",
    skills: ["Docker", "Docker Compose", "Git", "Bash", "Linux", "Nginx", "Déploiement", "Orchestration"], // Added Orchestration based on text
  },
  {
    category: "Concepts & Architecture",
    skills: ["API RESTful", "GraphQL", "Web3", "Blockchain", "Architecture Modulaire", "Ingénierie Logicielle", "Méthodologies Agiles", "Cycle de vie logiciel", "Programmation Système", "Serveur HTTP"], // Added details from descriptions
  },
  {
      category: "Automatisation & Scripting",
      skills: ["Automatisation", "Scripting Bash", "Analyse de marché"] // Grouped related skills
  }
];

// --- (Optional) Affiliations Data (if you use the AffiliationsSection) ---
export interface Affiliation {
  id: number;
  name: string;
  imageUrl: string; // Path relative to the /public folder
  url?: string; // Optional link to the website
  type: 'company' | 'school' | 'technology';
}

export const affiliations: Affiliation[] = [
  // Companies
  { id: 1, name: "LVMH", imageUrl: "/logos/lvmh.png", type: "company" }, // Replace path
  { id: 2, name: "Ingérop", imageUrl: "/logos/ingerop.png", type: "company" }, // Replace path
  { id: 3, name: "Stop Nuisibles IDF", imageUrl: "/logos/placeholder-logo.svg", type: "company" }, // Replace path or use generic
  // School
  { id: 4, name: "École 42 Paris", imageUrl: "/logos/42.png", type: "school" }, // Replace path
  // Key Technologies (examples - add more from skills list)
  { id: 5, name: "Next.js", imageUrl: "/logos/nextjs.svg", type: "technology" }, // Replace path
  { id: 6, name: "React", imageUrl: "/logos/react.svg", type: "technology" }, // Replace path
  { id: 7, name: "Node.js", imageUrl: "/logos/nodejs.svg", type: "technology" }, // Replace path
  { id: 8, name: "Docker", imageUrl: "/logos/docker.svg", type: "technology" }, // Replace path
  { id: 9, name: "TypeScript", imageUrl: "/logos/typescript.svg", type: "technology" }, // Replace path
  { id: 10, name: "Python", imageUrl: "/logos/python.svg", type: "technology" }, // Replace path
  { id: 11, name: "PostgreSQL", imageUrl: "/logos/postgresql.svg", type: "technology" }, // Replace path
];

export const experiences: Experience[] = [
    {
        id: 1,
        role: "Développeur Fullstack Blockchain & Innovation",
        company: "Groupe LVMH",
        location: "Paris (Assumed)", // Location not specified, assuming Paris for LVMH HQ
        date: "Septembre 2024 – Mars 2025",
        logoUrl: "/logos/lvmh.png", // Replace with actual path
        description: [
            "Création d'une plateforme de QR codes dynamiques (Express.js, Next.js) pour passeports produits digitaux.",
            "Mise en place de l'interopérabilité ERP Cegid et API Web3 (blockchain Aura).",
            "Développement d'outils modulaires (Node.js, React, TypeScript) pour différentes Maisons.",
        ],
    },
    {
        id: 2,
        role: "Développeur Fullstack Stagiaire",
        company: "Ingérop",
        location: "Rueil-Malmaison",
        date: "Septembre 2023 – Mars 2024",
        logoUrl: "/logos/ingerop.png", // Replace with actual path
        description: [
            "Développement backend (Node.js) et frontend (Vue.js) pour l'application 'Taskin' (gestion temps/budget).",
            "Contribution frontend (HTML/CSS/JS/Django) à 'Infracost' (calculatrice empreinte carbone).",
            "Développement complet (Python) de 'Ingebot' (scraping offres SNCF)."
        ],
    },
    {
        id: 3,
        role: "Développeur Freelance (Web & Mobile)",
        company: "Stop Nuisibles IDF",
        location: "Paris",
        date: "Janvier 2024 – Février 2024",
        // logoUrl: "/logos/stop-nuisibles.svg", // Optional: add logo if available
        description: [
            "Création et déploiement d'une plateforme (Node.js backend, React frontend).",
            "Application pour entreprise de désinsectisation, dératisation et désinfection.",
        ],
    },
];

// --- NEW: Education History ---
export const educationHistory: EducationItem[] = [
    {
        id: 1,
        degree: "Licence Informatique (Titre RNCP niveau 6 en cours)", // Adjusted based on CV phrasing
        school: "École 42",
        location: "Paris",
        date: "Octobre 2019 – En cours",
        logoUrl: "/logos/42.png", // Replace with actual path
        description: "Formation axée sur le développement logiciel et les compétences techniques pratiques.",
    }
    // Add previous education if available/relevant
];