/**
 * SEED SCRIPT — Run with: node --env-file=.env scripts/seed.mjs
 * Seeds: Profile, Skills, Services, Projects, Seo, Resume, Settings
 */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in environment");
  process.exit(1);
}

// ── Schemas ───────────────────────────────────────────────────────────────────
const ProfileSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const SkillSchema   = new mongoose.Schema({}, { strict: false, timestamps: true });
const ServiceSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const ProjectSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const SeoSchema     = new mongoose.Schema({}, { strict: false, timestamps: true });
const ResumeSchema  = new mongoose.Schema({}, { strict: false, timestamps: true });
const SettingsSchema= new mongoose.Schema({}, { strict: false, timestamps: true });

const Profile  = mongoose.models.Profile  || mongoose.model("Profile",  ProfileSchema);
const Skill    = mongoose.models.Skill    || mongoose.model("Skill",    SkillSchema);
const Service  = mongoose.models.Service  || mongoose.model("Service",  ServiceSchema);
const Project  = mongoose.models.Project  || mongoose.model("Project",  ProjectSchema);
const Seo      = mongoose.models.Seo      || mongoose.model("Seo",      SeoSchema);
const Resume   = mongoose.models.Resume   || mongoose.model("Resume",   ResumeSchema);
const Settings = mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);

// ── Data ──────────────────────────────────────────────────────────────────────
const profileData = {
  name: "Balkrishan Prajapat (Shiva)",
  tagline: "Full-Stack Developer & AI Integration Expert",
  aboutText:
    "I'm a passionate full-stack developer from India who builds premium web applications, AI-powered tools, and scalable digital products. I help businesses go from idea to launch — fast, clean, and world-class.",
  profileImage: "",
  coverImage: "",
  location: "India • Working Worldwide",
  email: "sshivaprajapat@gmail.com",
  phone: "+91 8955256878",
  whatsapp: "https://wa.me/918955256878",
  socialLinks: {
    github: "https://github.com/The-CyberGenius",
    twitter: "https://x.com/X_shiva2001",
    linkedin: "https://www.linkedin.com/in/balkrishan-prajapat-188314192/",
    instagram: "https://www.instagram.com/i.shiva_01/",
    youtube: "https://www.youtube.com/@shiva2099",
  },
  yearsExperience: "3+",
  projectsDelivered: "25+",
  technologiesMastered: "20+",
};

const skillsData = [
  // Frontend
  { name: "Next.js",       category: "Frontend", icon: "⚡", proficiency: 95, order: 1 },
  { name: "React",         category: "Frontend", icon: "⚛️", proficiency: 95, order: 2 },
  { name: "TypeScript",    category: "Frontend", icon: "📘", proficiency: 88, order: 3 },
  { name: "Tailwind CSS",  category: "Frontend", icon: "🎨", proficiency: 95, order: 4 },
  { name: "Framer Motion", category: "Frontend", icon: "🌀", proficiency: 80, order: 5 },
  { name: "JavaScript",   category: "Frontend", icon: "🟨", proficiency: 92, order: 6 },
  // Backend
  { name: "Node.js",       category: "Backend",  icon: "🟢", proficiency: 90, order: 7 },
  { name: "MongoDB",       category: "Backend",  icon: "🍃", proficiency: 88, order: 8 },
  { name: "Express.js",   category: "Backend",  icon: "🚂", proficiency: 88, order: 9 },
  { name: "PostgreSQL",   category: "Backend",  icon: "🐘", proficiency: 75, order: 10 },
  { name: "REST APIs",    category: "Backend",  icon: "🔌", proficiency: 92, order: 11 },
  // AI / Tools
  { name: "OpenAI API",   category: "Tools",    icon: "🤖", proficiency: 85, order: 12 },
  { name: "Gemini API",   category: "Tools",    icon: "💎", proficiency: 82, order: 13 },
  { name: "LangChain",    category: "Tools",    icon: "🔗", proficiency: 72, order: 14 },
  { name: "Git & GitHub", category: "Tools",    icon: "🐱", proficiency: 90, order: 15 },
  { name: "Vercel",       category: "Tools",    icon: "▲",  proficiency: 90, order: 16 },
  { name: "Docker",       category: "Tools",    icon: "🐳", proficiency: 70, order: 17 },
];

const servicesData = [
  {
    title: "Full-Stack Web Development",
    description:
      "End-to-end web apps built with Next.js, React, Node.js and MongoDB. From pixel-perfect UI to robust APIs — delivered fast.",
    icon: "💻",
    order: 1,
  },
  {
    title: "AI Integration & Automation",
    description:
      "Supercharge your product with AI: chatbots, content generators, smart recommendations, and automated workflows using OpenAI & Gemini.",
    icon: "🤖",
    order: 2,
  },
  {
    title: "SaaS Product Development",
    description:
      "From MVPs to full-scale SaaS platforms — authentication, subscriptions, dashboards, and multi-tenancy built for scale.",
    icon: "🚀",
    order: 3,
  },
  {
    title: "E-Commerce Solutions",
    description:
      "Custom storefronts with product management, payments (Razorpay/Stripe), order tracking, and admin dashboards.",
    icon: "🛒",
    order: 4,
  },
  {
    title: "News & Media Platforms",
    description:
      "High-performance news portals with CMS, category management, scheduled publishing, and SEO optimization.",
    icon: "📰",
    order: 5,
  },
  {
    title: "API Design & Backend Architecture",
    description:
      "RESTful APIs, database schema design, authentication (JWT/OAuth), rate limiting, and cloud deployment.",
    icon: "⚙️",
    order: 6,
  },
];

const projectsData = [
  {
    title: "Aapno Digital Studio",
    description:
      "A premium digital studio website for a creative agency. Built with Next.js, Tailwind CSS, and Framer Motion for a cinematic experience.",
    image: "",
    link: "https://aapnodigitalstudio.in",
    github: "",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    featured: true,
    order: 1,
  },
  {
    title: "Professor Adda",
    description:
      "A full-scale education platform enabling professors to publish notes, manage courses, and engage students online.",
    image: "",
    link: "https://professoradda.com",
    github: "",
    tags: ["Next.js", "MongoDB", "Node.js", "Education"],
    featured: true,
    order: 2,
  },
  {
    title: "Professor Adda Notes",
    description:
      "A companion notes portal for students to access, download, and organize study materials across subjects.",
    image: "",
    link: "https://professoraddanotes.com",
    github: "",
    tags: ["Next.js", "REST API", "MongoDB"],
    featured: true,
    order: 3,
  },
  {
    title: "JG News Plus",
    description:
      "A modern news portal with category management, admin CMS, Rajasthan-focused district news, and AI-assisted article publishing.",
    image: "",
    link: "https://jg-news-plus.vercel.app",
    github: "",
    tags: ["Next.js", "MongoDB", "AI", "News Portal"],
    featured: true,
    order: 4,
  },
  {
    title: "Ratan Mahal",
    description:
      "A luxury property showcase website with elegant UI, enquiry forms, property gallery, and WhatsApp integration.",
    image: "",
    link: "https://ratan-mahal.vercel.app",
    github: "",
    tags: ["Next.js", "Tailwind CSS", "Real Estate"],
    featured: false,
    order: 5,
  },
  {
    title: "Rohini Dresses & Wears",
    description:
      "An e-commerce storefront for a clothing brand with product catalog, cart, and order management.",
    image: "",
    link: "https://rohini-dresses-wears.vercel.app",
    github: "",
    tags: ["Next.js", "E-Commerce", "MongoDB"],
    featured: false,
    order: 6,
  },
];

const seoData = {
  siteTitle: "Balkrishan Prajapat (Shiva) | Full-Stack Developer & AI Engineer",
  metaDescription:
    "Full-Stack Developer from India specializing in Next.js, React, AI integration, SaaS products, and premium web applications. Available for freelance projects worldwide.",
  keywords:
    "full stack developer india, next.js developer, ai integration developer, react developer, mongodb, nodejs, freelance developer, web app development",
  ogImage: "",
};

const resumeData = {
  sourceType: "upload",
  fileUrl: "",
};

const settingsData = {
  theme: "apple",
  primaryColor: "#000000",
  accentColor: "#6366f1",
  fontFamily: "Inter",
  maintenanceMode: false,
  hideServices: false,
  hideTestimonials: true,
  analyticsEnabled: true,
};

// ── Run ───────────────────────────────────────────────────────────────────────
async function seed() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log("✅ Connected.");

    // Clear existing data
    await Promise.all([
      Profile.deleteMany({}),
      Skill.deleteMany({}),
      Service.deleteMany({}),
      Project.deleteMany({}),
      Seo.deleteMany({}),
      Resume.deleteMany({}),
      Settings.deleteMany({}),
    ]);
    console.log("🗑️  Cleared existing data.");

    // Insert fresh data
    await Profile.create(profileData);
    await Skill.insertMany(skillsData);
    await Service.insertMany(servicesData);
    await Project.insertMany(projectsData);
    await Seo.create(seoData);
    await Resume.create(resumeData);
    await Settings.create(settingsData);

    console.log("✅ Profile seeded.");
    console.log(`✅ ${skillsData.length} Skills seeded.`);
    console.log(`✅ ${servicesData.length} Services seeded.`);
    console.log(`✅ ${projectsData.length} Projects seeded.`);
    console.log("✅ SEO, Resume, Settings seeded.");
    console.log("\n🎉 Database seeded successfully!");
  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
