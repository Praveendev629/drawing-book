import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [preview, setPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
            // Auto-fill name from file name (without extension) if empty
            if (!name) {
                setName(selected.name.replace(/\.[^/.]+$/, ""));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !name) return;

        setIsUploading(true);
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        onUpload({ file, name });

        // Reset
        setIsUploading(false);
        setFile(null);
        setName('');
        setPreview(null);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-[#1a1a2e] w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-white font-serif tracking-widest text-lg">NEW MASTERPIECE</h3>
                            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Image Preview / Input */}
                            <div className="relative group cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                                />
                                <div className={`
                  border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all
                  ${preview ? 'border-purple-500/50 bg-purple-500/5' : 'border-white/20 hover:border-white/40 hover:bg-white/5'}
                `}>
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="max-h-48 rounded shadow-lg mb-2" />
                                    ) : (
                                        <>
                                            <FaCloudUploadAlt className="text-4xl text-white/50 mb-3" />
                                            <p className="text-sm text-white/70">Tap to upload artwork</p>
                                            <p className="text-xs text-white/30 mt-1">PNG, JPG up to 10MB</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-xs text-white/50 uppercase tracking-wider block">Artwork Title</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Sunset Serenity"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-colors"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={!file || !name || isUploading}
                                    className={`
                    w-full py-3 rounded-lg font-medium tracking-wide transition-all
                    ${!file || !name
                                            ? 'bg-white/10 text-white/30 cursor-not-allowed'
                                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 shadow-lg hover:shadow-purple-500/20'}
                  `}
                                >
                                    {isUploading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                            PUBLISHING...
                                        </span>
                                    ) : 'PUBLISH TO GALLERY'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UploadModal;
