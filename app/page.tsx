import connectToDatabase from "@/lib/mongodb";
import Profile from "@/models/Profile";
import Skill from "@/models/Skill";
import Service from "@/models/Service";
import Project from "@/models/Project";
import Seo from "@/models/Seo";
import Resume from "@/models/Resume";
import Settings from "@/models/Settings";
import PortfolioUI from "@/components/portfolio-ui";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

async function getPortfolioData() {
  try {
    await connectToDatabase();

    const [profile, skills, services, projects, seo, resume, settings] = await Promise.all([
      Profile.findOne().lean(),
      Skill.find().sort({ order: 1 }).lean(),
      Service.find().sort({ order: 1 }).lean(),
      Project.find().sort({ order: 1, createdAt: -1 }).lean(),
      Seo.findOne().lean(),
      Resume.findOne().lean(),
      Settings.findOne().lean(),
    ]);

    return {
      profile: profile ? JSON.parse(JSON.stringify(profile)) : null,
      skills: JSON.parse(JSON.stringify(skills)),
      services: JSON.parse(JSON.stringify(services)),
      projects: JSON.parse(JSON.stringify(projects)),
      seo: seo ? JSON.parse(JSON.stringify(seo)) : null,
      resume: resume ? JSON.parse(JSON.stringify(resume)) : null,
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
    };
  } catch (error) {
    console.error("Database error:", error);
    return { profile: null, skills: [], services: [], projects: [], seo: null, resume: null };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    await connectToDatabase();
    const seo = await Seo.findOne().lean() as any;
    return {
      title: seo?.siteTitle || "Shiva | AI Full Stack Developer",
      description: seo?.metaDescription || "A world-class premium personal portfolio.",
      keywords: seo?.keywords || "portfolio, developer, ai, full stack",
      openGraph: {
        images: seo?.ogImage ? [seo.ogImage] : [],
      },
    };
  } catch {
    return { title: "Shiva | Portfolio" };
  }
}

export default async function Home() {
  const { profile, skills, services, projects, resume, settings } = await getPortfolioData();

  const data = profile || {
    name: "Shiva",
    tagline: "AI Full Stack Developer",
    aboutText: "I build world-class digital products.",
    yearsExperience: "3+",
    projectsDelivered: "25+",
    technologiesMastered: "15+",
    email: "",
    location: "India",
    socialLinks: {},
  };

  return (
    <PortfolioUI
      data={data}
      skills={skills}
      services={services}
      projects={projects}
      resume={resume}
      settings={settings}
    />
  );
}
