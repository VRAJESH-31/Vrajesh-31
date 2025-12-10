import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-scroll';
import { Home, User, Code, Briefcase, Mail } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { name: 'Home', icon: <Home size={20} />, to: 'home' },
        { name: 'About', icon: <User size={20} />, to: 'about' },
        { name: 'Skills', icon: <Code size={20} />, to: 'skills' },
        { name: 'Projects', icon: <Briefcase size={20} />, to: 'projects' },
        { name: 'Contact', icon: <Mail size={20} />, to: 'contact' },
    ];

    const mouseX = useMotionValue(Infinity);

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl"
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

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <Link
            to={item.to}
            smooth={true}
            duration={700}
            spy={true}
            hashSpy={true}
            activeClass="!text-white !bg-white/20"
            className="group relative"
        >
            <motion.div
                ref={ref}
                style={{ width }}
                className="aspect-square rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors"
                whileHover={{ y: -5 }}
            >
                <div>{item.icon}</div>
            </motion.div>

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                {item.name}
            </span>
        </Link>
    );
}

export default Navbar;
