import { motion } from 'framer-motion';

/**
 * MaskReveal — a "wipe up from behind a mask" reveal, the signature
 * typographic effect on text-forward portfolios.
 *
 * Uses nested Framer Motion animation: the parent span triggers the
 * in-viewport check in normal document flow, propagating the state
 * to the hidden child span which slides up into place.
 */

const parentVariants = {
    hidden: {},
    visible: {}
};

const childVariants = {
    hidden: { y: '115%' },
    visible: { y: '0%' }
};

const MaskReveal = ({
    children,
    className = '',
    delay = 0,
    duration = 0.9,
}) => (
    <motion.span
        className={`block overflow-hidden pb-[0.12em] ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={parentVariants}
    >
        <motion.span
            className="block will-change-transform"
            variants={childVariants}
            transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
        >
            {children}
        </motion.span>
    </motion.span>
);

export default MaskReveal;
