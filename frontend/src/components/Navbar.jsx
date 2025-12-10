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

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 px-6 py-3 rounded-full 
                      bg-white/5 backdrop-blur-lg border border-white/10 
                      shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.to}
                        smooth={true}
                        duration={700}
                        spy={true}
                        hashSpy={true}
                        activeClass="bg-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                        className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-white/10 
                       transition-all duration-300 cursor-pointer flex items-center justify-center 
                       group relative"
                    >
                        {item.icon}

                        {/* Tooltip */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 
                             bg-white/10 backdrop-blur-md border border-white/10 
                             px-2 py-1 rounded text-xs text-white opacity-0 
                             group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
