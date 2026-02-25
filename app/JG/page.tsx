"use client";

import { motion } from "framer-motion";
import {
    Globe,
    Server,
    Smartphone,
    Cpu,
    MapPin,
    GraduationCap,
    Megaphone,
    CheckCircle2,
    ChevronRight,
    MessageCircle
} from "lucide-react";

const services = [
    {
        title: "Web Development",
        subtitle: "(वेबसाइट डेवलपमेंट)",
        icon: <Globe className="w-8 h-8 text-blue-600" />,
        items: [
            { en: "Business Websites", hi: "शानदार बिज़नेस वेबसाइट" },
            { en: "News Portals", hi: "आपका अपना न्यूज़ पोर्टल" },
            { en: "Portfolio Websites", hi: "प्रोफेशनल पोर्टफोलियो" },
            { en: "E-commerce Platforms", hi: "खुद की ई-कॉमर्स दुकान (Online Store)" },
            { en: "Custom Web Applications", hi: "आपके बिज़नेस के हिसाब से कस्टम वेब ऐप्स" },
            { en: "All Kinds of Web Apps", hi: "हर तरह के स्केलेबल वेब ऐप्स" },
        ],
        accent: "bg-blue-50 border-blue-100",
        waMsg: "नमस्ते, मुझे 'Web Development (वेबसाइट डेवलपमेंट)' सर्विस के बारे में और जानकारी चाहिए।"
    },
    {
        title: "Technical Infrastructure",
        subtitle: "(तकनीकी सेटअप)",
        icon: <Server className="w-8 h-8 text-emerald-600" />,
        items: [
            { en: "Server Setup & Deployment", hi: "सर्वर सेटअप (वेबसाइट लाइव करने के लिए)" },
            { en: "Hosting Configuration", hi: "फ़ास्ट और सिक्योर क्लाउड होस्टिंग" },
            { en: "Domain & Email Setup", hi: "कस्टम डोमेन (.com/.in) और बिज़नेस ईमेल" },
            { en: "Website Security", hi: "हैकर्स से वेबसाइट की सुरक्षा" },
            { en: "Performance Optimization", hi: "सुपरफ़ास्ट लोडिंग स्पीड" },
        ],
        accent: "bg-emerald-50 border-emerald-100",
        waMsg: "नमस्ते, मुझे 'Technical Infrastructure (तकनीकी सेटअप)' सर्विस के बारे में और जानकारी चाहिए।"
    },
    {
        title: "Digital Management",
        subtitle: "(डिजिटल मैनेजमेंट)",
        icon: <Smartphone className="w-8 h-8 text-purple-600" />,
        items: [
            { en: "Social Media Handling", hi: "आपके सोशल मीडिया अकाउंट्स हम संभालेंगे" },
            { en: "Business Account Setup", hi: "Google/Facebook बिज़नेस प्रोफाइल सेटअप" },
            { en: "Technical Troubleshooting", hi: "किसी भी तकनीकी समस्या का तुरंत समाधान" },
            { en: "Ongoing Maintenance", hi: "आपको लगातार मिलेगा हमारा सपोर्ट" },
        ],
        accent: "bg-purple-50 border-purple-100",
        waMsg: "नमस्ते, मुझे 'Digital Management (डिजिटल मैनेजमेंट)' सर्विस के बारे में और जानकारी चाहिए।"
    },
    {
        title: "Advanced Solutions",
        subtitle: "(एडवांस्ड डिजिटल सर्विस)",
        icon: <Cpu className="w-8 h-8 text-amber-600" />,
        items: [
            { en: "Custom Admin Panels", hi: "बिज़नेस कंट्रोल करने के लिए आपका खुद का एडमिन पैनल" },
            { en: "Payment Gateway", hi: "ऑनलाइन पेमेंट लेने की सुविधा (Paytm, UPI, Cards)" },
            { en: "Crypto & Web3", hi: "Crypto और Web3 के लिए सही टेक्निकल सलाह" },
            { en: "Automation Systems", hi: "आपका काम आसान करने के लिए ऑटोमैटिक सिस्टम" },
        ],
        accent: "bg-amber-50 border-amber-100",
        waMsg: "नमस्ते, मुझे 'Advanced Solutions (एडवांस्ड डिजिटल सर्विस)' सर्विस के बारे में और जानकारी चाहिए।"
    }
];

const highlights = [
    { title: "Technical Training", desc: "Online/Offline तकनीकी ट्रेनिंग", icon: <GraduationCap className="w-6 h-6 text-pink-600" />, waMsg: "नमस्ते, मुझे 'Technical Training (तकनीकी ट्रेनिंग)' के बारे में जानकारी चाहिए।" },
    { title: "Local Advertisement", desc: "आपके लोकल बिज़नेस का विज्ञापन", icon: <Megaphone className="w-6 h-6 text-orange-600" />, waMsg: "नमस्ते, मुझे 'Local Advertisement (लोकल बिज़नेस का विज्ञापन)' सर्विस के बारे में और जानकारी चाहिए।" },
    { title: "Local Business Growth", desc: "लोकल बिज़नेस को डिजिटल रूप से बढ़ाना", icon: <MapPin className="w-6 h-6 text-teal-600" />, waMsg: "नमस्ते, मुझे अपने लोकल बिज़नेस को डिजिटल रूप से बढ़ाने ('Local Business Growth') के बारे में बात करनी है।" },
];

export default function JGPage() {

    const getWhatsAppLink = (message: string) => {
        // URL encode the message so it's safely formatted for the WhatsApp API
        const text = encodeURIComponent(message);
        const phoneNumber = "919828116211"; // Added country code 91
        return `https://wa.me/${phoneNumber}?text=${text}`;
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-blue-100 font-sans overflow-hidden">
            {/* Background Glows (Light Mode version) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-100/50 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-sm font-semibold mb-6 shadow-sm"
                    >
                        COMPLETE DIGITAL & TECHNICAL SOLUTIONS
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 drop-shadow-sm tracking-tight">
                        Genius Developers
                    </h1>

                    <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-2xl mx-auto relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
                        <p className="text-slate-500 text-sm uppercase tracking-widest mb-2 font-medium">Strategically Associated With</p>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900">The House of Jugal Geet Associated</h2>
                        <p className="text-blue-600 font-bold mt-1">(JG Rajasthan Plus)</p>
                    </div>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.15, duration: 0.6 }}
                            className={`flex flex-col h-full bg-white border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group border-slate-200`}
                        >
                            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6 shrink-0">
                                <div className={`p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 ${service.accent}`}>
                                    {service.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
                                    <p className="text-slate-500 text-sm font-semibold mt-1">{service.subtitle}</p>
                                </div>
                            </div>

                            <ul className="space-y-4 grow">
                                {service.items.map((item, idy) => (
                                    <motion.li
                                        key={idy}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + (idy * 0.1) }}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-slate-800 font-semibold">{item.en}</p>
                                            <p className="text-slate-600 text-sm mt-0.5">{item.hi}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <a
                                    href={getWhatsAppLink(service.waMsg)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white py-3 px-6 rounded-xl font-bold transition-all hover:scale-[1.02] shadow-sm shadow-[#25D366]/20"
                                >
                                    <MessageCircle className="w-5 h-5 fill-white" />
                                    WhatsApp पर पूछें (Enquire Now)
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Special Highlights */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
                >
                    {highlights.map((item, idx) => (
                        <a
                            href={getWhatsAppLink(item.waMsg)}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={idx}
                            className="flex flex-col h-full p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="flex items-start gap-4 h-full">
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-full group-hover:scale-110 transition-transform duration-300 shrink-0">
                                    {item.icon}
                                </div>
                                <div className="flex flex-col justify-center h-full">
                                    <h4 className="text-slate-900 font-bold">{item.title}</h4>
                                    <p className="text-slate-600 text-sm font-medium mt-1">{item.desc}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </motion.div>

                {/* Footer / Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative text-center p-12 rounded-3xl overflow-hidden bg-white border border-blue-100 shadow-sm"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent -z-10"></div>

                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Genius Developers</h2>
                    <p className="text-blue-600 font-bold mb-8">Founder – Shiva</p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                        <a href="https://www.geniusdevelopers.space" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors">
                            <Globe className="w-5 h-5" />
                            <span>www.geniusdevelopers.space</span>
                        </a>
                        <a href="tel:+918955256878" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors">
                            <Smartphone className="w-5 h-5" />
                            <span>+91 8955256878</span>
                        </a>
                        <a href="tel:+919828116211" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors">
                            <Smartphone className="w-5 h-5" />
                            <span>+91 9828116211</span>
                        </a>
                    </div>

                    <p className="mt-12 text-slate-500 text-sm font-medium">
                        © {new Date().getFullYear()} Genius Developers. All Rights Reserved.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
