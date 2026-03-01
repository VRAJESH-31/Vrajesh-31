import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Center, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Calendar, MapPin, Briefcase, Award, Terminal } from 'lucide-react';

// 3D Geometric Wireframe Component (Replaces playful Orbs)
function GeometricWireframe() {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
            groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
                {/* Remove the icosahedron mesh entirely since three.js doesn't have it explicitly without extra add-ons sometimes, use a generic box instead to be safe */}
                <mesh>
                    <boxGeometry args={[3, 3, 3]} />
                    <meshBasicMaterial color="#06b6d4" wireframe={true} transparent opacity={0.3} />
                </mesh>
                <mesh scale={0.8}>
                    <octahedronGeometry args={[2, 0]} />
                    <meshBasicMaterial color="#a855f7" wireframe={true} transparent opacity={0.2} />
                </mesh>
            </Float>
        </group>
    );
}

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    const experiences = [
        {
            title: "Protap Club",
            role: "Full Stack Developer",
            location: "Vadodara, Gujarat",
            period: "Jan 2026 – Present",
            type: "current",
            achievements: [
                "Architected an NFC-enabled attendance backend fully integrated with the college ERP system, successfully automating student attendance tracking.",
                "Engineered scalable RESTful APIs using Node.js and Express.js to facilitate secure NFC authentication, real-time data synchronization.",
                "Implemented robust database solutions using MongoDB with optimized query performance for rapid data retrieval."
            ],
            icon: <Terminal className="w-5 h-5" />,
            color: "from-purple-500 to-cyan-500",
            borderColor: "border-cyan-500/30",
            hoverBorder: "hover:border-cyan-400"
        }
    ];

    return (
        <section id="experience" className="w-full min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-[#050505]">

            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
            <div className="absolute top-0 right-1/3 w-[1px] h-full bg-purple-500/10 pointer-events-none z-0 hidden md:block" />

            {/* 3D Background Canvas - Wireframe Geometry */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
                <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                    <ambientLight intensity={0.5} />
                    <GeometricWireframe />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            <div ref={ref} className="max-w-7xl w-full mx-auto relative z-10 pt-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex flex-col items-center">
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-2 flex items-center gap-3">
                            <span className="text-cyan-500 font-mono text-3xl font-normal">{'<'}</span>
                            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Experience</span>
                            <span className="text-cyan-500 font-mono text-3xl font-normal">{'>'}</span>
                        </h2>
                        <div className="h-[2px] w-full max-w-[200px] bg-gradient-to-r from-purple-500 to-cyan-500 mt-2" />
                    </div>
                    <p className="text-gray-500 font-mono text-sm mt-6 uppercase tracking-widest">
                        Career Journey // Professional Experience
                    </p>
                </motion.div>

                {/* Experience Cards */}
                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="relative max-w-4xl mx-auto"
                        >
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Timeline Node (Sharper) */}
                                <div className="flex-shrink-0 relative mt-2 hidden md:block">
                                    <div className={`w-12 h-12 rounded-sm bg-gradient-to-br ${exp.color} p-[1px]`}>
                                        <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center text-white">
                                            {exp.icon}
                                        </div>
                                    </div>
                                    {/* Vertical Line Connector */}
                                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-cyan-500/50 to-transparent" />
                                </div>

                                {/* Experience Card (Sharper, Tech Vibe) */}
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex-1 bg-[#0d0d0d] border ${exp.borderColor} ${exp.hoverBorder} rounded-sm p-6 md:p-8 shadow-2xl transition-all duration-300 relative group w-full`}
                                >
                                    <div className="relative z-10 w-full overflow-hidden">
                                        {/* Card Header */}
                                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 border-b border-white/5 pb-6">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{exp.title}</h3>
                                                <p className="text-md font-mono text-purple-400">
                                                    {exp.role}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2 mt-4 md:mt-0 text-gray-400 font-mono text-xs">
                                                <div className="flex items-center gap-2 bg-[#111] px-3 py-1.5 rounded-sm border border-white/5">
                                                    <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                                                    <span>{exp.period}</span>
                                                </div>
                                                <div className="flex items-center gap-2 bg-[#111] px-3 py-1.5 rounded-sm border border-white/5">
                                                    <MapPin className="w-3.5 h-3.5 text-purple-500" />
                                                    <span>{exp.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        <div className="space-y-3">
                                            <div className="font-mono text-xs text-gray-500 mb-4 uppercase tracking-wider">
                                                {'>'} Responsibilities:
                                            </div>
                                            {exp.achievements.map((achievement, i) => (
                                                <div key={i} className="flex gap-4 items-start group/item">
                                                    <span className="font-mono text-cyan-500/50 mt-1 select-none text-xs">{(i + 1).toString().padStart(2, '0')}</span>
                                                    <p className="text-gray-300 leading-relaxed text-sm group-hover/item:text-white transition-colors">
                                                        {achievement}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Status Badge */}
                                        {exp.type === 'current' && (
                                            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-green-950/30 border border-green-500/30">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                    <span className="text-green-400 font-mono text-[10px] uppercase tracking-wider">Status: Active</span>
                                                </div>
                                                <div className="text-gray-600 font-mono text-[10px]">
                                                    Presently Working Here
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
            `}</style>
        </section>
    );
};

export default Experience;
