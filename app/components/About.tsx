'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, scaleIn, useScroll, useTransform, useSpring } from '../lib/animations';

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    // Parallax values for background orbs
    const orbY1 = useTransform(scrollYProgress, [0, 1], [-50, 100]);
    const orbY2 = useTransform(scrollYProgress, [0, 1], [50, -100]);
    const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

    // Smooth springs
    const smoothOrbY1 = useSpring(orbY1, { stiffness: 50, damping: 20 });
    const smoothOrbY2 = useSpring(orbY2, { stiffness: 50, damping: 20 });
    const smoothScale = useSpring(orbScale, { stiffness: 50, damping: 20 });

    // Parallax for photo
    const photoY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
    const smoothPhotoY = useSpring(photoY, { stiffness: 100, damping: 30 });

    const skills = [
        { name: 'Backend Development', icon: '⚙️' },
        { name: 'Frontend Development', icon: '💻' },
        { name: 'System Architecture', icon: '🏗️' },
        { name: 'Team Leadership', icon: '👥' },
        { name: 'DevOps & CI/CD', icon: '🚀' },
    ];

    return (
        <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden">
            {/* Background decorations with parallax */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

            {/* Parallax orb 1 */}
            <motion.div
                className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
                style={{ y: smoothOrbY1, scale: smoothScale }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Parallax orb 2 */}
            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                style={{ y: smoothOrbY2, scale: smoothScale }}
                animate={{ opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Additional parallax decorations */}
            <motion.div
                className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"
                style={{ y: useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), { stiffness: 30, damping: 20 }) }}
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-mono text-sm tracking-wider uppercase">Get to know me</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto mt-4"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 items-center">
                    {/* Left side - Photo with parallax */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={fadeInLeft}
                        className="lg:col-span-2 flex justify-center"
                    >
                        <motion.div className="relative group" style={{ y: smoothPhotoY }}>
                            {/* Glowing border effect */}
                            <motion.div
                                className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-40"
                                whileHover={{ opacity: 0.75 }}
                                transition={{ duration: 0.5 }}
                            />

                            {/* Main photo container */}
                            <motion.div
                                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="w-full h-full rounded-full overflow-hidden bg-card">
                                    <Image
                                        src="/images/reza-julian.jpg"
                                        alt="Reza Julian"
                                        fill
                                        className="object-cover object-top hover:scale-105 transition-transform duration-700"
                                        priority
                                    />
                                </div>
                            </motion.div>

                            {/* Floating badges with parallax offset */}
                            <motion.div
                                className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-blue-500/25"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                style={{ y: useSpring(useTransform(scrollYProgress, [0, 1], [-20, 20]), { stiffness: 100, damping: 30 }) }}
                            >
                                ✨ 7+ Years
                            </motion.div>
                            <motion.div
                                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-purple-500/25"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                style={{ y: useSpring(useTransform(scrollYProgress, [0, 1], [20, -20]), { stiffness: 100, damping: 30 }) }}
                            >
                                🚀 Tech Lead
                            </motion.div>
                            <motion.div
                                className="absolute top-1/2 -right-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg shadow-pink-500/25"
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                            >
                                Go & React
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={fadeInRight}
                        className="lg:col-span-3"
                    >
                        {/* Story */}
                        <motion.div
                            className="space-y-4 mb-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.p variants={staggerItem} className="text-lg text-muted leading-relaxed">
                                Hi! I&apos;m <strong className="text-foreground">Reza Julian</strong>, a passionate
                                <strong className="text-primary"> Full Stack Engineer</strong> who transforms complex
                                business challenges into elegant, scalable solutions.
                            </motion.p>

                            <motion.p variants={staggerItem} className="text-muted leading-relaxed">
                                With <strong className="text-foreground">7+ years</strong> of hands-on experience, I&apos;ve
                                architected systems that handle millions of transactions, built CI/CD pipelines that deploy
                                in <strong className="text-foreground">under 5 minutes</strong>, and led teams that
                                consistently exceed expectations.
                            </motion.p>

                            <motion.p variants={staggerItem} className="text-muted leading-relaxed">
                                At <strong className="text-foreground">Xapiens Teknologi</strong>, I served as Tech Lead,
                                mentoring a team of developers while delivering mission-critical banking applications.
                                My code runs in production at major Indonesian banks and fintech companies.
                            </motion.p>
                        </motion.div>

                        {/* Skills pills */}
                        <motion.div
                            className="flex flex-wrap gap-3 mb-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {skills.map((skill) => (
                                <motion.div
                                    key={skill.name}
                                    variants={staggerItem}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/5 transition-colors duration-300 cursor-pointer"
                                >
                                    <span className="text-lg">{skill.icon}</span>
                                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="grid grid-cols-3 gap-4"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                        >
                            {[
                                { value: '7+', label: 'Years Experience', color: 'blue' },
                                { value: '17+', label: 'Projects Shipped', color: 'purple' },
                                { value: '6', label: 'Companies Served', color: 'pink' },
                            ].map((stat) => (
                                <motion.div
                                    key={stat.label}
                                    variants={scaleIn}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className={`text-center p-5 rounded-2xl bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-500/5 border border-${stat.color}-500/20 hover:border-${stat.color}-500/40 transition-colors duration-300 cursor-pointer`}
                                >
                                    <motion.div
                                        className={`text-3xl md:text-4xl font-bold text-${stat.color}-500`}
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <div className="text-sm text-muted mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            className="mt-8 flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <motion.a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-shadow duration-300"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Let&apos;s Work Together
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href="/resume.pdf"
                                target="_blank"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-full hover:border-primary hover:bg-primary/5 transition-colors duration-300"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Resume
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
