import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-black/50 relative">

            {/* Left: Contact Info */}
            <div className="p-10 md:p-24 flex flex-col justify-between">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-display font-bold mb-8"
                    >
                        Let's <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            Collaborate
                        </span>
                    </motion.h2>
                    <p className="text-gray-400 text-lg max-w-md">
                        Have a project in mind or just want to chat about AI and Web Dev?
                        I'm always open to new ideas and opportunities.
                    </p>
                </div>

                <div className="space-y-6 mt-12">
                    <a href="mailto:npandyavrajesh31@gmail.com" className="flex items-center gap-4 text-xl hover:text-accent transition-colors group">
                        <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                            <Mail size={24} />
                        </div>
                        npandyavrajesh31@gmail.com
                    </a>
                    <a href="tel:+919327220321" className="flex items-center gap-4 text-xl hover:text-accent transition-colors group">
                        <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                            <Phone size={24} />
                        </div>
                        +91 93272 20321
                    </a>
                </div>

                <div className="flex gap-6 mt-12">
                    <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:text-accent transition-all hover:-translate-y-1">
                        <Github size={24} />
                    </a>
                    <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:text-accent transition-all hover:-translate-y-1">
                        <Linkedin size={24} />
                    </a>
                </div>

                <footer className="mt-24 text-gray-500 text-sm">
                    © {new Date().getFullYear()} Vrajesh Pandya. Built with React & Three.js.
                </footer>
            </div>

            {/* Right: Form */}
            <div className="bg-white/5 p-10 md:p-24 flex items-center">
                <form className="w-full space-y-8">
                    <div className="relative group">
                        <input
                            type="text"
                            id="name"
                            required
                            className="w-full bg-transparent border-b border-gray-700 py-4 text-white text-lg focus:outline-none focus:border-purple-500 transition-colors peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-0 top-4 text-gray-500 transition-all duration-300 pointer-events-none 
                                     peer-focus:-top-6 peer-focus:text-sm peer-focus:text-purple-500
                                     peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-purple-500"
                        >
                            Your Name
                        </label>
                    </div>

                    <div className="relative group">
                        <input
                            type="email"
                            id="email"
                            required
                            className="w-full bg-transparent border-b border-gray-700 py-4 text-white text-lg focus:outline-none focus:border-purple-500 transition-colors peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-0 top-4 text-gray-500 transition-all duration-300 pointer-events-none 
                                     peer-focus:-top-6 peer-focus:text-sm peer-focus:text-purple-500
                                     peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-purple-500"
                        >
                            Email Address
                        </label>
                    </div>

                    <div className="relative group">
                        <textarea
                            id="message"
                            rows="4"
                            required
                            className="w-full bg-transparent border-b border-gray-700 py-4 text-white text-lg focus:outline-none focus:border-purple-500 transition-colors resize-none peer"
                            placeholder=" "
                        ></textarea>
                        <label
                            htmlFor="message"
                            className="absolute left-0 top-4 text-gray-500 transition-all duration-300 pointer-events-none 
                                     peer-focus:-top-6 peer-focus:text-sm peer-focus:text-purple-500
                                     peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-purple-500"
                        >
                            Your Message
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-purple-500 hover:text-white transition-all duration-300"
                    >
                        Send Message <Send size={18} />
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
