"use client";

import { motion } from "framer-motion";

export default function HybridHero() {
    return (
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-ferrari-red/20 via-deep-black to-blue-600/20" />

            {/* Animated glow orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ferrari-red/20 rounded-full blur-3xl"
            />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-6xl">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-9xl font-orbitron font-bold text-white mb-6 drop-shadow-2xl"
                >
                    HYBRID
                    <br />
                    <span className="text-blue-400">INTELLIGENCE</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="space-y-4"
                >
                    <p className="text-xl md:text-2xl lg:text-3xl font-rajdhani tracking-wider uppercase text-metal-silver">
                        V8 Engine + 3 Electric Motors
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-400" />
                        <p className="text-3xl md:text-5xl font-orbitron font-bold text-blue-400">
                            1000 CV
                        </p>
                        <div className="h-px w-20 bg-gradient-to-l from-transparent to-blue-400" />
                    </div>

                    <p className="text-lg md:text-xl text-metal-silver/80 font-rajdhani">
                        Total System Output
                    </p>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{
                        opacity: { delay: 1, duration: 0.5 },
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-blue-300 font-rajdhani text-sm uppercase tracking-widest">
                        Scroll to Explore
                    </span>
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
}
