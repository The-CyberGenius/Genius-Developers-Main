"use client";

import { motion } from "framer-motion";
import { Layout, Smartphone, Gauge, Search, ShoppingBag, ArrowUpRight, Rocket } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: <Layout className="w-8 h-8" />,
        title: "Website Development",
        description: "Custom, high-performance websites tailored to your brand focused on conversion and aesthetics.",
        color: "text-blue-400",
        gradient: "from-blue-500/20 to-transparent",
        border: "group-hover:border-blue-500/50"
    },
    {
        icon: <Rocket className="w-8 h-8" />,
        title: "High-Converting Landing Pages",
        description: "Sales-focused pages designed with psychology and precision to maximize ROI and capture leads.",
        color: "text-red-400",
        gradient: "from-red-500/20 to-transparent",
        border: "group-hover:border-red-500/50"
    },
    {
        icon: <ShoppingBag className="w-8 h-8" />,
        title: "E-commerce Solutions",
        description: "Robust online stores with secure payments, inventory management, and seamless checkout experiences.",
        color: "text-emerald-400",
        gradient: "from-emerald-500/20 to-transparent",
        border: "group-hover:border-emerald-500/50"
    },
    {
        icon: <Smartphone className="w-8 h-8" />,
        title: "Web Apps / PWAs",
        description: "Scalable progressive web apps that feel native, built with Next.js and modern technologies.",
        color: "text-purple-400",
        gradient: "from-purple-500/20 to-transparent",
        border: "group-hover:border-purple-500/50"
    },
    {
        icon: <Gauge className="w-8 h-8" />,
        title: "Performance Optimization",
        description: "Speeding up your digital presence. Core Web Vitals optimization for lighting fast load times.",
        color: "text-amber-400",
        gradient: "from-amber-500/20 to-transparent",
        border: "group-hover:border-amber-500/50"
    },
    {
        icon: <Search className="w-8 h-8" />,
        title: "SEO Optimization",
        description: "Ranking your website higher in search engines with technical SEO and best practices.",
        color: "text-pink-400",
        gradient: "from-pink-500/20 to-transparent",
        border: "group-hover:border-pink-500/50"
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 relative overflow-hidden bg-black">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-4 text-white">
                        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Services</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Elevating businesses with cutting-edge digital solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative p-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/10 ${service.border}`}
                        >
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Icon Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-2xl bg-black/50 border border-white/5 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                                        {service.icon}
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0 text-white/50">
                                        <ArrowUpRight className="w-6 h-6" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-6 flex-grow group-hover:text-gray-300 transition-colors">
                                    {service.description}
                                </p>

                                {/* Bottom Decorative Line */}
                                <div className={`w-12 h-1 rounded-full bg-current opacity-20 group-hover:w-full transition-all duration-500 ${service.color}`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
