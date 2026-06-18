import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Cpu, GitBranch, Terminal as TerminalIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        // stack-card: normal block on mobile (vertical list); absolute layer on
        // desktop, where GSAP slides each one in to stack horizontally.
        <div
            className="stack-card relative md:absolute md:inset-0 flex items-center justify-center px-4 md:px-8 py-8 md:py-0"
            style={{ zIndex: index }}
        >
            <div
                className="
                    relative w-full max-w-6xl mx-auto
                    rounded-2xl md:rounded-3xl
                    border border-white/10 bg-[#0a0a0a]
                    shadow-[0_20px_80px_rgba(0,0,0,0.8)]
                    overflow-hidden
                    p-6 md:p-10 lg:p-14
                "
            >
                {/* Oversized index number — design nod, kept in your theme */}
                <span className="pointer-events-none absolute -top-4 right-4 md:right-8 font-display font-bold text-white/[0.04] text-[110px] md:text-[200px] leading-none select-none z-0">
                    {String(index + 1).padStart(2, '0')}
                </span>

                <div
                    className="
                        relative z-10
                        grid grid-cols-1 md:grid-cols-2
                        gap-8 md:gap-12
                        items-center
                    "
                >
                {/* Left: Text */}
                <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2 md:space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#111] border border-white/10 text-xs font-mono text-cyan-400">
                            <TerminalIcon className="w-3.5 h-3.5" />
                            {project.category}
                        </div>

                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
                            <span className="text-white hover:text-cyan-400 transition-colors duration-300">{project.title}</span>
                        </h3>

                        <div className="h-[2px] w-16 bg-gradient-to-r from-purple-500 to-cyan-500" />

                        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl font-sans line-clamp-3 md:line-clamp-4">
                            {project.summary}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <motion.span
                                key={tag}
                                whileHover={{ scale: 1.05, y: -2 }}
                                transition={{ duration: 0.2 }}
                                className="px-3 py-1 bg-[#0a0a0a] border border-white/10 text-xs text-gray-400 font-mono hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">                        <motion.a
                            href={project.links.code}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-white text-black font-bold text-sm tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300"
                            data-guide="View the source code of this project on GitHub."
                        >
                            <Github size={16} />
                            Source
                            <ArrowUpRight size={16} />
                        </motion.a>

                        {project.links.demo && project.links.demo !== "#" ? (
                            <motion.a
                                href={project.links.demo}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#111] border border-white/10 text-white font-bold text-sm tracking-wide shadow-lg hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                                data-guide="Click to view the live deployed site of this project."
                            >
                                Live Demo
                                <ArrowUpRight size={16} />
                            </motion.a>
                        ) : (
                            <motion.div
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#0a0a0a] border border-white/5 text-gray-500 font-bold text-sm tracking-wide cursor-not-allowed"
                                data-guide="The live demo for this project will be uploaded soon."
                            >
                                <span className="w-2 h-2 rounded-full bg-purple-400/30" />
                                Demo Soon
                            </motion.div>
                        )}

                        <Link
                            to={`/project/${projectId}`}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-sm tracking-wide shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all duration-300 group cursor-pointer"
                            data-guide="View detailed information, features, and specs for this project."
                        >
                            View Details
                            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <Link
                            to={`/project/${projectId}?tab=architecture`}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-transparent border border-white/5 text-gray-400 font-mono text-xs hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
                            data-guide="Explore the modular system architecture diagram."
                        >
                            <Cpu size={14} />
                            _architecture
                        </Link>

                        <Link
                            to={`/project/${projectId}?tab=workflow`}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-transparent border border-white/5 text-gray-400 font-mono text-xs hover:text-purple-400 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
                            data-guide="View developer workflow mapping diagrams."
                        >
                            <GitBranch size={14} />
                            _workflow
                        </Link>
                    </div>
                </div>

                {/* Right: Image/Details Container */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full aspect-[16/11] md:aspect-auto md:h-[46vh] rounded-sm overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl group cursor-pointer group-hover:border-cyan-500/30"
                >
                    <Link to={`/project/${projectId}`} className="block absolute inset-0 w-full h-full">
                        {/* Scanline overlay */}
                        <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />

                        <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent mix-blend-multiply z-10" />

                        {/* Top Terminal Chrome */}
                        <div className="absolute top-0 left-0 w-full h-8 bg-[#111] border-b border-white/10 z-30 flex items-center px-4 justify-between font-mono text-[10px] text-gray-500">
                            <div className="flex gap-2 items-center">
                                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                                <span className="w-2 h-2 rounded-full bg-green-500/80" />
                            </div>
                            <div>{project.id || 'project_file'}.exe</div>
                        </div>
                    </Link>
                </motion.div>
                </div>
            </div>
        </div>
    );
}

const Projects = () => {
    const sectionRef = useRef(null);
    const pinRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop: pin the viewport and slide each card in to stack
            // horizontally, one over the previous, shrinking the covered ones.
            mm.add("(min-width: 768px)", () => {
                const cards = gsap.utils.toArray(".stack-card");
                if (!cards.length) return;

                // First card already centered; the rest wait off-screen right.
                gsap.set(cards.slice(1), { xPercent: 110, opacity: 1 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: pinRef.current,
                        start: "top top",
                        // ~80vh of scroll per incoming card.
                        end: () => `+=${(cards.length - 1) * window.innerHeight * 0.8}`,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                cards.forEach((card, i) => {
                    if (i === 0) return;
                    const pos = i - 1; // contiguous segments, no dead gaps
                    // Incoming card slides over the stack...
                    tl.fromTo(
                        card,
                        { xPercent: 110 },
                        { xPercent: 0, duration: 1, ease: "power2.out" },
                        pos
                    );
                    // ...while every card already in the stack shrinks + drifts
                    // left a touch, so their edges peek out behind the new one.
                    tl.to(
                        cards.slice(0, i),
                        {
                            scale: (idx) => 1 - (i - idx) * 0.04,
                            xPercent: (idx) => -(i - idx) * 4,
                            duration: 1,
                            ease: "power2.out",
                        },
                        pos
                    );
                });

                ScrollTrigger.refresh();

                return () => tl.scrollTrigger?.kill();
            });

            // Mobile: cards fall back to a normal vertical list (no pin).
            mm.add("(max-width: 767px)", () => {
                gsap.set(".stack-card", { clearProps: "all" });
                return () => { };
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="w-full relative bg-[#050505]"
            data-guide="Scroll to explore my featured projects. Cards will stack dynamically as you scroll."
        >
            {/* Minimalist Tech Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none z-0" />

            {/* Header - OUTSIDE pinned area, scrolls normally */}
            <div className="w-full py-20 md:py-28 relative z-10 border-b border-white/5">
                <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4 text-center flex flex-col items-center"
                    >
                        <div className="inline-flex items-center gap-3">
                            <span className="text-purple-500 font-mono text-3xl font-normal">{'['}</span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold">
                                Featured{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                    Projects
                                </span>
                            </h2>
                            <span className="text-purple-500 font-mono text-3xl font-normal">{']'}</span>
                        </div>
                        <div className="h-[2px] w-full max-w-[150px] bg-gradient-to-r from-purple-500/50 to-cyan-500/50 mt-4" />

                        <p className="text-gray-500 font-mono text-sm mt-6 uppercase tracking-widest pt-4">
                            My Portfolio // Works I'm proud of
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Pinned viewport. On desktop the cards are absolutely stacked and
                GSAP slides them in horizontally; on mobile they flow vertically. */}
            <div
                ref={pinRef}
                className="relative w-full md:h-screen md:overflow-hidden"
            >
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};

export default Projects;
