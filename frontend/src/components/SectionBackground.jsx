const SectionBackground = ({ children, className = "" }) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Background gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]" />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default SectionBackground;
