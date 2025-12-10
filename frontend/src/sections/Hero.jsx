import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight } from 'lucide-react';
import profilePic from '../assets/pp.jpg';

const Hero = () => {
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

                        <h2 className="text-xl md:text-2xl font-light text-gray-400 mb-8 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-purple-500"></span>
                            Full Stack Developer
                        </h2>

                        <p className="text-gray-400 text-lg md:text-xl max-w-md mb-10 leading-relaxed">
                            Crafting immersive digital experiences with modern technologies and a cinematic touch.
                        </p>

                        <div className="flex gap-6">
                            <Link
                                to="contact"
                                smooth={true}
                                duration={800}
                                className="group px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-purple-50 transition-all flex items-center gap-2 cursor-pointer"
                            >
                                Get in Touch
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
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
