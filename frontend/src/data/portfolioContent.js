export const profile = {
  name: "Ricardo Brown",
  brand: "RicardoTech",
  email: "rbrown@ricardotech.com",
  heroTitle: "Hello, I'm Ricardo!",
  heroLead:
    "I’m passionate about software engineering, cybersecurity, and artificial intelligence, applying them to solve real-world challenges and manage risk. With a strong foundation in data structures and computing logic, I build secure, full-stack systems and manage access controls (IAM) across platforms. I thrive in agile environments and have hands-on experience integrating AI into security workflows to enhance threat detection and support informed decision-making.",
  rotatingRoles: ["Software Engineer", "Full Stack Engineer", "Data Analyst", "Ai Engineer"],
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
  { value: "CloudFront", label: "Frontend Delivery" },
  { value: "ALB", label: "API TLS Routing" },
  { value: "EC2 + PM2", label: "Backend Runtime" },
];

export const about = {
  intro:
    "My journey into tech began with a deep interest for problem-solving and computing logic, and over the years, that passion has evolved into a mission: using software and security strategy to solve real-world challenges.",
  body:
    "At Dream Coders Academy, I’ve mastered my skills as a full-stack developer and advanced into a cybersecurity designing & building secure applications with Java, React, deploying on AWS, and managing IAM and RBAC systems. I work in agile environments, collaborate across teams, and apply AI tools to improve threat detection and access control.",
  goal:
    "I’m currently preparing for the CISSP certification as I work toward becoming a security leader who bridges engineering, risk, governance, Ai and machine learning.",
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
      "This project displays the real-time health of my AWS EC2–hosted portfolio—confirming server uptime, instance type, and external availability for monitoring.",
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
    id: "iamScanner",
    label: "IAM Misconfiguration Detector",
    title: "AI Gemini-Powered IAM Misconfiguration Detector",
    eyebrow: "Cloud Security",
    description:
      "This tool scans AWS IAM configurations and uses Gemini to detect misconfigurations like wildcard permissions, missing MFA, publicly accessible resources, and risky trust relationships. It returns human-readable summaries and remediation steps.",
    stack: ["React", "Node.js", "Express", "AWS SDK", "Google Gemini API", "PostgreSQL", "Docker", "PM2"],
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
