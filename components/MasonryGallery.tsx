'use client';

import { motion } from 'framer-motion';
import FlipCard from './FlipCard';
import { galleryImages } from '@/data/ferrariData';

export default function MasonryGallery() {
    // Animation variants for staggered entrance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
        },
    };

    return (
        <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient orbs */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-ferrari-red/5 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-20 w-80 h-80 bg-racing-red/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-center mb-16 mt-20"
                >
                    <h1 className="font-orbitron text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                        <span className="text-gradient-red">Gallery</span>
                    </h1>
                    <p className="text-metal-silver text-lg sm:text-xl max-w-2xl mx-auto font-rajdhani">
                        Explore the stunning design and engineering excellence of the Ferrari SF90 Stradale.
                        <br />
                        <span className="text-ferrari-red/80 text-base">
                            Hover or tap each image to discover fascinating Ferrari facts.
                        </span>
                    </p>
                </motion.div>

                {/* Pinterest-Style Masonry Grid using CSS Columns */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5 lg:gap-3 space-y-4 md:space-y-5 lg:space-y-3"
                >
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            variants={itemVariants}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="break-inside-avoid mb-4 md:mb-5 lg:mb-3"
                            style={{ display: 'inline-block', width: '100%' }}
                        >
                            <FlipCard
                                src={image.src}
                                alt={image.alt}
                                aspectRatio={image.aspectRatio}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom decorative element */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-20 h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-ferrari-red/50 to-transparent"
                />
            </div>
        </section>
    );
}
