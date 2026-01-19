'use client';

import { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import ProjectModal from './ProjectModal';

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

const projects: Project[] = [
    {
        title: 'BRIMO Loyalty Point',
        description: 'Engineered a robust loyalty points engine powering millions of transactions across BRIMO mobile and BRI EDC terminals. Features seamless point accrual, redemption, and fraud-resistant void mechanisms.',
        category: 'Banking',
        skills: ['Golang', 'gRPC', 'Microservices'],
    },
    {
        title: 'BRIMO Loyalty Referral',
        description: 'Built a viral referral system that incentivizes customer growth through smart reward mechanics. Designed for scale to handle surge traffic during promotional campaigns.',
        category: 'Banking',
        skills: ['Golang', 'gRPC', 'Microservices'],
    },
    {
        title: 'Kadin SuperApps',
        description: 'Transformed Indonesia\'s Chamber of Commerce digital presence with a unified super-app platform. Consolidated multiple legacy systems into one modern, scalable architecture.',
        category: 'Enterprise',
        skills: ['Golang', 'gRPC', 'ReactJS'],
    },
    {
        title: 'Kadin Anggota',
        description: 'Streamlined membership management with an intelligent registration system and real-time analytics dashboard. Reduced processing time by 60% while improving data accuracy.',
        category: 'Enterprise',
        skills: ['Laravel'],
    },
    {
        title: 'JAPFA IoT Platform',
        description: 'Pioneered an IoT integration platform connecting industrial machinery to the cloud. Real-time telemetry via MQTT with stunning Grafana visualizations for operational insights.',
        category: 'IoT',
        skills: ['Golang', 'MQTT', 'Grafana'],
    },
    {
        title: 'Genomik Solidaritas Indonesia',
        description: 'Rapidly deployed a COVID-19 testing management system during the pandemic. Handled 10,000+ daily registrations with automated scheduling and instant result notifications.',
        category: 'Healthcare',
        skills: ['ReactJS', 'Golang', 'GraphQL', 'gRPC', 'Microservices'],
    },
    {
        title: 'E-KAN Marketplace',
        description: 'Created a B2B marketplace connecting fresh produce suppliers with restaurants and retailers. Features real-time inventory, dynamic pricing, and seamless order fulfillment.',
        category: 'E-Commerce',
        skills: ['ReactJS', 'React Native', 'ExpressJS', 'Firebase'],
    },
    {
        title: 'Freight Forward Web',
        description: 'Digitized logistics operations with a comprehensive shipment tracking platform. Real-time visibility from warehouse to delivery with automated documentation.',
        category: 'Logistics',
        skills: ['React JS', 'NodeJS', 'GraphQL', 'SQL'],
    },
    {
        title: 'Freight Forward Mobile',
        description: 'Put logistics management in drivers\' pockets with a mobile-first delivery app. GPS tracking, proof of delivery, and instant status updates for stakeholders.',
        category: 'Logistics',
        skills: ['React Native', 'NodeJS', 'GraphQL', 'Firebase', 'SQL'],
    },
    {
        title: 'Thread Research Analytics',
        description: 'Built an analytics powerhouse for clinical research teams. Interactive dashboards visualize KPIs across multiple studies with drill-down capabilities.',
        category: 'Healthcare',
        skills: ['VueJS', 'NodeJS', 'MySQL'],
    },
    {
        title: 'IFCA Property Sales V3',
        description: 'End-to-end property sales solution handling reservations, payments, transfers, and legal documentation. Reduced sales cycle time by 35% with automated workflows.',
        category: 'Property',
        skills: ['ReactJS', 'Redux', 'CodeIgniter'],
    },
    {
        title: 'IFCA Property Sales V2',
        description: 'Second-generation property CRM with enhanced reporting and sales pipeline management. Robust architecture serving 50+ property developments.',
        category: 'Property',
        skills: ['Angular 5', 'CodeIgniter'],
    },
    {
        title: 'IFCA Property Mobile',
        description: 'Empowered sales agents with mobile access to inventory, pricing, and customer data. Offline-capable for on-site presentations.',
        category: 'Property',
        skills: ['Ionic', 'PHP', 'CodeIgniter'],
    },
    {
        title: 'IFCA Space Management',
        description: 'Commercial space rental solution featuring booking management, billing automation, and occupancy analytics. Increased revenue visibility for property managers.',
        category: 'Property',
        skills: ['CodeIgniter', 'Bootstrap', 'jQuery', 'Ajax', 'ChartJS'],
    },
    {
        title: 'IFCA Space Mobile',
        description: 'Mobile companion app for commercial tenants. Self-service booking, payment history, and maintenance request submission.',
        category: 'Property',
        skills: ['React Native', 'CodeIgniter'],
    },
    {
        title: 'Student Portal',
        description: 'Academic management system for tracking student grades and attendance. Intuitive interface for teachers with parent notification features.',
        category: 'Education',
        skills: ['Angular 5', 'CodeIgniter'],
    },
    {
        title: 'Gudeg Manggar Restaurant',
        description: 'Showcased Javanese culinary heritage with a mouth-watering restaurant website. Features stunning food photography, interactive menu, and rich storytelling about traditional recipes.',
        category: 'Other',
        skills: ['HTML', 'CSS', 'Bootstrap'],
        images: [
            { src: '/projects/gudeg-manggar/gudeg_manggar_hero_1768465035284.png', alt: 'Gudeg Manggar - Homepage Hero Section' },
            { src: '/projects/gudeg-manggar/gudeg_manggar_menu_1768465062414.png', alt: 'Gudeg Manggar - Menu Page' },
            { src: '/projects/gudeg-manggar/gudeg_manggar_about_1768465083378.png', alt: 'Gudeg Manggar - About Page' },
        ],
    },
];

const categories = ['All', 'Banking', 'Enterprise', 'IoT', 'Healthcare', 'E-Commerce', 'Logistics', 'Property', 'Education', 'Other'];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [showAll, setShowAll] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: filterRef, isVisible: filterVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === activeCategory);

    const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    const handlePrevImage = () => {
        if (selectedProject?.images) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? selectedProject.images!.length - 1 : prev - 1
            );
        }
    };

    const handleNextImage = () => {
        if (selectedProject?.images) {
            setCurrentImageIndex((prev) =>
                prev === selectedProject.images!.length - 1 ? 0 : prev + 1
            );
        }
    };

    return (
        <>
            <section id="projects" className="section bg-card">
                <div className="container mx-auto">
                    {/* Section Header */}
                    <div
                        ref={headerRef}
                        className={`text-center mb-12 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">
                            Featured <span className="gradient-text">Projects</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6" />
                        <p className="text-muted max-w-2xl mx-auto">
                            A portfolio of impactful solutions—from banking systems processing millions to IoT platforms connecting industrial machinery. Click to explore details.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div
                        ref={filterRef}
                        className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 ${filterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setActiveCategory(category);
                                    setShowAll(false);
                                }}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeCategory === category
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                        : 'bg-background border border-border text-muted hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedProjects.map((project, index) => (
                            <div
                                key={project.title}
                                onClick={() => openModal(project)}
                                className={`card hover-lift group cursor-pointer transition-all duration-500 ${gridVisible
                                        ? 'opacity-100 translate-y-0 scale-100'
                                        : 'opacity-0 translate-y-10 scale-95'
                                    }`}
                                style={{ transitionDelay: `${(index % 6) * 100}ms` }}
                            >
                                {/* Project Icon/Thumbnail */}
                                <div className="w-full h-40 rounded-lg bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center mb-4 overflow-hidden relative">
                                    {project.images && project.images.length > 0 ? (
                                        <img
                                            src={project.images[0].src}
                                            alt={project.images[0].alt}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <span className="text-4xl font-bold text-white/20 group-hover:text-white/40 transition-colors duration-300">
                                                {project.title.split(' ').map(w => w[0]).join('').slice(0, 3)}
                                            </span>
                                        </>
                                    )}

                                    {/* View Details Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white font-medium flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View Details
                                        </span>
                                    </div>

                                    {/* Image count badge */}
                                    {project.images && project.images.length > 1 && (
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded-full flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {project.images.length}
                                        </div>
                                    )}
                                </div>

                                {/* Category Badge */}
                                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                                    {project.category}
                                </span>

                                {/* Title */}
                                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-muted mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.skills.slice(0, 3).map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2 py-1 text-xs bg-background border border-border rounded-md"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {project.skills.length > 3 && (
                                        <span className="px-2 py-1 text-xs text-muted">
                                            +{project.skills.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Show More Button */}
                    {filteredProjects.length > 6 && !showAll && (
                        <div className={`text-center mt-12 transition-all duration-500 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}>
                            <button
                                onClick={() => setShowAll(true)}
                                className="btn-secondary"
                            >
                                Explore All Projects ({filteredProjects.length - 6} more)
                            </button>
                        </div>
                    )}

                    {showAll && filteredProjects.length > 6 && (
                        <div className="text-center mt-12">
                            <button
                                onClick={() => setShowAll(false)}
                                className="btn-secondary"
                            >
                                Show Less
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
                currentImageIndex={currentImageIndex}
                onPrevImage={handlePrevImage}
                onNextImage={handleNextImage}
            />
        </>
    );
}
