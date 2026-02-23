"use client";

import { motion } from "framer-motion";
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
    SiFramer, SiLaravel, SiGit, SiDocker, SiPostgresql, SiMongodb, SiRedux, SiGraphql
} from "react-icons/si";

const skills = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Framer", icon: SiFramer, color: "#E10098" },
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Postgres", icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "One For All", icon: SiGraphql, color: "#E10098" }, // Placeholder for extra coolness
];

export default function Skills() {
    return (
        <section className="py-20 md:py-32 bg-black overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 className="text-3xl md:text-6xl font-bold font-space-grotesk mb-4 md:mb-6 text-white tracking-tighter">
                        Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Arsenal</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-lg">
                        The elite weaponry used to forge digital empires.
                    </p>
                </motion.div>

                {/* Mobile View: Wrapped Grid (2-3 lines) */}
                <div className="flex flex-wrap justify-center gap-3 md:hidden">
                    {skills.map((skill, index) => (
                        <SkillCard key={`mobile-${skill.name}-${index}`} skill={skill} />
                    ))}
                </div>

                {/* Desktop View: Infinite Marquee */}
                <div className="hidden md:flex relative overflow-hidden group">
                    <div className="flex animate-marquee whitespace-nowrap gap-8">
                        {[...skills, ...skills, ...skills].map((skill, index) => (
                            <SkillCard key={`${skill.name}-${index}`} skill={skill} />
                        ))}
                    </div>
                    {/* Gradients to fade edges */}
                    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
                </div>
            </div>
        </section>
    );
}

function SkillCard({ skill }: { skill: typeof skills[0] }) {
    return (
        <div className="relative group/card flex items-center justify-center gap-2 md:gap-3 px-4 py-2.5 md:px-8 md:py-4 bg-white/5 border border-white/10 rounded-full cursor-default transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <skill.icon className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 group-hover/card:text-white" style={{ color: skill.color }} />
            <span className="text-sm md:text-lg font-medium text-gray-300 group-hover/card:text-white transition-colors">
                {skill.name}
            </span>
        </div>
    );
}
