'use client';

import useScrollAnimation from '../hooks/useScrollAnimation';

export default function Contact() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.3 });

    return (
        <section id="contact" className="section bg-background">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div
                        ref={headerRef}
                        className={`text-center mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">
                            Get in <span className="gradient-text">Touch</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6" />
                        <p className="text-muted max-w-2xl mx-auto">
                            I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
                        </p>
                    </div>

                    {/* Contact Cards */}
                    <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 mb-12">
                        {/* Email */}
                        <a
                            href="mailto:rhezajulian@gmail.com"
                            className={`card hover-lift text-center group transition-all duration-500 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: '0ms' }}
                        >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-1">Email</h3>
                            <p className="text-sm text-muted group-hover:text-primary transition-colors">rhezajulian@gmail.com</p>
                        </a>

                        {/* Phone */}
                        <a
                            href="tel:+6285718517795"
                            className={`card hover-lift text-center group transition-all duration-500 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: '100ms' }}
                        >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-1">Phone</h3>
                            <p className="text-sm text-muted group-hover:text-primary transition-colors">+62 857 1851 7795</p>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/rezajulian/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`card hover-lift text-center group transition-all duration-500 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: '200ms' }}
                        >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <img
                                    src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg"
                                    alt="LinkedIn"
                                    className="w-7 h-7 transition-[filter] duration-300"
                                    style={{ filter: 'var(--icon-filter)' }}
                                />
                            </div>
                            <h3 className="font-semibold mb-1">LinkedIn</h3>
                            <p className="text-sm text-muted group-hover:text-primary transition-colors">linkedin.com/in/rezajulian</p>
                        </a>
                    </div>

                    {/* Location */}
                    <div
                        ref={ctaRef}
                        className={`text-center transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border mb-8">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-muted">Tangerang, Indonesia</span>
                        </div>

                        {/* CTA */}
                        <div>
                            <a
                                href="mailto:rhezajulian@gmail.com?subject=Hello Reza!"
                                className="btn-primary text-lg px-10 py-4 inline-flex"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Say Hello!
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
