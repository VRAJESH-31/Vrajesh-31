import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle, Loader2, MessageCircle, Copy, Check, TerminalSquare } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import SectionBackground from '../components/SectionBackground';

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
        <SectionBackground className="w-full min-h-screen flex items-center justify-center px-6 pt-12 md:pt-16 pb-20 bg-[#050505]">
            <section id="contact" className="w-full h-full relative">

                {/* Minimalist Grid and Accent */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-purple-500/10 to-transparent pointer-events-none z-0" />

                <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 relative z-10">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12 flex flex-col justify-center"
                    >
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#111] border border-white/10 text-xs font-mono text-cyan-400">
                                <TerminalSquare className="w-3.5 h-3.5" />
                                LET'S TALK
                            </div>
                            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
                                Get In <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                    Touch
                                </span>
                            </h2>

                            <div className="h-[2px] w-16 bg-gradient-to-r from-purple-500 to-cyan-500" />

                            <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed font-sans pt-4">
                                Feel free to reach out for collaborations, opportunities, or just to say hi!
                            </p>
                        </div>

                        <div className="space-y-6">
                            <ContactItem
                                icon={<Mail size={20} />}
                                title="Email"
                                value="npandyavrajesh31@gmail.com"
                                link="mailto:npandyavrajesh31@gmail.com?subject=Let's Connect"
                            />
                            <ContactItem
                                icon={<Phone size={20} />}
                                title="Phone"
                                value="+91 93272 20321"
                            />
                            <ContactItem
                                icon={<MapPin size={20} />}
                                title="Location"
                                value="Vadodara, India"
                            />
                        </div>
                    </motion.div>

                    {/* Interactive Contact Form */}
                    <div className="relative flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {status === 'sent' ? (
                                <motion.div
                                    key="success"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="bg-[#0a0a0a] border border-cyan-500/30 p-12 rounded-sm flex flex-col items-center justify-center text-center aspect-square max-w-md shadow-[0_0_30px_rgba(6,182,212,0.1)] w-full"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                        className="mb-6 text-cyan-400"
                                    >
                                        <CheckCircle size={48} />
                                    </motion.div>
                                    <h3 className="text-xl font-mono text-white mb-2">MESSAGE SENT!</h3>
                                    <p className="text-gray-400 font-mono text-sm">I will get back to you shortly.</p>
                                    <button
                                        onClick={() => {
                                            setFormState({ name: '', email: '', message: '' });
                                            setStatus('idle');
                                        }}
                                        className="mt-8 px-6 py-2 border border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-sm text-sm font-mono text-gray-400 transition-colors uppercase tracking-widest"
                                    >
                                        [ SEND ANOTHER ]
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.5, ease: "anticipate" } }}
                                    className="w-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-sm relative group shadow-2xl"
                                >
                                    {/* Form Container */}
                                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                        {/* Terminal Header for Form */}
                                        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-sm bg-purple-500 animate-pulse" />
                                                <span className="text-xs font-mono text-gray-500 tracking-widest">CONTACT_FORM</span>
                                            </div>
                                        </div>

                                        <FloatingInput
                                            label="your_name"
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
                                            label="your_email"
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
                                            label="your_message"
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

                                        <div className="pt-8 flex justify-end">
                                            <CyberTransmitButton isSending={status === 'sending'} />
                                        </div>
                                    </form>

                                    {/* Corner Accents */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30 pointer-events-none" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30 pointer-events-none" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </section>
        </SectionBackground>
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
            <div className="p-3 bg-[#111] rounded-sm group-hover:bg-cyan-500/10 transition-colors text-cyan-400 border border-white/5 group-hover:border-cyan-500/30">
                {icon}
            </div>
            <div>
                <h4 className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-1">{'//'} {title}</h4>
                <p className="text-lg font-mono text-gray-200 group-hover:text-cyan-400 transition-colors tracking-tight">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="flex items-center justify-between group p-3 rounded-sm transition-all bg-[#0a0a0a] border border-transparent hover:border-white/10 hover:shadow-lg">
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
                className="p-3 text-gray-500 hover:text-cyan-400 bg-transparent rounded-sm transition-all hover:bg-cyan-500/10"
                title="Copy to clipboard"
            >
                {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
            </button>
        </div>
    );
};

const FloatingInput = ({ label, name, type, value, onChange, isFocused, onFocus, onBlur, disabled, delay }) => {
    return (
        <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
            className="relative w-full"
        >
            <div className="relative group w-full flex flex-col pt-6">
                <label className={`absolute left-0 transition-all duration-300 font-mono text-sm pointer-events-none flex items-center gap-2 ${isFocused || value ? 'top-0 text-cyan-400' : 'top-8 text-gray-500'}`}>
                    <span className="text-purple-500">❯</span> {label}
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
                        className="w-full bg-[#111] border border-white/10 p-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-500/50 transition-colors resize-none relative z-10 rounded-sm"
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
                        className="w-full bg-[#111] border border-white/10 px-3 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-500/50 transition-colors relative z-10 rounded-sm"
                    />
                )}
            </div>
        </motion.div>
    );
};

const CyberTransmitButton = ({ isSending }) => {
    return (
        <motion.button
            type="submit"
            disabled={isSending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
                relative px-8 py-3 rounded-sm flex items-center justify-center gap-3
                transition-all duration-300 outline-none font-mono text-sm font-bold tracking-widest uppercase
                ${isSending
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/50 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'}
            `}
        >
            {isSending ? (
                <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Sending...</span>
                </>
            ) : (
                <>
                    <span>Send Message</span>
                    <Send size={16} className="relative z-10" />
                </>
            )}

            {/* Edge Accents */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-transparent group-hover:border-black pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-transparent group-hover:border-black pointer-events-none" />
        </motion.button>
    );
};

export default Contact;
