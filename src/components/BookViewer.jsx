import React, { useState, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';
import { FaPlus, FaTh } from 'react-icons/fa';

// Page Component
const Page = forwardRef((props, ref) => {
    return (
        <div className="page bg-white shadow-inner h-full w-full relative overflow-hidden" ref={ref}>
            <div className="h-full w-full p-4 flex flex-col items-center justify-center border-r border-gray-200" style={{ background: '#fdfaf7' }}>
                {/* Paper texture overlay could go here */}
                <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

                {props.children}

                <div className="absolute bottom-4 text-xs text-gray-400 font-serif tracking-widest uppercase">
                    {props.pageNumber}
                </div>
            </div>
        </div>
    );
});

const BookViewer = ({ images, onOpenUpload, onOpenGallery }) => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#1a1a2e] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[100px]"></div>
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[100px]"></div>
            </div>

            <div className="z-10 relative">
                <HTMLFlipBook
                    width={400}
                    height={600}
                    size="stretch"
                    minWidth={300}
                    maxWidth={500}
                    minHeight={400}
                    maxHeight={700}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    className="shadow-2xl"
                >
                    {/* Cover Page */}
                    <Page pageNumber="Cover">
                        <div className="text-center">
                            <h1 className="text-4xl font-serif text-gray-800 mb-2 tracking-widest">SKETCH</h1>
                            <div className="w-16 h-1 bg-gray-800 mx-auto mb-4"></div>
                            <p className="text-sm text-gray-500 uppercase tracking-[0.3em]">Collection 2026</p>
                        </div>
                    </Page>

                    {/* Dynamic Image Pages */}
                    {images.map((img, index) => (
                        <Page key={img.id} pageNumber={index + 1}>
                            <div className="w-full h-[70%] flex items-center justify-center p-2 relative group">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="relative p-2 bg-white shadow-lg rotate-1 transition-transform duration-300 group-hover:rotate-0"
                                >
                                    <img
                                        src={img.url}
                                        alt={img.name}
                                        className="max-h-full max-w-full object-contain block border border-gray-100"
                                    />
                                    {/* Tape effect */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-100/50 rotate-[-2deg] backdrop-blur-[1px] shadow-sm"></div>
                                </motion.div>
                            </div>
                            <div className="mt-6 text-center">
                                <h3 className="font-handwriting text-xl text-gray-700 font-cursive" style={{ fontFamily: 'cursive' }}>
                                    {img.name}
                                </h3>
                            </div>
                        </Page>
                    ))}

                    {/* End Page */}
                    <Page pageNumber="End">
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <p className="tracking-widest uppercase text-xs">Fin</p>
                        </div>
                    </Page>
                </HTMLFlipBook>
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 right-8 flex gap-4 z-20">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onOpenGallery}
                    className="p-4 bg-white/10 backdrop-blur-md text-white rounded-full shadow-lg hover:bg-white/20 transition-colors border border-white/10"
                    title="View Gallery"
                >
                    <FaTh />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onOpenUpload}
                    className="p-4 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-200 transition-colors"
                    title="Add New Art"
                >
                    <FaPlus />
                </motion.button>
            </div>
        </div>
    );
};

export default BookViewer;
