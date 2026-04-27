import connectToDatabase from "@/lib/mongodb";
import Profile from "@/models/Profile";
import Skill from "@/models/Skill";
import Seo from "@/models/Seo";
import Resume from "@/models/Resume";

export const revalidate = 0; // Force dynamic fetching for the portfolio

async function getPortfolioData() {
  try {
    await connectToDatabase();
    
    const [profile, skills, services, projects, seo, resume] = await Promise.all([
      Profile.findOne(),
      Skill.find().sort({ order: 1 }),
      Service.find().sort({ order: 1 }),
      Project.find().sort({ order: 1, createdAt: -1 }),
      Seo.findOne(),
      Resume.findOne()
    ]);

    return {
      profile: profile ? JSON.parse(JSON.stringify(profile)) : null,
      skills: JSON.parse(JSON.stringify(skills)),
      services: JSON.parse(JSON.stringify(services)),
      projects: JSON.parse(JSON.stringify(projects)),
      seo: seo ? JSON.parse(JSON.stringify(seo)) : null,
      resume: resume ? JSON.parse(JSON.stringify(resume)) : null
    };
  } catch (error) {
    console.error("Database error:", error);
    return { profile: null, skills: [], services: [], projects: [], seo: null, resume: null };
  }
}

import Service from "@/models/Service";
import Project from "@/models/Project";
import PortfolioUI from "@/components/portfolio-ui";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  await connectToDatabase();
  const seo = await Seo.findOne();
  
  return {
    title: seo?.siteTitle || "Premium Portfolio",
    description: seo?.metaDescription || "A world-class personal portfolio.",
    keywords: seo?.keywords || "portfolio, developer",
    openGraph: {
      images: seo?.ogImage ? [seo.ogImage] : [],
    }
  };
}

export default async function Home() {
  const { profile, skills, services, projects, resume } = await getPortfolioData();

  const data = profile || {
    name: "Shiva",
    tagline: "AI Full Stack Developer",
    aboutText: "I build world-class digital products.",
    yearsExperience: "3+",
    projectsDelivered: "25+",
    technologiesMastered: "15+",
    socialLinks: {},
  };

  return <PortfolioUI data={data} skills={skills} services={services} projects={projects} resume={resume} />;
}
