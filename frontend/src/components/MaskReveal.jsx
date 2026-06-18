import { motion } from 'framer-motion';

/**
 * MaskReveal — a "wipe up from behind a mask" reveal, the signature
 * typographic effect on text-forward portfolios.
 *
 * The outer span clips (overflow-hidden); the inner span starts shifted
 * fully below the mask and slides up into place when scrolled into view.
 * Inner styling (gradients, flex, mono brackets) is preserved untouched.
 *
 * Uses whileInView (the same trigger the rest of the site relies on) with
 * once:true so the heading settles visible and never re-hides.
 *
 * Usage:
 *   <h2 className="text-6xl font-bold">
 *     <MaskReveal>
 *       <span className="flex items-center gap-3">…</span>
 *     </MaskReveal>
 *   </h2>
 */
const MaskReveal = ({
    children,
    className = '',
    delay = 0,
    duration = 0.9,
}) => (
    // pb gives glyph descenders / gradient text room so they aren't clipped.
    <span className={`block overflow-hidden pb-[0.12em] ${className}`}>
        <motion.span
            className="block will-change-transform"
            initial={{ y: '115%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
        >
            {children}
        </motion.span>
    </span>
);

export default MaskReveal;
