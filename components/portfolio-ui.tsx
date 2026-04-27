"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, Send, Loader2, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";

export default function PortfolioUI({ data, skills, services, projects, resume }: {
  data: any; skills: any[]; services: any[]; projects: any[]; resume?: any;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroOpacity  = useTransform(smoothProgress, [0, 0.7], [1, 0]);
  const heroScale    = useTransform(smoothProgress, [0, 0.7], [1, 0.88]);
  const heroY        = useTransform(smoothProgress, [0, 0.7], ["0%", "-12%"]);
  const titleX       = useTransform(smoothProgress, [0, 0.7], ["0%", "-6%"]);
  const subtitleX    = useTransform(smoothProgress, [0, 0.7], ["0%", "6%"]);
  const overlayOpacity = useTransform(smoothProgress, [0.4, 0.7], [0, 1]);

  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const frontendSkills = skills.filter(s => s.category === "Frontend");
  const backendSkills  = skills.filter(s => s.category === "Backend");

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
    <div ref={containerRef} className="bg-[#fafafa] dark:bg-[#050505] text-black dark:text-white overflow-x-hidden">

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
      <div ref={heroRef} className="h-[220vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-end pb-16 px-6 md:px-12">

          {/* Gradient overlay as hero exits */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-10"
          />

          {/* Background radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-radial from-zinc-200 dark:from-zinc-800 to-transparent opacity-40 blur-3xl" />
          </div>

          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="relative z-20 max-w-[1400px] mx-auto w-full"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for freelance
              </span>
            </motion.div>

            {/* Main title with split parallax */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                style={{ x: titleX }}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[13vw] font-black tracking-tighter leading-[0.85]"
              >
                {(data?.name || "Balkrishan").split(" ")[0]}
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.h1
                style={{ x: subtitleX }}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="text-[13vw] font-black tracking-tighter leading-[0.85] text-zinc-300 dark:text-zinc-700"
              >
                Prajapat.
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-8"
            >
              <div>
                <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium max-w-lg">
                  {data?.tagline || "Full-Stack Developer & AI Integration Expert"}
                </p>
                <p className="text-zinc-400 dark:text-zinc-600 mt-1 text-sm">{data?.location || "India • Working Worldwide"}</p>
              </div>
              <div className="flex gap-4">
                <a href="#work" className="px-7 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:opacity-75 transition-opacity flex items-center gap-2">
                  View Work <ArrowRight className="w-4 h-4" />
                </a>
                {resume?.fileUrl && (
                  <a href={resume.fileUrl} target="_blank" rel="noreferrer" className="px-7 py-3.5 rounded-full border border-zinc-300 dark:border-zinc-700 font-bold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-2">
                    Download CV <Download className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800/60 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { v: data?.yearsExperience || "3+",  l: "Years Experience" },
                { v: data?.projectsDelivered || "25+", l: "Projects Delivered" },
                { v: data?.technologiesMastered || "20+", l: "Technologies" },
                { v: "Open",                          l: "For Freelance" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-4xl md:text-5xl font-black tracking-tight">{s.v}</p>
                  <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-1">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── MARQUEE ───────────────────────────────────────── */}
      <div className="relative z-20 bg-black dark:bg-white py-5 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-16 text-white dark:text-black text-xs font-black uppercase tracking-[0.2em]"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex gap-16 shrink-0">
              <span>Next.js</span><span>·</span><span>React</span><span>·</span>
              <span>Node.js</span><span>·</span><span>MongoDB</span><span>·</span>
              <span>TypeScript</span><span>·</span><span>AI Integration</span><span>·</span>
              <span>Open for Work</span><span>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section className="py-40 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">About</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
              Crafting<br /><span className="text-zinc-400 dark:text-zinc-600">digital<br />experiences.</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}>
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-8">
              {data?.aboutText || "I build world-class digital products that scale, impress, and convert."}
            </p>
            <div className="flex flex-wrap gap-3">
              {data?.email && (
                <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-bold hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all">
                  <Mail className="w-4 h-4" /> Email Me
                </a>
              )}
              {data?.whatsapp && (
                <a href={data.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-bold hover:bg-green-500 hover:text-white hover:border-green-500 transition-all">
                  <FaWhatsapp className="w-4 h-4" /> WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────── */}
      <section id="work" className="py-40 px-6 md:px-12 bg-black dark:bg-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.9, ease:[0.16,1,0.3,1] }} className="mb-20">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Portfolio</p>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white dark:text-black">
              Selected<br />Works.
            </h2>
          </motion.div>

          <div className="divide-y divide-white/10 dark:divide-black/10">
            {(projects.length > 0 ? projects : [
              { title: "Add your first project", description: "Go to Admin → Projects", tags: [], link: "/admin/login", featured: false }
            ]).map((p: any, i: number) => (
              <motion.a
                key={i}
                href={p.link || "#"}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.7, delay: i*0.06, ease:[0.16,1,0.3,1] }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-8 group hover:pl-3 transition-all duration-300"
              >
                <div className="flex items-center gap-8 flex-1">
                  <span className="text-zinc-600 dark:text-zinc-400 font-mono text-sm w-8 shrink-0 group-hover:text-white dark:group-hover:text-black transition-colors">{String(i+1).padStart(2,"0")}</span>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl md:text-3xl font-black text-white dark:text-black group-hover:opacity-70 transition-opacity">{p.title}</h3>
                      {p.featured && <span className="px-2.5 py-0.5 rounded-full bg-white/10 dark:bg-black/10 text-xs font-bold text-white dark:text-black">Featured</span>}
                    </div>
                    <p className="text-zinc-500 text-sm">{p.description?.slice(0,90)}{(p.description?.length||0)>90?"…":""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="hidden md:flex flex-wrap gap-2">
                    {(p.tags||[]).slice(0,3).map((t:string,j:number)=>(
                      <span key={j} className="px-3 py-1 rounded-full border border-white/10 dark:border-black/10 text-xs text-white dark:text-black">{t}</span>
                    ))}
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/20 dark:border-black/20 flex items-center justify-center group-hover:bg-white group-hover:border-white dark:group-hover:bg-black dark:group-hover:border-black transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-white dark:text-black group-hover:text-black dark:group-hover:text-white transition-colors" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────── */}
      <section id="skills" className="py-40 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.9 }} className="mb-20">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Expertise</p>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter">Tech<br />Arsenal.</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }} className="md:col-span-2 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-10 md:p-14">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">Frontend</p>
              <div className="flex flex-wrap gap-4">
                {frontendSkills.map((s:any,i:number)=>(
                  <div key={i} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-black shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-bold text-lg">{s.name}</span>
                    <span className="text-zinc-400 text-xs ml-1">{s.proficiency}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.1 }} className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">Backend & Tools</p>
              <div className="space-y-5">
                {backendSkills.slice(0,7).map((s:any,i:number)=>(
                  <div key={i} className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 last:border-0">
                    <span className="font-bold flex items-center gap-2"><span>{s.icon}</span>{s.name}</span>
                    <span className="text-zinc-400 font-mono text-sm">{s.proficiency}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
            {services.length > 0 && (
              <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.15 }} className="md:col-span-3 bg-black dark:bg-white rounded-3xl p-10 md:p-16">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-12">Services</p>
                <div className="grid md:grid-cols-3 gap-10">
                  {services.map((s:any,i:number)=>(
                    <div key={i}>
                      <div className="text-4xl mb-4">{s.icon||"✦"}</div>
                      <h3 className="text-xl font-black text-white dark:text-black mb-2">{s.title}</h3>
                      <p className="text-zinc-400 dark:text-zinc-600 text-sm leading-relaxed">{s.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────── */}
      <section id="contact" className="py-40 px-6 md:px-12 bg-black dark:bg-white">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6">Contact</p>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.88] text-white dark:text-black mb-10">Let's<br />Talk.</h2>
            <p className="text-xl text-zinc-400 dark:text-zinc-600 mb-10 max-w-sm leading-relaxed">
              Ready to build something world-class? Let's make it happen.
            </p>
            <div className="space-y-4 mb-10">
              {data?.email && <a href={`mailto:${data.email}`} className="flex items-center gap-3 text-zinc-400 hover:text-white dark:hover:text-black transition-colors"><Mail className="w-5 h-5"/>{data.email}</a>}
              {data?.whatsapp && <a href={data.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-white dark:hover:text-black transition-colors"><FaWhatsapp className="w-5 h-5"/>WhatsApp Chat</a>}
            </div>
            <div className="flex gap-6 text-zinc-600">
              {data?.socialLinks?.github    && <a href={data.socialLinks.github}    target="_blank" rel="noreferrer" className="hover:text-white dark:hover:text-black transition-colors"><FaGithub    className="w-5 h-5"/></a>}
              {data?.socialLinks?.linkedin  && <a href={data.socialLinks.linkedin}  target="_blank" rel="noreferrer" className="hover:text-white dark:hover:text-black transition-colors"><FaLinkedin  className="w-5 h-5"/></a>}
              {data?.socialLinks?.twitter   && <a href={data.socialLinks.twitter}   target="_blank" rel="noreferrer" className="hover:text-white dark:hover:text-black transition-colors"><FaTwitter   className="w-5 h-5"/></a>}
              {data?.socialLinks?.instagram && <a href={data.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-white dark:hover:text-black transition-colors"><FaInstagram className="w-5 h-5"/></a>}
              {data?.socialLinks?.youtube   && <a href={data.socialLinks.youtube}   target="_blank" rel="noreferrer" className="hover:text-white dark:hover:text-black transition-colors"><FaYoutube   className="w-5 h-5"/></a>}
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.9, ease:[0.16,1,0.3,1] }} className="bg-zinc-900 dark:bg-zinc-100 rounded-3xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {["name","email"].map((field)=>(
                <div key={field} className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">{field}</label>
                  <input
                    required type={field==="email"?"email":"text"}
                    value={formData[field as keyof typeof formData]}
                    onChange={e=>setFormData({...formData,[field]:e.target.value})}
                    className="w-full bg-zinc-800 dark:bg-white border border-zinc-700 dark:border-zinc-200 rounded-xl px-5 py-4 text-white dark:text-black placeholder-zinc-500 focus:outline-none focus:border-white dark:focus:border-black transition-colors"
                    placeholder={field==="name"?"Your name":"your@email.com"}
                  />
                </div>
              ))}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Message</label>
                <textarea required rows={5} value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}
                  className="w-full bg-zinc-800 dark:bg-white border border-zinc-700 dark:border-zinc-200 rounded-xl px-5 py-4 text-white dark:text-black placeholder-zinc-500 focus:outline-none focus:border-white dark:focus:border-black transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button type="submit" disabled={formLoading}
                className="w-full py-5 rounded-full bg-white dark:bg-black text-black dark:text-white font-black text-lg hover:opacity-80 transition-opacity disabled:opacity-40 flex items-center justify-center gap-3">
                {formLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : <><Send className="w-5 h-5"/>Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-[#fafafa] dark:bg-[#050505] border-t border-zinc-200 dark:border-zinc-800/40 py-10 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-black text-2xl tracking-tighter">{data?.name||"Balkrishan Prajapat"}<span className="text-zinc-400">.</span></p>
          <p className="text-zinc-400 text-sm">© {new Date().getFullYear()} — {data?.tagline}</p>
        </div>
      </footer>
    </div>
  );
}
