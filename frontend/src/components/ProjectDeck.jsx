import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Keyboard } from 'swiper/modules';
import VanillaTilt from 'vanilla-tilt';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, RotateCw, X, Github } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Floating Icons Component
const FloatingIcons = ({ techs }) => {
    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
            {techs.map((tech, i) => (
                <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: Math.cos(i * (Math.PI * 2) / techs.length) * 180, // Increased radius slightly
                        y: Math.sin(i * (Math.PI * 2) / techs.length) * 150,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                        delay: i * 0.1
                    }}
                    className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                        className="
                            relative group cursor-default pointer-events-auto
                            px-4 py-2 rounded-lg 
                            bg-black/80 backdrop-blur-xl 
                            border border-white/10 
                            shadow-[0_0_20px_rgba(124,58,237,0.2)]
                            flex items-center gap-2
                            hover:border-purple-500/50 hover:bg-purple-900/20 hover:scale-110 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]
                            transition-all duration-300
                        "
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                        <span className="text-xs md:text-sm font-bold text-gray-100 font-display tracking-wide uppercase">
                            {tech}
                        </span>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

// Tilt Component
const TiltCard = ({ children, isActive }) => {
    const tiltRef = useRef(null);

    useEffect(() => {
        if (tiltRef.current && isActive) {
            VanillaTilt.init(tiltRef.current, {
                max: 10,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
                scale: 1.02
            });
        }
        return () => tiltRef.current?.vanillaTilt?.destroy();
    }, [isActive]);

    return (
        <div ref={tiltRef} className="w-full h-full transform-gpu">
            {children}
        </div>
    );
};

// Main Card Component with Flip Logic
const ProjectCard = ({ project, isActive }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Reset flip when slide changes
    useEffect(() => {
        if (!isActive) setIsFlipped(false);
    }, [isActive]);

    return (
        <div className="relative w-full h-full perspective-1000 group">
            {/* Floating Tech Stack (Only for active slide) */}
            <AnimatePresence>
                {isActive && !isFlipped && (
                    <FloatingIcons techs={project.tags.slice(0, 6)} />
                )}
            </AnimatePresence>

            <TiltCard isActive={isActive && !isFlipped}>
                <motion.div
                    className="w-full h-full relative preserve-3d duration-700"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* FRONT SIDE */}
                    <div className={`
                        absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden 
                        bg-black/40 backdrop-blur-2xl
                        border border-white/10 shadow-2xl
                        transition-all duration-500
                        ${isActive ? 'shadow-[0_0_40px_rgba(255,255,255,0.1)] border-white/20' : 'grayscale brightness-50'}
                    `}>
                        {/* Grain Overlay */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                            style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
                        />

                        {/* Image Background */}
                        <div className="absolute inset-0">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </div>

                        {/* Front Content */}
                        <div className="absolute bottom-0 left-0 w-full p-8 z-10 flex flex-col items-start gap-4">
                            <div className="space-y-2 relative">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-bold font-mono border border-white/10 backdrop-blur-md">
                                    {project.category}
                                </span>
                                <h3 className="text-4xl font-display font-medium text-white tracking-tight drop-shadow-lg">
                                    {project.title}
                                </h3>
                            </div>

                            <p className="text-gray-300 text-sm font-medium line-clamp-2 leading-relaxed max-w-[90%]">
                                {project.summary}
                            </p>

                            <div className="flex gap-3 pt-6 w-full mix-blend-normal">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsFlipped(true);
                                    }}
                                    className="flex-1 py-3 bg-white text-black hover:bg-gray-200 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group/btn"
                                >
                                    <RotateCw size={18} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                                    Details
                                </button>

                                <a
                                    href={project.links.code}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl border border-white/10 transition-all hover:scale-110 active:scale-95 flex items-center justify-center group/icon"
                                    title="GitHub Source"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Github size={22} className="text-gray-300 group-hover/icon:text-white transition-colors" />
                                </a>

                                {project.links.demo && project.links.demo !== '#' ? (
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl border border-white/10 transition-all hover:scale-110 active:scale-95 flex items-center justify-center group/icon"
                                        title="Live Demo"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ArrowUpRight size={22} className="text-gray-300 group-hover/icon:text-white transition-colors" />
                                    </a>
                                ) : (
                                    <div className="relative group/disabled-icon">
                                        <button
                                            className="p-3 bg-white/5 rounded-xl border border-white/5 cursor-not-allowed flex items-center justify-center"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <ArrowUpRight size={22} className="text-gray-600" />
                                        </button>
                                        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 backdrop-blur-md border border-white/10 text-white text-xs rounded-lg opacity-0 group-hover/disabled-icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                                            Still in process, will deploy soon
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 border-r border-b border-white/10 rotate-45 transform" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* BACK SIDE */}
                    <div
                        className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-black/95 border border-white/20 shadow-[0_0_50px_rgba(124,58,237,0.15)] flex flex-col"
                        style={{ transform: 'rotateY(180deg)' }}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <h3 className="text-xl font-bold font-display text-white">{project.title}</h3>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsFlipped(false);
                                }}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-3">Key Features & Architecture</h4>
                                    <ul className="space-y-3">
                                        {project.description.map((point, i) => (
                                            <li key={i} className="text-gray-300 text-sm leading-relaxed flex gap-3">
                                                <span className="text-purple-500 mt-1.5">•</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3">Tech Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-white/10 bg-white/5 flex gap-4">
                            <a
                                href={project.links.code}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                View Source Code <ArrowUpRight size={16} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </TiltCard>
        </div>
    );
};

// Sci-Fi Mission HUD Component
const MissionHUD = ({ count, activeIndex }) => {
    return (
        <div className="flex flex-col items-center justify-center mb-8 relative z-20 font-mono select-none">
            <div className="flex items-end gap-3 text-cyan-400 relative">
                <span className="text-sm font-bold tracking-[0.2em] mb-1.5 opacity-70">MISSION</span>
                <div className="flex items-baseline">
                    <span className="text-5xl font-bold leading-none tracking-tighter shadow-cyan-500/50 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                        {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xl opacity-40 ml-2 font-light">/ {String(count).padStart(2, '0')}</span>
                </div>

                {/* Decorative Status Dot */}
                <div className="absolute -right-4 top-2 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]" />
            </div>

            {/* Progress Bar Container */}
            <div className="w-64 h-1 bg-gray-800/50 mt-4 relative overflow-hidden rounded-full backdrop-blur-sm border border-white/5">
                {/* Active Progress */}
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeIndex + 1) / count) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
            </div>

            {/* Decorative Cyber Lines */}
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-10 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/20" />
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-10 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/20" />

            {/* Bottom Tag */}
            <div className="mt-2 text-[10px] tracking-[0.3em] text-cyan-500/40 uppercase">
                System Online
            </div>
        </div>
    );
};

const ProjectDeck = ({ projects }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="w-full py-10 relative">
            <MissionHUD count={projects.length} activeIndex={activeIndex} />

            <Swiper
                effect={'coverflow'}
                grabCursor={false} // Disable default drag if interfering with buttons, but usually fine
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={0}
                loop={true}
                slideToClickedSlide={true}
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                modules={[EffectCoverflow, Pagination, Navigation, Keyboard]}
                className="w-full pt-4 pb-20 px-4 !overflow-visible"
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {projects.map((project, index) => (
                    <SwiperSlide
                        key={index}
                        className="!w-[320px] md:!w-[500px] !h-[500px] md:!h-[650px] rounded-2xl"
                    >
                        {({ isActive }) => (
                            <ProjectCard project={project} isActive={isActive} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="text-center text-gray-500 text-sm animate-pulse mt-4 select-none">
                Swipe to navigate • Click 'View Details' to flip
            </div>

            <style>{`
               .swiper-pagination-bullet {
                   background: white !important;
                   opacity: 0.2;
               }
               .swiper-pagination-bullet-active {
                   opacity: 1;
                   background: #d8b4fe !important;
               }
               .backface-hidden {
                   backface-visibility: hidden;
                   -webkit-backface-visibility: hidden;
               }
               .preserve-3d {
                   transform-style: preserve-3d;
                   -webkit-transform-style: preserve-3d;
               }
               .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 2px;
                }
            `}</style>
        </div>
    );
};

export default ProjectDeck;
