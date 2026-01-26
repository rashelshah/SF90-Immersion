"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function EnginePanels() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Individual panel animations
    const panel1Opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const panel1Y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

    const panel2Opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const panel2Y = useTransform(scrollYProgress, [0.2, 0.4], [100, 0]);

    const panel3Opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const panel3Y = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);

    return (
        <div ref={containerRef} className="relative py-32 px-6 md:px-12 lg:px-32 space-y-32">
            {/* V8 Twin-Turbo Panel */}
            <motion.div
                style={{ opacity: panel1Opacity, y: panel1Y, willChange: "transform, opacity" }}
                className="max-w-4xl mx-auto"
            >
                <div className="bg-black/20 backdrop-blur-sm p-8 md:p-12">
                    <h2 className="text-ferrari-red font-orbitron tracking-[0.3em] text-sm mb-4">
                        COMBUSTION POWER
                    </h2>
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-8 text-white">
                        V8 TWIN-TURBO
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
                        <div>
                            <div className="text-4xl font-bold font-orbitron text-white mb-2">
                                4.0<span className="text-ferrari-red text-xl ml-1">L</span>
                            </div>
                            <div className="text-metal-silver font-rajdhani text-sm tracking-wider uppercase">
                                Displacement
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold font-orbitron text-white mb-2">
                                780<span className="text-ferrari-red text-xl ml-1">CV</span>
                            </div>
                            <div className="text-metal-silver font-rajdhani text-sm tracking-wider uppercase">
                                Power Output
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold font-orbitron text-white mb-2">
                                90<span className="text-ferrari-red text-xl ml-1">°</span>
                            </div>
                            <div className="text-metal-silver font-rajdhani text-sm tracking-wider uppercase">
                                V-Angle
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold font-orbitron text-white mb-2">
                                8000<span className="text-ferrari-red text-xl ml-1">RPM</span>
                            </div>
                            <div className="text-metal-silver font-rajdhani text-sm tracking-wider uppercase">
                                Redline
                            </div>
                        </div>
                    </div>

                    <p className="text-lg md:text-xl text-metal-silver font-rajdhani leading-relaxed">
                        The F154 CD twin-turbocharged V8 represents the pinnacle of Ferrari's internal combustion engineering.
                        Derived from the 488 Pista, this powerplant delivers 780 CV at 7500 rpm, with maximum torque available
                        from just 6000 rpm thanks to the innovative turbocharging system.
                    </p>
                </div>
            </motion.div>

            {/* Electric Motors Panel */}
            <motion.div
                style={{ opacity: panel2Opacity, y: panel2Y, willChange: "transform, opacity" }}
                className="max-w-4xl mx-auto"
            >
                <div className="bg-black/20 backdrop-blur-sm p-8 md:p-12">
                    <h2 className="text-ferrari-red font-orbitron tracking-[0.3em] text-sm mb-4">
                        ELECTRIC REVOLUTION
                    </h2>
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-8 text-white">
                        THREE MOTORS
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8">
                        <div>
                            <div className="text-4xl font-bold font-orbitron text-white mb-2">
                                220<span className="text-ferrari-red text-xl ml-1">CV</span>
                            </div>
                            <div className="text-metal-silver font-rajdhani text-sm tracking-wider uppercase">
                                Electric Power
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold font-orbitron text-white mb-2">
                                3<span className="text-ferrari-red text-xl ml-1">Motors</span>
                            </div>
                            <div className="text-metal-silver font-rajdhani text-sm tracking-wider uppercase">
                                Configuration
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold font-orbitron text-white mb-2">
                                RAC-<span className="text-ferrari-red text-xl">e</span>
                            </div>
                            <div className="text-metal-silver font-rajdhani text-sm tracking-wider uppercase">
                                Electric AWD
                            </div>
                        </div>
                    </div>

                    <p className="text-lg md:text-xl text-metal-silver font-rajdhani leading-relaxed">
                        Two independent motors on the front axle provide instantaneous torque vectoring and electric all-wheel drive.
                        A third motor integrated with the gearbox assists the V8, enabling pure electric driving for up to 25 km
                        while delivering explosive combined performance.
                    </p>
                </div>
            </motion.div>

            {/* Hybrid Architecture Panel */}
            <motion.div
                style={{ opacity: panel3Opacity, y: panel3Y, willChange: "transform, opacity" }}
                className="max-w-4xl mx-auto"
            >
                <div className="bg-black/20 backdrop-blur-sm p-8 md:p-12">
                    <h2 className="text-ferrari-red font-orbitron tracking-[0.3em] text-sm mb-4">
                        ULTIMATE PERFORMANCE
                    </h2>
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-8 text-white">
                        1000 CV TOTAL
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
                        <div>
                            <div className="text-4xl font-bold font-orbitron text-white mb-2">
                                1000<span className="text-ferrari-red text-xl ml-1">CV</span>
                            </div>
                            <div className="text-metal-silver font-rajdhani text-sm tracking-wider uppercase">
                                System Output
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold font-orbitron text-white mb-2">
                                7.9<span className="text-ferrari-red text-xl ml-1">kWh</span>
                            </div>
                            <div className="text-metal-silver font-rajdhani text-sm tracking-wider uppercase">
                                Battery Capacity
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold font-orbitron text-white mb-2">
                                25<span className="text-ferrari-red text-xl ml-1">km</span>
                            </div>
                            <div className="text-metal-silver font-rajdhani text-sm tracking-wider uppercase">
                                Electric Range
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold font-orbitron text-white mb-2">
                                4<span className="text-ferrari-red text-xl ml-1">Modes</span>
                            </div>
                            <div className="text-metal-silver font-rajdhani text-sm tracking-wider uppercase">
                                eManettino
                            </div>
                        </div>
                    </div>

                    <p className="text-lg md:text-xl text-metal-silver font-rajdhani leading-relaxed">
                        The SF90's plug-in hybrid architecture represents Ferrari's first series-production PHEV, combining
                        the visceral performance of the twin-turbo V8 with instantaneous electric torque delivery.
                        The innovative eManettino controller offers four power modes: eDrive, Hybrid, Performance, and Qualify.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
