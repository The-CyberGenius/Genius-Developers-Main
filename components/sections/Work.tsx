"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "Aapno Digital Studio",
        category: "Web App",
        image: "/projects/aapno-real.png",
        description: "A premium photography studio portfolio with cinematic animations and booking system.",
        tags: ["React", "GSAP", "Cinematic UI"],
        demoLink: "https://aapnodigitalstudio.in",
        codeLink: "#"
    },
    {
        id: 2,
        title: "Professor Adda",
        category: "Education",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200",
        description: "Comprehensive educational platform offering courses and live classes for students.",
        tags: ["Next.js", "LMS", "Education"],
        demoLink: "https://professoradda.com",
        codeLink: "#"
    },
    {
        id: 3,
        title: "Professor Adda Notes",
        category: "Education",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200",
        description: "Digital resource hub for study materials, notes, and academic content.",
        tags: ["Next.js", "Resource Hub", "Content"],
        demoLink: "https://professoraddanotes.com/",
        codeLink: "#"
    },
    {
        id: 4,
        title: "Ratan Mahal",
        category: "Hospitality",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
        description: "Luxury resort website showcasing amenities, rooms, and booking options.",
        tags: ["Hospitality", "Booking", "Visuals"],
        demoLink: "https://ratan-mahal.vercel.app/",
        codeLink: "#"
    },
    {
        id: 5,
        title: "Rohini Dresses & Wears",
        category: "Ecommerce",
        image: "/projects/rohini-preview.png",
        description: "A premium wholesale fashion platform for ethnic wear, uniforms, and fabrics with digital catalog.",
        tags: ["Next.js", "Wholesale", "Ecommerce"],
        demoLink: "https://rohini-dresses-wears.vercel.app/",
        codeLink: "#"
    },
];

const categories = ["All", "Web App", "Education", "Hospitality", "Ecommerce"];

export default function Work() {
    const [filter, setFilter] = useState("All");

    const filteredProjects = projects.filter(
        (project) => filter === "All" || project.category === filter
    );

    return (
        <section id="work" className="py-16 bg-black relative">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-3 text-white">
                        Selected <span className="text-zinc-500">Works</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-base">
                        A curated selection of deployed projects delivering real value to clients.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex justify-center gap-2 mb-10 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${filter === cat
                                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                : "bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="group relative bg-zinc-900/30 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col"
                            >
                                {/* Image Area */}
                                <Link href={project.demoLink} target="_blank" className="block aspect-[16/10] w-full bg-zinc-800 relative overflow-hidden">
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />

                                    {/* Project Image */}
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Hover Action */}
                                    <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <div className="p-2 bg-white text-black rounded-full shadow-lg">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>

                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="mb-3">
                                        <span className="text-[10px] font-bold tracking-wider text-indigo-400 uppercase mb-1 block">{project.category}</span>
                                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{project.title}</h3>
                                    </div>

                                    <p className="text-gray-400 mb-4 text-sm leading-relaxed flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[10px] px-2.5 py-1 bg-white/5 text-gray-300 rounded-full border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="text-center mt-12">
                    <Link href="https://github.com/The-CyberGenius" target="_blank" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">
                        <span>View more on GitHub</span>
                        <Github className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
