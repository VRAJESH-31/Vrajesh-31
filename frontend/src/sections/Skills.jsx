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

                    {/* Top Skills Marquee - Replaces the word 'Top Skills' with a cool scroller */}
                    <div className="w-full overflow-hidden flex flex-col items-center mb-12">
                        <div className="text-sm uppercase tracking-[0.3em] text-white/40 mb-3 font-semibold">Top Skills</div>
                        <div className="relative w-full max-w-4xl flex overflow-hidden group mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                            <motion.div
                                className="flex whitespace-nowrap gap-8 py-2 items-center text-xl md:text-2xl font-bold font-display"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ ease: "linear", duration: 20, repeat: Infinity }}
                            >
                                {/* Duplicated for seamless loop */}
                                {[...Array(2)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">MERN Stack</span>
                                        <span className="text-white/20">•</span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">React</span>
                                        <span className="text-white/20">•</span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">Node.js</span>
                                        <span className="text-white/20">•</span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">JavaScript</span>
                                        <span className="text-white/20">•</span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">GitHub</span>
                                        <span className="text-white/20">•</span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">Latest AI Tools</span>
                                        <span className="text-white/20 mr-8">•</span>
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


