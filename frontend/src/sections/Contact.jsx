import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isFocused, setIsFocused] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission logic
    };

    return (
        <section id="contact" className="w-full min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 relative z-10">

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    <div>
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
                            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Connect</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                            Have a project in mind or just want to chat about AI and Web3?
                            I'm always open to new opportunities and collaborations.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <ContactItem icon={<Mail />} title="Email" value="hello@vrajesh.dev" />
                        <ContactItem icon={<Phone />} title="Phone" value="+91 98765 43210" />
                        <ContactItem icon={<MapPin />} title="Location" value="Vadodara, India" />
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <InputGroup
                            label="Name"
                            name="name"
                            type="text"
                            value={formState.name}
                            onChange={e => setFormState({ ...formState, name: e.target.value })}
                            isFocused={isFocused === 'name'}
                            onFocus={() => setIsFocused('name')}
                            onBlur={() => setIsFocused('')}
                        />
                        <InputGroup
                            label="Email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={e => setFormState({ ...formState, email: e.target.value })}
                            isFocused={isFocused === 'email'}
                            onFocus={() => setIsFocused('email')}
                            onBlur={() => setIsFocused('')}
                        />
                        <div className="relative group">
                            <label className={`absolute left-0 transition-all duration-300 ${isFocused === 'message' || formState.message ? '-top-6 text-sm text-purple-400' : 'top-0 text-gray-500'}`}>
                                Your Message
                            </label>
                            <textarea
                                name="message"
                                rows="4"
                                value={formState.message}
                                onChange={e => setFormState({ ...formState, message: e.target.value })}
                                onFocus={() => setIsFocused('message')}
                                onBlur={() => setIsFocused('')}
                                className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                        >
                            <Send size={20} /> Send Message
                        </button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
};

const ContactItem = ({ icon, title, value }) => (
    <div className="flex items-center gap-6 group cursor-pointer">
        <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-purple-500/20 transition-colors text-purple-400">
            {icon}
        </div>
        <div>
            <h4 className="text-gray-500 text-sm font-mono uppercase tracking-wider mb-1">{title}</h4>
            <p className="text-xl font-semibold group-hover:text-purple-400 transition-colors">{value}</p>
        </div>
    </div>
);

const InputGroup = ({ label, name, type, value, onChange, isFocused, onFocus, onBlur }) => (
    <div className="relative group">
        <label className={`absolute left-0 transition-all duration-300 ${isFocused || value ? '-top-6 text-sm text-purple-400' : 'top-0 text-gray-500'}`}>
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
        />
        <div className={`absolute bottom-0 left-0 h-[1px] bg-purple-500 transition-all duration-300 ${isFocused ? 'w-full' : 'w-0'}`} />
    </div>
);

export default Contact;
