"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight, Download, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function PortfolioUI({ data, skills, services, projects }: { data: any, skills: any[], services: any[], projects: any[] }) {
  
  // Categorize skills
  const frontendSkills = skills.filter(s => s.category === "Frontend");
  const backendSkills = skills.filter(s => s.category === "Backend");
  const toolSkills = skills.filter(s => s.category === "Tools");

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Animated Ambient Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-cyan-500/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />
      </div>

      {/* Header (Glassmorphism) */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-2xl tracking-tighter flex items-center gap-2"
          >
            <Terminal className="w-6 h-6 text-zinc-900 dark:text-white" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">
              {data.name}
            </span>
          </motion.div>
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="hidden md:flex gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            <Link href="#about" className="hover:text-zinc-900 dark:hover:text-white transition-colors">About</Link>
            <Link href="#skills" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Skills</Link>
            <Link href="#services" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Services</Link>
            <Link href="#projects" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Projects</Link>
            <Link href="#contact" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Contact</Link>
          </motion.nav>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Link href="/admin/login">
              <Button variant="outline" className="rounded-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-white/20">Admin Login</Button>
            </Link>
          </motion.div>
        </div>
      </header>

      <main className="flex-1 relative z-10 pt-20">
        
        {/* HERO SECTION */}
        <section className="min-h-[90vh] flex items-center py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 backdrop-blur-md text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-6 border border-zinc-300/50 dark:border-zinc-700/50">
                🚀 Available for new projects
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
                  {data.tagline || "Digital Architect & Developer"}
                </span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                {data.aboutText?.split('.')[0] || "I craft world-class digital experiences, combining design aesthetics with high-performance engineering."}
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full h-14 px-8 text-base shadow-xl shadow-zinc-900/10 dark:shadow-white/5 hover:scale-105 transition-transform" asChild>
                  <Link href="#contact">
                    Let's Talk <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border-zinc-200 dark:border-zinc-800 hover:scale-105 transition-transform">
                  <Download className="mr-2 w-4 h-4" /> Download CV
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-6 mt-16 text-zinc-500 dark:text-zinc-400">
                {data.socialLinks?.github && (
                  <motion.a whileHover={{ scale: 1.2, color: "#fff" }} href={data.socialLinks.github} target="_blank" rel="noreferrer" className="transition-colors">
                    <FaGithub className="w-7 h-7" />
                  </motion.a>
                )}
                {data.socialLinks?.twitter && (
                  <motion.a whileHover={{ scale: 1.2, color: "#1DA1F2" }} href={data.socialLinks.twitter} target="_blank" rel="noreferrer" className="transition-colors">
                    <FaTwitter className="w-7 h-7" />
                  </motion.a>
                )}
                {data.socialLinks?.linkedin && (
                  <motion.a whileHover={{ scale: 1.2, color: "#0077b5" }} href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="transition-colors">
                    <FaLinkedin className="w-7 h-7" />
                  </motion.a>
                )}
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="w-full aspect-square rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 p-2 shadow-2xl relative">
                <div className="w-full h-full rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50">
                  {/* Decorative Abstract Shape */}
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="w-[150%] h-[150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#00000010_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff00_50%,#ffffff10_100%)]" 
                  />
                  <div className="absolute inset-0 m-4 rounded-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                     {/* Replace with actual image later */}
                     <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-zinc-300 dark:text-zinc-700">
                        {data.name?.charAt(0)}
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-12 border-y border-zinc-200/50 dark:border-zinc-800/50 bg-white/30 dark:bg-zinc-950/30 backdrop-blur-md relative z-10">
          <div className="container mx-auto px-4">
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               variants={staggerContainer}
               className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-zinc-200/50 dark:divide-zinc-800/50"
             >
                {[
                  { label: "Years Experience", value: data.yearsExperience || "3+" },
                  { label: "Projects Delivered", value: data.projectsDelivered || "25+" },
                  { label: "Technologies", value: data.technologiesMastered || "15+" },
                  { label: "Client Satisfaction", value: "100%" }
                ].map((stat, i) => (
                  <motion.div key={i} variants={fadeInUp} className="text-center px-4">
                    <div className="text-4xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-zinc-500 tracking-wide uppercase">{stat.label}</div>
                  </motion.div>
                ))}
             </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-32 relative z-10">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">About Me</h2>
              <div className="prose prose-lg prose-zinc dark:prose-invert text-zinc-600 dark:text-zinc-400">
                <p className="whitespace-pre-wrap leading-relaxed">{data.aboutText}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-white/20 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl"
            >
               <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Terminal className="w-5 h-5"/> Quick Facts</h3>
               <ul className="space-y-4">
                 {[
                   { label: "Location", value: data.location || "Worldwide" },
                   { label: "Email", value: data.email || "Contact via form" },
                   { label: "Role", value: data.tagline || "Developer" },
                 ].map((fact, i) => (
                   <li key={i} className="flex justify-between items-center py-3 border-b border-zinc-200/50 dark:border-zinc-800/50 last:border-0">
                     <span className="text-zinc-500 font-medium">{fact.label}</span>
                     <span className="font-semibold text-right text-zinc-900 dark:text-zinc-100">{fact.value}</span>
                   </li>
                 ))}
               </ul>
            </motion.div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-32 bg-white/30 dark:bg-zinc-950/30 backdrop-blur-lg border-y border-white/10 relative z-10">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Technical Arsenal</motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-zinc-500">Technologies I use to build scalable digital products.</motion.p>
            </motion.div>

            <div className="space-y-16">
              {[
                { title: "Frontend Development", items: frontendSkills.length > 0 ? frontendSkills : [{name:"React", proficiency:90}, {name:"Next.js", proficiency:85}, {name:"Tailwind", proficiency:95}] },
                { title: "Backend Development", items: backendSkills.length > 0 ? backendSkills : [{name:"Node.js", proficiency:80}, {name:"MongoDB", proficiency:85}] }
              ].map((category, idx) => (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <motion.h3 variants={fadeInUp} className="text-2xl font-bold mb-8">{category.title}</motion.h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {category.items.map((skill: any, i) => (
                      <motion.div 
                        key={i} 
                        variants={fadeInUp}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-lg transition-all"
                      >
                         <div className="text-3xl mb-4 text-zinc-700 dark:text-zinc-300 flex justify-center">
                            {/* Assuming icon is passed, else default dot */}
                            {skill.icon ? <span>{skill.icon}</span> : <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />}
                         </div>
                         <h4 className="font-semibold">{skill.name}</h4>
                         <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-1 mt-4 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: `${skill.proficiency}%` }}
                             transition={{ duration: 1, delay: 0.5 }}
                             className="bg-zinc-900 dark:bg-white h-full"
                           />
                         </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-32 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Featured Work</motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-zinc-500">Selected projects that showcase my passion and expertise.</motion.p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8"
            >
              {(projects.length > 0 ? projects : [1,2,3,4]).map((project: any, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group rounded-3xl overflow-hidden bg-white/50 dark:bg-zinc-900/50 border border-white/20 dark:border-zinc-800 backdrop-blur-xl shadow-2xl transition-all"
                >
                  <div className="aspect-video bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                     {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-400">Project Image</div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{project.title || `Project ${i}`}</h3>
                    <p className="text-zinc-500 mb-6 line-clamp-2">{project.description || "A comprehensive digital solution built with modern web technologies."}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                       {(project.tags || ["React", "Next.js", "Tailwind"]).map((tag: string, j: number) => (
                         <span key={j} className="text-xs font-medium px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full border border-zinc-200 dark:border-zinc-700">
                           {tag}
                         </span>
                       ))}
                    </div>
                    <div className="flex gap-4">
                      {project.link && (
                        <Button className="rounded-full" asChild>
                          <a href={project.link} target="_blank" rel="noreferrer">Live Demo <ArrowRight className="ml-2 w-4 h-4" /></a>
                        </Button>
                      )}
                      {project.github && (
                        <Button variant="outline" className="rounded-full" asChild>
                          <a href={project.github} target="_blank" rel="noreferrer"><FaGithub className="mr-2 w-4 h-4" /> Source</a>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md py-12 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start a project?</h2>
          <Button size="lg" className="rounded-full mb-12 shadow-xl shadow-zinc-900/10 dark:shadow-white/5" asChild>
             <Link href="#contact">Let's Connect</Link>
          </Button>
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} {data.name}. Designed & Built with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}
