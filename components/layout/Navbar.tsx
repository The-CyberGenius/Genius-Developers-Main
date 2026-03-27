"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-4 w-full z-50 px-4 sm:px-6 lg:px-8 flex justify-center">
            <nav className="w-full max-w-7xl glass-panel px-4 transition-all duration-300">
                <div className="w-full">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/5 group-hover:border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] group-hover:scale-105 flex-shrink-0">
                                <Image src="/me.jpg" alt="Shiva" width={40} height={40} className="object-cover w-full h-full" priority />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-900 drop-shadow-md group-hover:text-primary transition-colors">
                                Shiva
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-300 hover:text-slate-900 glass-btn px-4 py-2 text-sm font-medium"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:block">
                            <Link
                                href="#contact"
                                className="glass-btn glass-btn-primary text-slate-900 px-6 py-2.5 text-sm font-bold flex items-center justify-center"
                            >
                                Hire Me
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 glass-btn focus:outline-none"
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-[#1e1916]/95 backdrop-blur-xl border border-orange-500/10 rounded-b-3xl overflow-hidden shadow-lg"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-[#c9c2b9] hover:text-orange-400 block px-4 py-3 rounded-xl text-base font-medium transition-colors hover:bg-white/5"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="pt-4">
                                    <Link
                                        href="#contact"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center bg-orange-500 hover:bg-orange-400 text-white px-5 py-3 rounded-full text-base font-medium transition-all shadow-[0_4px_14px_rgba(217,119,67,0.4)] hover:shadow-[0_6px_20px_rgba(217,119,67,0.5)]"
                                    >
                                        Hire Me
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
}
