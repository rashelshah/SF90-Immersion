"use client";

import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function EngineExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [currentFrame, setCurrentFrame] = useState(1);
    const [isInView, setIsInView] = useState(false);

    // Update frame based on scroll (limited to 226 frames)
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const frame = Math.round(latest * 225) + 1; // 1-226
        setCurrentFrame(frame);
        setIsInView(latest < 1); // Hide when fully scrolled past
    });

    const paddedFrame = String(currentFrame).padStart(3, '0');

    // Title animations
    const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

    // V8 Panel animations
    const v8Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
    const v8X = useTransform(scrollYProgress, [0.2, 0.3], [-200, 0]);

    // Electric Panel animations
    const electricOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
    const electricX = useTransform(scrollYProgress, [0.45, 0.55], [200, 0]);

    // Hybrid Panel animations
    const hybridOpacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0]);
    const hybridY = useTransform(scrollYProgress, [0.75, 0.85], [100, 0]);

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            {/* Fixed container - stays in viewport */}
            <div className="fixed top-16 md:top-20 left-0 right-0 bottom-0 pointer-events-none">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-radial from-ferrari-red/10 via-transparent to-transparent opacity-50" />

                {/* Engine image - fills screen, watermark cropped */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src={`/engine-frames/ezgif-frame-${paddedFrame}.jpg`}
                            alt="Ferrari SF90 Engine"
                            width={1920}
                            height={1080}
                            className="w-full h-full object-cover scale-110"
                            style={{
                                objectPosition: 'center 45%',
                                filter: 'brightness(1.1) contrast(1.05)'
                            }}
                            priority={currentFrame === 1}
                            quality={90}
                            unoptimized
                        />
                    </div>
                </div>

                {/* Title */}
                <motion.div
                    style={{ opacity: titleOpacity, y: titleY, willChange: "transform, opacity" }}
                    className="absolute top-12 md:top-20 left-1/2 -translate-x-1/2 z-20 text-center px-6"
                >
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-orbitron font-bold text-gradient-platinum mb-3">
                        THE HEART
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl font-rajdhani tracking-[0.3em] text-ferrari-red">
                        OF SF90 STRADALE
                    </p>
                    <motion.div
                        className="mt-6 flex flex-col items-center gap-2"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-metal-silver font-rajdhani text-xs uppercase tracking-widest">
                            Scroll to Explore
                        </span>
                    </motion.div>
                </motion.div>

                {/* V8 Twin-Turbo Info */}
                <motion.div
                    style={{ opacity: v8Opacity, x: v8X, willChange: "transform, opacity" }}
                    className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 max-w-sm md:max-w-lg z-20 pointer-events-auto"
                >
                    <div className="">
                        <h2 className="text-ferrari-red font-orbitron tracking-[0.3em] text-xs mb-2">
                            COMBUSTION POWER
                        </h2>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold mb-4 text-white">
                            V8 TWIN-TURBO
                        </h3>

                        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                            <div>
                                <div className="text-2xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                    4.0<span className="text-ferrari-red text-sm ml-1">L</span>
                                </div>
                                <div className="text-metal-silver font-rajdhani text-xs tracking-wider uppercase">
                                    Displacement
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                    780<span className="text-ferrari-red text-sm ml-1">CV</span>
                                </div>
                                <div className="text-metal-silver font-rajdhani text-xs tracking-wider uppercase">
                                    Power
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                    90<span className="text-ferrari-red text-sm ml-1">°</span>
                                </div>
                                <div className="text-metal-silver font-rajdhani text-xs tracking-wider uppercase">
                                    V-Angle
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                    8000<span className="text-ferrari-red text-sm ml-1">RPM</span>
                                </div>
                                <div className="text-metal-silver font-rajdhani text-xs tracking-wider uppercase">
                                    Redline
                                </div>
                            </div>
                        </div>

                        <p className="text-xs md:text-sm text-metal-silver font-rajdhani leading-relaxed">
                            F154 CD twin-turbo V8: 780 CV at 7500 rpm
                        </p>
                    </div>
                </motion.div>

                {/* Electric Motors Info */}
                <motion.div
                    style={{ opacity: electricOpacity, x: electricX, willChange: "transform, opacity" }}
                    className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 max-w-sm md:max-w-lg z-20 pointer-events-auto"
                >
                    <div className="">
                        <h2 className="text-ferrari-red font-orbitron tracking-[0.3em] text-xs mb-2 text-right">
                            ELECTRIC REVOLUTION
                        </h2>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold mb-4 text-white text-right">
                            THREE MOTORS
                        </h3>

                        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                            <div className="text-right">
                                <div className="text-2xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                    220<span className="text-ferrari-red text-sm ml-1">CV</span>
                                </div>
                                <div className="text-metal-silver font-rajdhani text-xs tracking-wider uppercase">
                                    Electric Power
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                    3<span className="text-ferrari-red text-sm ml-1">Motors</span>
                                </div>
                                <div className="text-metal-silver font-rajdhani text-xs tracking-wider uppercase">
                                    Config
                                </div>
                            </div>
                        </div>

                        <p className="text-xs md:text-sm text-metal-silver font-rajdhani leading-relaxed text-right">
                            Two front + one rear motor for instant torque vectoring
                        </p>
                    </div>
                </motion.div>

                {/* Hybrid Architecture Info */}
                <motion.div
                    style={{ opacity: hybridOpacity, y: hybridY, willChange: "transform, opacity" }}
                    className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 max-w-5xl w-full px-4 z-20 pointer-events-auto"
                >
                    <div className="">
                        <h2 className="text-ferrari-red font-orbitron tracking-[0.3em] text-xs mb-2 text-center">
                            ULTIMATE PERFORMANCE
                        </h2>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-6 text-white text-center">
                            1000 CV TOTAL
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                    1000<span className="text-ferrari-red text-sm ml-1">CV</span>
                                </div>
                                <div className="text-metal-silver font-rajdhani text-xs tracking-wider uppercase">
                                    System Output
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                    7.9<span className="text-ferrari-red text-sm ml-1">kWh</span>
                                </div>
                                <div className="text-metal-silver font-rajdhani text-xs tracking-wider uppercase">
                                    Battery
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                    25<span className="text-ferrari-red text-sm ml-1">km</span>
                                </div>
                                <div className="text-metal-silver font-rajdhani text-xs tracking-wider uppercase">
                                    E-Range
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                    4<span className="text-ferrari-red text-sm ml-1">Modes</span>
                                </div>
                                <div className="text-metal-silver font-rajdhani text-xs tracking-wider uppercase">
                                    eManettino
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>


            </div>
        </div>
    );
}
