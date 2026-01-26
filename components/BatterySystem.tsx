"use client";

import { motion } from "framer-motion";
import { CAR_DATA } from "@/data/carData";

export default function BatterySystem() {
    return (
        <div className="w-full max-w-6xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-blue-400 font-orbitron tracking-[0.3em] text-sm mb-4 uppercase">
                    Energy Storage
                </h2>
                <h3 className="text-4xl md:text-5xl font-orbitron font-bold text-white">
                    High-Performance Battery
                </h3>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Battery Visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="relative bg-black/40 backdrop-blur-md p-12 rounded-2xl border-2 border-blue-400/30">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-2xl" />

                        {/* Battery Shape */}
                        <div className="relative w-full aspect-[3/2] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-4 border-blue-400/40 overflow-hidden">
                            {/* Battery Fill with simple animation */}
                            <motion.div
                                initial={{ height: "0%" }}
                                whileInView={{ height: "85%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 via-blue-400 to-cyan-300"
                            >
                                {/* Shimmer effect */}
                                <motion.div
                                    animate={{
                                        opacity: [0.3, 0.6, 0.3],
                                        y: [0, -10, 0]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"
                                />
                            </motion.div>

                            {/* Battery grid overlay */}
                            <div className="absolute inset-0 grid grid-cols-6 gap-1 p-2 pointer-events-none">
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="border border-blue-400/20 rounded-sm"
                                    />
                                ))}
                            </div>

                            {/* Capacity Label */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                    className="text-center"
                                >
                                    <div className="text-5xl md:text-6xl font-bold font-orbitron text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                                        {CAR_DATA.hybridSystem.battery.capacity}
                                    </div>
                                    <div className="text-base text-blue-300 font-rajdhani tracking-wider uppercase mt-2">
                                        Battery Capacity
                                    </div>
                                </motion.div>
                            </div>

                            {/* Terminal connectors */}
                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-r-lg border-2 border-blue-400" />
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-gradient-to-l from-blue-400 to-blue-500 rounded-l-lg border-2 border-blue-400" />
                        </div>
                    </div>
                </motion.div>

                {/* Battery Specs */}
                <div className="space-y-6">
                    {/* Stat 1: Cooling */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex items-start gap-4 bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-blue-400/20"
                    >
                        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/40">
                            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-xl font-orbitron font-bold text-white mb-2">
                                {CAR_DATA.hybridSystem.battery.cooling}
                            </h4>
                            <p className="text-sm text-metal-silver/80 font-rajdhani leading-relaxed">
                                Advanced thermal management system ensures optimal performance and longevity
                            </p>
                        </div>
                    </motion.div>

                    {/* Stat 2: Placement */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex items-start gap-4 bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-blue-400/20"
                    >
                        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/40">
                            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-xl font-orbitron font-bold text-white mb-2">
                                {CAR_DATA.hybridSystem.battery.placement}
                            </h4>
                            <p className="text-sm text-metal-silver/80 font-rajdhani leading-relaxed">
                                Strategic positioning for optimal weight distribution and handling characteristics
                            </p>
                        </div>
                    </motion.div>

                    {/* Stat 3: E-Range */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex items-start gap-4 bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-blue-400/20"
                    >
                        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/40">
                            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-xl font-orbitron font-bold text-white mb-2">
                                {CAR_DATA.hybridSystem.eRange}
                            </h4>
                            <p className="text-sm text-metal-silver/80 font-rajdhani leading-relaxed">
                                Zero-emission pure electric driving range for urban mobility
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
