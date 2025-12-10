import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    return (
        <section id="about" className="w-full min-h-screen flex items-center justify-center px-6 py-20 bg-black/50">
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Text Content */}
                <div ref={ref} className="space-y-8">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-display font-bold"
                    >
                        About Me
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-gray-300 text-lg md:text-xl leading-relaxed space-y-6"
                    >
                        <p>
                            I am a final-year <span className="text-accent">B.Tech Computer Science</span> student
                            at <span className="text-white font-semibold">ITM (SLS) Baroda University</span> (CGPA: 6.69).
                        </p>
                        <p>
                            With a deep passion for <span className="text-white font-semibold">MERN full-stack development</span>,
                            I specialize in architecting scalable web solutions. I am currently expanding my horizons into
                            <span className="text-accent"> AI/ML technologies</span> to build intelligent, data-driven applications.
                        </p>
                        <p>
                            Driven by strong problem-solving abilities, I enjoy tackling <span className="text-white font-semibold">real-world challenges</span>
                            through code, from optimizing backend performance to crafting immersive frontend experiences.
                        </p>
                    </motion.div>
                </div>

                {/* Right: Abstract Visualization/Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex justify-center items-center relative"
                >
                    <div className="relative w-80 h-96 md:w-[400px] md:h-[500px] bg-gradient-to-br from-gray-800 to-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center group">
                        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                        {/* Simulated Code Editor */}
                        <div className="z-10 w-full p-6 font-mono text-sm text-green-400 opacity-80 group-hover:opacity-100 transition-opacity">
                            <p className="mb-2"><span className="text-purple-400">const</span> <span className="text-yellow-400">developer</span> = &#123;</p>
                            <p className="ml-4 mb-1">name: <span className="text-orange-400">'Vrajesh'</span>,</p>
                            <p className="ml-4 mb-1">role: <span className="text-orange-400">'Full Stack'</span>,</p>
                            <p className="ml-4 mb-1">passion: <span className="text-orange-400">'AI/ML'</span>,</p>
                            <p className="ml-4 mb-1">status: <span className="text-orange-400">'Building...'</span></p>
                            <p>&#125;;</p>
                        </div>

                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 opacity-20 blur-xl -z-10 group-hover:opacity-40 transition-opacity duration-500" />
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
