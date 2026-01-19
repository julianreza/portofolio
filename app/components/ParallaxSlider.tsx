'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { getIconUrl } from '../lib/icons';

interface SlideData {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    color: string;
    accent: string;
    icon: string; // Technology name for Simple Icons
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
        color: "from-cyan-500 to-blue-600",
        accent: "#06b6d4",
        icon: "react"
    },
    {
        id: 3,
        title: "Innovative",
        subtitle: "Intelligence",
        description: "Integrating AI for smarter solutions",
        color: "from-rose-500 to-pink-600",
        accent: "#f43f5e",
        icon: "openai"
    },
    {
        id: 4,
        title: "Future",
        subtitle: "Ready",
        description: "Leveraging the latest full-stack frameworks",
        color: "from-amber-500 to-orange-600",
        accent: "#f59e0b",
        icon: "next.js"
    }
];

export default function ParallaxSlider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // Calculate which slide should be active based on scroll
    const slideProgress = useTransform(scrollYProgress, [0, 1], [0, slides.length - 1]);

    // Update active index based on scroll
    useEffect(() => {
        return slideProgress.onChange((latest) => {
            setActiveIndex(Math.round(latest));
        });
    }, [slideProgress]);

    // 3D Element parallax transforms
    const element3DY = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, 100]);
    const element3DRotateX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [20, 0, -15, 0, 15]);
    const element3DRotateY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-30, 0, 30, 0, -20]);
    const element3DRotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
    const element3DScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1.1, 1.05, 0.9]);

    const smooth3DY = useSpring(element3DY, { stiffness: 50, damping: 20 });
    const smoothRotateX = useSpring(element3DRotateX, { stiffness: 40, damping: 15 });
    const smoothRotateY = useSpring(element3DRotateY, { stiffness: 40, damping: 15 });
    const smoothRotateZ = useSpring(element3DRotateZ, { stiffness: 40, damping: 15 });
    const smoothScale = useSpring(element3DScale, { stiffness: 50, damping: 20 });

    // Decorative elements parallax
    const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const orb3X = useTransform(scrollYProgress, [0, 1], [0, 100]);

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

    return (
        <section
            ref={containerRef}
            className="relative bg-black lg:block"
            style={{ height: `${slides.length * 100}vh` }}
        >
            {/* Fixed viewport */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${slides[activeIndex]?.color || slides[0].color} transition-all duration-700`}
                    style={{ opacity: 0.15 }}
                />

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

                {/* Large floating orbs with parallax */}
                <motion.div
                    className={`absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br ${slides[activeIndex]?.color} rounded-full blur-3xl opacity-25`}
                    style={{ y: orb1Y }}
                />
                <motion.div
                    className="absolute top-1/3 -right-32 w-80 h-80 bg-white/5 rounded-full blur-3xl"
                    style={{ y: orb2Y }}
                />
                <motion.div
                    className={`absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-br ${slides[activeIndex]?.color} rounded-full blur-3xl opacity-15`}
                    style={{ x: orb3X }}
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
                <div className="relative h-full flex items-center">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">

                            {/* Left side - Text content with parallax */}
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
                                        {/* Slide number with parallax */}
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
                                                className="text-5xl md:text-7xl lg:text-9xl font-bold text-white leading-tight break-words"
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1, duration: 0.6 }}
                                            >
                                                {slides[activeIndex]?.title}
                                            </motion.h2>

                                            <motion.h3
                                                className={`text-4xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r ${slides[activeIndex]?.color} bg-clip-text text-transparent leading-tight break-words`}
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

                                        {/* Description with slowest parallax */}
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
                                            onClick={() => {
                                                const scrollTo = (index / (slides.length - 1)) * ((containerRef.current?.scrollHeight || 0) - window.innerHeight);
                                                window.scrollTo({ top: scrollTo, behavior: 'smooth' });
                                            }}
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <motion.div
                                                className={`h-2 rounded-full transition-all duration-500 ${index === activeIndex ? 'w-14' : 'w-6'
                                                    }`}
                                                style={{
                                                    background: index === activeIndex
                                                        ? `linear-gradient(90deg, ${slide.accent}, white)`
                                                        : 'rgba(255,255,255,0.2)'
                                                }}
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Right side - 3D Element with Scroll Animation */}
                            <div className="relative hidden lg:flex items-center justify-center h-[500px]" style={{ perspective: '1000px' }}>
                                {/* Animated glow rings */}
                                <motion.div
                                    className="absolute w-[400px] h-[400px] rounded-full"
                                    style={{
                                        background: `conic-gradient(from 0deg, ${slides[activeIndex]?.accent}40, transparent, ${slides[activeIndex]?.accent}40)`,
                                        filter: 'blur(40px)'
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
                                <motion.div
                                    className="relative"
                                    style={{
                                        rotateX: smoothRotateX,
                                        rotateY: smoothRotateY,
                                        rotateZ: smoothRotateZ,
                                        scale: smoothScale,
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
                                                transform: `rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
                                                transformStyle: 'preserve-3d',
                                            }}
                                        >
                                            {/* 3D Cube/Shape */}
                                            <div
                                                className="relative w-64 h-64 flex items-center justify-center"
                                                style={{ transformStyle: 'preserve-3d' }}
                                            >
                                                {/* Front face */}
                                                <motion.div
                                                    className="absolute w-full h-full rounded-3xl flex items-center justify-center"
                                                    style={{
                                                        background: `linear-gradient(145deg, ${slides[activeIndex]?.accent}40, ${slides[activeIndex]?.accent}10)`,
                                                        backdropFilter: 'blur(10px)',
                                                        border: `2px solid ${slides[activeIndex]?.accent}50`,
                                                        boxShadow: `0 25px 50px -12px ${slides[activeIndex]?.accent}40, inset 0 1px 1px rgba(255,255,255,0.1)`,
                                                        transform: 'translateZ(50px)',
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
                                                </motion.div>

                                                {/* Back face */}
                                                <div
                                                    className="absolute w-full h-full rounded-3xl"
                                                    style={{
                                                        background: `linear-gradient(145deg, ${slides[activeIndex]?.accent}20, transparent)`,
                                                        transform: 'translateZ(-50px) rotateY(180deg)',
                                                    }}
                                                />

                                                {/* Side faces */}
                                                {[0, 90, 180, 270].map((angle, i) => (
                                                    <div
                                                        key={angle}
                                                        className="absolute w-[100px] h-full"
                                                        style={{
                                                            background: `linear-gradient(${i % 2 === 0 ? '180deg' : '0deg'}, ${slides[activeIndex]?.accent}30, transparent)`,
                                                            transform: `rotateY(${angle}deg) translateZ(132px)`,
                                                            left: '50%',
                                                            marginLeft: '-50px',
                                                        }}
                                                    />
                                                ))}

                                                {/* Orbiting rings */}
                                                <motion.div
                                                    className="absolute w-80 h-80 rounded-full border-2"
                                                    style={{
                                                        borderColor: `${slides[activeIndex]?.accent}40`,
                                                        transform: 'rotateX(75deg)',
                                                    }}
                                                    animate={{ rotateZ: 360 }}
                                                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                                />

                                                <motion.div
                                                    className="absolute w-96 h-96 rounded-full border"
                                                    style={{
                                                        borderColor: `${slides[activeIndex]?.accent}20`,
                                                        transform: 'rotateX(60deg) rotateY(20deg)',
                                                    }}
                                                    animate={{ rotateZ: -360 }}
                                                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                                                />

                                                {/* Floating dots on orbit */}
                                                {[0, 90, 180, 270].map((angle, i) => (
                                                    <motion.div
                                                        key={`dot-${angle}`}
                                                        className="absolute w-3 h-3 rounded-full"
                                                        style={{
                                                            background: slides[activeIndex]?.accent,
                                                            boxShadow: `0 0 15px ${slides[activeIndex]?.accent}`,
                                                        }}
                                                        animate={{
                                                            x: [
                                                                Math.cos((angle + 0) * Math.PI / 180) * 160,
                                                                Math.cos((angle + 360) * Math.PI / 180) * 160
                                                            ],
                                                            y: [
                                                                Math.sin((angle + 0) * Math.PI / 180) * 160 * 0.3,
                                                                Math.sin((angle + 360) * Math.PI / 180) * 160 * 0.3
                                                            ],
                                                        }}
                                                        transition={{
                                                            duration: 8,
                                                            repeat: Infinity,
                                                            ease: 'linear',
                                                            delay: i * 2,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.div>

                                {/* Floating labels */}
                                {['Design', 'Code', 'Build', 'Ship'].map((label, i) => (
                                    <motion.div
                                        key={label}
                                        className="absolute px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                                        style={{
                                            left: `${20 + (i * 20)}%`,
                                            top: `${15 + (i * 18)}%`,
                                            background: `${slides[activeIndex]?.accent}20`,
                                            border: `1px solid ${slides[activeIndex]?.accent}40`,
                                            color: slides[activeIndex]?.accent,
                                        }}
                                        animate={{
                                            y: [0, -15, 0],
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            duration: 3 + i * 0.5,
                                            repeat: Infinity,
                                            delay: i * 0.5,
                                        }}
                                    >
                                        {label}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                    animate={{ opacity: activeIndex === 0 ? 1 : 0 }}
                >
                    <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Scroll to explore</span>
                    <motion.div
                        className="w-8 h-14 border-2 border-white/20 rounded-full flex justify-center pt-3 backdrop-blur-sm"
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{ background: slides[activeIndex]?.accent }}
                            animate={{ y: [0, 16, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
