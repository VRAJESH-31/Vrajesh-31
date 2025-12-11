import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-scroll';
import { Home, User, Code, Briefcase, Mail } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { name: 'Home', icon: <Home size={22} />, to: 'home' },
        { name: 'About', icon: <User size={22} />, to: 'about' },
        { name: 'Skills', icon: <Code size={22} />, to: 'skills' },
        { name: 'Projects', icon: <Briefcase size={22} />, to: 'projects' },
        { name: 'Contact', icon: <Mail size={22} />, to: 'contact' },
    ];

    const mouseX = useMotionValue(Infinity);

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-end gap-3 px-4 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl h-16"
            >
                {navItems.map((item) => (
                    <DockIcon key={item.name} mouseX={mouseX} item={item} />
                ))}
            </motion.div>
        </div>
    );
};

function DockIcon({ mouseX, item }) {
    const ref = useRef(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Mac Dock Scaling Logic
    // Base width: 45px. Max width: 80px. Range of influence: 150px.
    const widthSync = useTransform(distance, [-150, 0, 150], [45, 80, 45]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <Link
            to={item.to}
            smooth={true}
            duration={700}
            spy={true}
            hashSpy={true}
            activeClass="" // Removed activeClass from Link to handle styling inside motion.div manually if needed, or rely on visual size
            className="group relative flex flex-col items-center"
        >
            <motion.div
                ref={ref}
                style={{ width, height: width }}
                className="rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer transition-colors shadow-lg"
            >
                {/* Scale icon based on container width implies manual scaling or just centering */}
                {/* Since width changes, the centered icon remains 'standard' size unless we scale it too. 
                    Standard Mac dock just scales the container. We can scale icon slightly if desired. */}
                <div>{item.icon}</div>
            </motion.div>

            {/* Tooltip */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 duration-200">
                {item.name}
            </span>
        </Link>
    );
}

export default Navbar;
