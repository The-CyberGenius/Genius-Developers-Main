"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
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

  // Animation Variants for sections (BREATHABLE & FUNNY)
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8, 
        ease: "easeOut" as const 
      } 
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        staggerChildren: 0.15,
        duration: 0.8,
        ease: "easeOut"
      } 
    }
  };

  // Funny hover animation
  const funnyHover = {
    scale: 1.05,
    rotate: [0, -1, 1, -1, 0],
    transition: { duration: 0.3 }
  };

  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const frontendSkills = skills.filter(s => s.category === "Frontend");
  const backendSkills = skills.filter(s => s.category === "Backend");

  // Premium Theme Styles
  const themeClasses = {
    apple: "bg-[#fafafa] dark:bg-[#050505] text-[#1a1a1a] dark:text-[#f5f5f7]",
    midnight: "bg-[#020617] text-[#f1f5f9]",
    neon: "bg-[#000000] text-[#00ffcc]",
    forest: "bg-[#06120c] text-[#ecfdf5]",
    ember: "bg-[#0f0505] text-[#fef2f2]",
    gold: "bg-[#0c0a09] text-[#f5f5f4]",
  }[theme as string] || "bg-[#fafafa] dark:bg-[#050505] text-[#1a1a1a] dark:text-[#f5f5f7]";

  const accentColor = {
    apple: "bg-[#1a1a1a] dark:bg-[#f5f5f7] text-white dark:text-black",
    midnight: "bg-[#6366f1] text-white",
    neon: "bg-[#00ffcc] text-black",
    forest: "bg-[#10b981] text-white",
    ember: "bg-[#ef4444] text-white",
    gold: "bg-[#d4af37] text-black",
  }[theme as string] || "bg-[#1a1a1a] dark:bg-[#f5f5f7] text-white dark:text-black";

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
      {/* Navbar Removed as per user request */}


      {/* ── PROGRESS BAR ────────────────────────────────────── */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-1 z-[200] origin-left ${accentColor}`}
        style={{ scaleX: scrollYProgress }}
      />

      {/* ── HUMBLE ARTISTIC HERO ────────────────────────────── */}
      <div ref={heroRef} className="h-[140vh] relative">
        <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-12">
          
          {/* Background Text Art (FUNNY WOBBLE) */}
          <motion.div 
            style={{ scale: bgZoom, opacity: heroOpacity }} 
            animate={{ 
              x: [0, 10, -10, 5, 0],
              y: [0, -5, 5, -2, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center"
          >
            <div className="text-[30vw] font-black opacity-[0.02] tracking-tighter select-none">
              {(data?.name || "SHIVA").toUpperCase()}
            </div>
          </motion.div>

          <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="max-w-[1500px] mx-auto w-full relative z-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-10 flex items-center gap-6">
               <span className="text-[11px] font-black uppercase tracking-[0.5em] opacity-30">Portfolio — {new Date().getFullYear()}</span>
               <div className="h-[1px] w-12 bg-current opacity-10" />
               <span className="text-[11px] font-black uppercase tracking-[0.5em] opacity-30 italic serif">{data?.location || "India"}</span>
            </motion.div>
            
            <div className="relative mb-16">
              <motion.h1 style={{ x: titleX }} className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[15vw] font-black tracking-tighter leading-[0.7] flex flex-col">
                <span>{(data?.name || "Shiva").split(" ")[0]}</span>
                {data?.name?.split(" ").slice(1).map((part: string, i: number) => (
                  <span key={i} className="opacity-10 italic serif font-light ml-[0.1em]">{part}</span>
                ))}
              </motion.h1>
            </div>

            <motion.div style={{ opacity: taglineOpacity }} className="flex flex-col md:flex-row md:items-end justify-between gap-16 max-w-7xl">
              <div className="space-y-6">
                <p className="text-3xl md:text-5xl font-medium tracking-tight max-w-3xl leading-[1.05] opacity-90">
                  {data?.tagline || "I transform complex logic into elegant digital experiences."}
                </p>
                <p className="text-sm md:text-lg opacity-40 max-w-lg font-medium">
                  Focused on building functional, accessible, and high-performance software that solves real-world problems.
                </p>
              </div>
              
              <div className="flex gap-6 pb-2">
                <motion.a 
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#work" 
                  className={`group relative px-12 py-6 rounded-full ${accentColor} font-black uppercase text-[11px] tracking-[0.2em] transition-all overflow-hidden shadow-2xl shadow-current/10`}
                >
                  <span className="relative z-10">Explore Work</span>
                  <motion.div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </motion.a>
                {resume?.fileUrl && (
                  <motion.a 
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    href={resume.fileUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="group px-12 py-6 rounded-full border border-current/10 font-black uppercase text-[11px] tracking-[0.2em] hover:bg-current/5 transition-all flex items-center gap-3"
                  >
                    CV <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </motion.a>
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
              transition={{ duration: 60, repeat: Infinity, ease: "linear" as const }}
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

      {/* ── ABOUT (BREATHABLE REVEAL) ────────────────────────── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}

        className="py-24 md:py-64 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950 overflow-hidden"
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
                <motion.a whileHover={funnyHover} variants={fadeInUp} href={`mailto:${data.email}`} className="text-[11px] font-black uppercase tracking-widest border-b-2 border-current pb-2 hover:opacity-50 transition-all">Reach Out</motion.a>
              )}
              {data?.whatsapp && (
                <motion.a whileHover={funnyHover} variants={fadeInUp} href={data.whatsapp} target="_blank" rel="noreferrer" className="text-[11px] font-black uppercase tracking-widest border-b-2 border-current pb-2 hover:opacity-50 transition-all">Direct Message</motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── PROJECTS (BREATHABLE LIST) ────────────────────────── */}
      <motion.section
        id="work"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}

        className="py-24 md:py-64 px-6 md:px-12 bg-white dark:bg-black overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={fadeInUp} className="mb-24">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">Recent Work</p>
            <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.75] uppercase">Projects.</h2>
          </motion.div>
          
          <motion.div variants={staggerContainer} className="divide-y border-t border-current/5">
            {(projects.length > 0 ? projects : [
              { title: "Elegant Logic", description: "Minimalist solution for maximum impact.", tags: ["Core", "Architecture"] }
            ]).map((p: any, i: number) => (
              <motion.a
                key={i}
                href={p.link || "#"}
                target="_blank"
                rel="noreferrer"
                variants={fadeInUp}
                className="py-24 md:py-40 flex flex-col md:flex-row md:items-center justify-between gap-16 group relative overflow-hidden px-4 md:px-8"
              >
                <div className="absolute inset-0 bg-current/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                <div className="flex gap-16 md:gap-32 items-start relative z-10">
                  <span className="text-zinc-200 dark:text-zinc-800 font-black text-4xl md:text-7xl pt-4 group-hover:text-current group-hover:opacity-100 transition-all duration-500">{String(i + 1).padStart(2, "0")}</span>
                  <div className="space-y-8">
                    <h3 className="text-5xl md:text-[9rem] font-black tracking-tighter leading-[0.8] uppercase group-hover:italic transition-all duration-700">{p.title}</h3>
                    <p className="text-2xl md:text-4xl opacity-40 group-hover:opacity-70 transition-opacity max-w-5xl leading-[1.1] font-medium">{p.description}</p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      {(p.tags || []).slice(0, 3).map((t: string) => (
                        <span key={t} className="px-8 py-3 rounded-full border border-current/10 text-[11px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-all">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-current/20 flex items-center justify-center group-hover:bg-current group-hover:text-background transition-all duration-500 scale-0 group-hover:scale-100 rotate-45 group-hover:rotate-0">
                    <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12" />
                  </div>
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
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.proficiency}%` }} transition={{ duration: 1.5, ease: "circOut" as const }} className="h-full bg-current" />
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

      {/* ── CONTACT (INTERNATIONAL PREMIUM) ───────────────────── */}
      <section id="contact" className={`py-24 md:py-64 px-6 md:px-12 ${theme === 'neon' ? 'bg-[#00ffcc] text-black' : 'bg-white dark:bg-[#050505] text-[#1a1a1a] dark:text-[#f5f5f7]'}`}>
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16 md:gap-32">
          
          {/* Left Side: Contact Cards */}
          <div className="lg:col-span-5 space-y-16">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.6em] opacity-30 mb-8 md:mb-12">Connect</p>
              <h2 className="text-7xl sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.75] mb-8">Start<br />Today<span className="opacity-10 italic serif">.</span></h2>
              <p className="text-sm md:text-lg opacity-40 font-medium tracking-tight mb-16">Available for freelance work worldwide.</p>
            </div>

            <div className="grid gap-4 md:gap-6">
              {data?.whatsapp && (
                <motion.a 
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  href={data.whatsapp} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-8 p-8 md:p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-current/5 group transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-current/10 flex items-center justify-center group-hover:bg-current group-hover:text-background transition-colors">
                    <FaWhatsapp className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:italic transition-all">Direct Message</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">WhatsApp Support</span>
                  </div>
                </motion.a>
              )}
              {data?.email && (
                <motion.a 
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  href={`mailto:${data.email}`} 
                  className="flex items-center gap-8 p-8 md:p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-current/5 group transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-current/10 flex items-center justify-center group-hover:bg-current group-hover:text-background transition-colors">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:italic transition-all">Send Email</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">Expert Inquiry</span>
                  </div>
                </motion.a>
              )}
            </div>

            <div className="flex gap-10 pt-8 border-t border-current/5">
              {[
                { icon: <FaGithub />, link: data?.socialLinks?.github },
                { icon: <FaLinkedin />, link: data?.socialLinks?.linkedin },
                { icon: <FaTwitter />, link: data?.socialLinks?.twitter },
                { icon: <FaInstagram />, link: data?.socialLinks?.instagram }
              ].filter(s => s.link).map((s, i) => (
                <a key={i} href={s.link} target="_blank" rel="noreferrer" className="text-2xl md:text-3xl hover:-translate-y-2 transition-transform opacity-30 hover:opacity-100">{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <div className={`backdrop-blur-3xl rounded-[3rem] md:rounded-[5rem] p-10 md:p-24 border border-current/10 bg-zinc-50/50 dark:bg-zinc-900/20 shadow-2xl shadow-black/5`}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20 space-y-10">
                  <div className="w-32 h-32 rounded-full bg-current/10 flex items-center justify-center mx-auto">
                    <Send className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Message Sent.</h3>
                    <p className="text-lg md:text-xl opacity-40 max-w-sm mx-auto">I'll get back to you within 24 hours.</p>
                  </div>
                  <button onClick={() => setSubmitted(false)} className="text-[11px] font-black uppercase tracking-widest border-b-2 border-current pb-2 hover:opacity-50 transition-opacity">Send another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16">
                  <div className="space-y-4 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 group-focus-within:opacity-100 transition-opacity">Identification</label>
                    <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-current/10 py-6 text-xl md:text-4xl font-medium focus:outline-none focus:border-current transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700" placeholder="Full Name" />
                  </div>
                  <div className="space-y-4 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 group-focus-within:opacity-100 transition-opacity">Communication</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-current/10 py-6 text-xl md:text-4xl font-medium focus:outline-none focus:border-current transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700" placeholder="Email Address" />
                  </div>
                  <div className="space-y-4 group">
                    <label className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 group-focus-within:opacity-100 transition-opacity">The Brief</label>
                    <textarea required rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-current/10 py-6 text-xl md:text-4xl font-medium focus:outline-none focus:border-current transition-all resize-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700" placeholder="Your Project Details..." />
                  </div>
                  <button type="submit" disabled={formLoading} className={`w-full py-8 md:py-12 rounded-[2rem] md:rounded-[3rem] ${accentColor} font-black text-xl md:text-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 flex items-center justify-center gap-6 uppercase tracking-[0.2em] shadow-2xl shadow-current/10`}>
                    {formLoading ? <Loader2 className="animate-spin" /> : <><Send className="w-8 h-8" />Send Message</>}
                  </button>
                </form>
              )}
            </div>
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
