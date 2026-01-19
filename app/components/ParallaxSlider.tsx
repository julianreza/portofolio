'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIconUrl } from '../lib/icons';

interface SlideData {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    color: string;
    accent: string;
    icon: string;
}

const slides: SlideData[] = [
    {
        id: 1,
        title: "Creative",
        subtitle: "Design",
        description: "Crafting intuitive and beautiful user interfaces",
        color: "from-violet-600 to-indigo-600",
        accent: "#8b5cf6",
        icon: "figma"
    },
    {
        id: 2,
        title: "Modern",
        subtitle: "Architecture",
        description: "Building scalable and performant applications",
        color: "from-cyan-600 to-blue-600",
        accent: "#06b6d4",
        icon: "react"
    },
    {
        id: 3,
        title: "Innovative",
        subtitle: "Intelligence",
        description: "Integrating AI for smarter solutions",
        color: "from-rose-600 to-pink-600",
        accent: "#f43f5e",
        icon: "openai"
    },
    {
        id: 4,
        title: "Future",
        subtitle: "Ready",
        description: "Embracing next-generation technologies",
        color: "from-emerald-600 to-teal-600",
        accent: "#10b981",
        icon: "next.js"
    }
];

export default function ParallaxSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPaused, setIsPaused] = useState(false);

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    // Mouse move handler for 3D effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const goToSlide = (index: number) => {
        setActiveIndex(index);
    };

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section
            className="relative bg-black min-h-screen overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Animated gradient background */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    className={`absolute inset-0 bg-gradient-to-br ${slides[activeIndex]?.color} transition-all duration-700`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>

            {/* Animated mesh gradient overlay */}
            <div
                className="absolute inset-0 transition-all duration-700"
                style={{
                    background: `
                        radial-gradient(ellipse at 20% 20%, ${slides[activeIndex]?.accent}25 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 80%, ${slides[activeIndex]?.accent}15 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.9) 0%, transparent 100%)
                    `,
                }}
            />

            {/* Large floating orbs */}
            <motion.div
                className={`absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br ${slides[activeIndex]?.color} rounded-full blur-3xl opacity-25`}
                animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute top-1/3 -right-32 w-80 h-80 bg-white/5 rounded-full blur-3xl"
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className={`absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-br ${slides[activeIndex]?.color} rounded-full blur-3xl opacity-15`}
                animate={{ x: [0, 30, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${(i * 5) % 100}%`,
                        top: `${(i * 7) % 100}%`,
                        width: `${2 + (i % 3)}px`,
                        height: `${2 + (i % 3)}px`,
                        background: i % 2 === 0 ? slides[activeIndex]?.accent : 'white',
                    }}
                    animate={{
                        y: [0, -30 - (i % 20), 0],
                        opacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{
                        duration: 4 + (i % 3),
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'easeInOut'
                    }}
                />
            ))}

            {/* Main content */}
            <div className="relative h-screen flex items-center">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left side - Text content */}
                        <div className="relative z-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col gap-4 md:gap-8"
                                >
                                    {/* Slide number */}
                                    <motion.div
                                        className="flex items-center gap-4"
                                    >
                                        <span
                                            className="text-5xl md:text-8xl font-bold"
                                            style={{
                                                color: slides[activeIndex]?.accent,
                                                opacity: 0.3,
                                                textShadow: `0 0 60px ${slides[activeIndex]?.accent}`
                                            }}
                                        >
                                            0{activeIndex + 1}
                                        </span>
                                        <motion.div
                                            className="h-px bg-gradient-to-r from-white/50 to-transparent"
                                            initial={{ width: 0 }}
                                            animate={{ width: 80 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                        />
                                        <span className="text-white/40 text-sm uppercase tracking-[0.1em] md:tracking-[0.3em]">
                                            / 0{slides.length}
                                        </span>
                                    </motion.div>

                                    {/* Titles Group */}
                                    <div className="flex flex-col gap-2">
                                        <motion.h2
                                            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-white leading-tight"
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1, duration: 0.6 }}
                                        >
                                            {slides[activeIndex]?.title}
                                        </motion.h2>

                                        <motion.h3
                                            className={`text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r ${slides[activeIndex]?.color} bg-clip-text text-transparent leading-tight`}
                                            style={{
                                                filter: `drop-shadow(0 0 30px ${slides[activeIndex]?.accent}50)`
                                            }}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2, duration: 0.6 }}
                                        >
                                            {slides[activeIndex]?.subtitle}
                                        </motion.h3>
                                    </div>

                                    {/* Description */}
                                    <motion.p
                                        className="text-base md:text-xl text-white/50 max-w-full md:max-w-md"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                    >
                                        {slides[activeIndex]?.description}
                                    </motion.p>

                                    {/* CTA Button */}
                                    <div>
                                        <motion.button
                                            className={`group relative px-6 py-3 md:px-10 md:py-5 bg-gradient-to-r ${slides[activeIndex]?.color} text-white text-sm md:text-base font-semibold rounded-full overflow-hidden`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                Explore More
                                                <motion.span
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    →
                                                </motion.span>
                                            </span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Slide indicators */}
                            <div className="flex gap-4 mt-16">
                                {slides.map((slide, index) => (
                                    <motion.button
                                        key={slide.id}
                                        className="relative"
                                        onClick={() => goToSlide(index)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <div
                                            className={`w-12 h-1 rounded-full transition-all duration-500 ${index === activeIndex ? 'bg-white' : 'bg-white/20'
                                                }`}
                                        />
                                        {index === activeIndex && (
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                style={{
                                                    background: `linear-gradient(90deg, ${slide.accent}, transparent)`,
                                                    boxShadow: `0 0 20px ${slide.accent}`
                                                }}
                                                layoutId="activeIndicator"
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Navigation arrows */}
                            <div className="flex gap-4 mt-8">
                                <motion.button
                                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                                    onClick={prevSlide}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    ←
                                </motion.button>
                                <motion.button
                                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                                    onClick={nextSlide}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    →
                                </motion.button>
                            </div>
                        </div>

                        {/* Right side - 3D Element */}
                        <div className="relative hidden lg:flex items-center justify-center h-[500px]" style={{ perspective: '1000px' }}>
                            {/* Animated glow rings */}
                            <motion.div
                                className={`absolute w-[400px] h-[400px] rounded-full`}
                                style={{
                                    background: `radial-gradient(circle, transparent 30%, ${slides[activeIndex]?.accent}20 70%, transparent 100%)`,
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            />

                            <motion.div
                                className={`absolute w-[350px] h-[350px] rounded-full bg-gradient-to-br ${slides[activeIndex]?.color} opacity-20 blur-3xl`}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            />

                            {/* 3D Element Container */}
                            <div
                                className="relative transition-transform duration-300"
                                style={{
                                    transform: `rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                {/* Main 3D Shape */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        className="relative"
                                        initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                        exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        style={{
                                            transformStyle: 'preserve-3d',
                                        }}
                                    >
                                        {/* 3D Cube */}
                                        <div
                                            className="w-48 h-48 relative"
                                            style={{ transformStyle: 'preserve-3d' }}
                                        >
                                            {/* Front face */}
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${slides[activeIndex]?.color} rounded-3xl flex items-center justify-center`}
                                                style={{
                                                    transform: 'translateZ(96px)',
                                                    boxShadow: `0 0 60px ${slides[activeIndex]?.accent}40, inset 0 0 60px ${slides[activeIndex]?.accent}20`
                                                }}
                                            >
                                                <div className="w-32 h-32 flex items-center justify-center">
                                                    {getIconUrl(slides[activeIndex]?.icon) && (
                                                        <img
                                                            src={getIconUrl(slides[activeIndex]?.icon)!}
                                                            alt={slides[activeIndex]?.title}
                                                            className="w-full h-full object-contain drop-shadow-2xl"
                                                            style={{
                                                                filter: 'var(--icon-filter, none) drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            {/* Back face */}
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${slides[activeIndex]?.color} rounded-3xl opacity-50`}
                                                style={{
                                                    transform: 'translateZ(-96px) rotateY(180deg)',
                                                    boxShadow: `0 0 30px ${slides[activeIndex]?.accent}20`
                                                }}
                                            />
                                            {/* Side faces */}
                                            {[0, 90, 180, 270].map((rotation, i) => (
                                                <div
                                                    key={i}
                                                    className={`absolute inset-0 bg-gradient-to-b ${slides[activeIndex]?.color} opacity-30`}
                                                    style={{
                                                        transform: `rotateY(${rotation}deg) translateZ(96px)`,
                                                        width: '192px',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Floating labels */}
                            {['Design', 'Code', 'Build', 'Ship'].map((label, i) => (
                                <motion.div
                                    key={label}
                                    className="absolute px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                                    style={{
                                        left: `${20 + (i * 20)}%`,
                                        top: `${15 + (i * 18)}%`,
                                        background: `${slides[activeIndex]?.accent}20`,
                                        color: slides[activeIndex]?.accent,
                                        border: `1px solid ${slides[activeIndex]?.accent}30`
                                    }}
                                    animate={{
                                        y: [0, -10, 0],
                                        opacity: [0.6, 1, 0.6]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                        ease: 'easeInOut'
                                    }}
                                >
                                    {label}
                                </motion.div>
                            ))}

                            {/* Corner accents */}
                            {['-top-4 -right-4', '-bottom-4 -right-4', '-bottom-4 -left-4', '-top-4 -left-4'].map((position, i) => (
                                <motion.div
                                    key={i}
                                    className={`absolute ${position} w-3 h-3 rounded-full`}
                                    style={{ background: slides[activeIndex]?.accent }}
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.3
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                <motion.div
                    key={activeIndex}
                    className={`h-full bg-gradient-to-r ${slides[activeIndex]?.color}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                />
            </div>
        </section>
    );
}
