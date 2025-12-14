import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle, Loader2, MessageCircle, Copy, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isFocused, setIsFocused] = useState('');
    const [status, setStatus] = useState('idle'); // idle, sending, sent

    const handleSubmit = (e) => {
        e.preventDefault();

        // Auto-send logic (WhatsApp only)
        const messageText = `Hello Vrajesh,\n\nI am ${formState.name}.\n\n${formState.message}\n\nMy Email: ${formState.email}`;
        const whatsappLink = `https://wa.me/919327220321?text=${encodeURIComponent(messageText)}`;

        // Trigger WhatsApp
        window.open(whatsappLink, '_blank');

        setStatus('sending');

        // Sucking animation duration
        setTimeout(() => {
            setStatus('sent');
        }, 2000);
    };

    return (
        <section id="contact" className="w-full min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 relative z-10">

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12 flex flex-col justify-center"
                >
                    <div>
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
                            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Connect</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                            Have a project in mind or just want to chat about AI and Web?
                            I'm always open to new opportunities and collaborations.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <ContactItem
                            icon={<Mail />}
                            title="Email"
                            value="npandyavrajesh31@gmail.com"
                            link="mailto:npandyavrajesh31@gmail.com?subject=Let's Connect"
                        />
                        <ContactItem icon={<Phone />} title="Phone" value="+91 93272 20321" />
                        <ContactItem icon={<MapPin />} title="Location" value="Vadodara, India" />
                    </div>
                </motion.div>

                {/* Interactive Contact Form */}
                <div className="relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {status === 'sent' ? (
                            <motion.div
                                key="success"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-full flex flex-col items-center justify-center text-center aspect-square max-w-md"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1.2, rotate: 360 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="mb-4 text-green-400"
                                >
                                    <CheckCircle size={64} />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-2">Thank you for connecting with me</h3>
                                <p className="text-gray-400">I'll get back to you soon.</p>
                                <button
                                    onClick={() => {
                                        setFormState({ name: '', email: '', message: '' });
                                        setStatus('idle');
                                    }}
                                    className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white/70 transition-colors"
                                >
                                    Send Another Signal
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ scale: 0, opacity: 0, rotate: 720, transition: { duration: 1.5, ease: "anticipate" } }}
                                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden group"
                            >
                                {/* Form Container */}
                                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                    <FloatingInput
                                        label="Name"
                                        name="name"
                                        type="text"
                                        value={formState.name}
                                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                                        isFocused={isFocused === 'name'}
                                        onFocus={() => setIsFocused('name')}
                                        onBlur={() => setIsFocused('')}
                                        disabled={status === 'sending'}
                                        delay={0}
                                    />
                                    <FloatingInput
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formState.email}
                                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                                        isFocused={isFocused === 'email'}
                                        onFocus={() => setIsFocused('email')}
                                        onBlur={() => setIsFocused('')}
                                        disabled={status === 'sending'}
                                        delay={0.1}
                                    />
                                    <FloatingInput
                                        label="Message"
                                        name="message"
                                        type="textarea"
                                        value={formState.message}
                                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                                        isFocused={isFocused === 'message'}
                                        onFocus={() => setIsFocused('message')}
                                        onBlur={() => setIsFocused('')}
                                        disabled={status === 'sending'}
                                        delay={0.2}
                                    />

                                    <div className="pt-4 flex justify-end">
                                        <BlackHoleButton isSending={status === 'sending'} />
                                    </div>
                                </form>

                                {/* Background noise/grain for the form card */}
                                <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

const ContactItem = ({ icon, title, value, link }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const content = (
        <div className="flex items-center gap-6 flex-1 relative">
            <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-purple-500/20 transition-colors text-purple-400 border border-white/5 group-hover:border-purple-500/30">
                {icon}
            </div>
            <div>
                <h4 className="text-gray-500 text-sm font-mono uppercase tracking-wider mb-1">{title}</h4>
                <p className="text-xl font-semibold group-hover:text-purple-400 transition-colors">{value}</p>
            </div>

            {/* Tooltip for Linkable Items */}
            {link && (
                <div className="absolute -top-10 left-10 px-3 py-1 bg-purple-500 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                    Click to Connect
                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rotate-45" />
                </div>
            )}
        </div>
    );

    return (
        <div className="flex items-center justify-between group p-2 rounded-2xl transition-all hover:bg-white/5 hover:pr-4">
            {link ? (
                <a
                    href={link}
                    target={link.startsWith('http') ? "_blank" : undefined}
                    rel={link.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="flex-1 cursor-pointer"
                >
                    {content}
                </a>
            ) : (
                <div className="flex-1">
                    {content}
                </div>
            )}

            <button
                onClick={handleCopy}
                className="p-3 text-gray-500 hover:text-white hover:bg-white/10 rounded-xl transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                title="Copy to clipboard"
            >
                {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
            </button>
        </div>
    );
};

const FloatingInput = ({ label, name, type, value, onChange, isFocused, onFocus, onBlur, disabled, delay }) => {
    return (
        <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
            className="relative"
        >
            <div className="relative group">
                <label className={`absolute left-0 transition-all duration-300 ${isFocused || value ? '-top-6 text-sm text-purple-400' : 'top-0 text-gray-500'}`}>
                    {label}
                </label>

                {type === 'textarea' ? (
                    <textarea
                        name={name}
                        rows="4"
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        disabled={disabled}
                        className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none relative z-10"
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        disabled={disabled}
                        className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors relative z-10"
                    />
                )}

                {/* Active Line Animation */}
                <div className={`absolute bottom-0 left-0 h-[1px] bg-purple-500 transition-all duration-300 ${isFocused ? 'w-full shadow-[0_0_10px_#a855f7]' : 'w-0'}`} />

                {/* Particle Dust Effect on Focus */}
                <AnimatePresence>
                    {isFocused && <ParticleDust />}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const ParticleDust = () => {
    // Generate random particles
    const particles = Array.from({ length: 8 });

    return (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, Math.random() * 1.5, 0],
                        x: (Math.random() - 0.5) * 100, // Random float direction
                        y: (Math.random() - 0.5) * 60
                    }}
                    transition={{
                        duration: 1 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 0.5
                    }}
                    className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-300 rounded-full blur-[1px]"
                />
            ))}
        </div>
    );
};

const BlackHoleButton = ({ isSending }) => {
    return (
        <motion.button
            type="submit"
            disabled={isSending}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
                relative w-16 h-16 rounded-full flex items-center justify-center 
                transition-all duration-500 outline-none
                ${isSending ? 'scale-[2] rotate-[360deg]' : 'hover:shadow-[0_0_30px_#9333ea]'}
            `}
        >
            {isSending ? (
                // Black Hole Active State
                <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-black rounded-full z-20" />
                    {/* Swirling accretion disk */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600 via-transparent to-cyan-500 blur-md opacity-80 z-10"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-30 text-white/50">
                        <Loader2 className="animate-spin" size={20} />
                    </div>
                </div>
            ) : (
                // Normal "Portal" State
                <div className="w-full h-full relative bg-black/40 backdrop-blur-md rounded-full border border-purple-500/50 flex items-center justify-center group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Send size={24} className="text-white relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                    {/* Subtle idle swirls */}
                    <div className="absolute -inset-8 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent rotate-45 group-hover:animate-pulse" />
                </div>
            )}

            {/* Label, only visible when not interacting violently */}
            {!isSending && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-mono tracking-widest whitespace-nowrap opacity-50">
                    TRANSMIT
                </span>
            )}
        </motion.button>
    );
};

export default Contact;
