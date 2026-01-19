'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { getIconUrl } from '../lib/icons';

interface ProjectImage {
    src: string;
    alt: string;
}

interface Project {
    title: string;
    description: string;
    category: string;
    skills: string[];
    images?: ProjectImage[];
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    currentImageIndex: number;
    onPrevImage: () => void;
    onNextImage: () => void;
}

export default function ProjectModal({
    project,
    isOpen,
    onClose,
    currentImageIndex,
    onPrevImage,
    onNextImage,
}: ProjectModalProps) {
    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !project) return null;

    const images = project.images || [];
    const hasImages = images.length > 0;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal Content */}
            <div
                className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
                style={{ backgroundColor: 'var(--card)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    aria-label="Close modal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image Gallery */}
                {hasImages ? (
                    <div className="relative aspect-video bg-slate-900">
                        <Image
                            src={images[currentImageIndex].src}
                            alt={images[currentImageIndex].alt}
                            fill
                            className="object-contain"
                        />

                        {/* Image Navigation */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={onPrevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={onNextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                                    aria-label="Next image"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Image indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {images.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="aspect-video bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white/20">
                            {project.title.split(' ').map(w => w[0]).join('').slice(0, 3)}
                        </span>
                    </div>
                )}

                {/* Project Details */}
                <div className="p-6 overflow-y-auto max-h-[40vh]">
                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                        {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted mb-6 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                            Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill) => {
                                const iconUrl = getIconUrl(skill);
                                return (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center px-3 py-1 text-sm rounded-md"
                                        style={{
                                            backgroundColor: 'var(--background)',
                                            border: '1px solid var(--border)'
                                        }}
                                    >
                                        {iconUrl && (
                                            <img
                                                src={iconUrl}
                                                alt=""
                                                className="w-4 h-4 mr-2 object-contain transition-[filter] duration-300"
                                                style={{ filter: 'var(--icon-filter)' }}
                                                onError={(e) => e.currentTarget.style.display = 'none'}
                                            />
                                        )}
                                        {skill}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Image Thumbnails */}
                    {hasImages && images.length > 1 && (
                        <div className="mt-4">
                            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                                Gallery ({images.length} images):
                            </h4>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            // Navigate to this image
                                            const diff = index - currentImageIndex;
                                            if (diff > 0) {
                                                for (let i = 0; i < diff; i++) onNextImage();
                                            } else if (diff < 0) {
                                                for (let i = 0; i < Math.abs(diff); i++) onPrevImage();
                                            }
                                        }}
                                        className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${index === currentImageIndex ? 'border-primary' : 'border-transparent'
                                            }`}
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
