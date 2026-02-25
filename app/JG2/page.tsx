"use client";

import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function JG2Page() {
    useEffect(() => {
        // Add subtle animation to service cards on load
        const cards = document.querySelectorAll('.jg2-service-card') as NodeListOf<HTMLElement>;
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });

        // Add particle effect
        const poster = document.querySelector('.jg2-main-poster') as HTMLElement;
        if (poster) {
            for (let i = 0; i < 20; i++) {
                createParticle(poster);
            }
        }

        function createParticle(container: HTMLElement) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            const isBlue = Math.random() > 0.5;
            const opacity = Math.random() * 0.5 + 0.2;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 10 + 10;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${isBlue ? '#00bfff' : '#8a2be2'};
                border-radius: 50%;
                pointer-events: none;
                opacity: ${opacity};
                left: ${left}%;
                top: ${top}%;
                animation: particleFloat ${duration}s linear infinite;
            `;
            container.appendChild(particle);
        }
    }, []);

    const websiteUrl = "https://www.geniusdevelopers.space";

    return (
        <div className="bg-[#0a0a1a] min-h-screen text-white font-sans overflow-x-hidden selection:bg-purple-500/30">
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
                
                .jg2-container {
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0f0f2f 100%);
                    min-height: 100vh;
                }
                
                .jg2-poster-container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    aspect-ratio: 3/4;
                }
                
                @media (min-width: 768px) {
                    .jg2-poster-container { aspect-ratio: 4/3; }
                }
                
                @media (min-width: 1024px) {
                    .jg2-poster-container { aspect-ratio: 16/9; max-width: 1920px; }
                }
                
                .jg2-main-poster {
                    background: linear-gradient(145deg, #0d1b2a 0%, #1b263b 30%, #0d1b2a 60%, #162447 100%);
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                    height: 100%;
                    box-shadow: 0 0 60px rgba(0, 191, 255, 0.3), 0 0 100px rgba(138, 43, 226, 0.2), inset 0 0 100px rgba(0, 191, 255, 0.05);
                    border: 2px solid rgba(0, 191, 255, 0.3);
                }
                
                .jg2-glow-effect {
                    position: absolute;
                    top: -50%; left: -50%;
                    width: 200%; height: 200%;
                    background: radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 70% 70%, rgba(138, 43, 226, 0.1) 0%, transparent 50%);
                    animation: rotate 20s linear infinite;
                    pointer-events: none;
                }
                
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .jg2-grid-pattern {
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background-image: linear-gradient(rgba(0, 191, 255, 0.03) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(0, 191, 255, 0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                    pointer-events: none;
                }
                
                .jg2-company-name {
                    font-family: 'Montserrat', sans-serif;
                    font-size: clamp(2rem, 5vw, 4rem);
                    font-weight: 900;
                    background: linear-gradient(135deg, #00bfff 0%, #8a2be2 50%, #00bfff 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    animation: shine 3s linear infinite;
                    text-shadow: 0 0 40px rgba(0, 191, 255, 0.5);
                }
                
                @keyframes shine { to { background-position: 200% center; } }
                
                .jg2-service-card {
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
                    backdrop-filter: blur(10px);
                    border-radius: 15px;
                    padding: 20px 15px;
                    border: 1px solid rgba(0, 191, 255, 0.2);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                }
                
                .jg2-service-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 3px;
                    background: linear-gradient(90deg, #00bfff, #8a2be2, #00bfff);
                    background-size: 200% auto;
                    animation: shine 2s linear infinite;
                }
                
                .jg2-service-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 40px rgba(0, 191, 255, 0.2);
                    border-color: rgba(0, 191, 255, 0.5);
                }
                
                .jg2-service-list li {
                    color: rgba(255, 255, 255, 0.8);
                    font-size: clamp(0.7rem, 1vw, 0.85rem);
                    padding: 4px 0;
                    padding-left: 18px;
                    position: relative;
                    transition: color 0.2s;
                }
                
                .jg2-service-card:hover .jg2-service-list li { color: rgba(255,255,255,1); }
                
                .jg2-service-list li::before {
                    content: '▸';
                    position: absolute;
                    left: 0;
                    color: #00bfff;
                    font-size: 0.9rem;
                    line-height: 1;
                    top: 5px;
                }
                
                .jg2-floating-circle {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0.1;
                }
                
                .jg2-circle-1 { width: 300px; height: 300px; background: #00bfff; top: -100px; right: -100px; animation: float 8s ease-in-out infinite; }
                .jg2-circle-2 { width: 200px; height: 200px; background: #8a2be2; bottom: -50px; left: -50px; animation: float 10s ease-in-out infinite reverse; }
                .jg2-circle-3 { width: 150px; height: 150px; background: #00bfff; top: 50%; left: 10%; animation: float 12s ease-in-out infinite; }
                
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(30px, -30px) scale(1.1); }
                }
                
                @keyframes particleFloat {
                    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                    25% { transform: translate(calc(var(--rand-x1, 20) * 1px), calc(var(--rand-y1, -20) * 1px)) scale(1.2); opacity: 0.6; }
                    50% { transform: translate(calc(var(--rand-x2, -30) * 1px), calc(var(--rand-y2, 30) * 1px)) scale(0.8); opacity: 0.4; }
                    75% { transform: translate(calc(var(--rand-x3, 10) * 1px), calc(var(--rand-y3, 10) * 1px)) scale(1.1); opacity: 0.5; }
                }
                `
            }} />

            <div className="jg2-container py-6 px-4 sm:px-8">
                <div className="jg2-poster-container">
                    <div className="jg2-main-poster">
                        {/* Background Effects */}
                        <div className="jg2-glow-effect"></div>
                        <div className="jg2-grid-pattern"></div>
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden jg2-floating-elements">
                            <div className="jg2-floating-circle jg2-circle-1"></div>
                            <div className="jg2-floating-circle jg2-circle-2"></div>
                            <div className="jg2-floating-circle jg2-circle-3"></div>
                        </div>

                        {/* Header Section */}
                        <div className="text-center pt-8 pb-5 px-5 relative z-10 flex flex-col items-center">
                            <h1 className="jg2-company-name">Genius Developers</h1>
                            <p className="text-[#00bfff] font-semibold tracking-[6px] mt-2 text-xs sm:text-base md:text-xl uppercase">Complete Digital & Technical Solutions</p>
                            <div className="mt-4 px-6 py-2 rounded-full border border-yellow-500/50" style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.1))' }}>
                                <p className="text-yellow-400 text-xs sm:text-sm font-medium mb-1">Strategically Associated With</p>
                                <p className="text-yellow-500 font-bold text-sm sm:text-base">The House of Jugal Geet Associated (JG Rajasthan Plus)</p>
                            </div>
                        </div>

                        <div className="h-[2px] mx-8 my-4" style={{ background: 'linear-gradient(90deg, transparent, #00bfff, #8a2be2, #00bfff, transparent)' }}></div>

                        {/* Services Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-4 md:px-8 relative z-10">
                            {/* Web Development */}
                            <div className="jg2-service-card group">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform shadow-lg" style={{ background: 'linear-gradient(135deg, #00bfff, #8a2be2)' }}>🌐</div>
                                <h3 className="text-white font-bold text-sm sm:text-base mb-3">Web Development</h3>
                                <ul className="jg2-service-list list-none">
                                    <li>Premium Business Websites</li>
                                    <li>Dynamic News Portals</li>
                                    <li>Interactive Portfolios</li>
                                    <li>Scalable E-commerce</li>
                                    <li>Custom Web Applications</li>
                                    <li>SaaS Platforms</li>
                                </ul>
                            </div>

                            {/* Technical Infrastructure */}
                            <div className="jg2-service-card group">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform shadow-lg" style={{ background: 'linear-gradient(135deg, #00bfff, #8a2be2)' }}>⚙️</div>
                                <h3 className="text-white font-bold text-sm sm:text-base mb-3">Tech Infrastructure</h3>
                                <ul className="jg2-service-list list-none">
                                    <li>Cloud Server Deployment</li>
                                    <li>High-Speed Hosting</li>
                                    <li>Enterprise Email Setup</li>
                                    <li>Advanced Cybersecurity</li>
                                    <li>Speed & SEO Optimization</li>
                                </ul>
                            </div>

                            {/* Digital Management */}
                            <div className="jg2-service-card group">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform shadow-lg" style={{ background: 'linear-gradient(135deg, #00bfff, #8a2be2)' }}>📱</div>
                                <h3 className="text-white font-bold text-sm sm:text-base mb-3">Digital Management</h3>
                                <ul className="jg2-service-list list-none">
                                    <li>Pro Social Media Handling</li>
                                    <li>Brand Profile Verification</li>
                                    <li>Rapid Troubleshooting</li>
                                    <li>Continuous Maintenance</li>
                                    <li>24/7 Priority Support</li>
                                </ul>
                            </div>

                            {/* Advanced Solutions */}
                            <div className="jg2-service-card group">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform shadow-lg" style={{ background: 'linear-gradient(135deg, #00bfff, #8a2be2)' }}>🚀</div>
                                <h3 className="text-white font-bold text-sm sm:text-base mb-3">Advanced Solutions</h3>
                                <ul className="jg2-service-list list-none">
                                    <li>Bespoke Admin Panels</li>
                                    <li>Global Payment Gateways</li>
                                    <li>Web3 & Blockchain Advisory</li>
                                    <li>Workflow Automation (AI)</li>
                                    <li>Custom API Architecture</li>
                                </ul>
                            </div>
                        </div>

                        {/* Additional Services */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5 px-4 md:px-8 py-2 relative z-10 lg:flex lg:justify-center">
                            <div className="px-4 py-3 rounded-full border border-purple-500/50 text-center hover:bg-purple-500/10 transition-colors" style={{ background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(0, 191, 255, 0.2))' }}>
                                <span className="text-white text-xs sm:text-sm font-semibold">📚 Technical Training (Online/Offline)</span>
                            </div>
                            <div className="px-4 py-3 rounded-full border border-purple-500/50 text-center hover:bg-purple-500/10 transition-colors" style={{ background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(0, 191, 255, 0.2))' }}>
                                <span className="text-white text-xs sm:text-sm font-semibold">📢 Local Advertisement Solutions</span>
                            </div>
                            <div className="px-4 py-3 rounded-full border border-purple-500/50 text-center hover:bg-purple-500/10 transition-colors" style={{ background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(0, 191, 255, 0.2))' }}>
                                <span className="text-white text-xs sm:text-sm font-semibold">🏪 Local Business Digitalization</span>
                            </div>
                        </div>

                        <div className="h-[2px] mx-8 my-4" style={{ background: 'linear-gradient(90deg, transparent, #00bfff, #8a2be2, #00bfff, transparent)' }}></div>

                        {/* Footer Section */}
                        <div className="p-5 md:p-8 relative z-10" style={{ background: 'linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.5))' }}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                {/* Founder Info */}
                                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/30 mb-2" style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.1))' }}>
                                        <span className="text-yellow-400 text-xs sm:text-sm font-medium">👨‍💻 Founder</span>
                                    </div>
                                    <h2 className="text-white text-3xl font-extrabold font-['Montserrat']">Shiva</h2>
                                </div>

                                {/* Contact Info */}
                                <div className="flex flex-col items-center md:items-start gap-3">
                                    <a href="tel:+918955256878" className="flex items-center gap-3 text-white text-base sm:text-lg font-semibold hover:text-[#00bfff] transition-colors group">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm group-hover:scale-110 transition-transform shadow-md" style={{ background: 'linear-gradient(135deg, #00bfff, #8a2be2)' }}>📞</div>
                                        <span>+91 8955256878</span>
                                    </a>
                                    <a href="tel:+919828116211" className="flex items-center gap-3 text-white text-base sm:text-lg font-semibold hover:text-[#00bfff] transition-colors group">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm group-hover:scale-110 transition-transform shadow-md" style={{ background: 'linear-gradient(135deg, #00bfff, #8a2be2)' }}>📱</div>
                                        <span>+91 9828116211</span>
                                    </a>
                                </div>

                                {/* Website & QR */}
                                <div className="flex flex-col items-center md:items-end md:text-right gap-4">
                                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[#00bfff] text-base sm:text-xl font-bold flex items-center gap-2 hover:text-[#8a2be2] transition-colors">
                                        <span>🔗</span> www.geniusdevelopers.space
                                    </a>

                                    <div className="bg-white p-2 rounded-xl shadow-lg border-2 border-transparent hover:border-[#00bfff] transition-colors cursor-pointer" title="Scan to visit website">
                                        <QRCodeSVG
                                            value={websiteUrl}
                                            size={80}
                                            bgColor={"#ffffff"}
                                            fgColor={"#0a0a1a"}
                                            level={"H"}
                                            includeMargin={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hashtag */}
                        <div className="text-center p-4 relative z-10 pt-2 pb-6">
                            <span className="text-2xl sm:text-3xl font-extrabold font-['Montserrat']" style={{
                                background: 'linear-gradient(135deg, #00bfff, #8a2be2)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                #GeniusDevelopers
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
