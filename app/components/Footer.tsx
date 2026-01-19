'use client';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="py-8 bg-card border-t border-border">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo & Copyright */}
                    <div className="text-center md:text-left">
                        <span className="text-xl font-bold gradient-text">Reza Julian</span>
                        <p className="text-sm text-muted mt-1">
                            © {currentYear} All rights reserved.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.linkedin.com/in/rezajulian/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
                            aria-label="LinkedIn"
                        >
                            <img
                                src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg"
                                alt="LinkedIn"
                                className="w-5 h-5 transition-[filter] duration-300"
                                style={{ filter: 'var(--icon-filter)' }}
                            />
                        </a>
                        <a
                            href="mailto:rhezajulian@gmail.com"
                            className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
                            aria-label="Email"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                        <a
                            href="tel:+6285718517795"
                            className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
                            aria-label="Phone"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </a>
                    </div>

                    {/* Back to top */}
                    <button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                        aria-label="Back to top"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    );
}
