"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function TermsOfService() {
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
                    <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-8 text-white">Terms of Service</h1>
                    <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                    <section className="mb-10 text-gray-300">
                        <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                        <p className="mb-4">
                            By accessing our website at Shiva.dev, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section className="mb-10 text-gray-300">
                        <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
                        <p className="mb-4">
                            Permission is granted to temporarily download one copy of the materials (information or software) on Shiva.dev's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                            <li>attempt to decompile or reverse engineer any software contained on Shiva.dev's website;</li>
                            <li>remove any copyright or other proprietary notations from the materials; or</li>
                            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                        </ul>
                    </section>

                    <section className="mb-10 text-gray-300">
                        <h2 className="text-2xl font-bold text-white mb-4">3. Services</h2>
                        <p className="mb-4">
                            The services provided by Shiva.dev are subject to the specific terms and conditions agreed upon in individual contracts with clients. These general terms apply to the use of the website itself.
                        </p>
                    </section>

                    <section className="mb-10 text-gray-300">
                        <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
                        <p className="mb-4">
                            The Service and its original content, features and functionality are and will remain the exclusive property of Shiva.dev and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Shiva.dev.
                        </p>
                    </section>

                    <section className="mb-10 text-gray-300">
                        <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
                        <p className="mb-4">
                            In no event shall Shiva.dev, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                        </p>
                    </section>

                    <section className="mb-10 text-gray-300">
                        <h2 className="text-2xl font-bold text-white mb-4">6. Governing Law</h2>
                        <p className="mb-4">
                            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>
                    </section>

                    <section className="mb-10 text-gray-300">
                        <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
                        <p className="mb-4">
                            If you have any questions about these Terms, please contact us:
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
