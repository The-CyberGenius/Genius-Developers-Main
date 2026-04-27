"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight, ArrowUpRight, Download, Send, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function PortfolioUI({ data, skills, services, projects, resume }: { data: any, skills: any[], services: any[], projects: any[], resume?: any }) {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const frontendSkills = skills.filter(s => s.category === "Frontend");
  const backendSkills = skills.filter(s => s.category === "Backend");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setFormLoading(false);
    }
  };

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
                <a href="#work" className="flex items-center gap-2 text-lg font-medium border-b border-black dark:border-white pb-1 hover:opacity-60 transition-opacity text-black dark:text-white">
                  View Work <ArrowRight className="w-5 h-5" />
                </a>
                {resume?.fileUrl && (
                  <a href={resume.fileUrl} target="_blank" className="flex items-center gap-2 text-lg font-medium border-b border-black dark:border-white pb-1 hover:opacity-60 transition-opacity text-black dark:text-white">
                    Resume <Download className="w-5 h-5" />
                  </a>
                )}
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
                <h2 className="text-3xl md:text-6xl font-medium tracking-tight leading-tight text-zinc-400 dark:text-zinc-600 mb-12 text-black dark:text-white">
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
                {(projects.length > 0 ? projects : []).map((project: any, i) => (
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
                          View Project <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>

                    <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-3xl font-bold tracking-tight mb-2">{project.title || "Project Title"}</h3>
                        <p className="text-zinc-500 text-lg max-w-xl">{project.description}</p>
                      </div>
                      <div className="flex gap-3">
                        {(project.tags || []).slice(0,3).map((tag: string, j: number) => (
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
                    {frontendSkills.map((skill: any, i) => (
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
                    {backendSkills.map((skill: any, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 last:border-0">
                        <span className="font-medium text-lg">{skill.name}</span>
                        <span className="text-zinc-500 font-mono text-sm">{skill.proficiency}%</span>
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
                    {services.map((service: any, i) => (
                      <div key={i}>
                        <div className="text-3xl mb-4">{service.icon || "✦"}</div>
                        <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                        <p className="text-zinc-400 dark:text-zinc-600">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact Section / Let's Talk */}
          <footer id="contact" className="py-32 md:py-48 px-6 bg-black text-white rounded-t-[3rem] mt-24">
            <div className="container mx-auto max-w-6xl">
              <div className="grid lg:grid-cols-2 gap-20">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  <h2 className="text-[10vw] lg:text-9xl font-bold tracking-tighter leading-none mb-12">
                    Let's<br/>Talk.
                  </h2>
                  <p className="text-2xl text-zinc-400 mb-12 max-w-md">
                    Have a project in mind? Let's build something extraordinary together.
                  </p>
                  <div className="space-y-4 text-xl">
                    <a href={`mailto:${data.email}`} className="flex items-center gap-4 hover:text-zinc-400 transition-colors">
                      <Mail className="w-6 h-6" /> {data.email}
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="bg-zinc-900 p-8 md:p-12 rounded-[2rem]"
                >
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Your Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-transparent border-b border-zinc-800 py-3 text-xl focus:border-white outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-transparent border-b border-zinc-800 py-3 text-xl focus:border-white outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Message</label>
                      <textarea 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={4}
                        className="w-full bg-transparent border-b border-zinc-800 py-3 text-xl focus:border-white outline-none transition-colors resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={formLoading}
                      className="w-full py-6 rounded-full bg-white text-black font-bold text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {formLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-6 h-6" /> Send Message</>}
                    </button>
                  </form>
                </motion.div>
              </div>

              <div className="mt-48 pt-12 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="font-bold text-2xl tracking-tighter italic">Genius.</div>
                <div className="flex gap-8">
                  {data.socialLinks?.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors"><FaGithub className="w-6 h-6" /></a>}
                  {data.socialLinks?.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors"><FaLinkedin className="w-6 h-6" /></a>}
                  {data.socialLinks?.twitter && <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors"><FaTwitter className="w-6 h-6" /></a>}
                  {data.socialLinks?.instagram && <a href={data.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors"><FaInstagram className="w-6 h-6" /></a>}
                  {data.socialLinks?.youtube && <a href={data.socialLinks.youtube} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors"><FaYoutube className="w-6 h-6" /></a>}
                </div>
                <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
