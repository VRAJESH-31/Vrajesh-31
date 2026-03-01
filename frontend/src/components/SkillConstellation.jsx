import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Line, Html, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded Skill Data
export const skillGroups = [
    {
        name: "Languages",
        color: "#f7df1e", // Yellow
        position: [0, 2, 0],
        size: 1.5,
        children: [
            { name: "Python", position: [-2, 3, 2], color: "#3776ab", desc: "Versatile scripting & backend" },
            { name: "JavaScript", position: [2, 3, 2], color: "#f7df1e", desc: "Web & interactivity" },
            { name: "Java", position: [0, 4, -2], color: "#b07219", desc: "Enterprise applications" }
        ]
    },
    {
        name: "Frontend",
        color: "#61dafb", // Cyan
        position: [6, 0, 0],
        size: 1.5,
        children: [
            { name: "React", position: [8, 1, 1], color: "#61dafb", desc: "UI Library" },
            { name: "HTML", position: [7, -1, 2], color: "#e34c26", desc: "Structure" },
            { name: "CSS", position: [7, 1, -2], color: "#264de4", desc: "Styling" },
            { name: "Tailwind CSS", position: [5, -2, 0], color: "#38b2ac", desc: "Utility-first framework" }
        ]
    },
    {
        name: "Backend",
        color: "#68a063", // Green
        position: [-6, 0, 0],
        size: 1.5,
        children: [
            { name: "Node.js", position: [-8, 1, 1], color: "#339933", desc: "JS Runtime" },
            { name: "Express.js", position: [-7, -1, 2], color: "#000000", desc: "Web Framework" },
            { name: "MongoDB", position: [-7, 1, -2], color: "#47a248", desc: "NoSQL Database" },
            { name: "Firebase", position: [-5, -2, 0], color: "#ffca28", desc: "BaaS" },
            { name: "Flask", position: [-9, 0, -1], color: "#000000", desc: "Python Microframework" },
            { name: "JWT", position: [-8, -2, -2], color: "#d63aff", desc: "Auth standard" }
        ]
    },
    {
        name: "Tools",
        color: "#ff6600", // Orange
        position: [0, -4, 4],
        size: 1.5,
        children: [
            { name: "Git", position: [-2, -5, 5], color: "#f05032", desc: "Version Control" },
            { name: "GitHub", position: [2, -5, 5], color: "#181717", desc: "Collaboration" },
            { name: "Postman", position: [0, -6, 3], color: "#ff6c37", desc: "API Testing" },
            { name: "VS Code", position: [0, -3, 6], color: "#007acc", desc: "Editor" }
        ]
    },
    {
        name: "Coursework",
        color: "#9933cc", // Purple
        position: [0, -2, -6],
        size: 1.5,
        children: [
            { name: "DSA", position: [-3, -3, -7], color: "#ffcc00", desc: "Data Structures & Algos" },
            { name: "OOP", position: [3, -3, -7], color: "#00ccff", desc: "Object-Oriented Programming" },
            { name: "DBMS", position: [0, -1, -8], color: "#ff3333", desc: "Database Systems" },
            { name: "OS", position: [-2, -4, -5], color: "#33cc33", desc: "Operating Systems" },
            { name: "Networks", position: [2, -4, -5], color: "#cc33cc", desc: "Computer Networks" },
        ]
    },
    {
        name: "AI Tools",
        color: "#ff00ff", // Magenta/Neon Pink
        position: [4, 4, -4],
        size: 1.6,
        children: [
            { name: "LLMs", position: [6, 6, -3], color: "#ff00aa", desc: "Large Language Models" },
            { name: "Vibe Coding", position: [3, 6, -6], color: "#aa00ff", desc: "AI-assisted flow state" },
            { name: "Generative AI", position: [5, 3, -6], color: "#ff33cc", desc: "Content & Code Gen" },
            { name: "Cursor/Copilot", position: [2, 5, -3], color: "#ffffff", desc: "AI pair programming" }
        ]
    }
];

// Define Cross-Category Connections (e.g. JS -> React, Python -> Flask)
const crossConnections = [
    { start: "JavaScript", end: "React" },
    { start: "JavaScript", end: "Node.js" },
    { start: "Python", end: "Flask" },
    { start: "HTML", end: "React" },
    { start: "Node.js", end: "Express.js" },
    { start: "MongoDB", end: "Express.js" }
];

// Helper to get all nodes flat map for easy lookup
const getAllNodes = () => {
    const nodes = [];
    skillGroups.forEach(group => {
        nodes.push({ ...group, isGroup: true });
        group.children.forEach(child => nodes.push({ ...child, parent: group.name }));
    });
    return nodes;
};

// Helper for lines
const getConnections = (groups) => {
    const connections = [];
    const nodeMap = new Map();

    // 1. Group to Children connections
    groups.forEach(group => {
        const start = new THREE.Vector3(...group.position);
        nodeMap.set(group.name, start);

        group.children.forEach(child => {
            const end = new THREE.Vector3(...child.position);
            nodeMap.set(child.name, end);

            connections.push({
                start,
                end,
                color: group.color,
                startName: group.name,
                endName: child.name,
                type: 'hierarchy'
            });
        });
    });

    // 2. Cross connections
    crossConnections.forEach(conn => {
        const start = nodeMap.get(conn.start);
        const end = nodeMap.get(conn.end);
        if (start && end) {
            connections.push({
                start,
                end,
                color: "#ffaa00",
                startName: conn.start,
                endName: conn.end,
                type: 'cross'
            });
        }
    });
    return connections;
};

const Node = ({ position, name, color, size = 1, desc, onClick, onHover, isSelected, isHovered, isRelated, isFocusMode }) => {
    const ref = useRef();
    const innerRef = useRef();
    const glowRef = useRef();
    const particlesRef = useRef();

    useFrame((state) => {
        if (ref.current) {
            // Main orb rotation
            ref.current.rotation.y += 0.003;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

            // Inner core rotation (opposite direction)
            if (innerRef.current) {
                innerRef.current.rotation.y -= 0.01;
                innerRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
            }

            // Glow pulsing
            if (glowRef.current) {
                const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
                glowRef.current.scale.setScalar(pulseScale);
            }

            // Particle orbit
            if (particlesRef.current) {
                particlesRef.current.rotation.y = state.clock.elapsedTime * 0.5;
            }
        }
    });

    const scale = isSelected ? 1.8 : (isHovered ? 1.4 : 1);

    // Calculate opacity based on focus mode
    const baseOpacity = isFocusMode ? 0.05 : 0.6;
    const activeOpacity = 1;
    const currentOpacity = (isSelected || isHovered || (isFocusMode && isRelated)) ? activeOpacity : baseOpacity;

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
                {/* Outer Glow Orb */}
                <mesh ref={glowRef} scale={[scale * 2.5, scale * 2.5, scale * 2.5]}>
                    <sphereGeometry args={[size * 0.4, 32, 32]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={isSelected || isHovered ? 0.15 : 0.05}
                    />
                </mesh>

                {/* Main Crystal Orb */}
                <mesh
                    ref={ref}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                    onPointerOver={(e) => {
                        e.stopPropagation();
                        document.body.style.cursor = 'pointer';
                        onHover(true);
                    }}
                    onPointerOut={(e) => {
                        e.stopPropagation();
                        document.body.style.cursor = 'auto';
                        onHover(false);
                    }}
                    scale={[scale, scale, scale]}
                >
                    {/* Crystal geometry - more complex than icosahedron */}
                    <dodecahedronGeometry args={[size * 0.35, 0]} />
                    <meshPhysicalMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={isSelected || isHovered ? 2.5 : (isRelated ? 1.2 : 0.3)}
                        roughness={0.1}
                        metalness={0.9}
                        transmission={0.6}
                        thickness={0.5}
                        clearcoat={1}
                        clearcoatRoughness={0}
                        transparent
                        opacity={currentOpacity}
                        envMapIntensity={2}
                    />

                    {/* Inner Core */}
                    <mesh ref={innerRef} scale={[0.5, 0.5, 0.5]}>
                        <octahedronGeometry args={[size * 0.2, 0]} />
                        <meshStandardMaterial
                            color={isSelected || isHovered ? '#ffffff' : color}
                            emissive={color}
                            emissiveIntensity={3}
                            roughness={0}
                            metalness={1}
                        />
                    </mesh>
                </mesh>

                {/* Orbiting Particles */}
                <group ref={particlesRef}>
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                        <mesh
                            key={i}
                            position={[
                                Math.cos((angle * Math.PI) / 180) * size * 0.8,
                                Math.sin((angle * Math.PI) / 180) * size * 0.8,
                                0
                            ]}
                            scale={[0.05, 0.05, 0.05]}
                        >
                            <sphereGeometry args={[1, 8, 8]} />
                            <meshBasicMaterial
                                color={isSelected || isHovered ? '#ffffff' : color}
                                transparent
                                opacity={isSelected || isHovered ? 0.9 : 0.4}
                            />
                        </mesh>
                    ))}
                </group>


                {/* Label Container */}
                <Html distanceFactor={12} style={{ pointerEvents: 'none' }} position={[0, -1.2, 0]}>
                    <div className={`flex flex-col items-center transition-all duration-500 ${(isSelected || isHovered || (isFocusMode && isRelated)) ? 'opacity-100 scale-110' : (isFocusMode ? 'opacity-10 blur-sm scale-75' : 'opacity-40 scale-90')}`}>
                        <div className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap backdrop-blur-md border shadow-lg ${isSelected ? 'bg-gradient-to-r from-white/90 to-white/80 text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.6)]' : 'bg-gradient-to-r from-white/20 to-white/10 text-white/90 border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.2)]'}`}>
                            {name}
                        </div>
                        {(isSelected || isHovered) && desc && (
                            <div className="mt-2 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-xs text-white/80 max-w-xs text-center">
                                {desc}
                            </div>
                        )}
                    </div>
                </Html>
            </Float>
        </group>
    );
};

const Connection = ({ start, end, color, active, type, isFocusMode }) => {
    const ref = useRef();
    const isCross = type === 'cross';
    const opacity = active ? 0.8 : (isFocusMode ? 0 : 0.15);

    useFrame((state) => {
        if (ref.current && active) {
            // Animated flow effect for active connections
            ref.current.material.dashOffset = -state.clock.elapsedTime * 0.5;
        }
    });

    return (
        <Line
            ref={ref}
            points={[start, end]}
            color={active ? color : (isCross ? "#666" : "#444")}
            lineWidth={active ? (isCross ? 2 : 3) : (isCross ? 0.8 : 1.5)}
            transparent
            opacity={opacity}
            dashed={isCross}
            dashScale={10}
            dashSize={0.5}
            gapSize={0.5}
        />
    );
};

const CameraController = ({ selectedNode }) => {
    const { camera, controls } = useThree();

    useFrame(() => {
        if (selectedNode && controls) {
            // Smoothly move camera towards but not ONTO the node
            const targetPos = new THREE.Vector3(...selectedNode.position);
            // Offset logic: Keep z distance, but center the x/y
            const offset = new THREE.Vector3(0, 0, 10); // Slightly further back for better view
            const desiredCamPos = targetPos.clone().add(offset);

            // Lerp camera position
            camera.position.lerp(desiredCamPos, 0.05);
            // Lerp controls target to node center
            controls.target.lerp(targetPos, 0.05);
            controls.update();
        }
    });
    return null;
}

const Scene = ({ onNodeSelect, selectedNode, isFocusMode }) => {
    const [hoveredNode, setHoveredNode] = useState(null);
    const connections = useMemo(() => getConnections(skillGroups), []);

    return (
        <>
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                minDistance={5}
                maxDistance={30}
                autoRotate={!selectedNode && !hoveredNode}
                autoRotateSpeed={0.5}
                dampingFactor={0.05}
            />

            <CameraController selectedNode={selectedNode} />

            <ambientLight intensity={0.3} />
            <pointLight position={[15, 15, 15]} intensity={1.2} color="#ffffff" />
            <pointLight position={[-15, -15, -15]} intensity={0.8} color="#7c3aed" /> {/* Purple glow */}
            <pointLight position={[0, 10, -10]} intensity={0.6} color="#06b6d4" /> {/* Cyan glow */}
            <pointLight position={[0, -10, 10]} intensity={0.6} color="#f59e0b" /> {/* Amber glow */}

            <Stars radius={150} depth={60} count={5000} factor={4} saturation={0} fade speed={0.3} />
            <Sparkles count={200} scale={30} size={3} speed={0.5} opacity={0.6} color="#ffffff" />
            <Sparkles count={100} scale={25} size={2} speed={0.3} opacity={0.4} color="#7c3aed" />
            <Sparkles count={80} scale={20} size={2} speed={0.4} opacity={0.3} color="#06b6d4" />

            {skillGroups.map((group, i) => (
                <group key={i}>
                    {/* Core Node */}
                    <Node
                        {...group}
                        isSelected={selectedNode?.name === group.name}
                        isHovered={hoveredNode?.name === group.name}
                        isRelated={
                            (hoveredNode && (hoveredNode.name === group.name || group.children.some(c => c.name === hoveredNode.name))) ||
                            (selectedNode && (selectedNode.name === group.name || group.children.some(c => c.name === selectedNode.name)))
                        }
                        isFocusMode={isFocusMode}
                        onClick={() => onNodeSelect(group)}
                        onHover={(status) => setHoveredNode(status ? group : null)}
                    />

                    {/* Child Nodes */}
                    {group.children.map((child, j) => {
                        // Helper to check relationship against a target node
                        const checkRel = (target) => {
                            if (!target) return false;
                            const isParent = target.name === group.name;
                            const isSibling = target.parent === group.name || group.children.some(c => c.name === target.name); // Simpler: if target is in same group
                            const isCross = crossConnections.some(c =>
                                (c.start === target.name && c.end === child.name) ||
                                (c.end === target.name && c.start === child.name)
                            );
                            return isParent || isSibling || isCross;
                        };

                        return (
                            <Node
                                key={j}
                                {...child}
                                isSelected={selectedNode?.name === child.name}
                                isHovered={hoveredNode?.name === child.name}
                                isRelated={
                                    (hoveredNode && (hoveredNode.name === child.name || checkRel(hoveredNode))) ||
                                    (selectedNode && (selectedNode.name === child.name || checkRel(selectedNode)))
                                }
                                isFocusMode={isFocusMode}
                                onClick={() => onNodeSelect(child)}
                                onHover={(status) => setHoveredNode(status ? child : null)}
                            />
                        );
                    })}
                </group>
            ))}

            {connections.map((conn, i) => {
                const isRelated = hoveredNode && (conn.startName === hoveredNode.name || conn.endName === hoveredNode.name);
                const isSelectedRel = selectedNode && (conn.startName === selectedNode.name || conn.endName === selectedNode.name);

                return (
                    <Connection
                        key={i}
                        {...conn}
                        active={isRelated || isSelectedRel}
                        isFocusMode={isFocusMode}
                        type={conn.type}
                    />
                );
            })}
        </>
    );
};

const SkillConstellation = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const focusTimerRef = useRef(null);

    const handleNodeSelect = (node) => {
        setSelectedNode(node);
        setIsFocusMode(true);

        // Reset any existing timer
        if (focusTimerRef.current) clearTimeout(focusTimerRef.current);

        // Auto-clear focus after 10 seconds
        focusTimerRef.current = setTimeout(() => {
            setIsFocusMode(false);
            // Optionally, we could also clear selectedNode if we want full reset:
            // setSelectedNode(null); 
        }, 10000); // 10s
    };

    const handleReset = () => {
        setSelectedNode(null);
        setIsFocusMode(false);
        if (focusTimerRef.current) clearTimeout(focusTimerRef.current);
    };

    // Find group by name helper
    const handleCategoryClick = (categoryName) => {
        const group = skillGroups.find(g => g.name === categoryName);
        if (group) {
            handleNodeSelect(group);
        }
    };

    useEffect(() => {
        return () => {
            if (focusTimerRef.current) clearTimeout(focusTimerRef.current);
        };
    }, []);

    return (
        <div className="w-full h-[600px] relative">
            <Canvas camera={{ position: [0, 0, 20], fov: 50 }} dpr={[1, 2]}>
                <Scene onNodeSelect={handleNodeSelect} selectedNode={selectedNode} isFocusMode={isFocusMode} />
            </Canvas>

            {/* Reset Button */}
            {selectedNode && (
                <button
                    onClick={handleReset}
                    className="absolute bottom-8 right-8 px-4 py-2 bg-white/10 text-white rounded-full backdrop-blur-md border border-white/20 text-sm hover:bg-white/20 transition-all z-10"
                >
                    Reset View
                </button>
            )}

            {/* Interactive Sidebar / Legend */}
            <div className="absolute top-8 left-8 flex flex-col gap-3">
                <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Focus View</h3>
                {skillGroups.map((group) => (
                    <button
                        key={group.name}
                        onClick={() => handleCategoryClick(group.name)}
                        className={`
                            flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left w-full
                            ${selectedNode?.name === group.name
                                ? 'bg-white/10 border border-white/20 text-white shadow-lg'
                                : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'
                            }
                        `}
                    >
                        <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: group.color, color: group.color }}></span>
                        <span className="text-xs font-medium">{group.name}</span>
                    </button>
                ))}
            </div>

            <div className="absolute bottom-4 left-4 text-white/30 text-xs pointer-events-none select-none">
                Interact with the constellation • Click sidebar to focus
            </div>
        </div>
    );
};

export default SkillConstellation;
