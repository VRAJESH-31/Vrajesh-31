import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Coffee, Sparkles, Cpu, MapPin, GraduationCap, Activity, Zap } from 'lucide-react';
import { EASE } from '../lib/motion';
import MaskReveal from '../components/MaskReveal';

/* ----------------------------------------------------------------------
   Scroll-reactive 3D scene (maximum / dramatic).
   A cluster of wireframe solids whose rotation, spread and zoom are
   driven by the section's scroll progress (a framer-motion MotionValue
   read inside the r3f frame loop) layered on top of a slow idle spin.
---------------------------------------------------------------------- */
function ScrollScene({ progress }) {
    const group = useRef();
    const camRig = useRef();

    useFrame((state, delta) => {
        const p = progress.get();              // 0 → 1 across the section
        const t = state.clock.elapsedTime;

        if (group.current) {
            // Gentle scroll-linked rotation + slow idle drift.
            group.current.rotation.y = t * 0.08 + p * Math.PI * 0.9;
            group.current.rotation.x = Math.sin(t * 0.15) * 0.15 + p * Math.PI * 0.35;
            // Subtle zoom, eased toward target.
            const targetZ = -1 + Math.sin(p * Math.PI) * 2;
            group.current.position.z += (targetZ - group.current.position.z) * Math.min(1, delta * 3);
            group.current.scale.setScalar(0.7 + Math.sin(p * Math.PI) * 0.25);
        }
        if (camRig.current) {
            // Soft parallax sway.
            camRig.current.position.x = Math.sin(t * 0.2) * 0.6 + (p - 0.5) * 1.5;
            camRig.current.position.y = Math.cos(t * 0.18) * 0.4 - (p - 0.5) * 1.2;
        }
    });

    return (
        <group ref={camRig}>
            <group ref={group}>
                <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
                    <mesh>
                        <icosahedronGeometry args={[3, 0]} />
                        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.5} />
                    </mesh>
                    <mesh scale={1.6} rotation={[0.5, 0.5, 0]}>
                        <octahedronGeometry args={[3, 0]} />
                        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.3} />
                    </mesh>
                    <mesh scale={2.3} rotation={[0.3, 0.8, 0.2]}>
                        <dodecahedronGeometry args={[2.2, 0]} />
                        <meshBasicMaterial color="#9a8fe0" wireframe transparent opacity={0.18} />
                    </mesh>
                    <mesh>
                        <torusGeometry args={[4.2, 0.05, 16, 100]} />
                        <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} />
                    </mesh>
                </Float>
            </group>
        </group>
    );
}

/* ---------------- Strong morph variants ---------------- */
const grid = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.09, delayChildren: 0.08 },
    },
};

// Each tile pops in: scaled-down + blurred + lifted -> settles with a springy kick.
const tile = {
    hidden: { opacity: 0, y: 44, scale: 0.82, filter: 'blur(14px)' },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: { type: 'spring', stiffness: 130, damping: 15, mass: 0.7 },
    },
};

// Shared bento card shell with a hover "kick".
const Card = ({ className = '', children, hover = true }) => (
    <motion.div
        variants={tile}
        whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`group relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden p-6 md:p-7 transition-colors duration-300 hover:border-white/25 ${className}`}
    >
        {/* subtle accent wash on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(154,143,224,0.10),transparent_55%)]" />
        <div className="relative z-10 h-full">{children}</div>
    </motion.div>
);

const About = () => {
    const sectionRef = useRef(null);

    // Scroll progress across the section drives the decorative 3D canvas.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.5 });

    return (
        <section
            ref={sectionRef}
            id="about"
            className="w-full min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden bg-background"
        >

            {/* Minimalist grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

            {/* Scroll-reactive 3D wireframe cluster */}
            <div className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none">
                <Canvas camera={{ position: [0, 0, 12], fov: 55 }} dpr={[1, 2]}>
                    <ambientLight intensity={0.6} />
                    <ScrollScene progress={smooth} />
                </Canvas>
            </div>

            <div className="max-w-6xl w-full mx-auto relative z-10">

                {/* Section heading */}
                <div className="mb-10">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-3">
                        <MaskReveal>
                            <span className="flex items-center gap-3">
                                <span className="text-purple-500 font-mono text-3xl font-normal">{'<'}</span>
                                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Me</span>
                                <span className="text-purple-500 font-mono text-3xl font-normal">{'>'}</span>
                            </span>
                        </MaskReveal>
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
                        className="h-[2px] w-24 origin-left bg-gradient-to-r from-purple-500 to-cyan-500"
                    />
                </div>

                {/* Bento grid */}
                <motion.div
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.15, margin: '-80px' }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[minmax(180px,auto)]"
                >
                    {/* A — Intro (large) */}
                    <Card className="md:col-span-2 md:row-span-2 flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40">
                            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> whoami
                        </div>
                        <p className="text-gray-200 text-lg md:text-2xl leading-relaxed font-light mt-4">
                            I'm a final-year{' '}
                            <span className="text-white font-semibold relative inline-block">
                                B.Tech Computer Science
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-500/50" />
                            </span>{' '}
                            student at ITM (SLS) Baroda University, focused on building{' '}
                            <span className="text-white font-semibold">scalable MERN stack applications</span>. I enjoy developing full-stack systems—from structuring databases to building state-driven frontends.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6">
                            {['MERN', 'Full-Stack', 'Problem Solver'].map((t) => (
                                <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 font-mono">{t}</span>
                            ))}
                        </div>
                    </Card>

                    {/* B — IDE config window (large) */}
                    <Card hover={false} className="md:col-span-2 md:row-span-2 !p-0">
                        <div className="h-full flex flex-col">
                            <div className="h-10 bg-[#111] border-b border-white/5 flex items-center px-4 justify-between shrink-0">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="text-xs font-mono text-gray-500">vrajesh_config.ts</div>
                                <div className="w-12" />
                            </div>
                            <div className="p-6 font-mono text-sm md:text-[15px] bg-[#0a0a0a] flex-1">
                                <div className="space-y-1 text-gray-300">
                                    <div className="text-gray-500 mb-2 italic">
                                        // Developer Environment Configuration<br />
                                        // Auto-generated by sys.init()
                                    </div>
                                    <p><span className="text-purple-400">const</span> <span className="text-yellow-200">developer</span> = <span className="text-cyan-400">{`{`}</span></p>
                                    <div className="pl-4 space-y-2">
                                        <p>name: <span className="text-green-400">'Vrajesh Pandya'</span>,</p>
                                        <p>role: <span className="text-green-400">'Full Stack Architect'</span>,</p>
                                        <p>focus: [<span className="text-green-400">'Web-technologies'</span>, <span className="text-green-400">'AI/ML'</span>],</p>
                                        <p>status: <span className="text-green-400">'Building the Future'</span>,</p>
                                        <p className="flex items-center gap-2">
                                            sys_load: <span className="text-orange-400 bg-orange-400/10 px-1 rounded animate-pulse">Infinity%</span>
                                        </p>
                                    </div>
                                    <p className="text-cyan-400 mt-2">{`}`};</p>
                                    <div className="mt-5 text-gray-500">
                                        <span className="text-purple-400">export default</span> <span className="text-yellow-200">developer</span>;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* C — Generative AI (wide) */}
                    <Card className="md:col-span-2 flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40">
                            <Cpu className="w-3.5 h-3.5 text-purple-400" /> currently_exploring
                        </div>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light mt-3">
                            Recently, I've developed a strong interest in{' '}
                            <span className="text-purple-400 font-mono text-sm uppercase tracking-wider px-2 border border-purple-500/30 rounded-sm bg-purple-500/10">Generative AI &amp; LLMs</span>. I'm actively exploring how to integrate AI via{' '}
                            <span className="text-white font-medium">RAG pipelines</span> and <span className="text-white font-medium">agentic workflows</span> to create real practical value.
                        </p>
                    </Card>

                    {/* D — Coffee level (kick) */}
                    <Card className="flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <Coffee className="w-5 h-5 text-purple-300" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">caffeine</span>
                        </div>
                        <div>
                            <div className="text-2xl font-display font-bold text-white">High</div>
                            <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '92%' }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
                                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                                />
                            </div>
                            <div className="mt-2 text-[11px] font-mono text-white/40">~ 4 cups / commit</div>
                        </div>
                    </Card>

                    {/* E — Status (kick) */}
                    <Card className="flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <Activity className="w-5 h-5 text-purple-300" />
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-green-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> live
                            </span>
                        </div>
                        <div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">status</div>
                            <div className="text-xl md:text-2xl font-display font-bold text-white leading-tight">Building the Future</div>
                        </div>
                    </Card>

                    {/* F — Engineering mindset (wide) */}
                    <Card className="md:col-span-2 flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40">
                            <Zap className="w-3.5 h-3.5 text-purple-400" /> engineering_mindset
                        </div>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light mt-3">
                            I approach engineering with a problem-solving mindset—
                            <span className="text-white font-semibold border-b border-purple-400/50 pb-0.5">breaking down edge cases</span> and optimizing backend logic. I strive to build systems that hold up under real-world usage while keeping my fundamentals strong.
                        </p>
                    </Card>

                    {/* G — Focus (kick) */}
                    <Card className="flex flex-col justify-between">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">focus</div>
                        <div className="flex flex-wrap gap-2">
                            {['Web-technologies', 'AI / ML'].map((f) => (
                                <span key={f} className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 font-mono">{f}</span>
                            ))}
                        </div>
                    </Card>

                    {/* H — Education / location (kick) */}
                    <Card className="flex flex-col justify-between">
                        <GraduationCap className="w-5 h-5 text-purple-300" />
                        <div>
                            <div className="text-sm font-semibold text-white leading-snug">ITM (SLS) Baroda University</div>
                            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-mono text-white/40">
                                <MapPin className="w-3 h-3" /> Final-year B.Tech CS
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
