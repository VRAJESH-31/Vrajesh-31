import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: "CodeFolio Insights",
        description: "A holistic developer analytics platform that aggregates data from GitHub and LeetCode to assess employability. Engineered a weighted scoring algorithm to calculate competency scores and integrated Google Gemini AI for a 'Strict Hiring Manager' persona. Features robust resume parsing and secure auth with Passport.js.",
        tags: ["React", "Node.js", "Express", "MongoDB", "Gemini AI"],
        links: { demo: "#", code: "#" }
    },
    {
        title: "VoyageGen",
        description: "An advanced B2B Travel Quotation System featuring immersive 3D visuals with Three.js and Vanta.js. Architected a scalable RESTful API for real-time complex data orchestration. Implemented strict RBAC security using JWT and a logic engine for automated partner matching and cost calculation.",
        tags: ["React", "Three.js", "Tailwind", "RBAC", "Node.js"],
        links: { demo: "#", code: "#" }
    },
    {
        title: "Real-Time Chat Application",
        description: "A secure, full-stack chat platform built with Socket.IO for bidirectional communication. Features JWT-based session handling, a scalable MongoDB schema for message history, and optimistic UI updates. Supports typing indicators and online/offline user presence tracking.",
        tags: ["MERN", "Socket.IO", "JWT", "Zustand", "MongoDB"],
        links: { demo: "#", code: "#" }
    },
    {
        title: "Smart Attendance System",
        description: "Automated student attendance management system achieving 98%+ accuracy using a ResNet50 deep learning model with TensorFlow. Reduced manual errors by ~5% and administrative hours by ~10/week. Integrated Flask APIs with MongoDB for secure profile management.",
        tags: ["Python", "Flask", "TensorFlow", "ResNet50", "MongoDB"],
        links: { demo: "#", code: "#" }
    }
];

const Projects = () => {
    return (
        <section id="projects" className="w-full min-h-screen px-6 py-24 relative">
            <div className="max-w-7xl w-full mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl md:text-6xl font-display font-bold mb-20 md:mb-32"
                >
                    Selected <br />
                    <span className="ml-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        Works
                    </span>
                </motion.h2>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col md:flex-row gap-12 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Project Preview (Placeholder) */}
                            <div className="w-full md:w-3/5 aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 overflow-hidden relative group">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-display text-4xl font-bold opacity-30 group-hover:opacity-50 transition-opacity">
                                    {project.title}
                                </div>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            {/* Project Info */}
                            <div className="w-full md:w-2/5 space-y-6 pt-4">
                                <h3 className="text-3xl font-bold">{project.title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-sm font-mono text-accent border border-accent/20 px-3 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-6 pt-4">
                                    <a href={project.links.demo} className="flex items-center gap-2 hover:text-white text-gray-400 transition-colors">
                                        <ExternalLink size={20} /> Live Demo
                                    </a>
                                    <a href={project.links.code} className="flex items-center gap-2 hover:text-white text-gray-400 transition-colors">
                                        <Github size={20} /> Source
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
