import connectToDatabase from "@/lib/mongodb";
import Profile from "@/models/Profile";
import Skill from "@/models/Skill";
import Service from "@/models/Service";
import Project from "@/models/Project";
import Seo from "@/models/Seo";
import Resume from "@/models/Resume";
import Settings from "@/models/Settings";
import PortfolioUI from "@/components/portfolio-ui";
import { serialize } from "@/lib/serialize";
import { Metadata } from "next";

export const revalidate = 3600;

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
      profile: serialize(profile),
      skills: serialize(skills) ?? [],
      services: serialize(services) ?? [],
      projects: serialize(projects) ?? [],
      seo: serialize(seo),
      resume: serialize(resume),
      settings: serialize(settings),
    };
  } catch (error) {
    console.error("Database error:", error);
    return { profile: null, skills: [], services: [], projects: [], seo: null, resume: null, settings: null };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    await connectToDatabase();
    const seo = await Seo.findOne().lean() as any;

    const title = seo?.siteTitle || "Shiva | AI Engineer & Full Stack Developer";
    const description = seo?.metaDescription || "Building premium AI-powered products, scalable systems, and modern web experiences.";
    const ogImage = seo?.ogImage || "/favicon.png";

    return {
      metadataBase: new URL("https://geniusdevelopers.space"),
      title,
      description,
      keywords: seo?.keywords || "AI engineer, full stack developer, portfolio, nextjs, mongodb, automation",
      alternates: { canonical: "/" },
      openGraph: {
        type: "website",
        url: "https://geniusdevelopers.space",
        title,
        description,
        siteName: "Genius Developers",
        images: [{ url: ogImage }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return { title: "Shiva | Portfolio" };
  }
}

export default async function Home() {
  const { profile, skills, services, projects, resume, settings } = await getPortfolioData();

  const data = profile || {
    name: "Shiva",
    tagline: "AI Engineer • Full Stack Developer • System Builder",
    aboutText: "I build premium AI-powered products, scalable systems, and immersive digital experiences for the modern web.",
    yearsExperience: "3+",
    projectsDelivered: "25+",
    technologiesMastered: "15+",
    email: "",
    location: "India",
    socialLinks: {},
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    jobTitle: data.tagline,
    description: data.aboutText,
    url: "https://geniusdevelopers.space",
    email: data.email || undefined,
    address: data.location
      ? {
          "@type": "PostalAddress",
          addressLocality: data.location,
        }
      : undefined,
    sameAs: data.socialLinks
      ? Object.values(data.socialLinks).filter((v): v is string => typeof v === "string" && v.length > 0)
      : [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PortfolioUI
        data={data}
        skills={skills}
        services={services}
        projects={projects}
        resume={resume}
        settings={settings}
      />
    </>
  );
}
