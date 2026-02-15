import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaTrash } from 'react-icons/fa';

const GalleryView = ({ isOpen, onClose, images, onDelete, onDownload }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed inset-0 z-50 bg-[#0f0f13] flex flex-col p-6 overflow-hidden"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl text-white font-serif tracking-widest">GALLERY VIEW</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
                        {images.map((img) => (
                            <motion.div
                                key={img.id}
                                layoutId={`img-${img.id}`}
                                className="relative group rounded-xl overflow-hidden bg-white/5 aspect-square border border-white/5"
                            >
                                <img
                                    src={img.url}
                                    alt={img.name}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                    <p className="text-white font-medium truncate">{img.name}</p>
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => onDownload(img)}
                                            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm flex-1 flex items-center justify-center gap-2"
                                        >
                                            <FaDownload size={12} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(img.id)}
                                            className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-200 text-sm flex items-center justify-center"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GalleryView;
