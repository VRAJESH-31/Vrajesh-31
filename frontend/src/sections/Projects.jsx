import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

const projects = [
    {
        title: "CodeFolio Insights",
        category: "Analytics Platform",
        summary: "Holistic developer analytics platform aggregating data from GitHub and LeetCode.",
        description: [
            "Engineered CodeFolio Insights, a holistic developer analytics platform that aggregates and evaluates data from GitHub and LeetCode to assess candidate employability, providing users with quantifiable performance scores and tailored improvement roadmaps.",
            "Architected a scalable Node.js and Express backend to process real-time API data, implementing custom weighted algorithms that calculate normalized competency scores based on commit history, problem-solving streaks, and contest ratings.",
            "Integrated Google Gemini AI to power a \"Strict Hiring Manager\" persona for critical resume parsing and analysis, while establishing secure user authentication using Passport.js with Google OAuth 2.0 and JWT for protected session management.",
            "Developed a high-performance React frontend optimized with TanStack Query for efficient server state caching and Zustand for global state management, visualizing complex metrics through interactive Recharts and ApexCharts dashboards."
        ],
        tags: ["React", "Node.js", "Express", "MongoDB", "Gemini AI", "OAuth 2.0"],
        links: { demo: "#", code: "https://github.com/VRAJESH-31/CodeFolio-Insights" },
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "VoyageGen",
        category: "B2B Travel System",
        summary: "Advanced B2B Travel Quotation System with immersive 3D visuals.",
        description: [
            "Developed a high-performance React frontend styled with Tailwind CSS, integrating Three.js and Vanta.js for immersive 3D visuals and Lenis for premium smooth scrolling to enhance user engagement.",
            "Architected a scalable Node.js and Express RESTful API to orchestrate complex data flow between the client and database, ensuring high availability for real-time travel quotation requests.",
            "Implemented robust security using JWT authentication and bcrypt hashing to establish a strict Role-Based Access Control (RBAC) system, protecting sensitive data across Agent, Partner, and User dashboards.",
            "Engineered advanced filtering logic to automate partner matching and quote generation, enabling the system to instantly calculate costs and margins based on dynamic user preferences like budget and star rating."
        ],
        tags: ["React", "Node.js", "Express", "MongoDB", "GSAP", "Tailwind CSS", "JWT"],
        links: { demo: "https://voyage-gen-b2-b-travel-agency-quoat.vercel.app/", code: "https://github.com/VRAJESH-31/VoyageGEN--B2B-Travel-Agency-Quoatation-System" },
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
    },
    {
        title: "Real-Time Chat",
        category: "Communication",
        summary: "Secure, full-stack chat platform with Socket.IO and JWT.",
        description: [
            "Built a secure full-stack chat application with user authentication and session handling powered by JWT, ensuring safe login, token validation, and protected API routes.",
            "Integrated Socket.IO for real-time, bidirectional communication, enabling instant messaging, typing indicators, and online/offline user presence tracking.",
            "Designed and optimized a scalable MongoDB schema to store users, conversations, and message history, ensuring efficient data retrieval under heavy usage.",
            "Developed a responsive React UI with reusable components and smooth state management, providing a seamless chat experience across desktop and mobile devices."
        ],
        tags: ["MERN", "Socket.IO", "JWT", "Zustand", "MongoDB"],
        links: { demo: "https://chat-app-pearl-phi.vercel.app/", code: "https://github.com/VRAJESH-31/Chat-app" },
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
    },
    {
        title: "Smart Attendance",
        category: "Computer Vision",
        summary: "Automated attendance system achieving 98%+ accuracy using ResNet50.",
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
        summary: "Full-stack notes app with complete CRUD functionality.",
        description: [
            "Created a full-stack notes app with complete CRUD functionality, enabling users to create, read, update, and delete notes seamlessly.",
            "Built a secure REST API with Express.js and protected routes for personalized data access, ensuring user privacy and data integrity.",
            "Used React Hooks for efficient state management in a single-page app environment, delivering a snappy and responsive user experience.",
            "Implemented MongoDB persistence, allowing notes to sync across devices in real-time."
        ],
        tags: ["React", "Node.js", "Express", "MongoDB"],
        links: { demo: "https://notes-app-nine-navy.vercel.app/", code: "https://github.com/VRAJESH-31/notes-app" },
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "AI Code Reviewer",
        category: "Developer Tool",
        summary: "Smart, automated code quality feedback using Gemini AI.",
        description: [
            "Developed an innovative tool using the Gemini API to deliver smart, automated code quality feedback, helping developers catch bugs early.",
            "Designed a Node.js backend for secure handling of API requests and code analysis, optimizing for low latency responses.",
            "Built a React-based UI for intuitive code input and structured AI suggestions, featuring syntax highlighting and real-time feedback.",
            "Added robust error handling and rate limiting to ensure reliability and stability during high-volume API interactions."
        ],
        tags: ["Node.js", "Gemini API", "React"],
        links: { demo: "https://ai-powered-code-reviewer-uxfo.vercel.app/", code: "https://github.com/VRAJESH-31/Ai-powered-Code-Reviewer" },
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop"
    }
];

import ProjectDeck from '../components/ProjectDeck';

const Projects = () => {
    return (
        <section id="projects" className="w-full min-h-screen px-4 py-32 relative overflow-hidden">
            <div className="max-w-[1400px] w-full mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-12 space-y-4 text-center z-10 relative"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-bold">
                        Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Control</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Swipe through my deployed missions. Active projects feature holographic tech stacks.
                    </p>
                </motion.div>

                {/* 3D Project Deck */}
                <div className="w-full relative z-0">
                    <ProjectDeck projects={projects} />
                </div>
            </div>
        </section>
    );
};

export default Projects;
