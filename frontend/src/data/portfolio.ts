// All content below is sourced directly from Shashidhar Biradar's resume.
// Edit this file to update site content — components read from here.

export const profile = {
  name: "Shashidhar Biradar",
  roles: [
    "Full Stack Java Developer",
    "Spring Boot & React Specialist",
    "Backend Developer",
  ],
  location: "Pune, Maharashtra, India",
  phone: "+91 6363284060",
  email: "shashidharbiradar6@gmail.com",
  github: "https://github.com/shashidharbiradar",
  linkedin: "https://www.linkedin.com/in/shashidhar-biradar-20a999293/",
  resumeFile: "/resume.pdf",
  profileImage: "/profile.jpg",
  tagline:
    "I build scalable, secure full-stack web applications using Java, Spring Boot, and React.js — combining clean architecture, performance, and user-centric design to turn ideas into production-ready products.",
  languagesSpoken: [
    "English",
    "Hindi",
    "Kannada",
    "Marathi",
    "Telugu",
    "Tamil",
  ],
};

export const about = {
  paragraphs: [
    "I'm a Full Stack Java Developer with hands-on experience building scalable, secure web applications using Java, Spring Boot, Spring Security, Hibernate/JPA, MySQL, and React.js.",
    "I work across the complete software development lifecycle — requirement gathering, database design, REST API and payment gateway integration, deployment, and maintenance — using Agile practices and Git/GitHub.",
    "As a freelance developer, I've independently delivered production-ready full-stack platforms end to end, from architecture through deployment. I'm currently completing my BCA, graduating in 2026.",
  ],
  highlights: [
    { label: "Full SDLC ownership", value: "Requirements to deployment" },
    { label: "Core stack", value: "Java · Spring Boot · React.js" },
    { label: "Currently", value: "Freelance Full Stack Developer" },
  ],
};

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  details: string[];
};

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Sarhad College of Arts, Commerce and Science",
    period: "Expected April 2026",
    details: [
      "CGPA: 9.42 (1st Year), 9.14 (2nd Year), 9.0+ (3rd Year, expected)",
      "Coursework: Programming Fundamentals, Database Management, Web Development, Software Engineering",
    ],
  },
  {
    degree: "Intermediate in Commerce",
    institution: "VVS Independent PU College",
    period: "March 2023",
    details: ["Score: 74%"],
  },
];

export type SkillCategory = {
  title: string;
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Java", level: 90 },
      { name: "JavaScript (ES6+)", level: 85 },
      { name: "HTML5", level: 92 },
      { name: "CSS3", level: 88 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Spring Boot", level: 88 },
      { name: "Spring Security", level: 82 },
      { name: "Spring MVC", level: 80 },
      { name: "Hibernate / JPA", level: 82 },
      { name: "REST APIs", level: 90 },
      { name: "JWT Authentication", level: 85 },
      { name: "Servlets & JSP", level: 78 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 88 },
      { name: "JavaScript (ES6+)", level: 85 },
      { name: "Bootstrap", level: 80 },
      { name: "Responsive Web Design", level: 88 },
    ],
  },
  {
    title: "Database & Tools",
    skills: [
      { name: "MySQL", level: 86 },
      { name: "Database Design", level: 82 },
      { name: "Git / GitHub", level: 88 },
      { name: "Eclipse", level: 80 },
      { name: "Tomcat", level: 78 },
      { name: "Postman", level: 82 },
      { name: "Razorpay Integration", level: 80 },
    ],
  },
];

export const achievements = [
  "Independently designed, developed, and deployed full-stack production applications end-to-end (Java, Spring Boot, React.js, MySQL)",
  "Successfully integrated secure JWT-based authentication and Spring Security into live applications",
  "Integrated Razorpay payment gateway and WhatsApp-based customer support into a production platform",
  "Reduced load times and improved application stability through performance optimization and bug fixing",
  "Recommended software tools and trained 5+ employees during internship, improving onboarding time and team productivity",
  "Managed multiple client projects from requirement gathering through to production deployment",
];

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    id: "universalurja",
    title: "UniversalUrja",
    category: "Freelance / Production Project",
    description:
      "A production-ready full-stack e-commerce and wellness platform supporting online sales, course bookings, and consultation scheduling.",
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Hibernate/JPA",
      "MySQL",
      "React.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "REST APIs",
      "JWT Authentication",
      "Razorpay",
      "Git",
      "GitHub",
    ],
    highlights: [
      "Built scalable REST APIs with Spring Boot",
      "Implemented Spring Security with JWT authentication",
      "Designed normalized MySQL schema using Hibernate/JPA",
      "Integrated Razorpay for live payments",
      "Delivered order tracking, booking system, and admin dashboard",
      "End-to-end ownership: architecture through deployment",
    ],
  },
  {
    id: "urbaneye",
    title: "UrbanEye",
    category: "Academic Project",
    description:
      "A web-based platform helping citizens report and track urban infrastructure issues such as road damage, waste management, and public complaints.",
    techStack: ["Java", "JSP", "Servlet", "MySQL", "HTML5", "CSS3", "JavaScript"],
    highlights: [
      "Centralized complaint management and tracking system",
      "Backend functionality built with Java Servlets",
      "Streamlined issue reporting and resolution workflow",
    ],
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Freelance Full Stack Developer",
    company: "Independent Contractor (Remote)",
    period: "May 2026 – Present",
    points: [
      "Designed, developed, and deployed full-stack web applications end-to-end using Java, Spring Boot, React.js, and MySQL, owning the full project lifecycle from requirements to production",
      "Conducted client requirement gathering and translated business needs into technical specs, ensuring on-time delivery across multiple client projects",
      "Built responsive, mobile-first UIs with React.js, JavaScript, HTML5, and CSS3",
      "Developed secure REST APIs with Spring Security and JWT authentication",
      "Designed normalized MySQL schemas with Hibernate/JPA; integrated Razorpay payments and WhatsApp-based customer support",
      "Deployed to production and performed ongoing maintenance, bug fixing, and performance optimization",
      "Managed version control with Git/GitHub following Agile practices",
    ],
  },
  {
    role: "Marketing & Graphic Design Intern",
    company: "I-Well Health Solutions Pvt. Ltd.",
    period: "May 2025 – August 2025",
    points: [
      "Collaborated with cross-functional teams on digital marketing and design initiatives, contributing to brand visibility and process improvements",
      "Recommended software tools and trained 5+ employees, improving team productivity and onboarding time",
    ],
  },
];

export const stats = [
  { label: "Projects Delivered", value: 2 },
  { label: "Full-Stack Layers Owned", value: 3 },
  { label: "Languages Spoken", value: 6 },
  { label: "Years Building", value: 2 },
];
