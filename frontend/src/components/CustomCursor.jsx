import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [guideText, setGuideText] = useState('');
    const latestMousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const mouseMove = (e) => {
            latestMousePos.current = { x: e.clientX, y: e.clientY };
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }

            // Find data-guide from the hovered element or its closest ancestor
            const guideEl = e.target.closest('[data-guide]');
            if (guideEl) {
                setGuideText(guideEl.getAttribute('data-guide'));
            } else {
                setGuideText('');
            }
        };

        const handleScroll = () => {
            // Find element currently under the mouse position on scroll
            const el = document.elementFromPoint(latestMousePos.current.x, latestMousePos.current.y);
            if (el) {
                const guideEl = el.closest('[data-guide]');
                if (guideEl) {
                    setGuideText(guideEl.getAttribute('data-guide'));
                } else {
                    setGuideText('');
                }
            }
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            height: 16,
            width: 16,
            backgroundColor: "rgba(255, 255, 255, 1)",
            mixBlendMode: "difference"
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            height: 64,
            width: 64,
            backgroundColor: "rgba(255, 255, 255, 1)",
            mixBlendMode: "difference"
        }
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            />

            <AnimatePresence>
                {guideText && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 15 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed pointer-events-none z-[9998] hidden md:block"
                        style={{
                            left: mousePosition.x + 22,
                            top: mousePosition.y - 48,
                        }}
                    >
                        <div className="bg-black/95 backdrop-blur-xl border border-white/15 rounded-xl px-4 py-3 text-xs text-white max-w-[280px] shadow-2xl flex flex-col gap-1 relative font-sans">
                            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r bg-gradient-to-b from-purple-500 to-cyan-400" />
                            <div className="pl-2 font-mono text-[9px] uppercase tracking-widest text-purple-400 font-bold">Guide</div>
                            <div className="pl-2 leading-relaxed text-gray-200 text-[11px] font-medium">{guideText}</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CustomCursor;
