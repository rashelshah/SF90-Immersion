"use client";

import { motion } from "framer-motion";
import { CAR_DATA } from "@/data/carData";

export default function HybridOverview() {
    return (
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center pointer-events-auto">
            {/* Left Column - Description */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-left space-y-6"
            >
                <div>
                    <h2 className="text-blue-400 font-orbitron tracking-[0.3em] text-xs md:text-sm mb-3">
                        PLUG-IN HYBRID ARCHITECTURE
                    </h2>
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-6">
                        INTELLIGENT POWER
                    </h3>
                </div>

                <div className="space-y-4 text-metal-silver font-rajdhani leading-relaxed">
                    <p className="text-sm md:text-base lg:text-lg">
                        The SF90 Stradale's revolutionary plug-in hybrid system combines a
                        <span className="text-white font-semibold"> 4.0L twin-turbo V8</span> with
                        <span className="text-blue-400 font-semibold"> three electric motors</span>,
                        delivering a combined output of
                        <span className="text-ferrari-red font-semibold"> 1000 CV</span>.
                    </p>

                    <p className="text-sm md:text-base lg:text-lg">
                        Two front-mounted motors enable
                        <span className="text-white font-semibold"> AWD torque vectoring</span>,
                        while the rear MGU-K motor provides instant torque fill and energy recovery.
                        The <span className="text-blue-400 font-semibold">7.9 kWh battery</span> is
                        strategically positioned for optimal weight distribution.
                    </p>

                    <p className="text-sm md:text-base lg:text-lg">
                        With up to <span className="text-blue-400 font-semibold">25 km of pure electric range</span>,
                        the SF90 Stradale delivers zero-emission urban mobility without compromising
                        Ferrari's legendary performance DNA.
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div>
                        <div className="text-2xl md:text-3xl font-bold font-orbitron text-blue-400">
                            220
                            <span className="text-xs md:text-sm ml-1 text-white">CV</span>
                        </div>
                        <div className="text-[10px] md:text-xs text-metal-silver/70 uppercase tracking-wider mt-1">
                            Electric Power
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-bold font-orbitron text-blue-400">
                            7.9
                            <span className="text-xs md:text-sm ml-1 text-white">kWh</span>
                        </div>
                        <div className="text-[10px] md:text-xs text-metal-silver/70 uppercase tracking-wider mt-1">
                            Battery
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-bold font-orbitron text-blue-400">
                            AWD
                        </div>
                        <div className="text-[10px] md:text-xs text-metal-silver/70 uppercase tracking-wider mt-1">
                            Vectoring
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Right Column - Car Profile with Glow */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
            >
                <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-radial from-blue-400/30 via-blue-500/10 to-transparent blur-3xl scale-110" />

                    {/* Placeholder for car profile - using a silhouette effect */}
                    <div className="relative aspect-video bg-gradient-to-br from-blue-500/5 to-transparent rounded-lg border border-blue-400/20 overflow-hidden backdrop-blur-sm">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 0 20px rgba(59, 130, 246, 0.3)",
                                            "0 0 60px rgba(59, 130, 246, 0.6)",
                                            "0 0 20px rgba(59, 130, 246, 0.3)"
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center border border-blue-400/30"
                                >
                                    <svg className="w-16 h-16 md:w-24 md:h-24 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                                        <circle cx="12" cy="14" r="3" />
                                    </svg>
                                </motion.div>
                                <p className="text-blue-400/50 font-rajdhani text-sm uppercase tracking-wider">
                                    Hybrid System Profile
                                </p>
                            </div>
                        </div>

                        {/* Animated border */}
                        <motion.div
                            className="absolute inset-0 border-2 border-blue-400/0 rounded-lg"
                            animate={{
                                borderColor: ["rgba(59, 130, 246, 0)", "rgba(59, 130, 246, 0.3)", "rgba(59, 130, 246, 0)"]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
