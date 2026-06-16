import { motion } from 'framer-motion';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Experience from '../sections/Experience';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import Reveal from '../components/Reveal';
import { pageMorph } from '../lib/motion';

const Home = () => {
    return (
        <motion.div
            className="w-full"
            initial={pageMorph.initial}
            animate={pageMorph.animate}
            exit={pageMorph.exit}
        >
            {/* Hero animates on mount itself, so it's left un-wrapped */}
            <Hero />

            {/* Each section gets the same calm "morph in" as it scrolls into view.
                - Sections with a 3D <canvas> (Experience, Skills) opt out of the
                  blur filter to keep WebGL smooth.
                - `once` so the reveal settles and never re-triggers.
                - PROJECTS IS DELIBERATELY NOT WRAPPED: it uses GSAP ScrollTrigger
                  pinning (position:fixed), which a transform-ed ancestor would
                  break (it would make the whole project area collapse). It already
                  has its own header reveal + the horizontal scroll as its motion. */}
            {/* About drives its own strong bento morph, so it isn't wrapped */}
            <About />
            <Reveal as="div" once blur={0}><Experience /></Reveal>
            <Reveal as="div" once blur={0}><Skills /></Reveal>
            <Projects />
            <Reveal as="div" once><Contact /></Reveal>
        </motion.div>
    );
};

export default Home;
