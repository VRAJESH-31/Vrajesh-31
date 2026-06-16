import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Box } from 'lucide-react'; // Assuming lucide-react is used, as it often is based on previous convo, we'll verify this shortly.

import SkillConstellation from '../components/SkillConstellation';
import SkillStatic from '../components/SkillStatic';
import SectionBackground from '../components/SectionBackground';

const Skills = () => {
    const [viewMode, setViewMode] = useState('constellation'); // 'constellation' or 'static'
    return (
        <SectionBackground className="w-full min-h-screen flex flex-col justify-center py-24">
            <section id="skills" className="w-full h-full flex flex-col justify-center">
                <div className="container mx-auto px-6 mb-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-7xl font-display font-bold text-center mb-4"
                    >
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Constellation</span>
                    </motion.h2>
                    <div className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
                        Explore my technological universe. Interactive visualization of my skills and their relationships.
                    </div>

                    {/* Top Skills Marquee — minimal monochrome scroller (no neon / no glow) */}
                    <div className="w-full overflow-hidden flex flex-col items-center mb-12">
                        <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 font-medium">Top Skills</div>
                        <div
                            className="relative w-full max-w-4xl flex overflow-hidden"
                            style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
                        >
                            <motion.div
                                className="flex whitespace-nowrap gap-6 py-2 items-center text-lg md:text-xl font-medium tracking-tight"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ ease: "linear", duration: 24, repeat: Infinity }}
                            >
                                {/* Duplicated for seamless loop */}
                                {[...Array(2)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        {["MERN Stack", "React", "Node.js", "JavaScript", "GitHub", "Latest AI Tools"].map((skill, j) => (
                                            <React.Fragment key={j}>
                                                <span className="text-white/80">{skill}</span>
                                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-2xl inline-flex relative shadow-lg">
                            {/* Animated Background Indicator */}
                            <motion.div
                                layoutId="active-view-tab"
                                className="absolute inset-y-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/20 rounded-xl"
                                initial={false}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                style={{
                                    left: viewMode === 'constellation' ? '0.25rem' : '50%',
                                    width: 'calc(50% - 0.25rem)',
                                }}
                            />

                            <button
                                onClick={() => setViewMode('constellation')}
                                className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors ${viewMode === 'constellation' ? 'text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Box size={18} />
                                <span className="hidden sm:inline">Constellation View</span>
                                <span className="sm:hidden">3D</span>
                            </button>
                            <button
                                onClick={() => setViewMode('static')}
                                className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors ${viewMode === 'static' ? 'text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Layers size={18} />
                                <span className="hidden sm:inline">Normal View</span>
                                <span className="sm:hidden">Grid</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full flex-grow relative min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {viewMode === 'constellation' ? (
                            <motion.div
                                key="constellation"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full absolute inset-0"
                            >
                                <SkillConstellation />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="static"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full relative z-10 px-4"
                            >
                                <SkillStatic />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </SectionBackground>
    );
};

export default Skills;


