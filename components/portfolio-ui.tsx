"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, Send, Loader2, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";

export default function PortfolioUI({ data, skills, services, projects, resume, settings }: {
  data: any; skills: any[]; services: any[]; projects: any[]; resume?: any; settings?: any;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const theme = settings?.theme || "apple";

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Advanced Parallax values (REFINED FOR CLEAN LOOK)
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 0.98]);
  const heroY = useTransform(smoothProgress, [0, 0.5], ["0%", "-2%"]);

  const titleX = useTransform(smoothProgress, [0, 0.5], ["0%", "-2%"]);
  const subtitleX = useTransform(smoothProgress, [0, 0.5], ["0%", "2%"]);
  const taglineOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  const overlayOpacity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
  const bgZoom = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  // Animation Variants for sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const frontendSkills = skills.filter(s => s.category === "Frontend");
  const backendSkills = skills.filter(s => s.category === "Backend");

  // Theme Styles
  const themeClasses = {
    apple: "bg-white dark:bg-black text-black dark:text-white",
    midnight: "bg-[#0a0b1e] text-white",
    neon: "bg-black text-[#0ff]",
    forest: "bg-[#0c1a12] text-[#e0f2e9]",
    ember: "bg-[#1a0c0c] text-[#f2e0e0]",
    gold: "bg-[#0f0e0c] text-[#d4af37]",
  }[theme as string] || "bg-white dark:bg-black text-black dark:text-white";

  const accentColor = {
    apple: "bg-black dark:bg-white text-white dark:text-black",
    midnight: "bg-[#4f46e5] text-white",
    neon: "bg-[#0ff] text-black",
    forest: "bg-[#2d5a44] text-white",
    ember: "bg-[#b91c1c] text-white",
    gold: "bg-[#d4af37] text-black",
  }[theme as string] || "bg-black dark:bg-white text-white dark:text-black";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Message sent! I'll reply soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed. Please try again.");
      }
    } catch { toast.error("Network error."); }
    finally { setFormLoading(false); }
  };

  return (
    <div ref={containerRef} className={`${themeClasses} transition-colors duration-700 overflow-x-hidden selection:bg-zinc-500/30 relative text-base`}>

      {/* ── PREMIUM NOISE OVERLAY ────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* ── FIXED NAV ─────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 z-[100] w-full"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between backdrop-blur-sm bg-transparent">
          <span className="font-black text-xl md:text-2xl tracking-tighter">
            {(data?.name || "Shiva").split(" ")[0]}<span className="text-zinc-500">.</span>
          </span>
          <nav className="hidden md:flex gap-8 lg:gap-10 text-[9px] font-black uppercase tracking-[0.2em] opacity-60">
            {['work', 'skills', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} className="hover:opacity-100 transition-opacity uppercase">{item}</a>
            ))}
            <Link href="/admin/login" className="hover:opacity-100 transition-opacity">Admin</Link>
          </nav>
        </div>
      </motion.header>

      {/* ── CLEAN HERO ────────────────────────────────────── */}
      <div ref={heroRef} className="h-[120vh] relative">
        <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-12">
          
          {/* Subtle Background Elements */}
          <motion.div style={{ scale: bgZoom, opacity: heroOpacity }} className="absolute inset-0 pointer-events-none -z-10">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full bg-gradient-radial from-zinc-100/10 dark:from-zinc-900/10 to-transparent blur-3xl" />
             <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-[0.01] dark:opacity-[0.03] overflow-hidden">
                <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap text-[25vh] font-black uppercase gap-40">
                  <span>Innovation</span><span>✦</span><span>Experience</span><span>✦</span><span>Design</span><span>✦</span>
                </motion.div>
             </div>
          </motion.div>

          <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="max-w-[1400px] mx-auto w-full relative z-20">
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.2 }} className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 border-l border-current pl-4">Full Stack Developer</span>
            </motion.div>
            
            <motion.h1 style={{ x: titleX }} className="text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-black tracking-tighter leading-[0.8] mb-4">
              {(data?.name || "Shiva").split(" ")[0]}
            </motion.h1>
            
            {(data?.name || "").split(" ").length > 1 && (
              <motion.h1 style={{ x: subtitleX }} className="text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-black tracking-tighter leading-[0.8] text-zinc-200 dark:text-zinc-800 mb-12">
                {data.name.split(" ").slice(1).join(" ")}.
              </motion.h1>
            )}

            <motion.div style={{ opacity: taglineOpacity }} className="flex flex-col md:flex-row md:items-center justify-between gap-8 max-w-5xl">
              <p className="text-xl md:text-2xl font-medium tracking-tight max-w-xl opacity-70">
                {data?.tagline || "I build high-performance digital solutions that drive impact."}
              </p>
              <div className="flex gap-4">
                 <a href="#work" className={`px-8 py-4 rounded-full ${accentColor} font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all`}>View Work</a>
                 {resume?.fileUrl && (
                  <a href={resume.fileUrl} target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full border border-current/10 font-black uppercase text-[10px] tracking-widest hover:bg-current/5 transition-all">CV</a>
                 )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── TECH STRIP (CLEAN) ───────────────────────────── */}
      <section className="relative z-30 py-12 md:py-20 border-y border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 overflow-hidden">
           <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              {["Next.js", "React", "TypeScript", "Node.js", "Tailwind", "MongoDB", "AI"].map((tech) => (
                <span key={tech} className="text-sm md:text-xl font-black uppercase tracking-[0.2em]">{tech}</span>
              ))}
           </div>
        </div>
      </section>

      {/* ── ABOUT (CLEAN) ────────────────────────────────── */}
      <section className="py-24 md:py-48 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950">
         <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 md:gap-24">
            <div className="lg:col-span-5">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">About Me</p>
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-10">Crafting<br />Excellence.</h2>
            </div>
            <div className="lg:col-span-7">
               <p className="text-2xl md:text-4xl font-medium leading-[1.2] tracking-tight mb-12 opacity-80">
                  {data?.aboutText || "Passionate developer focused on building scalable, user-centric web applications and AI-integrated systems."}
               </p>
               <div className="flex gap-6">
                  {data?.email && (
                    <a href={`mailto:${data.email}`} className="text-[10px] font-black uppercase tracking-widest border-b-2 border-current pb-1 hover:opacity-50 transition-all">Get in touch</a>
                  )}
                  {data?.whatsapp && (
                    <a href={data.whatsapp} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-widest border-b-2 border-current pb-1 hover:opacity-50 transition-all">WhatsApp</a>
                  )}
               </div>
            </div>
         </div>
      </section>

      {/* ── PROJECTS (CLEAN LIST) ────────────────────────── */}
      <section id="work" className="py-24 md:py-48 px-6 md:px-12 bg-white dark:bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Portfolio</p>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">Selected Works</h2>
          </div>
          
          <div className="divide-y border-t border-zinc-100 dark:border-zinc-900">
            {(projects.length > 0 ? projects : [
              { title: "Project Alpha", description: "Advanced web platform with AI features.", tags: ["Next.js", "AI"] }
            ]).map((p: any, i: number) => (
              <motion.a 
                key={i} 
                href={p.link || "#"} 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ x: 10 }}
                className="py-12 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8 group"
              >
                <div className="flex gap-8 md:gap-16 items-start">
                  <span className="text-zinc-300 dark:text-zinc-800 font-black text-xl md:text-2xl pt-2">{String(i+1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-3xl md:text-6xl font-black tracking-tighter mb-4 group-hover:opacity-50 transition-opacity uppercase">{p.title}</h3>
                    <p className="text-base md:text-xl opacity-50 max-w-2xl">{p.description}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                   {(p.tags || []).slice(0, 3).map((t: string) => (
                     <span key={t} className="px-4 py-1.5 rounded-full border border-current/10 text-[9px] font-black uppercase tracking-widest opacity-40">{t}</span>
                   ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS & SERVICES (CLEAN CARDS) ──────────────── */}
      <section id="skills" className="py-24 md:py-48 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 md:gap-24">
           <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">Technical Stack</p>
              <div className="space-y-12">
                 {[...frontendSkills, ...backendSkills].slice(0, 6).map((s: any, i: number) => (
                   <div key={i}>
                      <div className="flex justify-between items-end mb-4">
                        <span className="text-xl md:text-2xl font-black uppercase tracking-tighter">{s.name}</span>
                        <span className="text-[10px] font-mono opacity-40">{s.proficiency}%</span>
                      </div>
                      <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.proficiency}%` }} className="h-full bg-current" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className={`p-8 md:p-16 rounded-[2rem] ${accentColor} flex flex-col justify-between`}>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-12">Services</h3>
              <div className="space-y-8">
                {services.slice(0, 4).map((s: any, i: number) => (
                  <div key={i}>
                    <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-2">{s.title}</p>
                    <p className="text-sm opacity-60 max-w-[300px] leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>
              <a href="#contact" className="mt-16 inline-flex items-center gap-3 font-black uppercase text-[10px] tracking-widest border-b border-current pb-2 hover:gap-6 transition-all">Start Today <ArrowRight className="w-4 h-4" /></a>
           </div>
        </div>
      </section>

      {/* ── CONTACT (CLEAN) ──────────────────────────────── */}
      <section id="contact" className="py-24 md:py-48 px-6 md:px-12 bg-white dark:bg-black">
         <div className="max-w-[1400px] mx-auto text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-10">Collaboration</p>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-20 leading-[0.8]">Let's Build<br />Something Great.</h2>
            
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-12">
               <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} 
                 className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-6 text-2xl md:text-4xl focus:outline-none focus:border-current transition-all placeholder:opacity-20 text-center" placeholder="Your Name" />
               <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} 
                 className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-6 text-2xl md:text-4xl focus:outline-none focus:border-current transition-all placeholder:opacity-20 text-center" placeholder="Your Email" />
               <button type="submit" disabled={formLoading} className={`w-full py-8 rounded-full ${accentColor} font-black text-xl md:text-2xl uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50`}>
                 {formLoading ? "Sending..." : "Send Inquiry"}
               </button>
            </form>
            <div className="mt-32 flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-widest opacity-40">
               {data?.email && <a href={`mailto:${data.email}`} className="hover:opacity-100 transition-opacity">Email</a>}
               {data?.socialLinks?.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="hover:opacity-100 transition-opacity">GitHub</a>}
               {data?.socialLinks?.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-100 transition-opacity">LinkedIn</a>}
            </div>
         </div>
      </section>

      {/* ── FOOTER (CLEAN) ───────────────────────────────── */}
      <footer className="py-12 md:py-20 px-6 md:px-12 border-t border-zinc-100 dark:border-zinc-900 opacity-20">
         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-widest">
            <p>© {new Date().getFullYear()} — {(data?.name || "SHIVA").toUpperCase()}</p>
            <div className="flex gap-8">
               {['work', 'skills', 'contact'].map(i => <a key={i} href={`#${i}`} className="hover:underline">{i}</a>)}
            </div>
         </div>
      </footer>
    </div>
  );
}
