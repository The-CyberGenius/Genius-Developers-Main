import connectToDatabase from "@/lib/mongodb";
import Profile from "@/models/Profile";
import Skill from "@/models/Skill";
import Service from "@/models/Service";
import Project from "@/models/Project";
import PortfolioUI from "@/components/portfolio-ui";

export const revalidate = 0; // Force dynamic fetching for the portfolio

async function getPortfolioData() {
  try {
    await connectToDatabase();
    
    const [profile, skills, services, projects] = await Promise.all([
      Profile.findOne(),
      Skill.find().sort({ order: 1 }),
      Service.find().sort({ order: 1 }),
      Project.find().sort({ order: 1, createdAt: -1 })
    ]);

    return {
      profile: profile ? JSON.parse(JSON.stringify(profile)) : null,
      skills: JSON.parse(JSON.stringify(skills)),
      services: JSON.parse(JSON.stringify(services)),
      projects: JSON.parse(JSON.stringify(projects))
    };
  } catch (error) {
    console.error("Database error:", error);
    return { profile: null, skills: [], services: [], projects: [] };
  }
}

export default async function Home() {
  const { profile, skills, services, projects } = await getPortfolioData();

  const data = profile || {
    name: "Shiva",
    tagline: "AI Full Stack Developer",
    aboutText: "I build world-class digital products.",
    yearsExperience: "3+",
    projectsDelivered: "25+",
    technologiesMastered: "15+",
    socialLinks: {},
  };

  return <PortfolioUI data={data} skills={skills} services={services} projects={projects} />;
}
