"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, Variants, useMotionValue, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, Send, Loader2, Mail, Sun, Moon, X, Zap, Globe, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";

// Custom Magnetic Component for Apple-like feel
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function PortfolioUI({ data, skills, services, projects, resume, settings }: {
  data: any; skills: any[]; services: any[]; projects: any[]; resume?: any; settings?: any;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // ── CINEMATIC HERO TRANSFORMATIONS ──────────────────
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.85]);
  const heroRotate = useTransform(smoothProgress, [0, 0.2], [0, -5]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.2], ["0%", "-10%"]);

  // ── TYPOGRAPHY ANIMATIONS ───────────────────────────
  const snappyEase = [0.23, 1, 0.32, 1] as any;
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: snappyEase } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

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
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message.");
      }
    } catch { toast.error("Connection error."); }
    finally { setFormLoading(false); }
  };

  const playClick = () => {
    try {
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
      audio.volume = 0.05;
      audio.play().catch(() => { });
    } catch (e) { }
  };

  if (!mounted) return null;

  const colorScheme = settings?.theme || "apple";
  const themeClasses = {
    apple: "bg-white dark:bg-[#000] text-black dark:text-white",
    midnight: "bg-[#0f172a] text-white",
    neon: "bg-black text-[#00ffcc]",
  }[colorScheme as string] || "bg-white dark:bg-[#000] text-black dark:text-white";

  const accentColor = {
    apple: "bg-black dark:bg-white text-white dark:text-black",
    midnight: "bg-blue-600 text-white",
    neon: "bg-[#00ffcc] text-black",
  }[colorScheme as string] || "bg-black dark:bg-white text-white dark:text-black";

  return (
    <div ref={containerRef} className={`${themeClasses} selection:bg-zinc-500/30 font-sans leading-tight`}>
      
      {/* ── PREMIUM NOISE TEXTURE OVERLAY ────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* ── CUSTOM MOUSE GLOW (APPLE STYLE) ──────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-500/5 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-500/5 blur-[150px] rounded-full" 
        />
      </div>

      {/* ── NAVIGATION ───────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-8 flex justify-between items-center backdrop-blur-md bg-transparent">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl font-bold tracking-tighter">
          {data?.name?.toUpperCase() || "SHIVA"} <span className="opacity-30 italic serif">©</span>
        </motion.div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest opacity-40">
            {['work', 'about', 'contact'].map(item => (
              <a key={item} href={`#${item}`} className="hover:opacity-100 transition-opacity">{item}</a>
            ))}
          </div>
          <button onClick={() => { playClick(); setTheme(resolvedTheme === "dark" ? "light" : "dark"); }} 
                  className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 transition-colors">
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* ── CINEMATIC HERO ────────────────────────────────── */}
      <section className="relative h-[150vh] flex flex-col items-center">
        <motion.div 
          style={{ scale: heroScale, rotateX: heroRotate, opacity: heroOpacity, y: heroY }}
          className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
          >
            <Sparkles size={14} className="text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Ready for new challenges</span>
          </motion.div>
          
          <h1 className="text-[clamp(3.5rem,12vw,14rem)] font-black tracking-tighter leading-[0.85] mb-12 uppercase">
            {(data?.name?.split(" ")[0] || "SHIVA")}<br />
            <span className="opacity-10 italic serif">{data?.name?.split(" ")[1] || "DEV"}</span>
          </h1>

          <div className="max-w-2xl space-y-8">
            <p className="text-xl md:text-3xl font-medium tracking-tight opacity-70">
              {data?.tagline || "I build digital products that feel like magic."}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Magnetic>
                <a href="#work" className={`px-10 py-5 rounded-full ${accentColor} font-bold text-[11px] uppercase tracking-widest shadow-2xl shadow-blue-500/10`}>
                  View Showcase
                </a>
              </Magnetic>
              {resume?.fileUrl && (
                <Magnetic>
                  <a href={resume.fileUrl} target="_blank" rel="noreferrer" className="px-10 py-5 rounded-full border border-zinc-200 dark:border-zinc-800 font-bold text-[11px] uppercase tracking-widest hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-2">
                    CV <Download size={14} />
                  </a>
                </Magnetic>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── BENTO SHOWCASE ────────────────────────────────── */}
      <section id="work" className="py-32 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950 rounded-[3rem] -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Selected Projects</p>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">Work<span className="opacity-10 italic serif">.</span></h2>
            </div>
            <p className="max-w-md text-lg opacity-40 leading-relaxed font-medium">
              A curated collection of digital experiences built with precision and passion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                onClick={() => setSelectedProject(p)}
                className={`group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 cursor-pointer ${
                  i % 3 === 0 ? "md:col-span-8 h-[500px]" : "md:col-span-4 h-[500px]"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 p-10 z-20 space-y-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex gap-2">
                    {p.tags?.slice(0, 2).map((t: string) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest text-white">{t}</span>
                    ))}
                  </div>
                  <h3 className="text-4xl font-black text-white tracking-tighter uppercase">{p.title}</h3>
                  <p className="text-white/60 text-sm max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{p.description}</p>
                </div>
                <div className="absolute top-10 right-10 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────── */}
      <section id="about" className="py-32 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-12 mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-4">Core Expertise</p>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">Skills<span className="opacity-10 italic serif">.</span></h2>
          </div>
          <div className="md:col-span-4 p-12 rounded-[3rem] bg-zinc-900 text-white flex flex-col justify-between h-[400px]">
            <Globe className="text-blue-500" size={48} />
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Full Stack Development</h3>
              <p className="opacity-40 text-sm leading-relaxed">Building end-to-end applications with modern technology stacks.</p>
            </div>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {skills.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center items-center text-center gap-4 bg-white dark:bg-zinc-950 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                  <Zap size={20} className="text-yellow-500" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">{s.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-0">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group py-16 border-b border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-8 cursor-default"
              >
                <div className="flex items-center gap-12">
                  <span className="text-xl opacity-20 font-serif italic">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase group-hover:pl-8 transition-all duration-500">{s.title}</h3>
                </div>
                <p className="max-w-md text-lg opacity-40 font-medium leading-relaxed group-hover:opacity-100 transition-opacity">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950 rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-24">
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Let's Connect</p>
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">Work<br /><span className="opacity-10 italic serif">Together.</span></h2>
            </div>
            <div className="space-y-8">
              <div className="flex gap-6">
                {[
                  { icon: <FaGithub size={24} />, link: data?.socialLinks?.github },
                  { icon: <FaLinkedin size={24} />, link: data?.socialLinks?.linkedin },
                  { icon: <FaTwitter size={24} />, link: data?.socialLinks?.twitter }
                ].filter(s => s.link).map((s, i) => (
                  <a key={i} href={s.link} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="p-12 rounded-[3.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-black/5">
              {submitted ? (
                <div className="py-20 text-center space-y-8">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto">
                    <Sparkles size={32} />
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter">Message Received.</h3>
                  <button onClick={() => setSubmitted(false)} className="text-[10px] font-bold uppercase tracking-widest border-b border-black dark:border-white pb-1">Send another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-30">Full Name</label>
                    <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} 
                           className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-4 text-2xl font-bold focus:outline-none focus:border-black dark:focus:border-white transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-30">Email Address</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} 
                           className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-4 text-2xl font-bold focus:outline-none focus:border-black dark:focus:border-white transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-30">The Message</label>
                    <textarea required rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} 
                              className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-4 text-2xl font-bold focus:outline-none focus:border-black dark:focus:border-white transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={formLoading} className={`w-full py-8 rounded-[2rem] ${accentColor} font-black uppercase text-sm tracking-widest flex items-center justify-center gap-4 transition-transform active:scale-95`}>
                    {formLoading ? <Loader2 className="animate-spin" /> : <><Send size={18} />Send Inquiry</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 text-center opacity-20 text-[10px] font-bold uppercase tracking-[0.4em]">
        © {new Date().getFullYear()} {data?.name || "SHIVA"} — Built with Precision.
      </footer>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setSelectedProject(null)} 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
            />
            <motion.div 
              layoutId={`project-${selectedProject.title}`}
              className="relative w-full max-w-6xl bg-white dark:bg-zinc-950 rounded-[4rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[90vh]"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-10 right-10 z-10 p-3 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20">
                <X size={24} />
              </button>
              <div className="md:w-1/2 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 uppercase font-black text-9xl rotate-90 select-none">{selectedProject.title.slice(0,2)}</div>
              </div>
              <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center gap-10">
                <div className="space-y-6">
                  <div className="flex gap-2">
                    {selectedProject.tags?.map((t: string) => (
                      <span key={t} className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-[9px] font-bold uppercase tracking-widest">{t}</span>
                    ))}
                  </div>
                  <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">{selectedProject.title}</h3>
                  <p className="text-xl opacity-40 font-medium leading-relaxed">{selectedProject.description}</p>
                </div>
                <div className="flex gap-4">
                  {selectedProject.link && (
                    <a href={selectedProject.link} target="_blank" rel="noreferrer" className={`px-10 py-5 rounded-full ${accentColor} font-bold text-[11px] uppercase tracking-widest`}>Live Site</a>
                  )}
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="px-10 py-5 rounded-full border border-zinc-200 dark:border-zinc-800 font-bold text-[11px] uppercase tracking-widest">Codebase</a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
