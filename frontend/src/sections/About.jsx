import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    return (
        <section id="about" className="w-full min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left: Text Content */}
                <div ref={ref} className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-2">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Me</span>
                        </h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-gray-300 text-lg md:text-xl leading-relaxed space-y-6 font-light"
                    >
                        <p>
                            I am a final-year <span className="text-white font-semibold relative inline-block">
                                B.Tech Computer Science
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-purple-500/50"></span>
                            </span> student
                            at ITM (SLS) Baroda University.
                        </p>
                        <p>
                            With a deep passion for <span className="text-white font-semibold">MERN full-stack development</span>,
                            I specialize in architecting scalable web solutions. I am currently expanding my horizons into
                            <span className="text-accent text-cyan-300"> AI/ML technologies</span> to build intelligent, data-driven applications.
                        </p>
                        <p>
                            Driven by strong problem-solving abilities, I enjoy tackling <span className="text-white font-semibold">real-world challenges</span>
                            through code, from optimizing backend performance to crafting immersive frontend experiences.
                        </p>
                    </motion.div>
                </div>

                {/* Right: Abstract Visualization/Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex justify-center items-center relative"
                >
                    <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-white/5 to-white/0 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] group transform hover:-translate-y-2 transition-transform duration-500">
                        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px]" />

                        {/* Simulated Code Editor Window */}
                        <div className="absolute inset-4 bg-black/40 rounded-2xl border border-white/5 overflow-hidden flex flex-col">
                            {/* Window Header */}
                            <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>

                            {/* Code Content */}
                            <div className="p-6 font-mono text-sm md:text-base overflow-hidden">
                                <div className="space-y-1">
                                    <p className="text-purple-400">const <span className="text-yellow-400">profile</span> = <span className="text-cyan-400">{`{`}</span></p>
                                    <div className="pl-4 space-y-1 text-gray-300">
                                        <p>name: <span className="text-green-400">'Vrajesh Pandya'</span>,</p>
                                        <p>role: <span className="text-green-400">'Full Stack Architect'</span>,</p>
                                        <p>focus: <span className="text-green-400">'Web3 & AI'</span>,</p>
                                        <p>status: <span className="text-green-400">'Building the Future'</span>,</p>
                                        <p>coffeeLevel: <span className="text-orange-400 mt-1 inline-block animate-pulse">Infinity</span></p>
                                    </div>
                                    <p className="text-cyan-400">{`}`};</p>
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute -inset-full bg-gradient-to-tr from-purple-500/20 via-transparent to-cyan-500/20 blur-3xl group-hover:opacity-100 transition-opacity duration-700 opacity-50" />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
