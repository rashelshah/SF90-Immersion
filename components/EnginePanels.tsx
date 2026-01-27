"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function EnginePanels() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showPlayer, setShowPlayer] = useState(false);

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

                    <p className="text-lg md:text-xl text-metal-silver font-rajdhani leading-relaxed mb-8">
                        The F154 CD twin-turbocharged V8 represents the pinnacle of Ferrari's internal combustion engineering.
                        Derived from the 488 Pista, this powerplant delivers 780 CV at 7500 rpm, with maximum torque available
                        from just 6000 rpm thanks to the innovative turbocharging system.
                    </p>

                    {/* Engine Sound Button */}
                    <motion.button
                        onClick={() => setShowPlayer(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative bg-ferrari-red hover:bg-red-700 text-white font-orbitron font-bold py-4 px-8 transition-all duration-300 overflow-hidden"
                    >
                        {/* Background animation */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{
                                x: ['-100%', '100%']
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />

                        {/* Button content */}
                        <span className="relative flex items-center gap-3">
                            <span>🎵</span>
                            <span className="tracking-wider">
                                PLAY ENGINE SOUND
                            </span>
                        </span>

                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50 group-hover:w-6 group-hover:h-6 transition-all duration-300" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50 group-hover:w-6 group-hover:h-6 transition-all duration-300" />
                    </motion.button>

                    {/* SoundCloud Player Modal */}
                    {showPlayer && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowPlayer(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative bg-black/90 p-8 max-w-2xl w-full mx-4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close button */}
                                <button
                                    onClick={() => setShowPlayer(false)}
                                    className="absolute top-4 right-4 text-white hover:text-ferrari-red text-3xl font-bold transition-colors"
                                >
                                    ×
                                </button>

                                {/* Title */}
                                <h3 className="text-2xl font-orbitron font-bold text-white mb-6 text-center">
                                    FERRARI SF90 STRADALE ENGINE SOUND
                                </h3>

                                {/* SoundCloud iframe */}
                                <iframe
                                    width="100%"
                                    height="300"
                                    scrolling="no"
                                    frameBorder="no"
                                    allow="autoplay"
                                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1388122603&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                                ></iframe>
                                <div style={{ fontSize: '10px', color: '#cccccc', lineBreak: 'anywhere', wordBreak: 'normal', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif', fontWeight: 100 }}>
                                    <a href="https://soundcloud.com/james-lost-376224251" title="Silvia The Silver Fox" target="_blank" style={{ color: '#cccccc', textDecoration: 'none' }}>Silvia The Silver Fox</a> · <a href="https://soundcloud.com/james-lost-376224251/2020-ferrari-sf90-stradale" title="2020 Ferrari SF90 Stradale sound" target="_blank" style={{ color: '#cccccc', textDecoration: 'none' }}>2020 Ferrari SF90 Stradale sound</a>
                                </div>

                                {/* Corner borders */}
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-ferrari-red" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-ferrari-red" />
                            </motion.div>
                        </motion.div>
                    )}
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
