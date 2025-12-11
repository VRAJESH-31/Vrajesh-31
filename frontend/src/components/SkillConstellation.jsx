import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Line, Html, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded Skill Data
const skillGroups = [
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
                type: 'heirarchy'
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

    useFrame((state) => {
        if (ref.current) {
            // Idle animation
            ref.current.rotation.y += 0.005;
            ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    const scale = isSelected ? 1.5 : (isHovered ? 1.2 : 1);

    // Calculate opacity based on focus mode
    const baseOpacity = isFocusMode ? 0.05 : 0.6; // Dim everything else heavily if focus mode is on
    const activeOpacity = 1;
    const currentOpacity = (isSelected || isHovered || (isFocusMode && isRelated)) ? activeOpacity : baseOpacity;

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
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
                    <icosahedronGeometry args={[size * 0.3, 1]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={isSelected || isHovered ? 3 : (isRelated ? 1.5 : 0.5)}
                        roughness={0.2}
                        metalness={0.8}
                        wireframe={!isSelected && !isHovered}
                        transparent
                        opacity={currentOpacity}
                    />

                    {/* Label Container */}
                    <Html distanceFactor={12} style={{ pointerEvents: 'none' }} position={[0, -0.8, 0]}>
                        <div className={`
                            flex flex-col items-center
                            transition-all duration-500
                            ${(isSelected || isHovered || (isFocusMode && isRelated)) ? 'opacity-100 scale-110' : (isFocusMode ? 'opacity-10 blur-sm scale-75' : 'opacity-40 scale-90')}
                        `}>
                            <div className={`
                                px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap backdrop-blur-md border 
                                ${isSelected
                                    ? 'bg-white/90 text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]'
                                    : 'bg-black/60 text-white/90 border-white/20'
                                }
                            `}>
                                {name}
                            </div>
                            {(isSelected || isHovered) && desc && (
                                <div className="mt-1 px-2 py-0.5 rounded-md bg-black/80 text-[10px] text-gray-300 whitespace-nowrap border border-white/10">
                                    {desc}
                                </div>
                            )}
                        </div>
                    </Html>
                </mesh>

                {/* Glow Halo */}
                <mesh scale={[scale * 1.5, scale * 1.5, scale * 1.5]}>
                    <sphereGeometry args={[size * 0.3, 16, 16]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={isSelected ? 0.2 : (isHovered ? 0.15 : (isFocusMode && !isRelated ? 0 : 0.05))}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </mesh>
            </Float>
        </group>
    );
};

const Connection = ({ start, end, color, active, type, isFocusMode }) => {
    // Only separate rendering logic if needed, but keeping it simple for now
    const isCross = type === 'cross';
    const opacity = active ? 0.6 : (isFocusMode ? 0 : 0.1); // Hide lines if not relevant in focus mode

    return (
        <Line
            points={[start, end]}
            color={active ? color : (isCross ? "#666" : "#444")}
            lineWidth={active ? (isCross ? 1.5 : 2) : (isCross ? 0.5 : 1)}
            transparent
            opacity={opacity}
            dashed={isCross}
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

            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4c1d95" /> {/* Purple glow */}

            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
            <Sparkles count={100} scale={20} size={2} speed={0.4} opacity={0.5} color="#ffffff" />

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
