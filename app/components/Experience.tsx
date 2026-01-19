'use client';

import useScrollAnimation from '../hooks/useScrollAnimation';
import { getIconUrl } from '../lib/icons';

const experiences = [
    {
        company: 'PT Bank Rakyat Indonesia',
        location: 'Central Jakarta',
        role: 'Fullstack Engineer',
        type: 'Contract',
        period: 'August 2025 - Present',
        description: [
            'Architecting and maintaining mission-critical banking applications serving millions of users',
            'Building responsive frontend interfaces with ReactJS for seamless user experiences',
            'Designing high-performance microservices using Golang and gRPC protocols',
            'Orchestrating containerized deployments with Docker, Kubernetes, and Helm Charts',
        ],
        skills: ['ReactJS', 'Golang', 'gRPC', 'Docker', 'Kubernetes'],
        current: true,
    },
    {
        company: 'QBIT',
        location: 'Central Jakarta',
        role: 'Front End Engineer',
        type: 'Contract',
        period: 'August 2024 - May 2025',
        description: [
            'Delivered pixel-perfect, performant web and mobile experiences',
            'Engineered cross-platform solutions with ReactJS and React Native',
        ],
        skills: ['ReactJS', 'React Native', 'Redux', 'NodeJS', 'GraphQL'],
        current: false,
    },
    {
        company: 'Xapiens Teknologi Indonesia',
        location: 'South Tangerang',
        role: 'Technical Lead - Full Stack Engineer',
        type: 'Full Time',
        period: 'January 2020 - May 2024',
        description: [
            'Led and mentored a team of 4 engineers, cultivating a culture of code quality and continuous improvement',
            'Established code review practices and technical standards that reduced bugs by 40%',
            'Architected full-stack solutions spanning React, Laravel, Golang, and React Native',
            'Achieved remarkable deployment velocity—from commit to production in as little as 5 minutes',
            'Collaborated cross-functionally with product, design, and business teams to deliver impactful solutions',
        ],
        skills: ['ReactJS', 'Golang', 'gRPC', 'GraphQL', 'React Native', 'Laravel'],
        current: false,
    },
    {
        company: 'PT ADI Consulting',
        location: 'South Tangerang',
        role: 'Full Stack Engineer',
        type: 'Contract',
        period: 'August 2019 - January 2020',
        description: [
            'Crafted intuitive web interfaces using ReactJS with modern UX principles',
            'Built robust GraphQL APIs with NodeJS for efficient data management',
            'Developed cross-platform mobile applications with React Native',
        ],
        skills: ['ReactJS', 'NodeJS', 'GraphQL', 'React Native'],
        current: false,
    },
    {
        company: 'PT IFCA Property365',
        location: 'South Jakarta',
        role: 'Full Stack Engineer',
        type: 'Contract',
        period: 'February 2018 - August 2019',
        description: [
            'Developed comprehensive property management solutions using PHP and modern JavaScript frameworks',
            'Created scalable backend services with CodeIgniter framework',
            'Built multi-platform mobile apps using Ionic, Angular, and React Native',
        ],
        skills: ['PHP', 'CodeIgniter', 'ReactJS', 'Angular 5', 'Ionic', 'React Native'],
        current: false,
    },
    {
        company: 'PT Artha Mulia Trijaya',
        location: 'North Jakarta',
        role: 'IT Support Specialist',
        type: 'Contract',
        period: 'June 2017 - February 2018',
        description: [
            'Managed IT infrastructure for 10+ workstations ensuring 99% uptime',
            'Implemented robust backup strategies for business continuity',
            'Provided rapid troubleshooting and resolution for technical issues',
        ],
        skills: ['Networking', 'Hardware', 'Troubleshooting'],
        current: false,
    },
];

export default function Experience() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation({ threshold: 0.1 });
    const { ref: eduRef, isVisible: eduVisible } = useScrollAnimation({ threshold: 0.3 });

    return (
        <section id="experience" className="section bg-background">
            <div className="container mx-auto">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Career <span className="gradient-text">Journey</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6" />
                    <p className="text-muted max-w-2xl mx-auto">
                        From IT support to Tech Lead—a story of continuous growth, leadership, and technical excellence
                    </p>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative">
                    {/* Timeline line */}
                    <div className={`absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 ${timelineVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                        }`} style={{ transformOrigin: 'top' }} />

                    {/* Experience cards */}
                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp.company}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className={`absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-background z-10 transition-all duration-500 ${timelineVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                                    }`} style={{ transitionDelay: `${index * 150}ms` }}>
                                    {exp.current && (
                                        <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-8 md:ml-0`}>
                                    <div
                                        className={`card hover-lift transition-all duration-700 ${timelineVisible
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-10'
                                            }`}
                                        style={{ transitionDelay: `${index * 150 + 100}ms` }}
                                    >
                                        {/* Header */}
                                        <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                                                <p className="text-primary font-medium">{exp.company}</p>
                                                <p className="text-sm text-muted">{exp.location}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${exp.current
                                                    ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                    : 'bg-muted/10 text-muted border border-border'
                                                    }`}>
                                                    {exp.current ? '🟢 Current' : exp.type}
                                                </span>
                                                <p className="text-sm text-muted mt-1">{exp.period}</p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <ul className="space-y-2 mb-4">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="flex gap-2 text-sm text-muted">
                                                    <span className="text-primary mt-1">→</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.map((skill) => {
                                                const iconUrl = getIconUrl(skill);
                                                return (
                                                    <span
                                                        key={skill}
                                                        className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                                                    >
                                                        {iconUrl && (
                                                            <img
                                                                src={iconUrl}
                                                                alt=""
                                                                className="w-3 h-3 mr-1.5 object-contain transition-[filter] duration-300"
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
                                </div>

                                {/* Empty space for the other side */}
                                <div className="hidden md:block md:w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div
                    ref={eduRef}
                    className={`mt-20 text-center transition-all duration-700 ${eduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <h3 className="text-2xl font-bold mb-8">
                        <span className="gradient-text">Education</span>
                    </h3>
                    <div className="inline-block card hover-lift max-w-md">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-foreground">Politeknik LP3I Jakarta</h4>
                                <p className="text-sm text-muted">Diploma III - Computer Informatics</p>
                                <p className="text-sm text-primary font-medium">GPA: 3.28/4.00 • 2015 - 2018</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
