"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import UniversalScrollCanvas from "@/components/UniversalScrollCanvas";

export default function HybridExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Hero animations - positioned at top center
    const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);

    // Electric Motors - positioned top-left
    const motorsOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0]);
    const motorsX = useTransform(scrollYProgress, [0.15, 0.25], [-100, 0]);

    // Battery System - positioned top-right  
    const batteryOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
    const batteryX = useTransform(scrollYProgress, [0.4, 0.5], [100, 0]);

    // Drive Modes - positioned bottom center (stays visible)
    const driveModesOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.95, 1], [0, 1, 1, 1]);
    const driveModesY = useTransform(scrollYProgress, [0.65, 0.75], [80, 0]);

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            {/* Fixed container - stays in viewport */}
            <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
                {/* Canvas Background */}
                <UniversalScrollCanvas
                    scrollYProgress={scrollYProgress}
                    totalFrames={240}
                    imageFolderPath="/hybrid-frames"
                    imagePrefix="ezgif-frame-"
                    cropBottomPercent={0.10}
                    loadingText="INITIALIZING HYBRID SYSTEM"
                />

                {/* Overlays Wrapper */}
                <div className="absolute inset-0 pointer-events-none z-10">
                    {/* Subtle background glow */}
                    <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent opacity-50 mix-blend-screen" />

                    {/* Hero Title - Top Center */}
                    <motion.div
                        style={{ opacity: heroOpacity, y: heroY, willChange: "transform, opacity" }}
                        className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 text-center px-4 w-full max-w-4xl"
                    >
                        <h1 className="text-3xl md:text-6xl lg:text-8xl font-orbitron font-bold text-white mb-2 md:mb-3 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                            HYBRID
                            <br />
                            <span className="text-blue-400">INTELLIGENCE</span>
                        </h1>
                        <p className="text-sm md:text-xl lg:text-2xl font-rajdhani tracking-[0.2em] md:tracking-[0.3em] uppercase text-white bg-black/30 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-lg drop-shadow-[0_0_15px_rgba(0,0,0,0.9)]">
                            V8 + 3 Electric Motors • 1000 CV
                        </p>
                        <motion.div
                            className="mt-6 md:mt-8 flex flex-col items-center gap-2"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-blue-300 font-rajdhani text-xs md:text-sm uppercase tracking-widest">
                                Scroll to Explore
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Electric Motors Info - Top Left Corner */}
                    <motion.div
                        style={{ opacity: motorsOpacity, x: motorsX, willChange: "transform, opacity" }}
                        className="absolute left-4 md:left-8 lg:left-12 top-20 md:top-24 max-w-[85vw] md:max-w-sm lg:max-w-md pointer-events-auto"
                    >
                        <div className="bg-black/40 backdrop-blur-md p-4 md:p-6 rounded-xl border-l-4 border-blue-400 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                            <h2 className="text-blue-400 font-orbitron tracking-[0.3em] text-[10px] md:text-xs mb-2">
                                ELECTRIC POWERTRAINS
                            </h2>
                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-orbitron font-bold mb-4 text-white">
                                3 MOTORS
                            </h3>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-metal-silver font-rajdhani text-xs md:text-sm">Front Left</span>
                                    <span className="text-white font-orbitron font-bold text-lg md:text-2xl">100 kW</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-metal-silver font-rajdhani text-xs md:text-sm">Front Right</span>
                                    <span className="text-white font-orbitron font-bold text-lg md:text-2xl">100 kW</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-blue-400/30 pt-3">
                                    <span className="text-metal-silver font-rajdhani text-xs md:text-sm">Rear MGU-K</span>
                                    <span className="text-white font-orbitron font-bold text-lg md:text-2xl">120 kW</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10">
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold font-orbitron text-blue-400">
                                        220 <span className="text-sm md:text-base text-white">CV</span>
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase mt-1">
                                        Total Electric Power
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Battery System - Top Right Corner */}
                    <motion.div
                        style={{ opacity: batteryOpacity, x: batteryX, willChange: "transform, opacity" }}
                        className="absolute right-4 md:right-8 lg:right-12 top-20 md:top-24 max-w-[85vw] md:max-w-sm lg:max-w-md pointer-events-auto text-right"
                    >
                        <div className="bg-black/40 backdrop-blur-md p-4 md:p-6 rounded-xl border-r-4 border-blue-400 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                            <h2 className="text-blue-400 font-orbitron tracking-[0.3em] text-[10px] md:text-xs mb-2 text-right">
                                ENERGY STORAGE
                            </h2>
                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-orbitron font-bold mb-4 text-white text-right">
                                BATTERY PACK
                            </h3>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-metal-silver font-rajdhani text-xs md:text-sm">Capacity</span>
                                    <span className="text-white font-orbitron font-bold text-lg md:text-2xl">7.9 kWh</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-metal-silver font-rajdhani text-xs md:text-sm">Placement</span>
                                    <span className="text-white font-rajdhani text-sm md:text-base">Underfloor</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-blue-400/30 pt-3">
                                    <span className="text-metal-silver font-rajdhani text-xs md:text-sm">Cooling</span>
                                    <span className="text-white font-rajdhani text-sm md:text-base">Liquid</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10">
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold font-orbitron text-blue-400">
                                        25 <span className="text-sm md:text-base text-white">km</span>
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase mt-1">
                                        Electric Range
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Drive Modes & System Output - Bottom Center */}
                    <motion.div
                        style={{ opacity: driveModesOpacity, y: driveModesY, willChange: "transform, opacity" }}
                        className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 pointer-events-auto"
                    >
                        <div className="bg-deep-black/70 backdrop-blur-md p-4 md:p-8 rounded-2xl border-t-2 border-blue-400 shadow-2xl">
                            <h2 className="text-blue-400 font-orbitron tracking-[0.3em] text-[10px] md:text-sm mb-3 md:mb-4 text-center">
                                TOTAL SYSTEM OUTPUT
                            </h2>
                            <h3 className="text-3xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6 md:mb-10 text-white text-center">
                                1000 CV
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                                <div className="text-center group">
                                    <div className="text-xl md:text-4xl font-bold font-orbitron text-white mb-1 md:mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                        eDrive
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-widest uppercase border-t border-white/10 pt-2">
                                        Zero Emissions
                                    </div>
                                </div>
                                <div className="text-center group">
                                    <div className="text-xl md:text-4xl font-bold font-orbitron text-white mb-1 md:mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                        Hybrid
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-widest uppercase border-t border-white/10 pt-2">
                                        Balanced
                                    </div>
                                </div>
                                <div className="text-center group">
                                    <div className="text-xl md:text-4xl font-bold font-orbitron text-white mb-1 md:mb-2 group-hover:text-ferrari-red transition-colors duration-300">
                                        Performance
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-widest uppercase border-t border-white/10 pt-2">
                                        Maximum Power
                                    </div>
                                </div>
                                <div className="text-center group">
                                    <div className="text-xl md:text-4xl font-bold font-orbitron text-white mb-1 md:mb-2 group-hover:text-ferrari-red transition-colors duration-300">
                                        Qualify
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-widest uppercase border-t border-white/10 pt-2">
                                        Full Attack
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
