import connectToDatabase from "@/lib/mongodb";
import Profile from "@/models/Profile";
import Link from "next/link";
import { Mail, ArrowRight, Download } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";

async function getProfile() {
  try {
    await connectToDatabase();
    const profile = await Profile.findOne();
    return profile;
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

export const revalidate = 0; // Disable caching for the dynamic parts for now, or use ISR

export default async function Home() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to the Portfolio</h1>
          <p className="mt-4 text-zinc-500">Please setup the profile in the admin panel.</p>
          <Link href="/admin/login">
            <Button className="mt-6">Go to Admin</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter">{profile.name}</div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="#about" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">About</Link>
            <Link href="#skills" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Skills</Link>
            <Link href="#services" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Services</Link>
            <Link href="#projects" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Projects</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#contact">
              <Button variant="default" size="sm">Hire Me</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 container mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1 text-sm mb-8 bg-zinc-50 dark:bg-zinc-900">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            Available for new projects
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
            {profile.tagline || "Digital Architect & Developer"}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mb-10">
            I craft world-class digital experiences, combining design aesthetics with high-performance engineering.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              View My Work <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
              <Download className="w-4 h-4" /> Download Resume
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-12 text-zinc-500 dark:text-zinc-400">
            {profile.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                <FaGithub className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </a>
            )}
            {profile.socialLinks?.twitter && (
              <a href={profile.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                <FaTwitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
            )}
            {profile.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                <FaLinkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
                <span className="sr-only">Email</span>
              </a>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">About Me</h2>
              <div className="prose prose-zinc dark:prose-invert text-lg text-zinc-600 dark:text-zinc-400">
                <p className="whitespace-pre-wrap">{profile.aboutText}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="text-4xl font-bold mb-2">{profile.yearsExperience || "0"}</div>
                <div className="text-sm font-medium text-zinc-500">Years Experience</div>
              </div>
              <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="text-4xl font-bold mb-2">{profile.projectsDelivered || "0"}</div>
                <div className="text-sm font-medium text-zinc-500">Projects Delivered</div>
              </div>
              <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 col-span-2">
                <div className="text-4xl font-bold mb-2">{profile.technologiesMastered || "0"}</div>
                <div className="text-sm font-medium text-zinc-500">Technologies Mastered</div>
              </div>
            </div>
          </div>
        </section>

        {/* Placeholders for Skills, Services, Projects */}
        <section id="skills" className="py-24 container mx-auto px-4">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Skills & Expertise</h2>
              <p className="text-zinc-500 dark:text-zinc-400">Technologies and tools I use to build robust solutions.</p>
           </div>
           <div className="p-12 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl text-center text-zinc-500">
             Skills section will be dynamically populated from the Admin panel.
           </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12">
        <div className="container mx-auto px-4 text-center text-zinc-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
