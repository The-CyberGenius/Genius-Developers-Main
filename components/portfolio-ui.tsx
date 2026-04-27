"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight, ArrowUpRight, Download, Send, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const viewReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export default function PortfolioUI({
  data, skills, services, projects, resume,
}: {
  data: any; skills: any[]; services: any[]; projects: any[]; resume?: any;
}) {
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
        toast.success("Message sent! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="bg-[#fafafa] dark:bg-[#060606] text-black dark:text-white overflow-x-hidden">

      {/* ── HEADER ── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 z-50 w-full"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between mix-blend-difference">
          <span className="text-white font-bold text-lg tracking-tight">
            {(data?.name || "Shiva").split(" ")[0]}.
          </span>
          <nav className="hidden md:flex gap-10 text-sm font-medium text-white/70">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link>
          </nav>
        </div>
      </motion.header>

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col justify-end pb-20 px-6 md:px-12 pt-32">
        <div className="max-w-[1440px] mx-auto w-full">
          {/* Available badge */}
          <motion.div {...reveal(0)} className="mb-10">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for new projects
            </span>
          </motion.div>

          {/* Big name headline */}
          <motion.h1
            {...reveal(0.05)}
            className="text-[14vw] leading-[0.88] font-black tracking-tighter mb-10 text-black dark:text-white"
          >
            {(data?.name || "Balkrishan").split(" ")[0]}<br />
            <span className="text-zinc-300 dark:text-zinc-700">Prajapat.</span>
          </motion.h1>

          <motion.div {...reveal(0.1)} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-snug">
                {data?.tagline || "Full-Stack Developer & AI Integration Expert"}
              </p>
              <p className="text-zinc-400 dark:text-zinc-600 mt-2 text-base">
                {data?.location || "India • Working Worldwide"}
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#work"
                className="px-7 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-80 transition-opacity flex items-center gap-2 text-sm"
              >
                View Work <ArrowRight className="w-4 h-4" />
              </a>
              {resume?.fileUrl && (
                <a
                  href={resume.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-3.5 rounded-full border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center gap-2 text-sm"
                >
                  Download CV <Download className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            {...reveal(0.15)}
            className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800/60 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Years Experience", value: data?.yearsExperience || "3+" },
              { label: "Projects Delivered", value: data?.projectsDelivered || "25+" },
              { label: "Technologies", value: data?.technologiesMastered || "20+" },
              { label: "Availability", value: "Open" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl md:text-5xl font-black tracking-tight">{s.value}</p>
                <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="bg-black dark:bg-white py-4 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 text-white dark:text-black text-sm font-semibold uppercase tracking-widest"
        >
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex gap-12 shrink-0">
              <span>Next.js</span><span>·</span><span>React</span><span>·</span><span>Node.js</span><span>·</span>
              <span>MongoDB</span><span>·</span><span>TypeScript</span><span>·</span><span>AI Integration</span><span>·</span>
              <span>Full-Stack</span><span>·</span><span>Open for Work</span><span>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── ABOUT ── */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-[#fafafa] dark:bg-[#060606]">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...viewReveal}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6">About</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-8">
              Crafting digital<br />
              <span className="text-zinc-400 dark:text-zinc-600">experiences.</span>
            </h2>
          </motion.div>
          <motion.div {...viewReveal}>
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-8">
              {data?.aboutText || "I build world-class digital products that scale and impress."}
            </p>
            <div className="flex flex-wrap gap-4">
              {data?.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-semibold hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all"
                >
                  <Mail className="w-4 h-4" /> {data.email}
                </a>
              )}
              {data?.whatsapp && (
                <a
                  href={data.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-semibold hover:bg-green-500 hover:text-white hover:border-green-500 transition-all"
                >
                  <FaWhatsapp className="w-4 h-4" /> WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="work" className="py-32 md:py-48 px-6 md:px-12 bg-black dark:bg-white">
        <div className="max-w-[1440px] mx-auto">
          <motion.div {...viewReveal} className="flex justify-between items-end mb-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">Portfolio</p>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white dark:text-black">
                Selected<br />Works.
              </h2>
            </div>
            <span className="text-zinc-500 font-mono text-sm hidden md:block">
              {projects.length} projects
            </span>
          </motion.div>

          <div className="space-y-6">
            {(projects.length > 0 ? projects : [
              { title: "Add your first project", description: "Go to Admin Panel → Projects to add your real work.", tags: [], link: "/admin/login", featured: false }
            ]).map((p: any, i: number) => (
              <motion.div
                key={i}
                {...viewReveal}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="group"
              >
                <a
                  href={p.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-8 border-t border-white/10 dark:border-black/10 hover:pl-4 transition-all duration-300"
                >
                  <div className="flex items-center gap-6 flex-1">
                    {/* Project number */}
                    <span className="text-zinc-600 dark:text-zinc-400 font-mono text-sm w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-black group-hover:opacity-70 transition-opacity">
                          {p.title}
                        </h3>
                        {p.featured && (
                          <span className="px-2.5 py-0.5 rounded-full bg-white/10 dark:bg-black/10 text-white dark:text-black text-xs font-semibold">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-zinc-500 text-sm">{p.description?.slice(0, 100)}{p.description?.length > 100 ? "…" : ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-wrap gap-2">
                      {(p.tags || []).slice(0, 3).map((t: string, j: number) => (
                        <span key={j} className="px-3 py-1 rounded-full border border-white/10 dark:border-black/10 text-white dark:text-black text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/20 dark:border-black/20 flex items-center justify-center group-hover:bg-white group-hover:text-black dark:group-hover:bg-black dark:group-hover:text-white transition-colors shrink-0">
                      <ArrowUpRight className="w-4 h-4 text-white dark:text-black group-hover:text-black dark:group-hover:text-white" />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-32 md:py-48 px-6 md:px-12 bg-[#fafafa] dark:bg-[#060606]">
        <div className="max-w-[1440px] mx-auto">
          <motion.div {...viewReveal} className="mb-20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4">Expertise</p>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter">
              Tech<br />Arsenal.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Frontend Bento */}
            <motion.div
              {...viewReveal}
              className="md:col-span-2 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-10 md:p-14"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8">Frontend</p>
              <div className="flex flex-wrap gap-4">
                {frontendSkills.map((s: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-black shadow-sm">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-semibold text-lg">{s.name}</span>
                    <span className="text-zinc-400 text-sm ml-1">{s.proficiency}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Backend list */}
            <motion.div
              {...viewReveal}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-10"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8">Backend & Tools</p>
              <div className="space-y-5">
                {backendSkills.slice(0, 6).map((s: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-semibold flex items-center gap-2">
                      <span>{s.icon}</span>{s.name}
                    </span>
                    <span className="text-zinc-400 font-mono text-sm">{s.proficiency}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Services Bento */}
            <motion.div
              {...viewReveal}
              className="md:col-span-3 bg-black dark:bg-white rounded-3xl p-10 md:p-14"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-8">Services I Offer</p>
              <div className="grid md:grid-cols-3 gap-8">
                {services.map((s: any, i: number) => (
                  <div key={i}>
                    <div className="text-3xl mb-3">{s.icon || "✦"}</div>
                    <h3 className="text-lg font-bold text-white dark:text-black mb-2">{s.title}</h3>
                    <p className="text-zinc-400 dark:text-zinc-600 text-sm leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-32 md:py-48 px-6 md:px-12 bg-black dark:bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <motion.div {...viewReveal}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6">Get In Touch</p>
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.88] text-white dark:text-black mb-10">
                Let's<br />Talk.
              </h2>
              <p className="text-xl text-zinc-400 dark:text-zinc-600 mb-10 max-w-md">
                Have a project in mind? I build full-stack apps, SaaS products, and AI-powered digital experiences.
              </p>
              <div className="flex flex-col gap-4">
                {data?.email && (
                  <a href={`mailto:${data.email}`} className="text-zinc-400 hover:text-white dark:hover:text-black transition-colors flex items-center gap-3">
                    <Mail className="w-5 h-5" /> {data.email}
                  </a>
                )}
                {data?.whatsapp && (
                  <a href={data.whatsapp} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white dark:hover:text-black transition-colors flex items-center gap-3">
                    <FaWhatsapp className="w-5 h-5" /> WhatsApp Chat
                  </a>
                )}
              </div>
              <div className="flex gap-6 mt-10 text-zinc-500">
                {data?.socialLinks?.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-white dark:hover:text-black transition-colors"><FaGithub className="w-5 h-5" /></a>}
                {data?.socialLinks?.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-white dark:hover:text-black transition-colors"><FaLinkedin className="w-5 h-5" /></a>}
                {data?.socialLinks?.twitter && <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-white dark:hover:text-black transition-colors"><FaTwitter className="w-5 h-5" /></a>}
                {data?.socialLinks?.instagram && <a href={data.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-white dark:hover:text-black transition-colors"><FaInstagram className="w-5 h-5" /></a>}
                {data?.socialLinks?.youtube && <a href={data.socialLinks.youtube} target="_blank" rel="noreferrer" className="hover:text-white dark:hover:text-black transition-colors"><FaYoutube className="w-5 h-5" /></a>}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="bg-zinc-900 dark:bg-zinc-100 rounded-3xl p-8 md:p-12"
            >
              <form onSubmit={handleContactSubmit} className="space-y-6">
                {[
                  { label: "Name", key: "name", type: "text", placeholder: "Your name" },
                  { label: "Email", key: "email", type: "email", placeholder: "your@email.com" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key} className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">{label}</label>
                    <input
                      required
                      type={type}
                      value={formData[key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full bg-zinc-800 dark:bg-white border border-zinc-700 dark:border-zinc-200 rounded-xl px-5 py-4 text-white dark:text-black placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-white dark:focus:border-black transition-colors"
                      placeholder={placeholder}
                    />
                  </div>
                ))}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full bg-zinc-800 dark:bg-white border border-zinc-700 dark:border-zinc-200 rounded-xl px-5 py-4 text-white dark:text-black placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-white dark:focus:border-black transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-5 rounded-full bg-white dark:bg-black text-black dark:text-white font-bold text-lg hover:opacity-80 transition-opacity flex items-center justify-center gap-3 disabled:opacity-40"
                >
                  {formLoading
                    ? <Loader2 className="w-5 h-5 animate-spin" />
                    : <><Send className="w-5 h-5" /> Send Message</>
                  }
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#fafafa] dark:bg-[#060606] border-t border-zinc-200 dark:border-zinc-800/50 py-10 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-black text-2xl tracking-tighter">
            {data?.name || "Balkrishan Prajapat"}
            <span className="text-zinc-400">.</span>
          </p>
          <p className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} — {data?.tagline || "Full-Stack Developer"}
          </p>
        </div>
      </footer>
    </div>
  );
}
