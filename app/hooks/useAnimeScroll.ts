'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { animate, stagger } from 'animejs';

interface UseAnimeScrollOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate3d' | 'flip' | 'slideRotate';
    duration?: number;
    delay?: number;
    easing?: string;
}

export function useAnimeScroll(options: UseAnimeScrollOptions = {}) {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true,
        animation = 'fadeUp',
        duration = 800,
        delay = 0,
        easing = 'easeOutExpo',
    } = options;

    const ref = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    const getAnimationConfig = useCallback(() => {
        const baseConfig = {
            duration,
            delay,
            ease: easing,
        };

        switch (animation) {
            case 'fadeUp':
                return {
                    ...baseConfig,
                    translateY: [50, 0],
                    opacity: [0, 1],
                };
            case 'fadeLeft':
                return {
                    ...baseConfig,
                    translateX: [-50, 0],
                    opacity: [0, 1],
                };
            case 'fadeRight':
                return {
                    ...baseConfig,
                    translateX: [50, 0],
                    opacity: [0, 1],
                };
            case 'scale':
                return {
                    ...baseConfig,
                    scale: [0.8, 1],
                    opacity: [0, 1],
                };
            case 'rotate3d':
                return {
                    ...baseConfig,
                    rotateX: [90, 0],
                    translateY: [30, 0],
                    opacity: [0, 1],
                };
            case 'flip':
                return {
                    ...baseConfig,
                    rotateY: [-90, 0],
                    opacity: [0, 1],
                };
            case 'slideRotate':
                return {
                    ...baseConfig,
                    translateX: [-100, 0],
                    rotateZ: [-10, 0],
                    opacity: [0, 1],
                };
            default:
                return {
                    ...baseConfig,
                    translateY: [30, 0],
                    opacity: [0, 1],
                };
        }
    }, [animation, duration, delay, easing]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Set initial state
        element.style.opacity = '0';

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
                    animate(element, getAnimationConfig());
                    setHasAnimated(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce, hasAnimated, getAnimationConfig]);

    return { ref };
}

// Hook for staggered children animations
export function useAnimeStagger(options: {
    threshold?: number;
    staggerDelay?: number;
    animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate3d' | 'flip';
    duration?: number;
    easing?: string;
} = {}) {
    const {
        threshold = 0.1,
        staggerDelay = 100,
        animation = 'fadeUp',
        duration = 600,
        easing = 'easeOutExpo',
    } = options;

    const containerRef = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const children = container.children;

        // Set initial state for all children
        Array.from(children).forEach((child) => {
            (child as HTMLElement).style.opacity = '0';
        });

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    const animConfig = {
                        fadeUp: { translateY: [40, 0], opacity: [0, 1] },
                        fadeLeft: { translateX: [-40, 0], opacity: [0, 1] },
                        fadeRight: { translateX: [40, 0], opacity: [0, 1] },
                        scale: { scale: [0.8, 1], opacity: [0, 1] },
                        rotate3d: { rotateX: [60, 0], translateY: [20, 0], opacity: [0, 1] },
                        flip: { rotateY: [-60, 0], opacity: [0, 1] },
                    };

                    animate(children, {
                        ...animConfig[animation],
                        duration,
                        delay: stagger(staggerDelay),
                        ease: easing,
                    });

                    setHasAnimated(true);
                    observer.unobserve(container);
                }
            },
            { threshold }
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, [threshold, staggerDelay, animation, duration, easing, hasAnimated]);

    return { containerRef };
}

// 3D Parallax scroll effect
export function useParallax3D() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

            // 3D rotation based on scroll
            const rotateX = (clampedProgress - 0.5) * 10;
            const rotateY = (clampedProgress - 0.5) * 5;
            const translateZ = clampedProgress * 20;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { ref };
}

export default useAnimeScroll;
