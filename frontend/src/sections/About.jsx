import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Coffee, Sparkles, Cpu, MapPin, GraduationCap, Activity, Zap } from 'lucide-react';
import { EASE } from '../lib/motion';
import MaskReveal from '../components/MaskReveal';
import ScrollText from '../components/ScrollText';

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
    const [githubStats, setGithubStats] = useState({ repos: 35, followers: 12 });

    useEffect(() => {
        fetch('https://api.github.com/users/VRAJESH-31')
            .then(res => res.json())
            .then(data => {
                if (data.public_repos) {
                    setGithubStats({
                        repos: data.public_repos,
                        followers: data.followers
                    });
                }
            })
            .catch(() => {});
    }, []);

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
            data-guide="Explore my developer profile, daily metrics, and AI workflow in the bento grid."
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
                        viewport={{ once: true, amount: 0.1 }}
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
                        <ScrollText className="text-gray-200 text-lg md:text-2xl leading-relaxed font-light mt-4">
                            I'm a final-year{' '}
                            <span className="text-white font-semibold relative inline-block">
                                B.Tech Computer Science
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-500/50" />
                            </span>{' '}
                            student, focused on building{' '}
                            <span className="text-white font-semibold">scalable MERN stack applications</span>. I enjoy developing full-stack systems—from structuring databases to building state-driven frontends.
                        </ScrollText>
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
                            <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center p-6 md:p-8 overflow-hidden">
                                <div className="w-full max-w-[280px] md:max-w-sm aspect-[3/2] rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative bg-black/40">
                                    {/* Ambient blurred glow behind the GIF to fill the wider container */}
                                    <img 
                                        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTZ1cnF2YXA0YzA2ajJ2c2xmdW01eTBkdW53emQ5bzgybnB4MTEzeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1PB2ZpDj3CwPtaUW1l/giphy.gif" 
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                                    />
                                    <img 
                                        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTZ1cnF2YXA0YzA2ajJ2c2xmdW01eTBkdW53emQ5bzgybnB4MTEzeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1PB2ZpDj3CwPtaUW1l/giphy.gif" 
                                        alt="vrajesh_config"
                                        className="relative z-10 w-full h-full object-contain"
                                    />
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
                            <motion.div
                                animate={{ 
                                    y: [0, -3, 0],
                                    rotate: [0, 4, -4, 0]
                                }}
                                transition={{ 
                                    duration: 4, 
                                    repeat: Infinity, 
                                    ease: "easeInOut" 
                                }}
                            >
                                <Coffee className="w-5 h-5 text-purple-300" />
                            </motion.div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">caffeine</span>
                        </div>
                        <div>
                            <div className="text-xl font-display font-bold text-white">Coffee Level: High</div>
                            <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '92%' }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
                                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                                />
                            </div>
                            <div className="mt-2 text-[10px] font-mono text-white/40 flex justify-between">
                                <span>~ 4 cups / commit</span>
                                <span className="text-cyan-400 animate-pulse">Running...</span>
                            </div>
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
                            <div className="text-xs md:text-sm font-semibold text-white leading-relaxed">
                                Keeping pace with AI trends to build high-performance, intelligent software recruiters love.
                            </div>
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
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">focus</div>
                        <div className="flex flex-wrap gap-1.5">
                            {['MERN Stack', 'Generative AI', 'LLMs', 'React.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Deployment', 'DevOps'].map((f) => (
                                <span key={f} className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-[10px] text-purple-300 font-mono">{f}</span>
                            ))}
                        </div>
                    </Card>

                    {/* H — AI Workflow / Stack */}
                    <Card className="flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <Sparkles className="w-5 h-5 text-cyan-300" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">workflow</span>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-white leading-snug mb-2">AI-Driven Coding</div>
                            <div className="flex flex-wrap gap-1.5">
                                {['Vibe Coding', 'Claude Code', 'Cursor', 'Antigravity', 'Prompt Engineering'].map((tool) => (
                                    <span key={tool} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/70 font-mono">{tool}</span>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* I — GitHub Stats & Commit Calendar (full-width bottom row) */}
                    <Card className="md:col-span-4 flex flex-col gap-6" data-guide="View my live GitHub contribution history, stats, and medals.">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                            <div className="flex flex-col max-w-[280px] w-full lg:w-auto shrink-0">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">open_source</div>
                                <h3 className="text-2xl font-display font-bold text-white mb-2">GitHub Portfolio</h3>
                                <p className="text-xs text-gray-400 leading-relaxed font-sans mb-3">
                                    Live activity stream monitoring commits, repository achievements, and performance grades.
                                </p>
                                <a
                                    href="https://github.com/VRAJESH-31"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
                                    data-guide="Click to open my GitHub profile."
                                >
                                    @VRAJESH-31 →
                                </a>
                            </div>

                            {/* Detailed Stats Cards separated directly in React */}
                            <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/20 transition-all">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">performance</span>
                                    <div className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mt-2">B- Grade</div>
                                    <span className="text-[9px] text-gray-500 mt-1 font-mono">Computed Rank</span>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/20 transition-all">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">commits</span>
                                    <div className="text-2xl font-bold font-display text-white mt-2">422</div>
                                    <span className="text-[9px] text-gray-500 mt-1 font-mono">Commits (Last Year)</span>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/20 transition-all">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">contributions</span>
                                    <div className="text-2xl font-bold font-display text-white mt-2">606</div>
                                    <span className="text-[9px] text-gray-500 mt-1 font-mono">Total Contributions</span>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/20 transition-all">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">achievements</span>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {['Pull Shark', 'Quickdraw'].map((badge) => (
                                            <span key={badge} className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[8px] text-cyan-400 font-mono font-semibold">{badge}</span>
                                        ))}
                                    </div>
                                    <span className="text-[9px] text-gray-500 mt-1 font-mono">Official Badges</span>
                                </div>
                            </div>
                        </div>

                        {/* Contribution Calendar */}
                        <div className="w-full border-t border-white/5 pt-4">
                            <div className="flex justify-between items-center mb-3">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">commit_calendar</div>
                                <div className="text-[10px] font-mono text-cyan-400/60">Color: Cyan Active</div>
                            </div>
                            <div className="w-full overflow-x-auto flex justify-center">
                                <div className="min-w-[620px] w-full p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-center">
                                    <img 
                                        src="https://ghchart.rshah.org/06b6d4/VRAJESH-31" 
                                        alt="GitHub contribution graph" 
                                        className="w-full h-auto object-contain opacity-85 hover:opacity-100 transition-all duration-300"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
