import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaArrowRight } from 'react-icons/fa';

const PasswordGate = ({ onUnlock }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'L.K art') {
            setIsUnlocked(true);
            setTimeout(() => {
                onUnlock();
            }, 1000); // Wait for exit animation
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <AnimatePresence>
            {!isUnlocked && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white overflow-hidden"
                    style={{
                        background: 'radial-gradient(circle at center, #1a1a2e 0%, #000000 100%)',
                        zIndex: 50
                    }}
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-center p-8 max-w-md w-full"
                    >
                        <motion.div
                            className="mb-8 flex justify-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <div className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                <FaLock className="text-3xl text-white/80" />
                            </div>
                        </motion.div>

                        <h1 className="text-3xl font-light tracking-[0.2em] mb-2 text-white/90 font-serif">
                            ARCHIVE
                        </h1>
                        <p className="text-xs tracking-[0.3em] text-white/40 mb-12 uppercase">
                            Restricted Access
                        </p>

                        <form onSubmit={handleSubmit} className="relative">
                            <motion.div
                                animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
                                transition={{ duration: 0.4 }}
                            >
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Passkey"
                                    className="w-full bg-transparent border-b border-white/20 py-3 px-4 text-center text-xl tracking-widest focus:outline-none focus:border-white/60 transition-colors placeholder:text-white/20 placeholder:tracking-normal font-light"
                                    autoFocus
                                />
                            </motion.div>

                            <AnimatePresence>
                                {password.length > 0 && (
                                    <motion.button
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        type="submit"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-white transition-colors"
                                    >
                                        <FaArrowRight />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </form>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: error ? 1 : 0 }}
                            className="mt-4 text-xs text-red-400 tracking-widest uppercase"
                        >
                            Access Denied
                        </motion.p>
                    </motion.div>

                    <div className="absolute bottom-10 left-0 w-full text-center">
                        <p className="text-[10px] text-white/20 tracking-[0.2em]">
                            SECURE ENVIRONMENT v1.0
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PasswordGate;
