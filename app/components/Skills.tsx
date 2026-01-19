'use client';

import { motion, staggerContainer, staggerItem, fadeInUp, scaleIn } from '../lib/animations';

const skillCategories = [
    {
        title: 'Frontend',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        skills: ['ReactJS', 'NextJS', 'VueJS', 'Angular 5', 'jQuery', 'JavaScript', 'TypeScript'],
        color: 'from-blue-500 to-cyan-500',
        iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    },
    {
        title: 'Backend',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
        ),
        skills: ['Golang', 'NodeJS', 'Express', 'PHP', 'Laravel', 'CodeIgniter', 'gRPC', 'GraphQL'],
        color: 'from-green-500 to-emerald-500',
        iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
    },
    {
        title: 'Mobile',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        skills: ['React Native', 'Flutter', 'Ionic'],
        color: 'from-purple-500 to-pink-500',
        iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    },
    {
        title: 'Database',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
        ),
        skills: ['SQL', 'NoSQL', 'MySQL', 'PostgreSQL', 'Firebase', 'Prisma'],
        color: 'from-orange-500 to-amber-500',
        iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
    },
    {
        title: 'DevOps & Tools',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        skills: ['Docker', 'Kubernetes', 'Git', 'Bamboo', 'Helm Chart', 'Grafana'],
        color: 'from-red-500 to-rose-500',
        iconBg: 'bg-gradient-to-br from-red-500 to-rose-500',
    },
    {
        title: 'Architecture',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
        skills: ['Microservices', 'REST API', 'GraphQL', 'MQTT', 'Apollo'],
        color: 'from-indigo-500 to-violet-500',
        iconBg: 'bg-gradient-to-br from-indigo-500 to-violet-500',
    },
];

export default function Skills() {
    return (
        <section id="skills" className="section bg-card">
            <div className="container mx-auto">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                    <motion.div
                        className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <p className="text-muted max-w-2xl mx-auto">
                        A comprehensive toolkit of technologies I&apos;ve mastered over 7+ years of building scalable applications
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {skillCategories.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={scaleIn}
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="card group cursor-pointer"
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <motion.div
                                    className={`p-3 rounded-xl ${category.iconBg} text-white`}
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                    {category.icon}
                                </motion.div>
                                <h3 className="text-lg font-semibold">{category.title}</h3>
                            </div>

                            {/* Skills Tags */}
                            <motion.div
                                className="flex flex-wrap gap-2"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {category.skills.map((skill) => (
                                    <motion.span
                                        key={skill}
                                        variants={staggerItem}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-3 py-1.5 text-sm bg-background rounded-full border border-border transition-colors duration-300 hover:border-primary hover:text-primary cursor-pointer"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
