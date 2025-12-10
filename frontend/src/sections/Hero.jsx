import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = () => {
    return (
        <section id="home" className="w-full min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
            <div className="max-w-7xl w-full mx-auto z-10 flex flex-col items-start justify-center">

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-xl md:text-2xl font-light tracking-wide text-accent mb-4">
                        Hello, I'm Vrajesh Pandya
                    </h2>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight mb-8 font-display"
                >
                    Building Digital <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Experiences
                    </span>{" "}
                    with <br />
                    Intelligence.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12"
                >
                    Full Stack MERN Developer & AI Enthusiast. I craft immersive web applications
                    that merge cutting-edge technology with cinematic design.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link
                        to="projects"
                        smooth={true}
                        duration={800}
                        className="px-8 py-4 bg-white text-black font-bold rounded-full 
                       hover:bg-purple-500 hover:text-white transition-all 
                       duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        View My Work
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Gradient Blob */}
            <div className="absolute top-1/2 right-10 w-[30vw] h-[30vw] bg-purple-600/20 rounded-full blur-[100px] -z-10 animate-pulse" />
        </section>
    );
};

export default Hero;
