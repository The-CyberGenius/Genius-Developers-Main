/**
 * ============================================================
 *  🎯 CENTRAL WEBSITE DATA — EDIT THIS FILE TO UPDATE ANYTHING
 * ============================================================
 *
 *  All your website content lives here.
 *  Change your name, projects, services, contact info, etc.
 *  and it will automatically update across the entire website.
 */

// -----------------------------------------------------------
// 👤  PERSONAL INFORMATION
// -----------------------------------------------------------
export const siteConfig = {
  name: "Shiva",
  fullName: "Balkrishan Prajapat",
  role: "Full-Stack Developer",
  email: "sshivaprajapat@gmail.com",
  phone: "918955256878", // Include country code, no "+"
  location: "India • Working Worldwide",
  profileImage: "/me.jpg",
  githubUrl: "https://github.com/The-CyberGenius",
  // Hero section
  heroTagline: "Available for New Projects",
  heroSubtitle:
    "We craft hyper-optimized digital solutions that elevate your brand. From stunning web applications to scalable architectures, bringing your boldest ideas to life with flawless execution.",
  // About section
  aboutParagraph1:
    "I don't just write code; I architect revenue-generating engines. In a digital landscape crowded with mediocrity, I build platforms that demand attention and convert visitors into loyal customers.",
  aboutParagraph2:
    "My philosophy is simple: Speed wins, aesthetics sell, and precision scales. Whether you need a high-performance web app or a brand-defining portfolio, I deliver solutions that put you leagues ahead of the competition.",
  // Contact section
  contactHeading: "Stop Losing Potential Customers",
  contactSubtitle:
    "In a crowded market, blending in is failing. Let's build a digital presence that demands attention.",
  whatsappMessage: "Hello Shiva, I want to discuss a project.",
};

// -----------------------------------------------------------
// 🔗  SOCIAL LINKS (shown in Navbar, Footer, and Hero)
// -----------------------------------------------------------
export const socialLinks = {
  github: "https://github.com/The-CyberGenius",
  twitter: "https://x.com/X_shiva2001",
  linkedin: "https://www.linkedin.com/in/balkrishan-prajapat-188314192/",
  instagram: "https://www.instagram.com/i.shiva_01/",
  youtube: "https://www.youtube.com/@shiva2099",
};

// -----------------------------------------------------------
// 🧭  NAVIGATION ITEMS
// -----------------------------------------------------------
export const navItems = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

// -----------------------------------------------------------
// 📊  ABOUT STATS (numbers shown in the About section)
// -----------------------------------------------------------
export const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "Projects Delivered", value: "25+" },
  { label: "Client Satisfaction", value: "100%" },
  { label: "Revenue Generated", value: "10x" },
];

// -----------------------------------------------------------
// 🛠️  TECH STACK (shown in About section pills)
// -----------------------------------------------------------
export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Framer Motion",
  "Node.js",
];

// -----------------------------------------------------------
// 💼  PROJECTS (shown in the Work section)
// -----------------------------------------------------------
export const projects = [
  {
    id: 1,
    title: "Aapno Digital Studio",
    category: "Web App",
    image: "/projects/aapno-real.png",
    description:
      "A premium photography studio portfolio with cinematic animations and booking system.",
    tags: ["React", "GSAP", "Cinematic UI"],
    demoLink: "https://aapnodigitalstudio.in",
    codeLink: "#",
  },
  {
    id: 2,
    title: "Professor Adda",
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200",
    description:
      "Comprehensive educational platform offering courses and live classes for students.",
    tags: ["Next.js", "LMS", "Education"],
    demoLink: "https://professoradda.com",
    codeLink: "#",
  },
  {
    id: 3,
    title: "Professor Adda Notes",
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200",
    description:
      "Digital resource hub for study materials, notes, and academic content.",
    tags: ["Next.js", "Resource Hub", "Content"],
    demoLink: "https://professoraddanotes.com/",
    codeLink: "#",
  },
  {
    id: 4,
    title: "Ratan Mahal",
    category: "Hospitality",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
    description:
      "Luxury resort website showcasing amenities, rooms, and booking options.",
    tags: ["Hospitality", "Booking", "Visuals"],
    demoLink: "https://ratan-mahal.vercel.app/",
    codeLink: "#",
  },
  {
    id: 5,
    title: "Rohini Dresses & Wears",
    category: "Ecommerce",
    image: "/projects/rohini-preview.png",
    description:
      "A premium wholesale fashion platform for ethnic wear, uniforms, and fabrics with digital catalog.",
    tags: ["Next.js", "Wholesale", "Ecommerce"],
    demoLink: "https://rohini-dresses-wears.vercel.app/",
    codeLink: "#",
  },
  {
    id: 6,
    title: "JG News Plus",
    category: "Web App",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200",
    description:
      "A modern, dynamic news and media platform engineered for rapid content delivery.",
    tags: ["Next.js", "Media", "NewsPortal"],
    demoLink: "https://jg-news-plus.vercel.app/",
    codeLink: "#",
  },
];

// -----------------------------------------------------------
// 🎨  SERVICES (shown in the Services section)
// -----------------------------------------------------------
export const services = [
  {
    iconName: "Layout",
    title: "Website Development",
    description:
      "Custom, high-performance websites tailored to your brand focused on conversion and aesthetics.",
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-transparent",
    border: "group-hover:border-blue-500/50",
  },
  {
    iconName: "Rocket",
    title: "High-Converting Landing Pages",
    description:
      "Sales-focused pages designed with psychology and precision to maximize ROI and capture leads.",
    color: "text-red-400",
    gradient: "from-red-500/20 to-transparent",
    border: "group-hover:border-red-500/50",
  },
  {
    iconName: "ShoppingBag",
    title: "E-commerce Solutions",
    description:
      "Robust online stores with secure payments, inventory management, and seamless checkout experiences.",
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-transparent",
    border: "group-hover:border-emerald-500/50",
  },
  {
    iconName: "Smartphone",
    title: "Web Apps / PWAs",
    description:
      "Scalable progressive web apps that feel native, built with Next.js and modern technologies.",
    color: "text-purple-400",
    gradient: "from-purple-500/20 to-transparent",
    border: "group-hover:border-purple-500/50",
  },
  {
    iconName: "Gauge",
    title: "Performance Optimization",
    description:
      "Speeding up your digital presence. Core Web Vitals optimization for lighting fast load times.",
    color: "text-amber-400",
    gradient: "from-amber-500/20 to-transparent",
    border: "group-hover:border-amber-500/50",
  },
  {
    iconName: "Search",
    title: "SEO Optimization",
    description:
      "Ranking your website higher in search engines with technical SEO and best practices.",
    color: "text-pink-400",
    gradient: "from-pink-500/20 to-transparent",
    border: "group-hover:border-pink-500/50",
  },
];
