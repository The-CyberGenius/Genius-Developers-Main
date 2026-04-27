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

  const [submitted, setSubmitted] = useState(false);

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
        setSubmitted(true);
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

      {/* ── STYLISH NAV ─────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 z-[100] w-full"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between backdrop-blur-sm bg-transparent">
          <span className="font-black text-2xl md:text-3xl tracking-tighter italic serif">
            {data?.name?.split(" ")[0] || "Shiva"}<span className="opacity-20 not-italic">.</span>
          </span>
          <nav className="hidden md:flex gap-10 lg:gap-14 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            {['work', 'skills', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} className="hover:opacity-100 transition-opacity hover:italic uppercase">{item}</a>
            ))}
            <Link href="/admin/login" className="hover:opacity-100 transition-opacity hover:italic">Admin</Link>
          </nav>
        </div>
      </motion.header>

      {/* ── HUMBLE HERO ────────────────────────────────────── */}
      <div ref={heroRef} className="h-[120vh] relative">
        <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-12">
          
          {/* Subtle Background Elements */}
          <motion.div style={{ scale: bgZoom, opacity: heroOpacity }} className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full bg-gradient-radial from-zinc-100/10 dark:from-zinc-900/10 to-transparent blur-3xl" />
            <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-[0.01] dark:opacity-[0.03] overflow-hidden">
              <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap text-[25vh] font-black uppercase gap-40">
                <span>Problem Solver</span><span>✦</span><span>Coder</span><span>✦</span><span>Builder</span><span>✦</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="max-w-[1400px] mx-auto w-full relative z-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-6 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-current opacity-20" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">{data?.location || "India"} Based Coder</span>
            </motion.div>
            
            <motion.h1 style={{ x: titleX }} className="text-7xl sm:text-9xl md:text-[10rem] lg:text-[12vw] font-black tracking-tighter leading-[0.75] mb-4">
              {(data?.name || "Shiva").split(" ")[0]}
            </motion.h1>
            
            {(data?.name || "").split(" ").length > 1 && (
              <motion.h1 style={{ x: subtitleX }} className="text-7xl sm:text-9xl md:text-[10rem] lg:text-[12vw] font-black tracking-tighter leading-[0.75] text-zinc-200 dark:text-zinc-800 mb-12">
                {data.name.split(" ").slice(1).join(" ")}
              </motion.h1>
            )}

            <motion.div style={{ opacity: taglineOpacity }} className="flex flex-col md:flex-row md:items-end justify-between gap-12 max-w-6xl">
              <p className="text-2xl md:text-4xl font-medium tracking-tight max-w-2xl leading-[1.1] opacity-80 italic serif">
                "{data?.tagline || "I transform ideas into functional code, one line at a time."}"
              </p>
              <div className="flex gap-4 pb-2">
                <a href="#work" className={`px-10 py-5 rounded-full ${accentColor} font-black uppercase text-[10px] tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-black/10`}>My Work</a>
                {resume?.fileUrl && (
                  <a href={resume.fileUrl} target="_blank" rel="noreferrer" className="px-10 py-5 rounded-full border border-current/10 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-current/5 transition-all">Resume ⬇️</a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── PRETEXT SHOWCASE (HUMBLE INNOVATION) ──────────────── */}
      <section className="relative h-[250vh] bg-black text-white">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10 text-center px-6"
          >
            <motion.p variants={fadeInUp} className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-10">Coding Philosophy</motion.p>
            <motion.h2 
              variants={staggerContainer}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-black tracking-tighter leading-none italic"
            >
              {["Simply", "Better", "Code."].map((word, i) => (
                <motion.span key={i} variants={fadeInUp} className="inline-block mr-[0.2em]">{word}</motion.span>
              ))}
            </motion.h2>
            <motion.div variants={fadeInUp} className="mt-12 opacity-40 text-sm font-medium tracking-widest uppercase">
              Connecting Logic with Humanity
            </motion.div>
          </motion.div>

          {/* Background Magical Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="text-[45vh] font-black uppercase leading-none text-white whitespace-nowrap"
            >
              HUMBLE • PROGRAMMER • CODER • HUMBLE • PROGRAMMER • CODER •
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TECH STRIP (DYNAMIC) ───────────────────────────── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-30 py-12 md:py-24 border-y border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-700">
            {["Next.js", "React", "TypeScript", "Node.js", "Tailwind", "MongoDB", "AI"].map((tech, i) => (
              <motion.span key={tech} variants={fadeInUp} className="text-sm md:text-2xl font-black uppercase tracking-[0.3em]">{tech}</motion.span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── ABOUT (HUMBLE REVEAL) ────────────────────────── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-24 md:py-64 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950"
      >
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 md:gap-24">
          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">My Purpose</p>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-10 italic serif">Solving<br />Logic.</h2>
          </motion.div>
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <p className="text-2xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-12 opacity-80">
              {data?.aboutText || "I am a programmer who believes in the power of simple, effective code. My goal is to build digital tools that actually help people."}
            </p>
            <motion.div variants={staggerContainer} className="flex gap-8">
              {data?.email && (
                <motion.a variants={fadeInUp} href={`mailto:${data.email}`} className="text-[11px] font-black uppercase tracking-widest border-b-2 border-current pb-2 hover:opacity-50 transition-all">Reach Out</motion.a>
              )}
              {data?.whatsapp && (
                <motion.a variants={fadeInUp} href={data.whatsapp} target="_blank" rel="noreferrer" className="text-[11px] font-black uppercase tracking-widest border-b-2 border-current pb-2 hover:opacity-50 transition-all">Direct Message</motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── PROJECTS (HUMBLE LIST) ────────────────────────── */}
      <motion.section
        id="work"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-24 md:py-64 px-6 md:px-12 bg-white dark:bg-black"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={fadeInUp} className="mb-24">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Recent Work</p>
            <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.75] uppercase">Projects.</h2>
          </motion.div>
          
          <motion.div variants={staggerContainer} className="divide-y border-t border-zinc-100 dark:border-zinc-900">
            {(projects.length > 0 ? projects : [
              { title: "Efficient Logic", description: "A simple solution to a complex problem.", tags: ["Algorithms", "Clean Code"] }
            ]).map((p: any, i: number) => (
              <motion.a
                key={i}
                href={p.link || "#"}
                target="_blank"
                rel="noreferrer"
                variants={fadeInUp}
                whileHover={{ x: 30 }}
                className="py-20 md:py-32 flex flex-col md:flex-row md:items-center justify-between gap-12 group transition-all"
              >
                <div className="flex gap-12 md:gap-24 items-start">
                  <span className="text-zinc-200 dark:text-zinc-800 font-black text-3xl md:text-5xl pt-2">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-4xl md:text-8xl font-black tracking-tighter mb-6 group-hover:opacity-40 transition-opacity uppercase italic">{p.title}</h3>
                    <p className="text-xl md:text-3xl opacity-50 max-w-4xl leading-relaxed font-medium">{p.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  {(p.tags || []).slice(0, 3).map((t: string) => (
                    <span key={t} className="px-6 py-2.5 rounded-full border border-current/10 text-[10px] font-black uppercase tracking-widest opacity-40">{t}</span>
                  ))}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SKILLS & SERVICES (DYNAMIC) ─────────────────── */}
      <motion.section
        id="skills"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-24 md:py-64 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950"
      >
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 md:gap-32">
          <motion.div variants={fadeInUp}>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-12">Core Technologies</p>
            <div className="space-y-16">
              {[...frontendSkills, ...backendSkills].slice(0, 6).map((s: any, i: number) => (
                <motion.div key={i} variants={fadeInUp}>
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter">{s.name}</span>
                    <span className="text-xs font-mono opacity-40">{s.proficiency}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.proficiency}%` }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-current" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className={`p-10 md:p-20 rounded-[3rem] ${accentColor} flex flex-col justify-between shadow-2xl shadow-black/10`}
          >
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-16">Services</h3>
              <div className="space-y-12">
                {services.slice(0, 4).map((s: any, i: number) => (
                  <motion.div variants={fadeInUp} key={i}>
                    <p className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-3">{s.title}</p>
                    <p className="text-sm md:text-base opacity-60 max-w-sm leading-relaxed">{s.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.a whileHover={{ gap: "32px" }} href="#contact" className="mt-20 inline-flex items-center gap-4 font-black uppercase text-[11px] tracking-widest border-b-2 border-current pb-3 transition-all">Get Started <ArrowRight className="w-5 h-5" /></motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* ── CONTACT (DYNAMIC & FUNCTIONAL) ───────────────────── */}
      <section id="contact" className={`py-24 md:py-64 px-6 md:px-12 ${theme === 'neon' ? 'bg-[#0ff] text-black' : 'bg-black dark:bg-white text-white dark:text-black'}`}>
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 md:gap-32">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-8 md:mb-12">Contact</p>
            <h2 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.75] mb-12 md:mb-20">Start<br />Today.</h2>

            <div className="space-y-8 md:space-y-12 mb-16 md:mb-24">
              {data?.email && (
                <a href={`mailto:${data.email}`} className="block text-2xl sm:text-4xl md:text-6xl font-bold hover:opacity-40 transition-opacity break-all underline decoration-1 underline-offset-[12px] decoration-current/20">
                  {data.email}
                </a>
              )}
              {data?.whatsapp && (
                <a href={data.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-4 md:gap-5 text-xl sm:text-3xl font-black group">
                  <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-current/5 flex items-center justify-center group-hover:bg-current group-hover:text-black dark:group-hover:text-white transition-all">
                    <FaWhatsapp className="text-2xl md:text-3xl" />
                  </div>
                  Direct Message
                </a>
              )}
            </div>

            <div className="flex gap-8 md:gap-10">
              {[
                { icon: <FaGithub />, link: data?.socialLinks?.github },
                { icon: <FaLinkedin />, link: data?.socialLinks?.linkedin },
                { icon: <FaTwitter />, link: data?.socialLinks?.twitter },
                { icon: <FaInstagram />, link: data?.socialLinks?.instagram }
              ].filter(s => s.link).map((s, i) => (
                <a key={i} href={s.link} target="_blank" rel="noreferrer" className="text-2xl md:text-3xl hover:-translate-y-2 transition-transform opacity-60 hover:opacity-100">{s.icon}</a>
              ))}
            </div>
          </div>

          <div className={`${theme === 'neon' ? 'bg-black/5' : 'bg-white/5 dark:bg-black/10'} backdrop-blur-2xl rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 border border-current/5 flex flex-col justify-center`}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-24 h-24 rounded-full bg-current/10 flex items-center justify-center mx-auto mb-8">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Message Received.</h3>
                <p className="text-lg md:text-xl opacity-60 max-w-sm mx-auto">I'll review your inquiry and get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="text-[10px] font-black uppercase tracking-widest border-b border-current pb-2 hover:opacity-50 transition-opacity">Send another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
                <div className="space-y-4 md:space-y-6 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 group-focus-within:opacity-100 transition-opacity">Name</label>
                  <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-current/10 py-4 md:py-6 text-xl md:text-3xl focus:outline-none focus:border-current transition-all placeholder:opacity-20" placeholder="Your Name" />
                </div>
                <div className="space-y-4 md:space-y-6 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 group-focus-within:opacity-100 transition-opacity">Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-current/10 py-4 md:py-6 text-xl md:text-3xl focus:outline-none focus:border-current transition-all placeholder:opacity-20" placeholder="email@address.com" />
                </div>
                <div className="space-y-4 md:space-y-6 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 group-focus-within:opacity-100 transition-opacity">Brief</label>
                  <textarea required rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-current/10 py-4 md:py-6 text-xl md:text-3xl focus:outline-none focus:border-current transition-all resize-none placeholder:opacity-20" placeholder="Project details..." />
                </div>
                <button type="submit" disabled={formLoading} className={`w-full py-6 md:py-8 rounded-full ${theme === 'neon' ? 'bg-black text-white' : 'bg-white dark:bg-white text-black dark:text-black'} font-black text-lg md:text-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 flex items-center justify-center gap-4 shadow-2xl shadow-black/20 uppercase tracking-widest`}>
                  {formLoading ? <Loader2 className="animate-spin" /> : <><Send className="w-6 h-6" />Send Inquiry</>}
                </button>
              </form>
            )}
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
