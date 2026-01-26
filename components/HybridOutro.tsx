"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HybridOutro() {
    return (
        <div className="text-center px-4 max-w-4xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6 md:mb-8"
            >
                Electric Precision.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Ferrari Emotion.
                </span>
                <br />
                One Hybrid Mind.
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-sm md:text-base text-metal-silver font-rajdhani mb-8 md:mb-10 max-w-2xl mx-auto"
            >
                The SF90 Stradale represents the pinnacle of Ferrari's innovation,
                combining cutting-edge hybrid technology with uncompromising performance.
            </motion.p>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
            >
                <Link href="/" className="inline-block">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-8 md:px-12 py-4 md:py-5 border-2 border-blue-400 bg-black/40 backdrop-blur-md transition-all duration-300 text-sm md:text-base tracking-[0.2em] uppercase font-orbitron font-medium overflow-hidden"
                    >
                        {/* Gradient background on hover */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={false}
                        />

                        {/* Animated shine effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                        />

                        {/* Glow effect */}
                        <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                            style={{
                                boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)"
                            }}
                        />

                        <span className="relative z-10 text-white">
                            Explore Aerodynamics
                        </span>
                    </motion.button>
                </Link>
            </motion.div>

            {/* Decorative elements */}
            <div className="mt-8 flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                        }}
                        className="w-2 h-2 rounded-full bg-blue-400"
                    />
                ))}
            </div>
        </div>
    );
}
