import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';

/**
 * Reveal — a tiny reusable scroll-in animation wrapper.
 * Children fade up + de-blur ("morph in") when they enter the viewport.
 *
 * Usage:
 *   <Reveal>...</Reveal>
 *   <Reveal delay={0.15} y={40}>...</Reveal>
 *   <Reveal as="section">...</Reveal>
 */
const Reveal = ({
    children,
    className = '',
    delay = 0,
    y = 28,
    blur = 8,
    duration = 0.8,
    once = false,
    amount = 0.2,
    as = 'div',
    ...rest
}) => {
    const MotionTag = motion[as] || motion.div;

    // Skip the blur filter when blur === 0. A `filter` on a wrapper that
    // contains a WebGL <canvas> forces an expensive compositing layer, so
    // sections with 3D should opt out by passing blur={0}.
    const hidden = blur > 0 ? { opacity: 0, y, filter: `blur(${blur}px)` } : { opacity: 0, y };
    const shown = blur > 0 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 1, y: 0 };

    return (
        <MotionTag
            className={className}
            initial={hidden}
            whileInView={shown}
            viewport={{ once, amount }}
            transition={{ duration, ease: EASE, delay }}
            {...rest}
        >
            {children}
        </MotionTag>
    );
};

export default Reveal;
