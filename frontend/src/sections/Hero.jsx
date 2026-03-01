import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Github, Linkedin, Instagram, Mail, Download, Wifi } from 'lucide-react';
import { useState, useEffect } from 'react';
import profilePic from '../assets/pp.jpg';

const Hero = () => {
    // UPDATED ROLES for AI/Vibe Coder Aesthetic
    const roles = [" Full Stack Developer", "MERN + Generative Ai", "Keeping updated to Latest AI & IT trends"];
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

        const timer = setTimeout(handleType, isDeleting ? 30 : 80); // Speed up typing for hacker vibe
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentRoleIndex, roles]);

    const socialLinks = [
        { icon: <Github size={20} />, href: "https://github.com/VRAJESH-31", label: "GitHub", tooltip: "sys.connect(github)" },
        { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/vrajesh-n-pandya-a8ba25266/", label: "LinkedIn", tooltip: "sys.connect(linkedin)" },
        { icon: <Instagram size={20} />, href: "https://www.instagram.com/pandyavraj_31/", label: "Instagram", tooltip: "sys.connect(instagram)" },
        { icon: <Mail size={20} />, href: "mailto:npandyavrajesh@gmail.com", label: "Email", tooltip: "sys.mail(vrajesh)" },
    ];

    return (
        <section id="home" className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-background">
            {/* Split Layout Container */}
            <div className="w-full h-full flex flex-col md:flex-row">

                {/* Left: Content */}
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-20 lg:px-32 relative z-10 order-2 md:order-1 pt-20 md:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.05] mb-4 tracking-tighter">
                            Vrajesh <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                Pandya
                            </span>
                        </h1>

                        <h2 className="text-lg md:text-xl font-mono text-gray-400 mb-8 flex items-center gap-3 h-8">
                            <span className="text-purple-500">{'>'}</span>
                            <span className="text-gray-300">
                                {displayedText}
                                <span className="animate-pulse text-cyan-400 bg-cyan-400/20 w-2 h-5 inline-block ml-1 align-middle"></span>
                            </span>
                        </h2>

                        {/* IDE Code Block Intro */}
                        <div className="bg-[#0c0c0c] border border-white/5 p-4 rounded-md font-mono text-sm md:text-base mb-10 shadow-2xl relative group">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <p className="text-gray-500 select-none pb-2 border-b border-white/5 mb-2 flex items-center gap-2 text-xs">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50"></span>
                                <span className="ml-2">~/developer/profile.json - Editor</span>
                            </p>

                            <div className="text-gray-300 leading-relaxed">
                                <span className="text-purple-400">const</span> <span className="text-yellow-200">developer</span> = <span className="text-cyan-400">{`{`}</span><br />
                                <span className="ml-4 text-gray-400">mission:</span> <span className="text-green-400">"Designing AI-integrated, scalable web systems with robust backend architecture and measurable performance impact."</span>,<br />
                                <span className="ml-4 text-gray-400">status:</span> <span className="text-green-400">"Compiling ideas..."</span><br />
                                <span className="text-cyan-400">{`}`}</span>;
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-4 sm:gap-6 flex-wrap">
                                <Link
                                    to="contact"
                                    smooth={true}
                                    duration={800}
                                    className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold text-sm sm:text-base hover:bg-cyan-50 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:text-cyan-900 rounded-sm"
                                >
                                    Let's Connect
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <a
                                    href="/Vraj.pdf"
                                    download="Vraj.pdf"
                                    className="group px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-white/20 text-white font-bold text-sm sm:text-base hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-sm rounded-sm font-mono hover:border-purple-400/50"
                                >
                                    Download Resume
                                    <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
                                </a>
                            </div>

                            {/* Social Links Row */}
                            <div className="flex items-center gap-4 sm:gap-6">
                                {socialLinks.map((link, index) => (
                                    <div key={index} className="relative group">
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block p-2 text-gray-400 hover:text-cyan-400 border border-transparent hover:border-cyan-500/30 hover:bg-cyan-500/10 rounded-sm transition-all duration-300"
                                            aria-label={link.label}
                                        >
                                            {link.icon}
                                        </a>

                                        {/* Tooltip */}
                                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border border-white/10 text-cyan-400 font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                                            {link.tooltip}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Portrait Image */}
                <div className="w-full md:w-1/2 h-[40vh] md:h-full relative order-1 md:order-2">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                        className="w-full h-full"
                    >
                        {/* Image Overlay Gradient - Sharper for tech vibe */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10 md:bg-gradient-to-r md:from-[#050505] md:via-transparent md:to-transparent" />
                        <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay z-10 pointer-events-none" />

                        {/* Professional Portrait */}
                        <img
                            src={profilePic}
                            alt="Vrajesh Pandya"
                            className="w-full h-full object-cover object-top opacity-70 grayscale-[30%] contrast-125"
                        />
                    </motion.div>
                </div>

            </div>

            {/* Background Decorations - Sharp Grids instead of soft blurs */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/10 -translate-y-1/2 pointer-events-none z-0" />
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-purple-500/10 pointer-events-none z-0 hidden md:block" />
        </section>
    );
};

export default Hero;
