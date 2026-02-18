import { motion } from 'framer-motion';

import SkillConstellation from '../components/SkillConstellation';
import SectionBackground from '../components/SectionBackground';

const Skills = () => {
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
                    <p className="text-gray-400 text-center max-w-2xl mx-auto">
                        Explore my technological universe. Interactive visualization of my skills and their relationships.
                    </p>
                </div>

                <div className="w-full h-full flex-grow">
                    <SkillConstellation />
                </div>
            </section>
        </SectionBackground>
    );
};

export default Skills;


