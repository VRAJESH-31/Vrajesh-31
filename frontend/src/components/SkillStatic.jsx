import React from 'react';
import { motion } from 'framer-motion';
import { skillGroups } from './SkillConstellation';
import { Terminal, Cpu, Database, Layout, PenTool, Hexagon } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
};

const panelVariants = {
    hidden: { opacity: 0, x: -20, filter: 'blur(5px)' },
    show: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { type: "tween", ease: "easeOut", duration: 0.4 }
    }
};

const getCategoryIcon = (name) => {
    switch (name) {
        case 'Languages': return <Terminal size={14} className="opacity-70" />;
        case 'Frontend': return <Layout size={14} className="opacity-70" />;
        case 'Backend': return <ServerIcon size={14} className="opacity-70" />;
        case 'Tools': return <PenTool size={14} className="opacity-70" />;
        case 'Coursework': return <Database size={14} className="opacity-70" />;
        case 'AI Tools': return <Cpu size={14} className="opacity-70" />;
        default: return <Hexagon size={14} className="opacity-70" />;
    }
}

// Custom simple Server icon since occasionally it's missing from some lucide versions
const ServerIcon = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
);


const SkillStatic = () => {
    return (
        <div className="w-full max-w-7xl mx-auto py-2 px-2 sm:px-6">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
                {skillGroups.map((group, i) => (
                    <motion.div
                        key={group.name}
                        variants={panelVariants}
                        className="group relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-none overflow-hidden"
                    >
                        {/* Cybernetic Accent Line */}
                        <div
                            className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300 group-hover:w-[4px] opacity-80"
                            style={{ backgroundColor: group.color }}
                        />

                        {/* Tech Grid Background (Subtle) */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"></div>

                        <div className="p-4 md:p-5 relative z-10 flex flex-col h-full">

                            {/* Panel Header */}
                            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="p-1.5 border border-white/20 bg-white/5"
                                        style={{ color: group.color }}
                                    >
                                        {getCategoryIcon(group.name)}
                                    </div>
                                    <h3 className="text-lg md:text-xl font-display font-medium text-white/90 tracking-wide uppercase">
                                        {group.name}
                                    </h3>
                                </div>
                                {/* System Code Decoration */}
                                <div className="hidden sm:block text-[10px] font-mono text-white/30 tracking-widest">
                                    [SYS.0{i + 1}_{group.name.substring(0, 3).toUpperCase()}]
                                </div>
                            </div>

                            {/* Data Rows */}
                            <div className="flex flex-col gap-1.5 flex-grow">
                                {group.children.map((skill, j) => (
                                    <div
                                        key={j}
                                        className="flex items-start sm:items-center justify-between p-2 hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-colors relative group/row"
                                    >
                                        {/* Row Scanline Hover Effect */}
                                        <div className="absolute left-0 top-0 bottom-0 w-0 bg-white/10 transition-all duration-300 group-hover/row:w-full opacity-0 group-hover/row:opacity-100 pointer-events-none" />

                                        <div className="flex items-center gap-3 relative z-10">
                                            <div
                                                className="w-1.5 h-1.5"
                                                style={{ backgroundColor: skill.color || group.color }}
                                            />
                                            <span className="text-sm font-mono text-white/80">{skill.name}</span>
                                        </div>

                                        {skill.desc && (
                                            <div className="text-xs text-white/40 font-mono text-right relative z-10 hidden sm:block">
                                                // {skill.desc.toLowerCase()}
                                            </div>
                                        )}

                                        {/* Mobile description (wrapped differently) */}
                                        {skill.desc && (
                                            <div className="text-[10px] text-white/40 font-mono mt-1 w-full sm:hidden relative z-10 pl-[18px]">
                                                {skill.desc.toLowerCase()}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Panel Footer (Decorative) */}
                            <div className="mt-4 pt-2 flex items-center justify-between">
                                <div className="flex gap-1">
                                    {[...Array(3)].map((_, k) => (
                                        <div key={k} className="w-1 h-3 bg-white/10 group-hover:bg-white/30 transition-colors" />
                                    ))}
                                </div>
                                <div className="text-[9px] font-mono text-white/20">
                                    DATA_BLOCK_VERIFIED
                                </div>
                            </div>

                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default SkillStatic;
