import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Github, Linkedin, Instagram, Mail, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import profilePic from '../assets/pp.jpg';

const Hero = () => {
    const roles = ["Full Stack Developer", "MERN Stack Expert", "Ai-Ml Enthusiastic"];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleType = () => {
            const currentRole = roles[currentRoleIndex];

            if (isDeleting) {
                setDisplayedText((prev) => currentRole.substring(0, prev.length - 1));
            } else {
                setDisplayedText((prev) => currentRole.substring(0, prev.length + 1));
            }

            if (!isDeleting && displayedText === currentRole) {
                setTimeout(() => setIsDeleting(true), 2000); // Pause at end
            } else if (isDeleting && displayedText === "") {
                setIsDeleting(false);
                setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
            }
        };

        const timer = setTimeout(handleType, isDeleting ? 50 : 150);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentRoleIndex, roles]);

    const socialLinks = [
        { icon: <Github size={24} />, href: "https://github.com/VRAJESH-31", label: "GitHub", tooltip: "Have a look on my GitHub" },
        { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/vrajesh-n-pandya-a8ba25266/", label: "LinkedIn", tooltip: "Connect on LinkedIn" },
        { icon: <Instagram size={24} />, href: "https://www.instagram.com/pandyavraj_31/", label: "Instagram", tooltip: "Follow me on Instagram" },
        { icon: <Mail size={24} />, href: "mailto:npandyavrajesh@gmail.com", label: "Email", tooltip: "Send me an Email" },
    ];

    return (
        <section id="home" className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-background">
            {/* Split Layout Container */}
            <div className="w-full h-full flex flex-col md:flex-row">

                {/* Left: Content */}
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-20 lg:px-32 relative z-10 order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.1] mb-6 tracking-tight">
                            Vrajesh <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                Pandya
                            </span>
                        </h1>

                        <h2 className="text-xl md:text-2xl font-light text-gray-400 mb-8 flex items-center gap-3 h-8">
                            <span className="w-8 h-[1px] bg-purple-500"></span>
                            <span className="font-mono text-purple-300">
                                {displayedText}
                                <span className="animate-pulse">|</span>
                            </span>
                        </h2>

                        <p className="text-gray-400 text-lg md:text-xl max-w-md mb-10 leading-relaxed">
                            Crafting immersive digital experiences with modern technologies and a cinematic touch.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <Link
                                    to="contact"
                                    smooth={true}
                                    duration={800}
                                    className="group px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-purple-50 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                                >
                                    Get in Touch
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <a
                                    href="/RESUME.pdf"
                                    download="RESUME.pdf"
                                    className="group px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full text-lg hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-sm"
                                >
                                    Download Resume
                                    <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                                </a>
                            </div>

                            {/* Social Links Row */}
                            <div className="flex items-center gap-6">
                                {socialLinks.map((link, index) => (
                                    <div key={index} className="relative group">
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block text-gray-400 hover:text-white transform hover:scale-125 transition-all duration-300 hover:text-purple-400"
                                            aria-label={link.label}
                                        >
                                            {link.icon}
                                        </a>

                                        {/* Tooltip */}
                                        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-20">
                                            {link.tooltip}
                                            {/* Arrow pointing up */}
                                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/10 border-l border-t border-white/10 rotate-45" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Portrait Image */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative order-1 md:order-2">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                        className="w-full h-full"
                    >
                        {/* Image Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background z-10 md:bg-gradient-to-r md:from-background md:via-transparent md:to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

                        {/* Professional Portrait */}
                        <img
                            src={profilePic}
                            alt="Vrajesh Pandya"
                            className="w-full h-full object-cover object-top opacity-80"
                        />
                    </motion.div>
                </div>

            </div>

            {/* Background Decorations */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        </section>
    );
};

export default Hero;
