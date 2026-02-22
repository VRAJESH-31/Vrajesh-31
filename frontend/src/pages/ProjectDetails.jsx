import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Loader2, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to extract sections from raw markdown
const Mermaid = ({ text }) => {
    const ref = useRef(null);

    useEffect(() => {
        let isMounted = true;
        import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs').then((mermaidModule) => {
            if (!isMounted) return;
            const mermaid = mermaidModule.default;
            mermaid.initialize({
                startOnLoad: true,
                theme: 'dark',
                securityLevel: 'loose',
                fontFamily: 'Inter, sans-serif'
            });
            if (ref.current) {
                const id = `mermaid-${Math.random().toString(36).substring(7)}`;
                mermaid.render(id, text).then(({ svg }) => {
                    if (ref.current) {
                        ref.current.innerHTML = svg;
                    }
                }).catch((e) => {
                    console.error('Mermaid render error:', e);
                });
            }
        });
        return () => { isMounted = false; };
    }, [text]);

    return <div ref={ref} className="flex justify-center my-8 w-full overflow-x-auto" />;
};

const markdownComponents = {
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        if (!inline && match && match[1] === 'mermaid') {
            return <Mermaid text={String(children).replace(/\\n$/, '')} />;
        }
        return (
            <code className={`${className} bg-white/10 rounded px-1.5 py-0.5 text-sm`} {...props}>
                {children}
            </code>
        );
    },
    table({ children }) {
        return (
            <div className="overflow-x-auto w-full my-6 rounded-xl border border-white/10">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    {children}
                </table>
            </div>
        );
    },
    th({ children }) {
        return <th className="border-b border-white/20 py-4 px-6 font-semibold text-white bg-white/5">{children}</th>;
    },
    td({ children }) {
        return <td className="border-b border-white/10 py-4 px-6 text-white/80">{children}</td>;
    },
    img({ src, alt }) {
        return <img src={src} alt={alt} className="max-w-full rounded-2xl mx-auto my-6 shadow-2xl border border-white/10" />;
    },
    a({ href, children }) {
        return <a href={href} className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-white/30 transition-colors" target="_blank" rel="noopener noreferrer">{children}</a>;
    }
};

// Helper to extract sections from raw markdown
const extractSection = (markdown, sectionTitles) => {
    // Escape titles for regex validation. sectionTitles can be an array to match variations (e.g. ['Architecture', 'System Architecture'])
    const titles = Array.isArray(sectionTitles) ? sectionTitles : [sectionTitles];

    // We want to match headers (e.g., `## 🏗️ System Architecture`, `# Description`) and extract everything until the next header of the *same or higher* level.
    for (const title of titles) {
        // Find the exact header line containing the title
        const headerRegex = new RegExp(`^(#{1,6})\\s*(?:.*\\s)?${title}[^\\n]*$`, 'im');
        const headerMatch = markdown.match(headerRegex);

        if (headerMatch) {
            const headerLevel = headerMatch[1].length; // e.g., 2 for '##'
            const startIndex = headerMatch.index + headerMatch[0].length;

            // Find the *next* header of the SAME or HIGHER level (fewer or equal #)
            // e.g., if we matched `##`, the next `##` or `#` ends this section.
            const nextHeaderRegex = new RegExp(`^#{1,${headerLevel}}\\s+`, 'gm');
            nextHeaderRegex.lastIndex = startIndex;
            const nextMatch = nextHeaderRegex.exec(markdown);

            const endIndex = nextMatch ? nextMatch.index : markdown.length;
            return markdown.substring(startIndex, endIndex).trim();
        }
    }
    return null;
};

const ProjectDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(() => {
        const searchParams = new URLSearchParams(location.search);
        const tabParam = searchParams.get('tab');
        if (tabParam) {
            if (tabParam.toLowerCase() === 'architecture') return 'Architecture';
            if (tabParam.toLowerCase() === 'workflow') return 'Workflow';
            if (tabParam.toLowerCase() === 'tech stack') return 'Tech Stack';
        }
        return 'Overview';
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tabParam = searchParams.get('tab');
        if (tabParam) {
            if (tabParam.toLowerCase() === 'architecture') setActiveTab('Architecture');
            else if (tabParam.toLowerCase() === 'workflow') setActiveTab('Workflow');
            else if (tabParam.toLowerCase() === 'tech stack') setActiveTab('Tech Stack');
            else setActiveTab('Overview');
        }
    }, [location.search]);

    useEffect(() => {
        const fetchReadme = async () => {
            try {
                setLoading(true);
                // Ensure to fetch from public folder correctly
                const res = await fetch(`/allreadme/${id}.md`);
                if (!res.ok) {
                    throw new Error('Project details not found');
                }
                const text = await res.text();
                setContent(text);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchReadme();
    }, [id]);

    // Parse using varied titles to be flexible
    const description = extractSection(content, ['Introduction', 'Description', 'Overview', 'The Problem Nobody Talks About', 'About', 'Summary']);
    const techStack = extractSection(content, ['Technology Stack', 'Tech Stack', 'Technologies', 'Built With']);
    const workflowDiagrams = extractSection(content, ['Workflows & Request Flow', 'Workflow Diagrams', 'Workflows', 'Data Transformation Pipeline', 'Event Flow & Lifecycle', 'How It Works']);
    const architecture = extractSection(content, ['System Architecture', 'Architecture', 'Architectural Decisions', 'Core Architecture']);

    // If we couldn't parse sections, fallback to raw full markdown
    const isParsed = description || techStack || workflowDiagrams || architecture;

    const tabs = [];
    if (description) tabs.push('Overview');
    if (techStack) tabs.push('Tech Stack');
    if (architecture) tabs.push('Architecture');
    if (workflowDiagrams) tabs.push('Workflow');

    // Make sure activeTab is valid if something is missing
    useEffect(() => {
        if (!loading && !error && tabs.length > 0 && !tabs.includes(activeTab)) {
            setActiveTab(tabs[0]);
        }
    }, [loading, error, tabs.length, activeTab]);

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-background text-white">
                <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-white gap-6">
                <h1 className="text-4xl font-bold text-red-400">Error</h1>
                <p className="text-xl text-gray-300">{error}</p>
                <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
                    <ArrowLeft size={20} /> Back to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-cyan-500/30">
            {/* Subtle Vercel-like grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto pt-24 pb-20 px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-6"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-200 transition-colors w-fit group text-sm font-medium tracking-wide uppercase"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Projects</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white capitalize">
                                {id.replace(/-/g, ' ')}
                            </h1>
                            <p className="text-gray-500 mt-2 text-lg">Project Details & Documentation</p>
                        </div>

                        <div className="flex gap-4">
                            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#111] border border-white/10 hover:bg-[#222] hover:border-white/20 text-sm font-medium transition-all">
                                <Github size={16} /> Repository
                            </a>
                            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black hover:bg-gray-200 text-sm font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                Live Demo <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Tabbed Navigation */}
                {isParsed && tabs.length > 0 && (
                    <div className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 pt-4 mb-8 -mx-6 px-6 md:mx-0 md:px-0">
                        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content Area */}
                <div className="min-h-[50vh]">
                    <AnimatePresence mode="wait">
                        {isParsed ? (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="w-full"
                            >
                                {activeTab === 'Overview' && description && (
                                    <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-semibold prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline">
                                        <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                            {description}
                                        </ReactMarkdown>
                                    </div>
                                )}

                                {activeTab === 'Tech Stack' && techStack && (
                                    <div className="prose prose-invert max-w-none w-full p-8 rounded-2xl bg-[#111] border border-white/10 shadow-2xl">
                                        <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                            {techStack}
                                        </ReactMarkdown>
                                    </div>
                                )}

                                {activeTab === 'Architecture' && architecture && (
                                    <div className="prose prose-invert max-w-none p-8 rounded-2xl bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/10 ring-1 ring-white/5 shadow-2xl">
                                        <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                            {architecture}
                                        </ReactMarkdown>
                                    </div>
                                )}

                                {activeTab === 'Workflow' && workflowDiagrams && (
                                    <div className="prose prose-invert max-w-none rounded-2xl overflow-hidden border border-white/10 bg-[#111] p-2 md:p-6 shadow-2xl [&_img]:w-full [&_img]:rounded-xl [&_img]:m-0">
                                        <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                            {workflowDiagrams}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="unparsed"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="prose prose-invert max-w-none p-8 rounded-2xl bg-[#111] border border-white/10"
                            >
                                <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                    {content}
                                </ReactMarkdown>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
