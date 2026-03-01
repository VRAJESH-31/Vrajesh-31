import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Home, User, Code, Briefcase, FolderOpen, Mail } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { name: 'Home', icon: <Home size={20} />, to: 'home' },
        { name: 'About', icon: <User size={20} />, to: 'about' },
        { name: 'Experience', icon: <Briefcase size={20} />, to: 'experience' },
        { name: 'Skills', icon: <Code size={20} />, to: 'skills' },
        { name: 'Projects', icon: <FolderOpen size={20} />, to: 'projects' },
        { name: 'Contact', icon: <Mail size={20} />, to: 'contact' },
    ];

    return (
        <div className="fixed bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-50">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex items-center gap-1.5 md:gap-2 px-3 py-2.5 bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-full relative"
            >
                {navItems.map((item) => (
                    <DockIcon key={item.name} item={item} />
                ))}
            </motion.div>
        </div>
    );
};

function DockIcon({ item }) {
    return (
        <Link
            to={item.to}
            smooth={true}
            duration={700}
            activeClass="active-nav-item text-white"
            spy={true}
            className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer overflow-hidden"
        >
            {/* Active Background Glow */}
            <div className="absolute inset-0 bg-transparent group-[.active-nav-item]:bg-white/10 transition-colors duration-300" />

            {/* Icon Wrapper for click effect */}
            <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 group-active:scale-95">
                {item.icon}
            </div>

            {/* Active Indicator Dot */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-[.active-nav-item]:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />

            {/* Floating Tooltip */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#111] text-gray-200 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl whitespace-nowrap pointer-events-none translate-y-2 group-hover:-translate-y-1 border border-white/5 backdrop-blur-md">
                {item.name}
                {/* Tooltip Triangle */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111] border-b border-r border-white/5 rotate-45" />
            </span>
        </Link>
    );
}

export default Navbar;
