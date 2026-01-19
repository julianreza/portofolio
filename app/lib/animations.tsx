'use client';

import { motion, Variants, useReducedMotion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { ReactNode, useRef } from 'react';

// Reusable animation variants
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

// Floating animation
export const float: Variants = {
    initial: { y: 0 },
    animate: {
        y: [-5, 5, -5],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
};

// Pulse glow animation
export const pulseGlow: Variants = {
    initial: { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
    animate: {
        boxShadow: [
            '0 0 0 0 rgba(59, 130, 246, 0.4)',
            '0 0 20px 10px rgba(59, 130, 246, 0)',
            '0 0 0 0 rgba(59, 130, 246, 0)'
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
};

// Wrapper component for scroll-triggered animations
interface MotionSectionProps {
    children: ReactNode;
    className?: string;
    variants?: Variants;
    delay?: number;
}

export function MotionSection({ children, className = '', variants = fadeInUp, delay = 0 }: MotionSectionProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={shouldReduceMotion ? {} : variants}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Animated card with hover effect
interface MotionCardProps {
    children: ReactNode;
    className?: string;
    hoverScale?: number;
}

export function MotionCard({ children, className = '', hoverScale = 1.02 }: MotionCardProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: hoverScale, y: -5 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ========================================
// PARALLAX UTILITIES
// ========================================

// Custom hook for parallax effect
export function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

// Parallax section component
interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    speed?: number; // -1 to 1, negative = slower, positive = faster
    offset?: [string, string]; // scroll trigger points
}

export function ParallaxSection({
    children,
    className = '',
    speed = 0.5,
    offset = ['start end', 'end start']
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset as ['start end', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

    if (shouldReduceMotion) {
        return <div ref={ref} className={className}>{children}</div>;
    }

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y: smoothY }}>
                {children}
            </motion.div>
        </div>
    );
}

// Parallax layer for background elements
interface ParallaxLayerProps {
    children: ReactNode;
    className?: string;
    speed?: number;
    direction?: 'vertical' | 'horizontal' | 'both';
    rotateOnScroll?: boolean;
    scaleOnScroll?: boolean;
}

export function ParallaxLayer({
    children,
    className = '',
    speed = 0.3,
    direction = 'vertical',
    rotateOnScroll = false,
    scaleOnScroll = false
}: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const yRange = speed * 200;
    const xRange = speed * 100;

    const y = useTransform(scrollYProgress, [0, 1], [-yRange, yRange]);
    const x = useTransform(scrollYProgress, [0, 1], [-xRange, xRange]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, speed * 45]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1 + speed * 0.2, 1]);

    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
    const smoothX = useSpring(x, { stiffness: 100, damping: 30 });
    const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });
    const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

    if (shouldReduceMotion) {
        return <div ref={ref} className={className}>{children}</div>;
    }

    const style: Record<string, MotionValue<number>> = {};

    if (direction === 'vertical' || direction === 'both') {
        style.y = smoothY;
    }
    if (direction === 'horizontal' || direction === 'both') {
        style.x = smoothX;
    }
    if (rotateOnScroll) {
        style.rotate = smoothRotate;
    }
    if (scaleOnScroll) {
        style.scale = smoothScale;
    }

    return (
        <motion.div ref={ref} className={className} style={style}>
            {children}
        </motion.div>
    );
}

// Parallax text effect
interface ParallaxTextProps {
    children: ReactNode;
    className?: string;
    speed?: number;
}

export function ParallaxText({ children, className = '', speed = 0.2 }: ParallaxTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [speed * -50, speed * 50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

    if (shouldReduceMotion) {
        return <div ref={ref} className={className}>{children}</div>;
    }

    return (
        <motion.div ref={ref} style={{ y, opacity }} className={className}>
            {children}
        </motion.div>
    );
}

// Re-export motion for convenience
export { motion, useReducedMotion, useScroll, useTransform, useSpring };

