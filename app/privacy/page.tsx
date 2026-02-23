"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
            <Navbar />
            <div className="container px-4 md:px-6 mx-auto py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto prose prose-invert"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-8 text-white">Privacy Policy</h1>
                    <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                    <section className="mb-10 text-gray-300">
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            Welcome to Shiva.dev. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="mb-10 text-gray-300">
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                        <p className="mb-4">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                            <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                        </ul>
                    </section>

                    <section className="mb-10 text-gray-300">
                        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
                        <p className="mb-4">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>To provide and maintain our Service.</li>
                            <li>To notify you about changes to our Service.</li>
                            <li>To allow you to participate in interactive features of our Service when you choose to do so.</li>
                            <li>To provide customer support.</li>
                            <li>To gather analysis or valuable information so that we can improve our Service.</li>
                            <li>To monitor the usage of our Service.</li>
                            <li>To detect, prevent and address technical issues.</li>
                        </ul>
                    </section>

                    <section className="mb-10 text-gray-300">
                        <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
                        <p className="mb-4">
                            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                        </p>
                    </section>

                    <section className="mb-10 text-gray-300">
                        <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                        <p className="mb-4">
                            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                        </p>
                    </section>

                    <section className="mb-10 text-gray-300">
                        <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
                        <p className="mb-4">
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>By visiting this page on our website: <a href="/#contact" className="text-indigo-400 hover:text-indigo-300">Contact Section</a></li>
                        </ul>
                    </section>
                </motion.div>
            </div>
            <Footer />
        </main>
    );
}
