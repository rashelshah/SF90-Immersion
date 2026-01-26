"use client";

import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import UniversalScrollCanvas from "@/components/UniversalScrollCanvas";

export default function EngineExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [isInView, setIsInView] = useState(false);

    // Update view state
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setIsInView(latest < 1);
    });

    // Title animations
    const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

    // V8 Panel animations
    const v8Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
    const v8X = useTransform(scrollYProgress, [0.2, 0.3], [-200, 0]);

    // Electric Panel animations
    const electricOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
    const electricX = useTransform(scrollYProgress, [0.45, 0.55], [200, 0]);

    // Hybrid Panel animations - stays visible at the end
    const hybridOpacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 1]);
    const hybridY = useTransform(scrollYProgress, [0.75, 0.85], [100, 0]);

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            {/* Fixed container - stays in viewport */}
            <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
                {/* Canvas Background */}
                <UniversalScrollCanvas
                    scrollYProgress={scrollYProgress}
                    totalFrames={240}
                    imageFolderPath="/engine-frames"
                    imagePrefix="ezgif-frame-"
                    cropBottomPercent={0.10} // Remove watermark
                    loadingText="INITIALIZING ENGINE"
                />

                {/* Overlays Wrapper - Pointer events none by default, auto for text */}
                <div className="absolute inset-0 pointer-events-none z-10">

                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-radial from-ferrari-red/10 via-transparent to-transparent opacity-50 mix-blend-screen" />

                    {/* Title */}
                    <motion.div
                        style={{ opacity: titleOpacity, y: titleY, willChange: "transform, opacity" }}
                        className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 text-center px-4 w-full max-w-4xl"
                    >
                        <h1 className="text-3xl md:text-6xl lg:text-8xl font-orbitron font-bold text-gradient-platinum mb-2 md:mb-3 drop-shadow-2xl">
                            THE HEART
                        </h1>
                        <p className="text-sm md:text-xl lg:text-2xl font-rajdhani tracking-[0.3em] text-ferrari-red uppercase">
                            OF SF90 STRADALE
                        </p>
                        <motion.div
                            className="mt-8 flex flex-col items-center gap-2"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-metal-silver font-rajdhani text-sm uppercase tracking-widest">
                                Scroll to Explore
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* V8 Twin-Turbo Info - Repositioned for mobile */}
                    <motion.div
                        style={{ opacity: v8Opacity, x: v8X, willChange: "transform, opacity" }}
                        className="absolute left-6 md:left-12 lg:left-20 top-24 md:top-1/2 md:-translate-y-1/2 max-w-[80vw] md:max-w-md pointer-events-auto"
                    >
                        <div className="bg-black/20 backdrop-blur-sm p-4 md:p-6 rounded-lg border-l-2 border-ferrari-red">
                            <h2 className="text-ferrari-red font-orbitron tracking-[0.3em] text-[10px] md:text-xs mb-1 md:mb-2">
                                COMBUSTION POWER
                            </h2>
                            <h3 className="text-2xl md:text-5xl font-orbitron font-bold mb-4 text-white">
                                V8 TWIN-TURBO
                            </h3>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-4">
                                <div>
                                    <div className="text-xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                        4.0<span className="text-ferrari-red text-xs md:text-sm ml-1">L</span>
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                        Displacement
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                        780<span className="text-ferrari-red text-xs md:text-sm ml-1">CV</span>
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                        Power
                                    </div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold font-orbitron text-white mb-1">
                                        90<span className="text-ferrari-red text-sm ml-1">°</span>
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-xs tracking-wider uppercase">
                                        V-Angle
                                    </div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold font-orbitron text-white mb-1">
                                        8000<span className="text-ferrari-red text-sm ml-1">RPM</span>
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-xs tracking-wider uppercase">
                                        Redline
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Electric Motors Info - Repositioned for mobile to bottom */}
                    <motion.div
                        style={{ opacity: electricOpacity, x: electricX, willChange: "transform, opacity" }}
                        className="absolute right-6 md:right-12 lg:right-20 bottom-24 md:top-1/2 md:-translate-y-1/2 max-w-[80vw] md:max-w-md pointer-events-auto text-right"
                    >
                        <div className="bg-black/20 backdrop-blur-sm p-4 md:p-6 rounded-lg border-r-2 border-ferrari-red">
                            <h2 className="text-ferrari-red font-orbitron tracking-[0.3em] text-[10px] md:text-xs mb-1 md:mb-2 text-right">
                                ELECTRIC REVOLUTION
                            </h2>
                            <h3 className="text-2xl md:text-5xl font-orbitron font-bold mb-4 text-white text-right">
                                THREE MOTORS
                            </h3>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-4">
                                <div className="col-start-2">
                                    <div className="text-xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                        220<span className="text-ferrari-red text-xs md:text-sm ml-1">CV</span>
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                        Electric Power
                                    </div>
                                </div>
                                <div className="col-start-1 row-start-1">
                                    <div className="text-xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                        3<span className="text-ferrari-red text-xs md:text-sm ml-1">Motors</span>
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                        Config
                                    </div>
                                </div>
                            </div>
                            <p className="text-[10px] md:text-sm text-metal-silver font-rajdhani leading-relaxed mt-2 md:mt-4 text-right">
                                Two front + one rear motor for instant torque vectoring
                            </p>
                        </div>
                    </motion.div>

                    {/* Hybrid Architecture Info */}
                    <motion.div
                        style={{ opacity: hybridOpacity, y: hybridY, willChange: "transform, opacity" }}
                        className="absolute bottom-8 md:bottom-20 left-1/2 -translate-x-1/2 max-w-6xl w-full px-4 md:px-6 pointer-events-auto"
                    >
                        <div className="bg-deep-black/60 backdrop-blur-md p-4 md:p-8 rounded-2xl border-t border-ferrari-red/30 shadow-2xl">
                            <h2 className="text-ferrari-red font-orbitron tracking-[0.3em] text-[10px] md:text-sm mb-2 md:mb-4 text-center">
                                ULTIMATE PERFORMANCE
                            </h2>
                            <h3 className="text-2xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-4 md:mb-10 text-white text-center tracking-tight">
                                1000 CV TOTAL
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                                <div className="text-center group">
                                    <div className="text-xl md:text-5xl font-bold font-orbitron text-white mb-1 md:mb-2 group-hover:text-ferrari-red transition-colors duration-300">
                                        1000<span className="text-ferrari-red text-sm md:text-lg ml-1">CV</span>
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-widest uppercase border-t border-white/10 pt-2 inline-block px-4">
                                        System Output
                                    </div>
                                </div>
                                <div className="text-center group">
                                    <div className="text-xl md:text-5xl font-bold font-orbitron text-white mb-1 md:mb-2 group-hover:text-ferrari-red transition-colors duration-300">
                                        7.9<span className="text-ferrari-red text-sm md:text-lg ml-1">kWh</span>
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-widest uppercase border-t border-white/10 pt-2 inline-block px-4">
                                        Battery
                                    </div>
                                </div>
                                <div className="text-center group">
                                    <div className="text-xl md:text-5xl font-bold font-orbitron text-white mb-1 md:mb-2 group-hover:text-ferrari-red transition-colors duration-300">
                                        25<span className="text-ferrari-red text-sm md:text-lg ml-1">km</span>
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-widest uppercase border-t border-white/10 pt-2 inline-block px-4">
                                        E-Range
                                    </div>
                                </div>
                                <div className="text-center group">
                                    <div className="text-xl md:text-5xl font-bold font-orbitron text-white mb-1 md:mb-2 group-hover:text-ferrari-red transition-colors duration-300">
                                        4<span className="text-ferrari-red text-sm md:text-lg ml-1">Modes</span>
                                    </div>
                                    <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-widest uppercase border-t border-white/10 pt-2 inline-block px-4">
                                        eManettino
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
