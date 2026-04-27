"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight, ArrowUpRight, Download, Send, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";

// Fade-up variant reused throughout
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
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
  const toolSkills = skills.filter(s => s.category === "Tools");

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
        toast.error("Failed to send. Try emailing directly.");
      }
    } catch {
      toast.error("Network error. Try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      {/* ─── NAV ─────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 z-50 w-full backdrop-blur-xl bg-black/40 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">
            <span className="text-white">{(data?.name || "Shiva").split(" ")[0]}</span>
            <span className="text-zinc-500">.</span>
          </span>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors"
          >
            Hire Me
          </a>
        </div>
      </motion.header>

      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center pt-16 px-6 relative">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Available for freelance projects
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9]"
            >
              {data?.name?.split(" ")[0] || "Balkrishan"}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Prajapat.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-medium leading-relaxed"
            >
              {data?.tagline || "Full-Stack Developer & AI Integration Expert"}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-4">
              <a
                href="#work"
                className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-zinc-100 transition-colors flex items-center gap-2"
              >
                View My Work <ArrowRight className="w-5 h-5" />
              </a>
              {resume?.fileUrl && (
                <a
                  href={resume.fileUrl}
                  target="_blank"
                  className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  Download CV <Download className="w-5 h-5" />
                </a>
              )}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex gap-6 text-zinc-500 pt-2"
            >
              {data?.socialLinks?.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaGithub className="w-6 h-6" /></a>}
              {data?.socialLinks?.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaLinkedin className="w-6 h-6" /></a>}
              {data?.socialLinks?.twitter && <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaTwitter className="w-6 h-6" /></a>}
              {data?.socialLinks?.instagram && <a href={data.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaInstagram className="w-6 h-6" /></a>}
              {data?.socialLinks?.youtube && <a href={data.socialLinks.youtube} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaYoutube className="w-6 h-6" /></a>}
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/5 pt-12"
          >
            {[
              { label: "Years of Experience", value: data?.yearsExperience || "3+" },
              { label: "Projects Delivered", value: data?.projectsDelivered || "25+" },
              { label: "Technologies", value: data?.technologiesMastered || "20+" },
              { label: "Location", value: data?.location?.split("•")[0]?.trim() || "India" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-extrabold tracking-tight">{s.value}</p>
                <p className="text-zinc-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PROJECTS ───────────────────────────────────────────── */}
      <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest mb-3">Portfolio</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">Selected Works</h2>
            </motion.div>

            <div className="grid gap-6">
              {(projects.length > 0 ? projects : []).map((project: any, i: number) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group relative bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-colors"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="w-full md:w-72 h-48 md:h-auto bg-zinc-800 shrink-0 relative overflow-hidden">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl font-bold">
                            {project.title?.[0] || "P"}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="p-8 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(project.tags || []).slice(0, 4).map((tag: string, j: number) => (
                            <span key={j} className="px-3 py-1 rounded-full bg-white/5 text-zinc-400 text-xs font-medium border border-white/5">
                              {tag}
                            </span>
                          ))}
                          {project.featured && (
                            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold border border-indigo-500/30">
                              ★ Featured
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                        <p className="text-zinc-400 leading-relaxed">{project.description}</p>
                      </div>
                      <div className="flex gap-4 mt-6">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-indigo-400 transition-colors"
                          >
                            Live Demo <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
                          >
                            <FaGithub className="w-4 h-4" /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SKILLS ─────────────────────────────────────────────── */}
      <section id="skills" className="py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest mb-3">Expertise</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">Technical Skills</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Frontend */}
              <motion.div variants={fadeUp} className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-6">Frontend</h3>
                <div className="space-y-4">
                  {frontendSkills.map((s: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium flex items-center gap-2">
                          <span>{s.icon}</span>{s.name}
                        </span>
                        <span className="text-zinc-500">{s.proficiency}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Backend */}
              <motion.div variants={fadeUp} className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-6">Backend</h3>
                <div className="space-y-4">
                  {backendSkills.map((s: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium flex items-center gap-2">
                          <span>{s.icon}</span>{s.name}
                        </span>
                        <span className="text-zinc-500">{s.proficiency}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tools & AI */}
              <motion.div variants={fadeUp} className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-6">AI & Tools</h3>
                <div className="space-y-4">
                  {toolSkills.map((s: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium flex items-center gap-2">
                          <span>{s.icon}</span>{s.name}
                        </span>
                        <span className="text-zinc-500">{s.proficiency}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES ───────────────────────────────────────────── */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest mb-3">What I Offer</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">Services</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc: any, i: number) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-zinc-900 border border-white/5 hover:border-white/15 rounded-3xl p-8 transition-colors group"
                >
                  <div className="text-4xl mb-5">{svc.icon || "✦"}</div>
                  <h3 className="text-xl font-bold mb-3">{svc.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">{svc.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── ABOUT ──────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp}>
              <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest mb-3">About Me</p>
              <p className="text-2xl md:text-4xl font-medium text-zinc-300 leading-relaxed">
                {data?.aboutText || "I build world-class digital products."}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`mailto:${data?.email}`}
                  className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Email Me
                </a>
                {data?.whatsapp && (
                  <a
                    href={data.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    <FaWhatsapp className="w-4 h-4" /> WhatsApp
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT ────────────────────────────────────────────── */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-8">Let's Build<br />Something.</h2>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  Have a project in mind? I'm available for freelance projects worldwide. Let's talk about your vision.
                </p>
                <div className="space-y-4 text-zinc-300">
                  {data?.email && (
                    <a href={`mailto:${data.email}`} className="flex items-center gap-3 hover:text-white transition-colors">
                      <Mail className="w-5 h-5 text-zinc-500" /> {data.email}
                    </a>
                  )}
                  {data?.whatsapp && (
                    <a href={data.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                      <FaWhatsapp className="w-5 h-5 text-zinc-500" /> WhatsApp Me
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-zinc-900 border border-white/5 rounded-3xl p-8 md:p-10"
            >
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full bg-zinc-800 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-lg hover:from-indigo-400 hover:to-violet-500 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {formLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Send Message</>}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="font-extrabold text-xl tracking-tight">{data?.name || "Balkrishan Prajapat"}</p>
            <p className="text-zinc-500 text-sm mt-1">{data?.tagline}</p>
          </div>
          <div className="flex gap-6 text-zinc-500">
            {data?.socialLinks?.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaGithub className="w-5 h-5" /></a>}
            {data?.socialLinks?.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaLinkedin className="w-5 h-5" /></a>}
            {data?.socialLinks?.twitter && <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaTwitter className="w-5 h-5" /></a>}
            {data?.socialLinks?.instagram && <a href={data.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaInstagram className="w-5 h-5" /></a>}
            {data?.socialLinks?.youtube && <a href={data.socialLinks.youtube} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaYoutube className="w-5 h-5" /></a>}
          </div>
          <p className="text-zinc-600 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
