export const profile = {
  name: "Ricardo Brown",
  brand: "RicardoTech",
  email: "rbrown@ricardotech.com",
  heroTitle: "Hello, I'm Ricardo!",
  heroLead:
    "I’m passionate about building software products that support users, teams, and business goals. My work combines software engineering, AI, product thinking, data-driven decision-making, and modern technologies to turn ideas into reliable solutions that create meaningful momentum.",
  rotatingRoles: ["Software Engineer", "Full Stack Engineer", "Data Analyst", "AI Engineer"],
  portrait: "/img/r2023tech02020.png",
  portraitAlternate: "/img/r2023tech0202032changed.png",
  heroBackground: "/img/luminary/cloud-security-dashboard.jpg",
};

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Server101",
    image: "/img/github_original_wordmark_logo.png",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/Ricardo-Tech",
    image: "/img/linkedin-logo-png.png",
  },
  {
    label: "Email",
    href: "mailto:rbrown@ricardotech.com",
    image: "/img/email-message-icon.png",
  },
];

export const highlights = [
  { value: "React + JavaScript", label: "Product Engineering" },
  { value: "AI Integration", label: "Intelligent Features" },
  { value: "AWS Deployment", label: "Cloud Infrastructure" },
];

export const about = {
  intro:
    "My journey into technology began over 10 years ago with C programming language and expanded into Java. From there, I continued growing through formal education, hands-on experience, curiosity, and a commitment to learning new technologies and languages as the industry evolved.",
  body:
    "I’m an expert in React and Java, specializing in full-stack application development, API integrations, and scalable software solutions. In my last role as a Senior Software Engineer, I designed and developed production-ready products using React, Node.js, JavaScript, AI agent integrations, and modern development practices. I contributed across the full software development lifecycle, worked in Scrum/Agile environments, and collaborated across teams to build deployment pipelines using Amazon Web Services (AWS). My focus was on building a reliable product that met real user needs and supported long-term growth.",
  goal:
    "My work continues to grow at the intersection of software engineering, data analytics, and AI engineering. I also bring practical experience with IAM, secure access practices, and modern application security. This gives me a balanced approach to building products that solve real problems, support users, and drive long-term success.",
};

export const education = [
  {
    school: "St. Thomas University (STU)",
    credential: "Master of Science in Data Science",
    years: "2025-2026",
    logo: "/img/st-thomas-university-fl_540.png",
  },
  {
    school: "Thomas Edison State University (TESU)",
    credential: "Bachelor of Science in Computer Science",
    years: "2017-2021",
    logo: "/img/Thomas_Edison_State_University_seal.png",
  },
];

export const projectTabs = [
  {
    id: "portfolio",
    label: "Full-Stack Portfolio",
    title: "Full-Stack Portfolio",
    eyebrow: "Production Infrastructure",
    description:
      "This project displays public-safe health signals for the deployed portfolio API, including availability, runtime status, uptime, and service monitoring.",
    stack: ["React", "Node.js", "Express", "AWS CloudFront", "Application Load Balancer", "AWS EC2", "PM2"],
  },
  {
    id: "threat",
    label: "Threat Monitoring",
    title: "Threat Monitoring Tool",
    eyebrow: "Security Analysis",
    description: "Scan URLs for threats using custom logic and external threat intelligence APIs.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "VirusTotal API", "AbuseIPDB API"],
  },
  {
    id: "disasterDashboard",
    label: "Disaster Intelligence Dashboard",
    title: "Disaster Intelligence Dashboard",
    eyebrow: "Analytics Engineering",
    description:
      "Coming soon: an analytics dashboard that tracks disaster declarations, regional trends, seasonal patterns, geographic hotspots, and planning insights.",
    stack: ["Python", "AWS", "Tableau", "Streamlit", "ETL Pipeline", "Analytics"],
  },
];

export const softwareRepos = [
  {
    id: "iam",
    slug: "Server101/objaverse-xl",
    description: "Repository selected for software portfolio review and code visibility.",
    language: "Python",
  },
  {
    id: "threat",
    slug: "Server101/Analytical-Web-App",
    description: "Analytical web application work connected to data-driven security and reporting.",
    language: "JavaScript",
  },
  {
    id: "portfolio",
    slug: "Server101/go-ethereum",
    description: "Systems-level repository used to demonstrate comfort reading complex codebases.",
    language: "Go",
  },
  {
    id: "iam2",
    slug: "Server101/Portfolio-Website",
    description: "React portfolio frontend deployed through S3 and CloudFront.",
    language: "JavaScript",
  },
  {
    id: "threat2",
    slug: "Server101/textbookstore-ui",
    description: "Frontend interface work focused on user flows, component structure, and UI delivery.",
    language: "JavaScript",
  },
  {
    id: "portfolio2",
    slug: "Server101/Geek-Text",
    description: "Full-stack bookstore application built with collaborative engineering practices.",
    language: "Java",
  },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Software", href: "#software" },
  { label: "Contact", href: "#contact" },
];
