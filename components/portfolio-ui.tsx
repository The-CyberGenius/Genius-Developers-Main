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

  // Advanced Parallax values
  const heroOpacity  = useTransform(smoothProgress, [0, 0.7], [1, 0]);
  const heroScale    = useTransform(smoothProgress, [0, 0.7], [1, 0.85]);
  const heroRotate   = useTransform(smoothProgress, [0, 0.7], [0, -2]);
  const heroY        = useTransform(smoothProgress, [0, 0.7], ["0%", "-15%"]);
  
  const titleX       = useTransform(smoothProgress, [0, 0.7], ["0%", "-10%"]);
  const subtitleX    = useTransform(smoothProgress, [0, 0.7], ["0%", "10%"]);
  const taglineY     = useTransform(smoothProgress, [0, 0.5], ["0%", "50%"]);
  const taglineOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  
  const overlayOpacity = useTransform(smoothProgress, [0.5, 0.8], [0, 1]);
  const bgZoom = useTransform(smoothProgress, [0, 1], [1, 1.2]);

  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const frontendSkills = skills.filter(s => s.category === "Frontend");
  const backendSkills  = skills.filter(s => s.category === "Backend");

  // Theme Styles
  const themeClasses = {
    apple: "bg-[#fafafa] dark:bg-[#050505] text-black dark:text-white",
    midnight: "bg-[#0a0b1e] text-white",
    neon: "bg-black text-[#0ff]",
    forest: "bg-[#0c1a12] text-[#e0f2e9]",
    ember: "bg-[#1a0c0c] text-[#f2e0e0]",
    gold: "bg-[#0f0e0c] text-[#d4af37]",
  }[theme as string] || "bg-[#fafafa] dark:bg-[#050505] text-black dark:text-white";

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
    <div ref={containerRef} className={`${themeClasses} transition-colors duration-700 overflow-x-hidden selection:bg-zinc-500/30`}>

      {/* ── FIXED NAV ─────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 z-[100] w-full mix-blend-difference pointer-events-none"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between pointer-events-auto">
          <span className="text-white font-black text-xl tracking-tight">
            {(data?.name || "Shiva").split(" ")[0]}<span className="text-zinc-400">.</span>
          </span>
          <nav className="hidden md:flex gap-10 text-sm font-semibold text-white/60">
            <a href="#work"    className="hover:text-white transition-colors">Work</a>
            <a href="#skills"  className="hover:text-white transition-colors">Skills</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link>
          </nav>
        </div>
      </motion.header>

      {/* ── STICKY HERO ───────────────────────────────────── */}
      <div ref={heroRef} className="h-[250vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-6 md:px-12">
          
          {/* Background Elements */}
          <motion.div 
            style={{ scale: bgZoom, opacity: heroOpacity }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full bg-gradient-radial from-zinc-200/20 dark:from-zinc-800/20 to-transparent blur-3xl" />
            {theme === 'neon' && (
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#0ff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            )}
          </motion.div>

          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-10"
          />

          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY, rotate: heroRotate }}
            className="relative z-20 max-w-[1400px] mx-auto w-full"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8"
            >
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium ${theme === 'neon' ? 'border-[#0ff]/30 text-[#0ff]' : 'text-zinc-500'}`}>
                <span className={`w-2 h-2 rounded-full animate-pulse ${theme === 'neon' ? 'bg-[#0ff]' : 'bg-green-500'}`} />
                {theme === 'neon' ? 'SYSTEM_ONLINE' : 'Available for freelance'}
              </span>
            </motion.div>

            {/* Main title with split parallax */}
            <div className="mb-2">
              <motion.h1
                style={{ x: titleX }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[14vw] font-black tracking-tighter leading-[0.8] text-black dark:text-white"
              >
                {(data?.name || "Balkrishan").split(" ")[0]}
              </motion.h1>
            </div>
            <div className="mb-12">
              <motion.h1
                style={{ x: subtitleX }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[14vw] font-black tracking-tighter leading-[0.8] text-zinc-400 dark:text-zinc-500"
              >
                {(data?.name || "Prajapat").split(" ").slice(1).join(" ") || "Prajapat"}.
              </motion.h1>
            </div>

            <motion.div
              style={{ y: taglineY, opacity: taglineOpacity }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-10"
            >
              <div className="max-w-xl">
                <p className="text-2xl md:text-3xl font-medium leading-tight">
                  {data?.tagline || "Full-Stack Developer & AI Integration Expert"}
                </p>
                <p className="text-zinc-400 dark:text-zinc-500 mt-3 text-lg">{data?.location || "India • Working Worldwide"}</p>
              </div>
              <div className="flex flex-wrap gap-5">
                <a href="#work" className={`px-8 py-4 rounded-full ${accentColor} font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-black/5`}>
                  Selected Projects <ArrowRight className="w-4 h-4" />
                </a>
                {resume?.fileUrl && (
                  <a href={resume.fileUrl} target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full border border-zinc-300 dark:border-zinc-700 font-bold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all flex items-center gap-2">
                    CV <Download className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── TECH STACK (PREMIUM REPLACEMENT FOR MARQUEE) ──────────────── */}
      <section className="relative z-20 py-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-md"
            >
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-400 mb-4">Core Engine</h3>
              <p className="text-3xl font-bold leading-tight">Powered by the latest high-performance technologies.</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[
                { name: "Next.js 15", color: "bg-black text-white", icon: "✦" },
                { name: "React 19", color: "bg-blue-500/10 text-blue-500", icon: "⚛" },
                { name: "TypeScript", color: "bg-blue-600/10 text-blue-600", icon: "TS" },
                { name: "Tailwind", color: "bg-cyan-500/10 text-cyan-500", icon: "≈" },
                { name: "Node.js", color: "bg-green-500/10 text-green-500", icon: "⬢" },
                { name: "MongoDB", color: "bg-emerald-500/10 text-emerald-500", icon: "🍃" },
                { name: "AI Agents", color: "bg-purple-500/10 text-purple-500", icon: "✧" },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl border border-current/10 font-bold ${tech.color} shadow-lg shadow-black/5 backdrop-blur-sm`}
                >
                  <span className="text-xl">{tech.icon}</span>
                  <span className="text-sm tracking-tight">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative background blur for the tech section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent opacity-50" />
      </section>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section className="py-48 px-6 md:px-12 relative">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.9 }}>
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">Concept</p>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
              Visionary<br /><span className="text-zinc-300 dark:text-zinc-700">Digital<br />Products.</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.9, delay:0.2 }}>
            <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-12 text-zinc-500 dark:text-zinc-400">
              {data?.aboutText || "I build world-class digital products that scale, impress, and convert."}
            </p>
            <div className="flex flex-wrap gap-4">
              {data?.email && (
                <a href={`mailto:${data.email}`} className={`inline-flex items-center gap-2 px-8 py-4 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-bold hover:${accentColor} transition-all`}>
                  <Mail className="w-4 h-4" /> Drop a Line
                </a>
              )}
              {data?.whatsapp && (
                <a href={data.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-bold hover:bg-green-500 hover:text-white hover:border-green-500 transition-all">
                  <FaWhatsapp className="w-4 h-4" /> WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────── */}
      <section id="work" className={`py-48 px-6 md:px-12 ${theme === 'neon' ? 'bg-black' : 'bg-black dark:bg-white'}`}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.9 }} className="mb-24">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-6">Archive</p>
            <h2 className={`text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] ${theme === 'neon' ? 'text-[#0ff]' : 'text-white dark:text-black'}`}>
              Featured<br />Projects.
            </h2>
          </motion.div>

          <div className={`divide-y ${theme === 'neon' ? 'divide-[#0ff]/20' : 'divide-white/10 dark:divide-black/10'}`}>
            {(projects.length > 0 ? projects : [
              { title: "No projects yet", description: "Start adding some in the admin panel.", tags: [], link: "/admin" }
            ]).map((p: any, i: number) => (
              <motion.a
                key={i}
                href={p.link || "#"}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.8, delay: i*0.08 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 py-12 group transition-all"
              >
                <div className="flex items-center gap-10 flex-1">
                  <span className="text-zinc-600 font-mono text-lg w-10 shrink-0 group-hover:text-white dark:group-hover:text-black transition-colors">{String(i+1).padStart(2,"0")}</span>
                  <div>
                    <h3 className={`text-3xl md:text-5xl font-black mb-3 ${theme === 'neon' ? 'text-white group-hover:text-[#0ff]' : 'text-white dark:text-black group-hover:opacity-50'} transition-all`}>{p.title}</h3>
                    <p className="text-zinc-500 text-lg max-w-2xl">{p.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden lg:flex flex-wrap gap-2">
                    {(p.tags||[]).map((t:string,j:number)=>(
                      <span key={j} className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${theme === 'neon' ? 'border-[#0ff]/30 text-[#0ff]' : 'border-white/10 dark:border-black/10 text-white dark:text-black'}`}>{t}</span>
                    ))}
                  </div>
                  <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${theme === 'neon' ? 'border-[#0ff]/40 group-hover:bg-[#0ff] group-hover:text-black' : 'border-white/20 dark:border-black/20 group-hover:bg-white dark:group-hover:bg-black group-hover:text-black dark:group-hover:text-white'}`}>
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────── */}
      <section id="skills" className="py-48 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.9 }} className="mb-24">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Expertise</p>
            <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.8]">Mastered<br />Stack.</h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              {[
                { title: "Frontend", items: frontendSkills },
                { title: "Backend", items: backendSkills }
              ].map((cat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay: idx*0.1 }}
                  className="bg-zinc-100 dark:bg-zinc-900/50 rounded-[2.5rem] p-10"
                >
                  <h3 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10">{cat.title}</h3>
                  <div className="space-y-8">
                    {cat.items.map((s:any, i:number) => (
                      <div key={i}>
                        <div className="flex justify-between items-end mb-3">
                          <span className="text-xl font-bold flex items-center gap-3">
                            <span className="text-2xl">{s.icon}</span> {s.name}
                          </span>
                          <span className="text-zinc-400 font-mono text-sm">{s.proficiency}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className={`h-full ${theme === 'neon' ? 'bg-[#0ff]' : 'bg-black dark:bg-white'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Services Card */}
            <motion.div 
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay: 0.2 }}
              className={`${accentColor} rounded-[2.5rem] p-10 flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50 mb-12">Services</h3>
                <div className="space-y-10">
                  {services.slice(0,4).map((s:any, i:number) => (
                    <div key={i} className="group">
                      <p className="text-3xl font-black mb-2 group-hover:translate-x-2 transition-transform">{s.title}</p>
                      <p className="text-sm opacity-60 leading-relaxed">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <a href="#contact" className="mt-12 inline-flex items-center gap-2 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                Let's collaborate <ArrowRight className="w-4 h-4"/>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────── */}
      <section id="contact" className={`py-48 px-6 md:px-12 ${theme === 'neon' ? 'bg-[#0ff] text-black' : 'bg-black dark:bg-white text-white dark:text-black'}`}>
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-24">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.4em] opacity-50 mb-10">Connect</p>
            <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-16">Get<br />In Touch.</h2>
            
            <div className="space-y-10 mb-20">
              {data?.email && (
                <a href={`mailto:${data.email}`} className="block text-3xl md:text-5xl font-bold hover:opacity-50 transition-opacity break-all underline decoration-1 underline-offset-8">
                  {data.email}
                </a>
              )}
              {data?.whatsapp && (
                <a href={data.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-2xl font-black group">
                  <FaWhatsapp className="text-4xl group-hover:rotate-12 transition-transform" /> Chat on WhatsApp
                </a>
              )}
            </div>

            <div className="flex gap-8 text-2xl">
              {data?.socialLinks?.github    && <a href={data.socialLinks.github}    target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform"><FaGithub/></a>}
              {data?.socialLinks?.linkedin  && <a href={data.socialLinks.linkedin}  target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform"><FaLinkedin/></a>}
              {data?.socialLinks?.twitter   && <a href={data.socialLinks.twitter}   target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform"><FaTwitter/></a>}
              {data?.socialLinks?.instagram && <a href={data.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform"><FaInstagram/></a>}
            </div>
          </div>

          <div className={`${theme === 'neon' ? 'bg-black/10' : 'bg-white/5 dark:bg-black/20'} backdrop-blur-xl rounded-[3rem] p-10 md:p-16`}>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Your Name</label>
                <input required value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}
                  className="w-full bg-transparent border-b border-current/20 py-4 text-2xl focus:outline-none focus:border-current transition-colors" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Email Address</label>
                <input required type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}
                  className="w-full bg-transparent border-b border-current/20 py-4 text-2xl focus:outline-none focus:border-current transition-colors" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Message</label>
                <textarea required rows={4} value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}
                  className="w-full bg-transparent border-b border-current/20 py-4 text-2xl focus:outline-none focus:border-current transition-colors resize-none" />
              </div>
              <button type="submit" disabled={formLoading} className={`w-full py-6 rounded-full ${theme === 'neon' ? 'bg-black text-white' : 'bg-white dark:bg-black text-black dark:text-white'} font-black text-xl hover:scale-[1.02] transition-all disabled:opacity-40 flex items-center justify-center gap-4`}>
                {formLoading ? <Loader2 className="animate-spin"/> : <><Send className="w-6 h-6"/>Transmit Message</>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="py-20 px-6 md:px-12 opacity-40">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-black text-3xl tracking-tighter">{(data?.name || "Shiva").split(" ")[0]}<span className="text-zinc-500">.</span></p>
          <div className="flex gap-10 text-xs font-bold uppercase tracking-widest">
            <a href="#work" className="hover:underline">Work</a>
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
          <p className="text-xs">© {new Date().getFullYear()} — DESIGNED BY SHIVA</p>
        </div>
      </footer>
    </div>
  );
}
