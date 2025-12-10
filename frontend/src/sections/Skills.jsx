import { motion } from 'framer-motion';

const skillsData = [
    { category: "Languages", items: ["Python", "JavaScript", "Java", "C++", "SQL"] },
    { category: "Frontend", items: ["React", "HTML/CSS", "Tailwind CSS", "Three.js", "Framer Motion", "GSAP"] },
    { category: "Backend", items: ["Node.js", "Express.js", "MongoDB", "Firebase", "Flask", "JWT", "Socket.IO"] },
    { category: "Tools & Core", items: ["Git/GitHub", "Postman", "VS Code", "Data Structures", "OOP", "DBMS"] }
];

const Skills = () => {
    return (
        <section id="skills" className="w-full min-h-screen flex flex-col justify-center px-6 py-24 relative overflow-hidden bg-black/80">
            <div className="max-w-7xl w-full mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-display font-bold mb-16 text-center"
                >
                    Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Arsenal</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillsData.map((category, index) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-purple-500/50 transition-colors duration-300"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-gray-200">{category.category}</h3>
                            <div className="flex flex-wrap gap-3">
                                {category.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-4 py-2 bg-white/5 border border-white/5 rounded-lg text-sm md:text-base text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
