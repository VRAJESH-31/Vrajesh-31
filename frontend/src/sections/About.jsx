import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    return (
        <section id="about" className="w-full min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-background">

            {/* Minimalist Grid Background (replacing glowing orbs) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-cyan-500/10 pointer-events-none z-0" />
            <div className="absolute bottom-1/3 left-0 w-full h-[1px] bg-purple-500/10 pointer-events-none z-0" />

            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left: Text Content */}
                <div ref={ref} className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-2 flex items-center gap-3">
                            <span className="text-purple-500 font-mono text-3xl font-normal">{'<'}</span>
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Me</span>
                            <span className="text-purple-500 font-mono text-3xl font-normal">{'>'}</span>
                        </h2>
                        <div className="h-[2px] w-24 bg-gradient-to-r from-purple-500 to-cyan-500" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-gray-300 text-lg md:text-xl leading-relaxed space-y-6 font-light"
                    >
                        <p>
                            I'm a final-year <span className="text-white font-semibold relative inline-block">
                                B.Tech Computer Science
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-500/50"></span>
                            </span> student at ITM (SLS) Baroda University, focused on building <span className="text-white font-semibold">scalable MERN stack applications</span>. I enjoy developing full-stack systems—from structuring databases to building state-driven frontends.
                        </p>
                        <p>
                            Recently, I've developed a strong interest in <span className="text-purple-400 font-mono text-sm uppercase tracking-wider px-2 border border-purple-500/30 rounded-sm bg-purple-500/10">Generative AI & LLMs</span>. I'm actively exploring how to integrate AI via RAG pipelines and agentic workflows to create real practical value.
                        </p>
                        <p>
                            I approach engineering with a problem-solving mindset—<span className="text-white font-semibold border-b border-purple-400/50 pb-0.5">breaking down edge cases</span> and optimizing backend logic. I strive to build systems that hold up under real-world usage while keeping my fundamentals strong.
                        </p>
                    </motion.div>
                </div>

                {/* Right: Simulated IDE Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex justify-center items-center relative group perspective-1000"
                >
                    <div className="relative w-full max-w-md aspect-square rounded-sm overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-transform duration-500 bg-[#0d0d0d]">

                        {/* Decorative Sub-border on hover */}
                        <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/30 transition-colors pointer-events-none z-20"></div>

                        {/* Simulated Code Editor Window */}
                        <div className="absolute inset-0 flex flex-col">
                            {/* Window Header */}
                            <div className="h-10 bg-[#111] border-b border-white/5 flex items-center px-4 justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="text-xs font-mono text-gray-500">vrajesh_config.ts</div>
                                <div className="w-12"></div> {/* Spacer for centering */}
                            </div>

                            {/* Code Content */}
                            <div className="p-6 font-mono text-sm md:text-base overflow-hidden bg-[#0a0a0a] flex-1">
                                <div className="space-y-1 text-gray-300">
                                    <div className="text-gray-500 mb-2 italic">
                                        // Developer Environment Configuration<br />
                                        // Auto-generated by sys.init()
                                    </div>
                                    <p><span className="text-purple-400">const</span> <span className="text-yellow-200">developer</span> = <span className="text-cyan-400">{`{`}</span></p>
                                    <div className="pl-4 space-y-2">
                                        <p>name: <span className="text-green-400">'Vrajesh Pandya'</span>,</p>
                                        <p>role: <span className="text-green-400">'Full Stack Architect'</span>,</p>
                                        <p>focus: [<span className="text-green-400">'Web-technologies'</span>, <span className="text-green-400">'AI/ML'</span>],</p>
                                        <p>status: <span className="text-green-400">'Building the Future'</span>,</p>
                                        <p className="flex items-center gap-2">
                                            sys_load: <span className="text-orange-400 bg-orange-400/10 px-1 rounded animate-pulse">Infinity%</span>
                                        </p>
                                    </div>
                                    <p className="text-cyan-400 mt-2">{`}`};</p>

                                    <div className="mt-6 text-gray-500">
                                        <span className="text-purple-400">export default</span> <span className="text-yellow-200">developer</span>;
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
