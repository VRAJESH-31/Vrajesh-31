import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Calendar, MapPin, Briefcase, Award } from 'lucide-react';
import SectionBackground from '../components/SectionBackground';

// 3D Floating Card Component
function FloatingCard({ position, rotation, delay, children }) {
    const meshRef = useRef();
    
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.1;
            meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.02;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <mesh ref={meshRef} position={position} rotation={rotation}>
                <boxGeometry args={[3, 4, 0.1]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#7c3aed"
                    emissiveIntensity={0.1}
                />
            </mesh>
        </Float>
    );
}

// 3D Floating Orbs Component
function FloatingOrbs() {
    const groupRef = useRef();
    
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    const orbs = useMemo(() => [
        { position: [-3, 2, -2], color: "#7c3aed", size: 0.5 },
        { position: [3, -2, -1], color: "#06b6d4", size: 0.7 },
        { position: [-2, -3, 1], color: "#a855f7", size: 0.4 },
        { position: [2, 3, 0], color: "#0891b2", size: 0.6 },
    ], []);

    return (
        <group ref={groupRef}>
            {orbs.map((orb, i) => (
                <mesh key={i} position={orb.position}>
                    <sphereGeometry args={[orb.size, 32, 32]} />
                    <meshStandardMaterial
                        color={orb.color}
                        metalness={0.9}
                        roughness={0.1}
                        emissive={orb.color}
                        emissiveIntensity={0.5}
                    />
                </mesh>
            ))}
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
                "Engineered scalable RESTful APIs using Node.js and Express.js to facilitate secure NFC authentication, real-time data synchronization, and identity verification.",
                "Implemented robust database solutions using MongoDB with optimized query performance, ensuring consistent and rapid response times for data retrieval."
            ],
            icon: <Briefcase className="w-5 h-5" />,
            color: "from-purple-500 to-cyan-500"
        }
    ];

    return (
        <section id="experience" className="w-full min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
            {/* Background elements - directly applied */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]" />
            </div>

            {/* 3D Background Canvas */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#7c3aed" />
                    <pointLight position={[-10, -10, 10]} intensity={0.5} color="#06b6d4" />
                    <FloatingOrbs />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            <div ref={ref} className="max-w-7xl w-full mx-auto relative z-50">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-7xl font-display font-bold mb-4">
                        Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Journey</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        My professional and academic path shaped by innovation and continuous learning
                    </p>
                    <div className="mt-6 flex justify-center">
                        <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                    </div>
                </motion.div>

                {/* Experience Cards */}
                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="relative"
                        >
                            
                            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                                {/* Timeline Node */}
                                <div className="flex-shrink-0 relative">
                                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${exp.color} p-0.5`}>
                                        <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                                            {exp.icon}
                                        </div>
                                    </div>
                                    {exp.type === 'current' && (
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-30 blur-xl"
                                        />
                                    )}
                                </div>

                                {/* Experience Card */}
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-1 max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.3)] hover:shadow-[0_0_80px_rgba(124,58,237,0.3)] transition-all duration-500"
                                >
                                    {/* Card Header */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{exp.title}</h3>
                                            <p className={`text-lg font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                                                {exp.role}
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-4 md:mt-0 text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm">{exp.period}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm">{exp.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Achievements */}
                                    <div className="space-y-4">
                                        <h4 className="text-white font-semibold mb-3">Key Achievements:</h4>
                                        {exp.achievements.map((achievement, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.2 + i * 0.1 }}
                                                className="flex gap-3"
                                            >
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${exp.color} mt-2 flex-shrink-0`} />
                                                <p className="text-gray-300 leading-relaxed">{achievement}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Status Badge */}
                                    {exp.type === 'current' && (
                                        <motion.div
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                            <span className="text-green-400 text-sm font-medium">Currently Working</span>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
