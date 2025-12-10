const Footer = () => {
    return (
        <footer className="w-full py-8 text-center bg-black border-t border-white/5 text-gray-500 font-mono text-sm relative z-10">
            <p>&copy; {new Date().getFullYear()} Vrajesh Pandya. Crafted with <span className="text-red-500">♥</span> and React.</p>
        </footer>
    );
};

export default Footer;
