import React, { useRef, useLayoutEffect } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectScroll = ({ projects }) => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const panels = gsap.utils.toArray('.project-panel');

            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    end: () => "+=" + (triggerRef.current.offsetWidth * panels.length)
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [projects]);

    return (
        <div ref={sectionRef}>
            <div ref={triggerRef} className="overflow-hidden">
                <div className="flex w-fit">
                    {projects.map((project, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={index}
                                className="project-panel w-screen h-screen flex-shrink-0 flex flex-col justify-center px-8 md:px-12 relative"
                            >
                                {/* Large Number Background */}
                                <span className="absolute top-10 left-8 text-9xl font-display font-bold text-white/5 select-none z-0 pointer-events-none">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                <div className={`relative z-10 flex flex-col h-full justify-center gap-8 max-w-6xl mx-auto w-full ${isEven ? '' : 'flex-col-reverse'}`}>
                                    {/* Text Content */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <span className="block text-right w-full text-xs font-mono text-gray-500 tracking-widest uppercase">
                                                {project.category}
                                            </span>
                                            <h3 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
                                            {project.summary}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="pt-2">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tools & Features</p>
                                            <div className="text-purple-400 font-mono text-sm max-w-md">
                                                {project.tags.join(', ')}
                                            </div>
                                        </div>

                                        {/* Links */}
                                        <div className="flex gap-4 pt-4">
                                            <a
                                                href={project.links.code}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-white hover:text-purple-400 transition-colors"
                                            >
                                                <Github size={24} />
                                            </a>
                                            {project.links.demo && project.links.demo !== '#' && (
                                                <a
                                                    href={project.links.demo}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-white hover:text-cyan-400 transition-colors"
                                                >
                                                    <ArrowUpRight size={24} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className="w-full max-w-2xl aspect-video bg-gray-900 rounded-lg overflow-hidden border border-white/10 shadow-2xl relative group">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProjectScroll;
