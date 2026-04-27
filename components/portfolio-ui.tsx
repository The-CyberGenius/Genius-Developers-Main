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
    <div ref={containerRef} className={`${themeClasses} transition-colors duration-700 overflow-x-hidden selection:bg-zinc-500/30 relative`}>
      
      {/* ── PREMIUM NOISE OVERLAY ────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* ── FIXED NAV ─────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 z-[100] w-full mix-blend-difference pointer-events-none"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between pointer-events-auto">
          <span className="text-white font-black text-2xl tracking-tighter">
            {(data?.name || "Shiva").split(" ")[0]}<span className="text-zinc-500">.</span>
          </span>
          <nav className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
            {['work', 'skills', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
              </a>
            ))}
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link>
          </nav>
        </div>
      </motion.header>

      {/* ── STICKY HERO ───────────────────────────────────── */}
      <div ref={heroRef} className="h-[160vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-end pb-32 px-6 md:px-12">
          
          {/* Background Elements */}
          <motion.div 
            style={{ scale: bgZoom, opacity: heroOpacity }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full bg-gradient-radial from-zinc-200/10 dark:from-zinc-800/10 to-transparent blur-3xl" />
            
            {/* Magical Floating Text Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] dark:opacity-[0.04] pointer-events-none select-none overflow-hidden">
              <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="flex whitespace-nowrap text-[20vh] font-black uppercase gap-32"
              >
                <span>Innovation</span><span>✦</span><span>Scalability</span><span>✦</span><span>Experience</span><span>✦</span><span>Innovation</span><span>✦</span><span>Scalability</span><span>✦</span><span>Experience</span><span>✦</span>
              </motion.div>
            </div>
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
              className="mb-10"
            >
              <span className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'neon' ? 'border-[#0ff]/30 text-[#0ff]' : 'text-zinc-500'}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-ping ${theme === 'neon' ? 'bg-[#0ff]' : 'bg-green-500'}`} />
                {theme === 'neon' ? 'SYSTEM_ONLINE' : 'Available for premium projects'}
              </span>
            </motion.div>

            {/* Main title with split parallax */}
            <div className="mb-2">
              <motion.h1
                style={{ x: titleX }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[14vw] font-black tracking-tighter leading-[0.75] text-black dark:text-white"
              >
                {(data?.name || "Shiva").split(" ")[0]}
              </motion.h1>
            </div>
            {(data?.name || "").split(" ").length > 1 && (
              <div className="mb-16">
                <motion.h1
                  style={{ x: subtitleX }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[14vw] font-black tracking-tighter leading-[0.75] text-zinc-300 dark:text-zinc-800"
                >
                  {data.name.split(" ").slice(1).join(" ")}.
                </motion.h1>
              </div>
            )}

            <motion.div
              style={{ y: taglineY, opacity: taglineOpacity }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-12"
            >
              <div className="max-w-2xl">
                <p className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight">
                  {data?.tagline || "Full-Stack Developer & AI Integration Expert"}
                </p>
                <div className="flex items-center gap-4 mt-6">
                   <div className="h-px w-12 bg-zinc-300 dark:bg-zinc-800" />
                   <p className="text-zinc-400 dark:text-zinc-500 text-sm font-black uppercase tracking-widest">{data?.location || "India • Working Worldwide"}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <a href="#work" className={`px-10 py-5 rounded-full ${accentColor} font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-2xl shadow-black/10 flex items-center gap-3`}>
                  View Work <ArrowRight className="w-4 h-4" />
                </a>
                {resume?.fileUrl && (
                  <a href={resume.fileUrl} target="_blank" rel="noreferrer" className="px-10 py-5 rounded-full border border-zinc-200 dark:border-zinc-800 font-black uppercase tracking-widest text-[10px] hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all flex items-center gap-3">
                    Resume <Download className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── TECH STACK (PREMIUM GLASSMORPHISM) ──────────────── */}
      <section className="relative z-20 py-32 border-y border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-3xl">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Expertise</h3>
              <p className="text-4xl font-bold leading-tight tracking-tighter">Architecting digital solutions with precision.</p>
            </motion.div>

            <div className="lg:col-span-8 flex flex-wrap justify-start lg:justify-end gap-3 md:gap-4">
              {[
                { name: "Next.js", color: "border-black/10 dark:border-white/10", icon: "✦" },
                { name: "React", color: "border-blue-500/20 text-blue-500", icon: "⚛" },
                { name: "TypeScript", color: "border-blue-600/20 text-blue-600", icon: "TS" },
                { name: "Node.js", color: "border-green-500/20 text-green-500", icon: "⬢" },
                { name: "Tailwind", color: "border-cyan-500/20 text-cyan-500", icon: "≈" },
                { name: "MongoDB", color: "border-emerald-500/20 text-emerald-500", icon: "🍃" },
                { name: "AI/LLMs", color: "border-purple-500/20 text-purple-500", icon: "✧" },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5, borderColor: "rgba(100,100,100,0.5)" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl border ${tech.color} bg-white dark:bg-zinc-900 font-bold shadow-sm transition-all`}
                >
                  <span className="text-xl">{tech.icon}</span>
                  <span className="text-[10px] uppercase tracking-widest">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT (REFINED SPACING) ─────────────────────────── */}
      <section className="py-64 px-6 md:px-12 relative">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-32 items-start">
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.9 }}>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-10">Philosophy</p>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-12">
              Beyond<br /><span className="text-zinc-200 dark:text-zinc-800">The Pixel.</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.9, delay:0.2 }}>
            <p className="text-3xl md:text-4xl font-medium leading-[1.2] mb-16 tracking-tight">
              {data?.aboutText || "I build world-class digital products that scale, impress, and convert."}
            </p>
            <div className="flex flex-wrap gap-6">
              {data?.email && (
                <a href={`mailto:${data.email}`} className={`inline-flex items-center gap-3 px-10 py-5 border border-zinc-200 dark:border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest hover:${accentColor} transition-all`}>
                  <Mail className="w-4 h-4" /> Start a Project
                </a>
              )}
              {data?.whatsapp && (
                <a href={data.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-10 py-5 border border-zinc-200 dark:border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-white hover:border-green-500 transition-all">
                  <FaWhatsapp className="w-4 h-4" /> WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS (CINEMATIC LIST) ─────────────────────── */}
      <section id="work" className={`py-64 px-6 md:px-12 ${theme === 'neon' ? 'bg-black' : 'bg-black dark:bg-white'}`}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.9 }} className="mb-32">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-8">Selected Works</p>
            <h2 className={`text-8xl md:text-[12rem] font-black tracking-tighter leading-[0.75] ${theme === 'neon' ? 'text-[#0ff]' : 'text-white dark:text-black'}`}>
              Featured<br />Archive.
            </h2>
          </motion.div>
 
          <div className={`divide-y ${theme === 'neon' ? 'divide-[#0ff]/10' : 'divide-white/5 dark:divide-black/5'}`}>
            {(projects.length > 0 ? projects : [
              { title: "Project Alpha", description: "High-performance dashboard for data analytics.", tags: ["Next.js", "AI"], link: "#" }
            ]).map((p: any, i: number) => (
              <motion.a
                key={i}
                href={p.link || "#"}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.8, delay: i*0.1 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 py-20 group relative overflow-hidden"
              >
                <div className="flex items-center gap-12 flex-1 relative z-10">
                  <span className="text-zinc-800 font-black text-2xl w-12 shrink-0 group-hover:text-white dark:group-hover:text-black transition-colors">{String(i+1).padStart(2,"0")}</span>
                  <div>
                    <h3 className={`text-4xl md:text-7xl font-black mb-4 ${theme === 'neon' ? 'text-white group-hover:text-[#0ff]' : 'text-white dark:text-black group-hover:opacity-40'} transition-all tracking-tighter`}>{p.title}</h3>
                    <p className="text-zinc-500 text-xl max-w-3xl leading-relaxed">{p.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 relative z-10">
                  <div className="hidden lg:flex flex-wrap gap-3">
                    {(p.tags||[]).map((t:string,j:number)=>(
                      <span key={j} className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${theme === 'neon' ? 'border-[#0ff]/20 text-[#0ff]' : 'border-white/10 dark:border-black/10 text-white dark:text-black'}`}>{t}</span>
                    ))}
                  </div>
                  <div className={`w-20 h-20 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${theme === 'neon' ? 'border-[#0ff]/20 group-hover:bg-[#0ff] group-hover:text-black' : 'border-white/10 dark:border-black/10 group-hover:bg-white dark:group-hover:bg-black group-hover:text-black dark:group-hover:text-white'}`}>
                    <ArrowUpRight className="w-8 h-8" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS (PREMIUM CARDS) ────────────────────────── */}
      <section id="skills" className="py-64 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.9 }} className="mb-32">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">Capabilities</p>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8]">Mastered<br />Stack.</h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-12">
              {[
                { title: "Frontend Engineering", items: frontendSkills },
                { title: "Backend Architecture", items: backendSkills }
              ].map((cat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay: idx*0.1 }}
                  className="bg-white dark:bg-zinc-900/50 rounded-[3rem] p-12 shadow-sm border border-zinc-100 dark:border-zinc-800"
                >
                  <h3 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12">{cat.title}</h3>
                  <div className="space-y-10">
                    {cat.items.map((s:any, i:number) => (
                      <div key={i}>
                        <div className="flex justify-between items-end mb-4">
                          <span className="text-2xl font-bold flex items-center gap-4">
                            <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{s.icon}</span> {s.name}
                          </span>
                          <span className="text-zinc-400 font-mono text-xs">{s.proficiency}%</span>
                        </div>
                        <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                            className={`h-full ${theme === 'neon' ? 'bg-[#0ff]' : 'bg-black dark:bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Services Card (PREMIUM) */}
            <motion.div 
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay: 0.2 }}
              className={`${accentColor} rounded-[3rem] p-12 flex flex-col justify-between shadow-2xl shadow-black/10`}
            >
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-16">Services</h3>
                <div className="space-y-12">
                  {services.slice(0,4).map((s:any, i:number) => (
                    <div key={i} className="group">
                      <p className="text-4xl font-black mb-3 group-hover:translate-x-3 transition-transform duration-500">{s.title}</p>
                      <p className="text-sm opacity-50 leading-relaxed max-w-[200px]">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <a href="#contact" className="mt-16 inline-flex items-center gap-3 font-black uppercase tracking-[0.2em] text-[10px] hover:gap-6 transition-all group">
                Let's Build Something <ArrowRight className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform"/>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT (IMPRESSIVE FOOTER SECTION) ────────────────── */}
      <section id="contact" className={`py-64 px-6 md:px-12 ${theme === 'neon' ? 'bg-[#0ff] text-black' : 'bg-black dark:bg-white text-white dark:text-black'}`}>
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-32">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-12">Contact</p>
            <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter leading-[0.75] mb-20">Start<br />Today.</h2>
            
            <div className="space-y-12 mb-24">
              {data?.email && (
                <a href={`mailto:${data.email}`} className="block text-4xl md:text-6xl font-bold hover:opacity-40 transition-opacity break-all underline decoration-1 underline-offset-[12px] decoration-current/20">
                  {data.email}
                </a>
              )}
              {data?.whatsapp && (
                <a href={data.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-5 text-3xl font-black group">
                  <div className="w-16 h-16 rounded-full bg-current/5 flex items-center justify-center group-hover:bg-current group-hover:text-black dark:group-hover:text-white transition-all">
                    <FaWhatsapp className="text-3xl" />
                  </div>
                  Direct Message
                </a>
              )}
            </div>

            <div className="flex gap-10">
              {[
                { icon: <FaGithub/>, link: data?.socialLinks?.github },
                { icon: <FaLinkedin/>, link: data?.socialLinks?.linkedin },
                { icon: <FaTwitter/>, link: data?.socialLinks?.twitter },
                { icon: <FaInstagram/>, link: data?.socialLinks?.instagram }
              ].filter(s => s.link).map((s, i) => (
                <a key={i} href={s.link} target="_blank" rel="noreferrer" className="text-3xl hover:-translate-y-2 transition-transform opacity-60 hover:opacity-100">{s.icon}</a>
              ))}
            </div>
          </div>

          <div className={`${theme === 'neon' ? 'bg-black/5' : 'bg-white/5 dark:bg-black/10'} backdrop-blur-2xl rounded-[4rem] p-12 md:p-20 border border-current/5`}>
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-6 group">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 group-focus-within:opacity-100 transition-opacity">Name</label>
                <input required value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}
                  className="w-full bg-transparent border-b border-current/10 py-6 text-3xl focus:outline-none focus:border-current transition-all placeholder:opacity-20" placeholder="John Doe" />
              </div>
              <div className="space-y-6 group">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 group-focus-within:opacity-100 transition-opacity">Email</label>
                <input required type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}
                  className="w-full bg-transparent border-b border-current/10 py-6 text-3xl focus:outline-none focus:border-current transition-all placeholder:opacity-20" placeholder="john@example.com" />
              </div>
              <div className="space-y-6 group">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 group-focus-within:opacity-100 transition-opacity">Brief</label>
                <textarea required rows={4} value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}
                  className="w-full bg-transparent border-b border-current/10 py-6 text-3xl focus:outline-none focus:border-current transition-all resize-none placeholder:opacity-20" placeholder="Tell me about your project..." />
              </div>
              <button type="submit" disabled={formLoading} className={`w-full py-8 rounded-full ${theme === 'neon' ? 'bg-black text-white' : 'bg-white dark:bg-black text-black dark:text-white'} font-black text-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 flex items-center justify-center gap-4 shadow-2xl shadow-black/20`}>
                {formLoading ? <Loader2 className="animate-spin"/> : <><Send className="w-6 h-6"/>Send Inquiry</>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER (CLEAN & MINIMAL) ────────────────────────── */}
      <footer className="py-32 px-6 md:px-12 border-t border-zinc-100 dark:border-zinc-900 opacity-40">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <p className="font-black text-4xl tracking-tighter mb-2">{(data?.name || "Shiva").split(" ")[0]}<span className="text-zinc-500">.</span></p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Crafting Digital Excellence</p>
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest">
            {['work', 'skills', 'contact'].map(item => (
              <a key={item} href={`#${item}`} className="hover:underline underline-offset-8 transition-all uppercase tracking-widest">{item}</a>
            ))}
          </div>
          <div className="text-right">
             <p className="text-[10px] font-black uppercase tracking-widest">© {new Date().getFullYear()} — SHIVA</p>
             <p className="text-[10px] opacity-50 mt-1">ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
