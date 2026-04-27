"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useRef } from "react";

export default function PortfolioUI({ data, skills, services, projects }: { data: any, skills: any[], services: any[], projects: any[] }) {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  const frontendSkills = skills.filter(s => s.category === "Frontend");
  const backendSkills = skills.filter(s => s.category === "Backend");

  return (
    <div className="min-h-screen text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black font-sans">
      
      {/* Ultra-minimal Header */}
      <header className="fixed top-0 z-50 w-full mix-blend-difference text-white">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            className="font-bold text-xl tracking-tight"
          >
            {data.name}
          </motion.div>
          <motion.nav 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.1 }}
            className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase"
          >
            <Link href="#work" className="hover:opacity-70 transition-opacity">Work</Link>
            <Link href="#about" className="hover:opacity-70 transition-opacity">About</Link>
            <Link href="#contact" className="hover:opacity-70 transition-opacity">Contact</Link>
            <Link href="/admin/login" className="hover:opacity-70 transition-opacity">Admin</Link>
          </motion.nav>
        </div>
      </header>

      <main>
        {/* Cinematic Hero */}
        <motion.section 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="h-screen flex flex-col justify-center px-6 relative sticky top-0 z-0"
        >
          <div className="container mx-auto max-w-7xl">
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Apple-like easeOut
            >
              <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter mb-8">
                {(data?.name || "Shiva").split(' ')[0]}<br/>
                <span className="text-zinc-400 dark:text-zinc-600">Design.</span><br/>
                Code.
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-center justify-between mt-16 max-w-5xl"
            >
              <p className="text-xl md:text-3xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-tight font-medium tracking-tight mb-8 md:mb-0">
                {data.tagline || "Software Engineer & Digital Architect"}
              </p>
              
              <div className="flex gap-6 items-center">
                <a href="#work" className="flex items-center gap-2 text-lg font-medium border-b border-black dark:border-white pb-1 hover:opacity-60 transition-opacity">
                  View Work <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="bg-[#fafafa] dark:bg-black relative z-10 w-full rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Statement Section */}
          <section id="about" className="py-32 md:py-48 px-6">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-3xl md:text-6xl font-medium tracking-tight leading-tight text-zinc-400 dark:text-zinc-600 mb-12">
                  <span className="text-black dark:text-white">I build world-class digital products.</span> {data.aboutText}
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-12">
                  {[
                    { label: "Experience", value: data.yearsExperience },
                    { label: "Projects", value: data.projectsDelivered },
                    { label: "Tech Stack", value: data.technologiesMastered },
                    { label: "Location", value: data.location || "Remote" }
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="text-zinc-400 text-sm uppercase tracking-widest font-semibold mb-2">{stat.label}</div>
                      <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Immersive Projects Section */}
          <section id="work" className="py-24 px-6 bg-zinc-100 dark:bg-zinc-900/50 rounded-[3rem] mx-2 md:mx-6">
            <div className="container mx-auto max-w-7xl">
              <div className="flex justify-between items-end mb-20">
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">Selected<br/>Works.</h2>
              </div>

              <div className="grid gap-12 md:gap-24">
                {(projects.length > 0 ? projects : [1,2]).map((project: any, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="group"
                  >
                    <Link href={project.link || "#"} target="_blank" className="block relative overflow-hidden rounded-3xl aspect-[4/3] md:aspect-[21/9] bg-zinc-200 dark:bg-zinc-800">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-mono text-2xl uppercase tracking-widest">Project Concept</div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Floating View Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100 ease-out">
                        <div className="bg-white text-black px-6 py-3 rounded-full font-medium flex items-center gap-2">
                          View Case Study <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>

                    <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-3xl font-bold tracking-tight mb-2">{project.title || "Project Title"}</h3>
                        <p className="text-zinc-500 text-lg max-w-xl">{project.description}</p>
                      </div>
                      <div className="flex gap-3">
                        {(project.tags || ["Design", "Development"]).slice(0,3).map((tag: string, j: number) => (
                          <span key={j} className="px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Bento Box Skills */}
          <section className="py-32 md:py-48 px-6">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-center">Technical Arsenal</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Big Frontend Box */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="md:col-span-2 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-10 md:p-16 flex flex-col justify-between"
                >
                  <h3 className="text-2xl font-bold tracking-tight mb-12">Frontend Ecosystem</h3>
                  <div className="flex flex-wrap gap-4">
                    {(frontendSkills.length > 0 ? frontendSkills : [{name:"React"}, {name:"Next.js"}, {name:"Tailwind"}, {name:"Framer Motion"}]).map((skill: any, i) => (
                      <span key={i} className="text-xl md:text-3xl font-medium text-black dark:text-white px-6 py-3 rounded-full bg-white dark:bg-black shadow-sm">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Backend Box */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-10 flex flex-col justify-between"
                >
                  <h3 className="text-xl font-bold tracking-tight mb-8">Backend & Systems</h3>
                  <div className="space-y-4">
                    {(backendSkills.length > 0 ? backendSkills : [{name:"Node.js"}, {name:"MongoDB"}, {name:"PostgreSQL"}]).map((skill: any, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 last:border-0">
                        <span className="font-medium text-lg">{skill.name}</span>
                        {skill.icon && <span className="text-zinc-500">{skill.icon}</span>}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Services Box */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="md:col-span-3 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black rounded-3xl p-10 md:p-16"
                >
                  <h3 className="text-2xl font-bold tracking-tight mb-12">Core Competencies</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    {(services.length > 0 ? services : [{title: "UI/UX Architecture"}, {title: "API Development"}, {title: "Performance Optimization"}]).map((service: any, i) => (
                      <div key={i}>
                        <div className="text-3xl mb-4">{service.icon || "✦"}</div>
                        <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                        <p className="text-zinc-400 dark:text-zinc-600">{service.description || "Delivering high quality digital solutions."}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Cinematic Footer */}
          <footer id="contact" className="py-32 md:py-48 px-6 bg-black text-white rounded-t-[3rem] mt-24">
            <div className="container mx-auto max-w-6xl">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <h2 className="text-[10vw] md:text-9xl font-bold tracking-tighter leading-none mb-12">
                  Let's Talk.
                </h2>
                
                <div className="flex flex-wrap justify-center gap-6 mb-24">
                  <a href={`mailto:${data.email}`} className="px-8 py-4 rounded-full bg-white text-black font-semibold text-xl hover:scale-105 transition-transform flex items-center gap-3">
                    <Mail className="w-6 h-6" /> Get in touch
                  </a>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-zinc-800 text-zinc-500 font-medium tracking-wide">
                  <p>© {new Date().getFullYear()} {data.name}.</p>
                  
                  <div className="flex gap-8 mt-8 md:mt-0">
                    {data.socialLinks?.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>}
                    {data.socialLinks?.twitter && <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter</a>}
                    {data.socialLinks?.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>}
                  </div>
                </div>
              </motion.div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
