import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Play, Cpu, GitBranch } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionBackground from '../components/SectionBackground';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: "voyagegen",
        title: "VoyageGen",
        category: "B2B Travel AI Operating System",
        summary: "An enterprise-grade, AI-powered travel quotation system that leverages a multi-agent architecture to automate destination research and itinerary planning, reducing manual work from hours to minutes.",
        description: [
            "Engineered a sophisticated multi-agent AI pipeline utilizing Google Gemini 2.5 Flash and SerpAPI to automate destination research, itinerary design, and pricing, reducing manual quote generation time by 95%.",
            "Architected an asynchronous execution model with a 5-agent sequential workflow (Supervisor, Research, Planner, Pricer, and Quality) to ensure granular error recovery and 100% quality validation.",
            "Designed an interactive real-time experience featuring a 2-second intelligent polling system that tracks agent progress through a high-performance React dashboard styled with Tailwind CSS.",
            "Implemented production-ready security protocols including tiered JWT authentication, bcrypt credential hashing, and strict rate-limiting for high-load AI operations and agent-partner data protection.",
            "Developed immersive frontend interactions using Framer Motion for seamless state transitions and visualized complex quotation metrics through polished, client-ready interfaces."
        ],
        tags: ["React", "Node.js", "Express", "MongoDB", "Google Gemini AI", "Multi-Agent AI", "SerpAPI"],
        links: {
            demo: "https://voyage-gen-b2-b-travel-agency-quoat.vercel.app/",
            code: "https://github.com/VRAJESH-31/VoyageGEN--B2B-Travel-Agency-Quoatation-System"
        },
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "devlog-extension",
        title: "Auto-DevLog",
        category: "Developer Productivity",
        summary: "An AI-powered VS Code extension that automates development journaling by tracking real-time keystrokes and generating professional session summaries.",
        description: [
            "Architected a modular, service-oriented VS Code extension using Node.js to silently monitor file changes with a custom-built event-driven pipeline and debounced capture engine.",
            "Engineered a zero-data-loss crash recovery system that performs synchronous session backups to local storage on every capture, ensuring seamless restoration across IDE restarts.",
            "Integrated Google Gemini AI with sophisticated system prompt engineering to analyze file relationships and generate structured Markdown logs following professional technical writing standards.",
            "Designed an interactive real-time dashboard using a VS Code Webview panel and a dynamic status bar manager to visualize session metrics and file modification statistics."
        ],
        tags: ["Node.js", "VS Code API", "Gemini AI", "Markdown", "System Design"],
        links: {
            demo: "#",
            code: "https://github.com/VRAJESH-31/dev-log-vs-code_extention"
        },
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "codefolio-insights",
        title: "CodeFolio Insights",
        category: "Analytics Platform",
        summary: "A comprehensive developer analytics platform that aggregates GitHub and LeetCode metrics to evaluate candidate employability with custom algorithms.",
        description: [
            "Engineered CodeFolio Insights, a holistic developer analytics platform that aggregates and evaluates data from GitHub and LeetCode to assess candidate employability, providing users with quantifiable performance scores and tailored improvement roadmaps.",
            "Architected a scalable Node.js and Express backend to process real-time API data, implementing custom weighted algorithms that calculate normalized competency scores based on commit history, problem-solving streaks, and contest ratings.",
            "Integrated Google Gemini AI to power a \"Strict Hiring Manager\" persona for critical resume parsing and analysis, while establishing secure user authentication using Passport.js with Google OAuth 2.0 and JWT for protected session management.",
            "Developed a high-performance React frontend optimized with TanStack Query for efficient server state caching and Zustand for global state management, visualizing complex metrics through interactive Recharts and ApexCharts dashboards."
        ],
        tags: ["React", "Node.js", "Express", "MongoDB", "Gemini AI", "OAuth 2.0"],
        links: { demo: "#", code: "https://github.com/VRAJESH-31/CodeFolio-Insights" },
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    },
    {
        id: "ai-post-generator",
        title: "AI Social Media Content Generator",
        category: "AI Content Automation",
        summary: "A specialized platform designed to streamline social media workflows by generating high-quality image captions and AI-powered video content from user uploads.",
        description: [
            "Developed a full-stack content generation engine utilizing Google Gemini AI to analyze uploaded images and produce contextually relevant, engaging social media captions.",
            "Architected a robust Node.js and Express backend featuring a dedicated video processing pipeline to manage complex video generation jobs and state tracking.",
            "Implemented a secure media handling system using Multer for local storage management and Mongoose schemas to maintain persistent records of user-generated content and job history.",
            "Designed a modular React frontend with a tabbed interface for seamless navigation between captioning, video generation, and historical content archives.",
            "Integrated a comprehensive JWT-based authentication system to ensure private access to personal content galleries and generation history for individual users."
        ],
        tags: ["React", "Node.js", "Express", "MongoDB", "Gemini AI", "JWT", "Tailwind CSS"],
        links: {
            demo: "#",
            code: "https://github.com/VRAJESH-31/ai-post-generater"
        },
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop"
    },
    {
        title: "Real-Time Chat",
        category: "Communication",
        summary: "A secure, full-stack real-time communication platform built with Socket.IO, featuring instant messaging and online presence tracking.",
        description: [
            "Built a secure full-stack chat application with user authentication and session handling powered by JWT, ensuring safe login, token validation, and protected API routes.",
            "Integrated Socket.IO for real-time, bidirectional communication, enabling instant messaging, typing indicators, and online/offline user presence tracking.",
            "Designed and optimized a scalable MongoDB schema to store users, conversations, and message history, ensuring efficient data retrieval under heavy usage.",
            "Developed a responsive React UI with reusable components and smooth state management, providing a seamless chat experience across desktop and mobile devices."
        ],
        tags: ["MERN", "Socket.IO", "JWT", "Zustand", "MongoDB"],
        links: { demo: "https://chat-app-pearl-phi.vercel.app/", code: "https://github.com/VRAJESH-31/Chat-app" },
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "AI Code Reviewer",
        category: "Developer Tool",
        summary: "An innovative developer tool powered by Google's Gemini AI, delivering automated, intelligent code quality feedback and structured review suggestions.",
        description: [
            "Developed an innovative tool using the Gemini API to deliver smart, automated code quality feedback, helping developers catch bugs early.",
            "Designed a Node.js backend for secure handling of API requests and code analysis, optimizing for low latency responses.",
            "Built a React-based UI for intuitive code input and structured AI suggestions, featuring syntax highlighting and real-time feedback.",
            "Added robust error handling and rate limiting to ensure reliability and stability during high-volume API interactions."
        ],
        tags: ["Node.js", "Gemini API", "React"],
        links: { demo: "https://ai-powered-code-reviewer-uxfo.vercel.app/", code: "https://github.com/VRAJESH-31/Ai-powered-Code-Reviewer" },
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Smart Attendance",
        category: "Computer Vision",
        summary: "An automated student attendance management system powered by a custom deep learning ResNet50 model achieving 98%+ facial recognition accuracy.",
        description: [
            "Designed and deployed a full-stack web application for automated student attendance management, reducing manual errors by 5% and saving ~10 administrative hours per week.",
            "Implemented a ResNet50 deep learning model with TensorFlow, achieving 98%+ accuracy in face recognition across varied lighting and angles.",
            "Integrated Flask APIs with a MongoDB database to securely manage student profiles and attendance records.",
            "Enhanced reliability of attendance tracking by significantly reducing false positives, ensuring accurate and consistent student records."
        ],
        tags: ["Python", "Flask", "TensorFlow", "ResNet50", "MongoDB", "React"],
        links: { demo: "#", code: "https://github.com/VRAJESH-31/Smart-attendance" },
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Notes Application",
        category: "Productivity",
        summary: "A responsive full-stack note-taking application demonstrating complete CRUD operations, secure routing, and real-time MongoDB data persistence.",
        description: [
            "Created a full-stack notes app with complete CRUD functionality, enabling users to create, read, update, and delete notes seamlessly.",
            "Built a secure REST API with Express.js and protected routes for personalized data access, ensuring user privacy and data integrity.",
            "Used React Hooks for efficient state management in a single-page app environment, delivering a snappy and responsive user experience.",
            "Implemented MongoDB persistence, allowing notes to sync across devices in real-time."
        ],
        tags: ["React", "Node.js", "Express", "MongoDB"],
        links: { demo: "https://notes-app-nine-navy.vercel.app/", code: "https://github.com/VRAJESH-31/notes-app" },
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
    },

];

function ProjectCard({ project, index }) {
    const projectId = project.id || project.title.toLowerCase().replace(/\s+/g, '-');

    return (
        <article
            className={`
                relative flex-shrink-0
                w-full md:w-screen md:min-w-[100vw]
                h-auto md:h-full
                px-6 md:px-16 lg:px-24
                py-10 md:py-0
                flex items-center
                ${index < projects.length - 1 ? 'border-r border-white/10' : ''}
            `}
        >
            <div
                className="
                    w-full h-full
                    grid grid-cols-1 md:grid-cols-2
                    gap-8 md:gap-12
                    items-center
                "
            >
                {/* Left: Text */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold font-mono text-gray-300">
                            {project.category}
                        </span>

                        <h3 className="text-4xl md:text-6xl font-display font-bold leading-[1.05] tracking-tight">
                            <span className="text-white">{project.title}</span>
                        </h3>

                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl">
                            {project.summary}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <motion.span
                                key={tag}
                                whileHover={{ scale: 1.05, y: -2 }}
                                transition={{ duration: 0.2 }}
                                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-400/20 text-xs text-gray-200 font-medium backdrop-blur-sm hover:border-purple-400/40 hover:from-purple-500/20 hover:to-cyan-500/20"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <motion.a
                            href={project.links.code}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-white to-gray-100 text-black font-bold shadow-lg hover:shadow-xl hover:shadow-white/20 transition-all duration-300"
                        >
                            <Github size={18} />
                            Source
                            <ArrowUpRight size={18} />
                        </motion.a>

                        {project.links.demo && project.links.demo !== "#" ? (
                            <motion.a
                                href={project.links.demo}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30 text-white font-bold shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
                            >
                                Live Demo
                                <ArrowUpRight size={18} />
                            </motion.a>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-400/20 text-purple-300 font-medium backdrop-blur-sm cursor-not-allowed opacity-70"
                            >
                                <span className="w-2 h-2 rounded-full bg-purple-400/50 animate-pulse" />
                                Demo Soon
                            </motion.div>
                        )}

                        <Link
                            to={`/project/${projectId}`}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 group cursor-pointer"
                        >
                            View Details
                            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>

                        <Link
                            to={`/project/${projectId}?tab=architecture`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium hover:text-cyan-400 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
                        >
                            <Cpu size={16} />
                            Architecture
                        </Link>

                        <Link
                            to={`/project/${projectId}?tab=workflow`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium hover:text-purple-400 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
                        >
                            <GitBranch size={16} />
                            Workflow
                        </Link>
                    </div>
                </div>

                {/* Right: Image/Details Container */}
                <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full aspect-[16/11] md:aspect-auto md:h-[70vh] rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-br from-black/30 to-black/10 backdrop-blur-md shadow-2xl group cursor-pointer"
                >
                    <Link to={`/project/${projectId}`} className="block absolute inset-0 w-full h-full">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent mix-blend-multiply" />

                        {/* Subtle UI chrome */}
                        <div className="absolute top-5 left-5 flex items-center gap-2 opacity-80">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                        </div>
                    </Link>
                </motion.div>
            </div>
        </article>
    );
}

const Projects = () => {
    const wrapperRef = useRef(null);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        const container = containerRef.current;
        if (!wrapper || !container) return;

        /**
         * ScrollTrigger.matchMedia gives us an easy, reliable way to:
         * - enable the pinned horizontal scroll on desktop (>=768px)
         * - disable it on mobile (<768px) and fall back to normal vertical flow
         * It also handles cleanup automatically when the media query changes.
         */
        const mm = ScrollTrigger.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const getScrollDistance = () => Math.max(0, container.scrollWidth - window.innerWidth);

            // IMPORTANT:
            // Do NOT manually set wrapper height here.
            // ScrollTrigger's pinSpacing creates the exact amount of scrollable space between start/end.
            // Manually increasing height causes extra blank space after the last card.
            wrapper.style.height = "auto";
            gsap.set(container, { x: 0 });

            const tween = gsap.to(container, {
                // Translate X from 0 to -(scrollWidth - viewportWidth)
                // This moves the container exactly enough to show the last card fully
                x: () => -getScrollDistance(),
                ease: "none", // keep it smooth and 1:1 with scroll
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    // End exactly when horizontal scroll completes (when last card is fully visible)
                    // No extra buffer - unpin immediately when scroll distance is reached
                    // Divided by 2 to make horizontal scrolling twice as fast (show ~2 projects per scroll)
                    end: () => `+=${getScrollDistance() / 2}`,
                    scrub: 1.5,
                    pin: true, // pin the wrapper (which contains only the cards now)
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    pinSpacing: true // Ensures proper spacing when pinned/unpinned
                }
            });

            // Ensure measurements are correct (esp. after fonts/images settle)
            ScrollTrigger.refresh();

            // Cleanup when leaving desktop mode or unmounting
            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
                wrapper.style.height = "auto";
                gsap.set(container, { clearProps: "transform" });
            };
        });

        mm.add("(max-width: 767px)", () => {
            // Mobile: no pinning, no forced transforms, normal vertical list.
            wrapper.style.height = "auto";
            gsap.set(container, { clearProps: "transform" });
            return () => { };
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <section
            id="projects"
            className="w-full relative overflow-hidden"
        >
            {/* Background elements - directly applied to avoid GSAP conflicts */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]" />
            </div>

            {/* Header - OUTSIDE pinned area, scrolls normally */}
            <div className="w-full py-20 md:py-28 relative z-10">
                <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4 text-center"
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold">
                            Mission{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                Control
                            </span>
                        </h2>
                        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                            Scroll down to scan projects horizontally. On mobile, projects render as a normal vertical list.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Pinned wrapper - ONLY contains the project cards */}
            <div
                ref={wrapperRef}
                className="
                    projects-wrapper
                    w-full relative overflow-hidden
                "
            >
                {/* Viewport container - this gets pinned, stays at viewport height */}
                <div className="h-screen w-full flex items-center md:block">
                    <div
                        ref={containerRef}
                        className="
                            projects-container
                            flex flex-col md:flex-row
                            h-full md:h-screen w-full
                            will-change-transform
                        "
                    >
                        {projects.map((project, index) => (
                            <ProjectCard key={project.title} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
