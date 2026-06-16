import React, { useMemo, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Line, Html, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded Skill Data
// NOTE: the `position` values here are no longer used for the 3D layout (we now
// generate clean, clustered "solar system" positions automatically in buildLayout()).
// They are kept only so the data shape stays stable for the Normal/Grid view (SkillStatic).
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

// ---------------------------------------------------------------------------
// AUTO LAYOUT
// Instead of hand-placed (and visually confusing) coordinates, we arrange every
// category as its own little "solar system": a central core with its skills
// orbiting in a tidy ring around it. This makes the grouping obvious at a glance
// while keeping the genuine 3D feel.
// ---------------------------------------------------------------------------
const CORE_RADIUS = 7;   // distance of each category core from the center
const RING_RADIUS = 2.6; // distance of skills from their own category core

const buildLayout = () => {
    return skillGroups.map((group, i) => {
        const angle = (i / skillGroups.length) * Math.PI * 2;
        // Gentle up/down zig-zag so it reads as a 3D cluster (and never collapses
        // to a flat line while auto-rotating around the vertical axis).
        const coreY = i % 2 === 0 ? 1.8 : -1.8;
        const core = new THREE.Vector3(
            Math.cos(angle) * CORE_RADIUS,
            coreY,
            Math.sin(angle) * CORE_RADIUS
        );

        // Build an upright ring plane around the core so its skills "stand" around it.
        const radial = core.clone().normalize();
        let basisA = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), radial);
        if (basisA.lengthSq() < 1e-4) basisA = new THREE.Vector3(1, 0, 0);
        basisA.normalize();
        const basisB = new THREE.Vector3().crossVectors(radial, basisA).normalize();

        const n = group.children.length;
        const ringR = RING_RADIUS + (n > 4 ? 0.7 : 0); // give crowded groups more room

        const children = group.children.map((child, j) => {
            const t = (j / n) * Math.PI * 2;
            const pos = core.clone()
                .add(basisA.clone().multiplyScalar(Math.cos(t) * ringR))
                .add(basisB.clone().multiplyScalar(Math.sin(t) * ringR));
            return { ...child, position: [pos.x, pos.y, pos.z] };
        });

        return { ...group, position: [core.x, core.y, core.z], isGroup: true, children };
    });
};

// Computed once, shared by the 3D scene AND the sidebar / camera focus so a
// sidebar click always flies to the correct (laid-out) position.
const SKILL_SYSTEMS = buildLayout();

// Helper for lines (works off the laid-out systems)
const getConnections = (groups) => {
    const connections = [];
    const nodeMap = new Map();

    // 1. Core -> skill "spokes" (these visually tie each group together)
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

    // 2. Cross-category links (shown only when something is focused, to avoid clutter)
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

const Node = ({ position, name, color, size = 1, desc, isGroup, onClick, onHover, isSelected, isHovered, isRelated, isFocusMode }) => {
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
    const active = isSelected || isHovered;

    // Opacity of the orb. Category cores stay a little brighter than skills so the
    // "hub" reads as the important node. Focus mode dims everything unrelated.
    const baseOpacity = isFocusMode ? 0.08 : (isGroup ? 0.85 : 0.6);
    const currentOpacity = (active || (isFocusMode && isRelated)) ? 1 : baseOpacity;

    // Label readability. The big change for non-tech viewers: labels are READABLE
    // by default (no blur-to-read), and category names are always clearly shown.
    let labelClass;
    if (active || (isFocusMode && isRelated)) {
        labelClass = 'opacity-100 scale-110';
    } else if (isFocusMode) {
        labelClass = 'opacity-10 blur-sm scale-90';
    } else if (isGroup) {
        labelClass = 'opacity-100 scale-100';
    } else {
        labelClass = 'opacity-80 scale-95';
    }

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
                {/* Outer Glow Orb */}
                <mesh ref={glowRef} scale={[scale * 2.5, scale * 2.5, scale * 2.5]}>
                    <sphereGeometry args={[size * 0.4, 32, 32]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={active ? 0.15 : (isGroup ? 0.08 : 0.05)}
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
                        emissiveIntensity={active ? 2.5 : (isRelated ? 1.2 : (isGroup ? 0.6 : 0.3))}
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
                            color={active ? '#ffffff' : color}
                            emissive={color}
                            emissiveIntensity={3}
                            roughness={0}
                            metalness={1}
                        />
                    </mesh>
                </mesh>

                {/* Faint halo ring around a category core, to read as a "hub" */}
                {isGroup && (
                    <mesh rotation={[Math.PI / 2, 0, 0]} scale={[scale, scale, scale]}>
                        <torusGeometry args={[size * 0.7, 0.015, 12, 64]} />
                        <meshBasicMaterial color={color} transparent opacity={isFocusMode && !isRelated ? 0.05 : 0.5} />
                    </mesh>
                )}

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
                                color={active ? '#ffffff' : color}
                                transparent
                                opacity={active ? 0.9 : 0.4}
                            />
                        </mesh>
                    ))}
                </group>


                {/* Label Container */}
                <Html distanceFactor={12} style={{ pointerEvents: 'none' }} position={[0, isGroup ? -1.4 : -1.2, 0]}>
                    <div className={`flex flex-col items-center transition-all duration-500 ${labelClass}`}>
                        <div className={`rounded-xl whitespace-nowrap backdrop-blur-md border shadow-lg
                            ${isGroup ? 'px-4 py-2 text-sm font-extrabold uppercase tracking-wide' : 'px-3 py-1.5 text-xs font-bold'}
                            ${isSelected
                                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                                : isGroup
                                    ? 'bg-black/40 text-white border-white/40 shadow-[0_0_14px_rgba(255,255,255,0.15)]'
                                    : 'bg-white/15 text-white/90 border-white/25 shadow-[0_0_8px_rgba(255,255,255,0.15)]'}`}
                            style={isGroup && !isSelected ? { color: color, borderColor: color } : undefined}
                        >
                            {name}
                        </div>
                        {active && desc && (
                            <div className="mt-2 px-3 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/20 text-xs text-white/90 max-w-xs text-center">
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
    // Cross-links are hidden until you focus something (they were the noisiest part).
    // Hierarchy spokes stay faintly visible so the grouping is always readable.
    const opacity = active ? 0.8 : (isCross ? 0 : (isFocusMode ? 0 : 0.18));

    useFrame((state) => {
        if (ref.current && active) {
            ref.current.material.dashOffset = -state.clock.elapsedTime * 0.5;
        }
    });

    return (
        <Line
            ref={ref}
            points={[start, end]}
            color={active ? color : (isCross ? "#666" : "#555")}
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
            const targetPos = new THREE.Vector3(...selectedNode.position);
            const offset = new THREE.Vector3(0, 0, 10);
            const desiredCamPos = targetPos.clone().add(offset);

            camera.position.lerp(desiredCamPos, 0.05);
            controls.target.lerp(targetPos, 0.05);
            controls.update();
        }
    });
    return null;
}

const Scene = ({ onNodeSelect, selectedNode, isFocusMode }) => {
    const [hoveredNode, setHoveredNode] = useState(null);
    const connections = useMemo(() => getConnections(SKILL_SYSTEMS), []);

    return (
        <>
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                minDistance={6}
                maxDistance={34}
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

            {SKILL_SYSTEMS.map((group, i) => (
                <group key={i}>
                    {/* Core Node */}
                    <Node
                        {...group}
                        isGroup
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
                        const checkRel = (target) => {
                            if (!target) return false;
                            const isParent = target.name === group.name;
                            const isSibling = target.parent === group.name || group.children.some(c => c.name === target.name);
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
                                onClick={() => onNodeSelect({ ...child, parent: group.name })}
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

    const handleNodeSelect = (node) => {
        setSelectedNode(node);
        setIsFocusMode(true);
    };

    const handleReset = () => {
        setSelectedNode(null);
        setIsFocusMode(false);
    };

    const handleCategoryClick = (categoryName) => {
        const group = SKILL_SYSTEMS.find(g => g.name === categoryName);
        if (group) handleNodeSelect(group);
    };

    // Friendly info for the selection card
    const selectedMeta = useMemo(() => {
        if (!selectedNode) return null;
        if (selectedNode.isGroup) {
            return { kind: 'Category', sub: `${selectedNode.children?.length || 0} skills` };
        }
        return { kind: 'Skill', sub: selectedNode.parent ? `in ${selectedNode.parent}` : '' };
    }, [selectedNode]);

    return (
        <div className="w-full h-[600px] relative">
            <Canvas
                camera={{ position: [0, 0, 22], fov: 50 }}
                dpr={[1, 2]}
                onPointerMissed={handleReset} // click empty space to go back
            >
                <Scene onNodeSelect={handleNodeSelect} selectedNode={selectedNode} isFocusMode={isFocusMode} />
            </Canvas>

            {/* Categories Sidebar */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
                <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Categories</h3>
                <p className="text-white/30 text-[10px] mb-1 -mt-1">Click one to explore</p>
                {SKILL_SYSTEMS.map((group) => (
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

            {/* Bottom-center: friendly hint OR the selected-item info card */}
            <AnimatePresence mode="wait">
                {selectedNode ? (
                    <motion.div
                        key="info"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[min(90%,420px)] z-10"
                    >
                        <div className="rounded-2xl bg-black/70 backdrop-blur-xl border border-white/15 px-5 py-4 shadow-2xl">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] shrink-0" style={{ backgroundColor: selectedNode.color, color: selectedNode.color }} />
                                <div className="min-w-0">
                                    <div className="text-white font-bold text-base leading-tight truncate">{selectedNode.name}</div>
                                    <div className="text-white/40 text-[11px] uppercase tracking-wider">{selectedMeta?.kind} · {selectedMeta?.sub}</div>
                                </div>
                            </div>
                            {selectedNode.desc && (
                                <p className="text-white/70 text-sm mt-2">{selectedNode.desc}</p>
                            )}
                            {selectedNode.isGroup && selectedNode.children && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {selectedNode.children.map((c) => (
                                        <span key={c.name} className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-white/80 text-[11px]">{c.name}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                    >
                        <div className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/70 text-xs flex items-center gap-2 whitespace-nowrap">
                            <span>🖱️ Drag to rotate</span>
                            <span className="text-white/20">•</span>
                            <span>Scroll to zoom</span>
                            <span className="text-white/20">•</span>
                            <span className="text-white">Click any orb to explore</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reset Button */}
            {selectedNode && (
                <button
                    onClick={handleReset}
                    className="absolute top-6 right-6 px-4 py-2 bg-white/10 text-white rounded-full backdrop-blur-md border border-white/20 text-sm hover:bg-white/20 transition-all z-10"
                >
                    ← Back to all
                </button>
            )}
        </div>
    );
};

export default SkillConstellation;
