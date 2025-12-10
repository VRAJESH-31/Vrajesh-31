import { motion } from 'framer-motion';

const skillsData = [
    { category: "Languages", items: ["Python", "JavaScript", "Java", "C++", "SQL", "TypeScript", "Go"] },
    { category: "Frontend", items: ["React", "HTML5", "CSS3", "Tailwind CSS", "Three.js", "Framer Motion", "GSAP", "Next.js"] },
    { category: "Backend", items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Firebase", "Redis", "Docker", "AWS"] },
    { category: "Tools", items: ["Git", "GitHub", "VS Code", "Postman", "Figma", "Linux", "Webpack", "Vite"] }
];

const Skills = () => {
    return (
        <section id="skills" className="w-full min-h-screen flex flex-col justify-center py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-7xl font-display font-bold text-center"
                >
                    Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Arsenal</span>
                </motion.h2>
            </div>

            <div className="flex flex-col gap-16">
                {skillsData.map((category, index) => (
                    <div key={category.category} className="relative">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-400 text-center mb-6 tracking-widest uppercase">
                            {category.category}
                        </h3>
                        <div className="flex overflow-hidden relative fade-mask">
                            <Marquee speed={20} direction={index % 2 === 0 ? "left" : "right"}>
                                {category.items.map((item) => (
                                    <SkillBadge key={item} name={item} />
                                ))}
                            </Marquee>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .fade-mask {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </section>
    );
};

const Marquee = ({ children, speed = 20, direction = "left" }) => {
    return (
        <div className="flex w-full overflow-hidden select-none group">
            <motion.div
                initial={{ x: direction === "left" ? 0 : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : 0 }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity
                }}
                className="flex gap-8 flex-shrink-0 min-w-full justify-around items-center py-4"
            >
                {children}
                {children}
            </motion.div>
            <motion.div
                initial={{ x: direction === "left" ? 0 : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : 0 }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity
                }}
                className="flex gap-8 flex-shrink-0 min-w-full justify-around items-center py-4 print:hidden"
                aria-hidden="true"
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
};

const SkillBadge = ({ name }) => {
    return (
        <div className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xl md:text-2xl font-display font-medium text-gray-300 hover:text-white hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-default whitespace-nowrap">
            {name}
        </div>
    );
};

export default Skills;
