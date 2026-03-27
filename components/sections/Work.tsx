"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects, siteConfig } from "@/lib/data";

const categories = ["All", "Web App", "Education", "Hospitality", "Ecommerce"];

export default function Work() {
    const [filter, setFilter] = useState("All");

    const filteredProjects = projects.filter(
        (project) => filter === "All" || project.category === filter
    );

    return (
        <section id="work" className="py-16 bg-glass-base relative">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-3 text-slate-900">
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
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                                ? "glass-btn text-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                : "bg-transparent text-gray-400 border border-white/10 hover:border-white/20 hover:text-slate-900"
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
                                className="group relative glass-card overflow-hidden flex flex-col"
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
                                        <span className="text-[10px] font-bold tracking-wider text-orange-500 uppercase mb-1 block">{project.category}</span>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-300 transition-colors">{project.title}</h3>
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
                    <Link href="https://github.com/The-CyberGenius" target="_blank" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-slate-900 transition-colors border-b border-transparent hover:border-white pb-0.5">
                        <span>View more on GitHub</span>
                        <Github className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
