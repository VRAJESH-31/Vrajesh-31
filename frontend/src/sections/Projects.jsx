import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

const projects = [
    {
        title: "CodeFolio Insights",
        category: "Analytics Platform",
        description: "A holistic developer analytics platform aggregating data from GitHub and LeetCode. Features a weighted scoring algorithm and a 'Strict Hiring Manager' AI persona powered by Gemini.",
        tags: ["React", "Node.js", "Express", "MongoDB", "Gemini AI"],
        links: { demo: "#", code: "https://github.com/VRAJESH-31/CodeFolio-Insights" },
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "VoyageGen",
        category: "B2B Travel System",
        description: "Advanced B2B Travel Quotation System with immersive 3D visuals. Architected a scalable RESTful API and implemented strict RBAC security with automated cost calculation engines.",
        tags: ["React", "Three.js", "Tailwind", "RBAC", "Node.js"],
        links: { demo: "#", code: "#" },
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
    },
    {
        title: "Real-Time Chat",
        category: "Communication",
        description: "Secure, full-stack chat platform with Socket.IO. Features JWT session handling, optimistic UI updates, and a scalable message history schema.",
        tags: ["MERN", "Socket.IO", "JWT", "Zustand", "MongoDB"],
        links: { demo: "#", code: "#" },
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
    },
    {
        title: "Smart Attendance",
        category: "Computer Vision",
        description: "Automated attendance system achieving 98%+ accuracy using ResNet50. Reduced manual errors by 5% and administrative hours by 10/week.",
        tags: ["Python", "Flask", "TensorFlow", "ResNet50", "MongoDB"],
        links: { demo: "#", code: "#" },
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
    }
];

const Projects = () => {
    return (
        <section id="projects" className="w-full min-h-screen px-6 py-32 relative">
            <div className="max-w-7xl w-full mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-20 space-y-4"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-bold">
                        Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Works</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl">
                        A collection of projects pushing the boundaries of web development and AI integration.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const ref = useRef(null);

    const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            className="group relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden"
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(147, 51, 234, 0.15),
                            transparent 80%
                        )
                    `,
                }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col">
                <div className="aspect-video w-full overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between space-y-6 bg-black/20 backdrop-blur-sm">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-accent text-sm font-mono tracking-wider uppercase mb-2 block">{project.category}</span>
                                <h3 className="text-2xl font-bold font-display group-hover:text-purple-400 transition-colors">{project.title}</h3>
                            </div>
                            <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                <ArrowUpRight className="w-5 h-5" />
                            </a>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-6">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 text-xs font-mono text-gray-300 bg-white/5 rounded-full border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Projects;
