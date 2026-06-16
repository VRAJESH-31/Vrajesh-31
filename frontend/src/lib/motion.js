// Shared motion language for the whole app.
// One easing + a few variants so every section appears the same calm way.

// Smooth "out-expo"-style ease — feels like things settle into place.
export const EASE = [0.22, 1, 0.36, 1];

// Standard fade-up + de-blur reveal (the "morph in" feel).
export const fadeUp = {
    hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: EASE },
    },
};

// Container that staggers its direct children (use with `staggerItem`).
export const staggerContainer = (stagger = 0.12, delay = 0) => ({
    hidden: {},
    show: {
        transition: { staggerChildren: stagger, delayChildren: delay },
    },
});

export const staggerItem = {
    hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: EASE },
    },
};

// Page-to-page morph transition (used by route changes).
// IMPORTANT: opacity ONLY — no transform/scale/blur.
// The page contains GSAP ScrollTrigger pinning (Projects) and position:sticky
// (ProjectDetails tabs). A `transform` or `filter` on an ancestor creates a
// containing block that breaks `position: fixed`/`sticky` inside it, which made
// the whole Projects area collapse. Opacity does not create that containing
// block, so it's the only page-level property safe to animate here.
export const pageMorph = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.5, ease: EASE },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.35, ease: EASE },
    },
};
