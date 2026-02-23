"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Send, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState, FormEvent } from "react";

export default function Contact() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setFormState('submitting');

        // Get form data
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
        const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

        // Format WhatsApp message
        const text = `*New Inquiry from Website* 🚀\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
        const encodedText = encodeURIComponent(text);
        const waLink = `https://wa.me/918955256878?text=${encodedText}`;

        // Redirect to WhatsApp
        window.open(waLink, '_blank');

        setFormState('success');
        form.reset();
        setTimeout(() => setFormState('idle'), 3000);
    };

    const whatsAppMessage = encodeURIComponent("Hello Shiva, I want to discuss a project.");
    const whatsAppLink = `https://wa.me/918955256878?text=${whatsAppMessage}`;

    return (
        <section id="contact" className="py-16 bg-black relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-fuchsia-600/10 blur-[80px] rounded-full -z-10 pointer-events-none" />

            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-4 text-white pb-1">
                        Stop Losing <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Potential Customers</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        In a crowded market, blending in is failing. Let&apos;s build a digital presence that demands attention.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {/* Contact Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-6 flex flex-col justify-center"
                    >
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <h3 className="text-xl font-bold text-white mb-6 relative z-10">Direct Connection</h3>

                            <div className="grid gap-4 relative z-10">
                                <Link
                                    href="mailto:sshivaprajapat@gmail.com"
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group/item border border-transparent hover:border-white/5"
                                >
                                    <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-full group-hover/item:bg-indigo-500 group-hover/item:text-white transition-all duration-300">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-white mb-0.5">Email</h4>
                                        <p className="text-xs text-gray-500 group-hover/item:text-gray-300 transition-colors">Send a detailed inquiry</p>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300 text-indigo-400">
                                        <Send className="w-4 h-4" />
                                    </div>
                                </Link>

                                <Link
                                    href={whatsAppLink}
                                    target="_blank"
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group/item border border-transparent hover:border-white/5"
                                >
                                    <div className="p-3 bg-green-500/20 text-green-400 rounded-full group-hover/item:bg-green-500 group-hover/item:text-white transition-all duration-300">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-white mb-0.5">WhatsApp</h4>
                                        <p className="text-xs text-gray-500 group-hover/item:text-gray-300 transition-colors">Immediate response</p>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300 text-green-400">
                                        <Send className="w-4 h-4" />
                                    </div>
                                </Link>

                                <div className="flex items-center gap-4 p-3 rounded-xl border border-transparent">
                                    <div className="p-3 bg-blue-500/20 text-blue-400 rounded-full">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-white mb-0.5">Location</h4>
                                        <p className="text-xs text-gray-500">Based in India • Working Worldwide</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Large WhatsApp CTA */}
                        <Link
                            href={whatsAppLink}
                            target="_blank"
                            className="w-full group relative overflow-hidden rounded-xl bg-[#25D366] p-1 transition-transform active:scale-95"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-shine" />
                            <div className="relative flex items-center justify-center gap-2 bg-black/10 rounded-lg py-3 transition-colors group-hover:bg-transparent">
                                <MessageCircle className="w-5 h-5 text-white" />
                                <span className="font-bold text-white text-base tracking-wide">Start Chat on WhatsApp</span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-zinc-900/50 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm relative"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                            <Send className="w-20 h-20 text-white" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                            <h3 className="text-xl font-bold text-white mb-4">Send a Message</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="name" className="text-xs font-medium text-gray-400 ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all hover:bg-black/60"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-xs font-medium text-gray-400 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all hover:bg-black/60"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="subject" className="text-xs font-medium text-gray-400 ml-1">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all hover:bg-black/60"
                                    placeholder="Project Proposal"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="message" className="text-xs font-medium text-gray-400 ml-1">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all hover:bg-black/60 resize-none"
                                    placeholder="Tell me about your vision..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formState !== 'idle'}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center justify-center gap-2">
                                    {formState === 'idle' ? (
                                        <>
                                            Send Message <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    ) : formState === 'submitting' ? (
                                        "Sending..."
                                    ) : (
                                        "Message Sent!"
                                    )}
                                </span>
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
