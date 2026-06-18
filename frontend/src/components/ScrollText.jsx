import { Children, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollText — word-by-word scroll reveal.
 *
 * Each word fades from dim (0.2) to full (1) as the paragraph scrolls
 * through the viewport, the classic "reading reveal" effect. Because the
 * resting state of every word is opacity 0.2 (never 0), the text is always
 * legible even if the scroll math doesn't fire — visible by default.
 *
 * Preserves inline markup: string children are split into words; element
 * children (e.g. highlighted <span>s) are kept intact and revealed as one
 * token, so existing colors/highlights are untouched.
 *
 * Usage:
 *   <ScrollText className="text-2xl ...">
 *     plain text <span className="text-white">highlight</span> more text
 *   </ScrollText>
 */

const Word = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0.2, 1]);
    return (
        <motion.span style={{ opacity }} className="inline-block whitespace-pre">
            {children}
        </motion.span>
    );
};

// Flatten children into an ordered list of word/element tokens.
const tokenize = (children) => {
    const tokens = [];
    Children.forEach(children, (child) => {
        if (typeof child === 'string') {
            child.split(/(\s+)/).forEach((part) => {
                if (part.length) tokens.push(part);
            });
        } else if (child != null && child !== false) {
            tokens.push(child);
        }
    });
    return tokens;
};

const ScrollText = ({ children, className = '', as: Tag = 'p' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.85', 'end 0.45'],
    });

    const tokens = tokenize(children);
    const count = tokens.length;

    return (
        <Tag ref={ref} className={className}>
            {tokens.map((token, i) => {
                const start = i / count;
                const end = start + 1 / count;
                // Whitespace tokens still animate so spacing reveals in sync.
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {token}
                    </Word>
                );
            })}
        </Tag>
    );
};

export default ScrollText;
