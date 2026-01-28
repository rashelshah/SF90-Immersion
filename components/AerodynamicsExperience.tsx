"use client";

import { useScroll, useTransform, motion, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import UniversalScrollCanvas from "@/components/UniversalScrollCanvas";

export default function AerodynamicsExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [isInView, setIsInView] = useState(false);
    const [showDots, setShowDots] = useState(true);
    const [activeFlow, setActiveFlow] = useState<'front' | 'rear' | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Update view state and scroll position
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setIsInView(latest < 1);
        setScrollProgress(latest);
        // Show dots only at start (0-5%) or end (95-100%) AND when no flow is active
        if (!activeFlow) {
            setShowDots(latest <= 0.05 || latest >= 0.95);
        }
    });

    // Function to scroll to specific position with custom smooth animation (Optimized for responsiveness)
    const scrollToPosition = (targetProgress: number) => {
        if (containerRef.current) {
            const containerHeight = containerRef.current.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrollableHeight = containerHeight - viewportHeight;
            const targetScroll = scrollableHeight * targetProgress;
            const startScroll = window.scrollY;
            const distance = (containerRef.current.offsetTop + targetScroll) - startScroll;
            const duration = 150; // Instant and ultra-responsive (0.15 seconds)
            let startTime: number | null = null;

            const animation = (currentTime: number) => {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // easeOutExpo for instant start, smooth finish
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                window.scrollTo(0, startScroll + distance * easeProgress);

                if (progress < 1) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
        }
    };

    // Handle dot click with instant scroll
    const handleDotClick = (flowType: 'front' | 'rear') => {
        setActiveFlow(flowType);
        setShowDots(false);
        // Scroll to precise frame positions
        // Front: frame 61 (~34.7% of 176 frames)
        // Rear: frame 163 (~92.6% of 176 frames)
        const targetProgress = flowType === 'front' ? 0.347 : 0.926;

        if (containerRef.current) {
            const containerHeight = containerRef.current.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrollableHeight = containerHeight - viewportHeight;
            const targetScroll = scrollableHeight * targetProgress;
            window.scrollTo({
                top: containerRef.current.offsetTop + targetScroll,
                behavior: 'auto' // Instant response
            });
        }
    };

    // Handle close with smooth scroll back to start
    const handleClose = () => {
        setActiveFlow(null);
        // Smooth scroll back to frame 1 (start)
        scrollToPosition(0.006); // Frame 1 needs small offset to not be 0 exactly if needed, but 0.006 is good
        // Delay showing dots after scroll completes
        setTimeout(() => {
            setShowDots(true);
        }, 150);
    };

    // Title animations
    const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

    // Front Splitter animations
    const frontOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
    const frontX = useTransform(scrollYProgress, [0.2, 0.3], [-200, 0]);

    // Active Aero animations
    const aeroOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
    const aeroX = useTransform(scrollYProgress, [0.45, 0.55], [200, 0]);

    // Performance stats - stays visible at the end
    const statsOpacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 1]);
    const statsY = useTransform(scrollYProgress, [0.75, 0.85], [100, 0]);

    const frontAeroData = {
        title: "FRONT AERODYNAMICS",
        stats: [
            { label: "Downforce", value: "220", unit: "kg" },
            { label: "Front Splitter Angle", value: "12", unit: "°" },
            { label: "Gurney Flap Height", value: "18", unit: "mm" },
            { label: "Air Channel Flow", value: "450", unit: "m³/h" }
        ]
    };

    const rearAeroData = {
        title: "REAR AERODYNAMICS",
        stats: [
            { label: "Downforce", value: "170", unit: "kg" },
            { label: "Wing Angle", value: "8", unit: "°" },
            { label: "Diffuser Efficiency", value: "92", unit: "%" },
            { label: "DRS Activation", value: "<0.1", unit: "s" }
        ]
    };

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            {/* Fixed container - stays in viewport */}
            <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
                {/* Canvas Background */}
                <UniversalScrollCanvas
                    scrollYProgress={scrollYProgress}
                    totalFrames={176}
                    imageFolderPath="/aerodynamics-frames"
                    imagePrefix="ezgif-frame-"
                    cropBottomPercent={0.10}
                    loadingText="ANALYZING AIRFLOW"
                />

                {/* Overlays Wrapper */}
                <div className="absolute inset-0 pointer-events-none z-10">

                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-radial from-ferrari-red/10 via-transparent to-transparent opacity-50 mix-blend-screen" />

                    {/* Interactive Aero Dots */}
                    <AnimatePresence>
                        {showDots && !activeFlow && (
                            <>
                                {/* Front Dot - Updated to Grey Style */}
                                <motion.button
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    onClick={() => handleDotClick('front')}
                                    className="absolute left-[30%] md:left-[30%] top-[50%] md:top-[45%] w-6 h-6 md:w-8 md:h-8 flex items-center justify-center pointer-events-auto cursor-pointer group z-20"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        {/* Outer Ring (Static Grey Border) */}
                                        <div className="absolute inset-0 rounded-full border-2 border-white/80 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />

                                        {/* Inner Hollow Ripple Ring */}
                                        <motion.div
                                            animate={{
                                                scale: [0.8, 2],
                                                opacity: [0.8, 0],
                                                borderWidth: ["2px", "0px"]
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                repeat: Infinity,
                                                ease: "easeOut",
                                                repeatDelay: 1
                                            }}
                                            className="absolute inset-0 rounded-full border-2 border-white/60 z-0 box-border"
                                        />

                                        {/* Label (Hidden until hover) */}
                                        <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                                            <span className="text-[10px] md:text-xs font-orbitron font-bold text-white tracking-wider uppercase bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-xl">Front Aero</span>
                                        </div>
                                    </div>
                                </motion.button>

                                {/* Rear Dot - Updated to Grey Style */}
                                <motion.button
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    onClick={() => handleDotClick('rear')}
                                    className="absolute right-[25%] md:right-[25%] top-[50%] md:top-[50%] w-6 h-6 md:w-8 md:h-8 flex items-center justify-center pointer-events-auto cursor-pointer group z-20"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        {/* Outer Ring (Static Grey Border) */}
                                        <div className="absolute inset-0 rounded-full border-2 border-white/80 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />

                                        {/* Inner Hollow Ripple Ring */}
                                        <motion.div
                                            animate={{
                                                scale: [0.8, 2],
                                                opacity: [0.8, 0],
                                                borderWidth: ["2px", "0px"]
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                repeat: Infinity,
                                                ease: "easeOut",
                                                repeatDelay: 1
                                            }}
                                            className="absolute inset-0 rounded-full border-2 border-white/60 z-0 box-border"
                                        />

                                        {/* Label (Hidden until hover) */}
                                        <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                                            <span className="text-[10px] md:text-xs font-orbitron font-bold text-white tracking-wider uppercase bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-xl">Rear Aero</span>
                                        </div>
                                    </div>
                                </motion.button>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Aero Detail Panels */}
                    <AnimatePresence>
                        {activeFlow && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 pointer-events-none"
                            >
                                {/* Animated Flow Lines (kept active for visualization) */}
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: activeFlow === 'front' ? -200 : 200, opacity: 0 }}
                                        animate={{
                                            x: activeFlow === 'front' ? 800 : -800,
                                            opacity: [0, 0.6, 0]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                            ease: "linear"
                                        }}
                                        className={`absolute ${activeFlow === 'front' ? 'left-0' : 'right-0'} h-0.5 w-32 md:w-48`}
                                        style={{
                                            top: `${40 + i * 3}%`,
                                            background: activeFlow === 'front'
                                                ? `linear-gradient(90deg, transparent, cyan, transparent)`
                                                : `linear-gradient(90deg, transparent, #ff0000, transparent)`
                                        }}
                                    />
                                ))}

                                {/* Close Button - Top Right with Premium Animations (Consistent Style) */}
                                <motion.button
                                    onClick={handleClose}
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 90 }}
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: "rgba(220, 38, 38, 0.8)", // Ferrari Red on hover
                                        borderColor: "rgba(220, 38, 38, 1)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute top-24 right-6 md:top-28 md:right-12 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors pointer-events-auto z-[60] group"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="text-white group-hover:text-white transition-colors">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </motion.button>

                                {/* Data Panel with Enhanced Entrance Animation (Consistent Glassmorphism) */}
                                <motion.div
                                    initial={{ y: 100, opacity: 0, scale: 0.9 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    exit={{ y: 100, opacity: 0, scale: 0.9 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 25,
                                        duration: 0.4
                                    }}
                                    // Mobile: Bottom Sheet (to avoid covering car) | Desktop: Right Side
                                    className="absolute left-4 right-4 bottom-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-auto md:right-4 max-w-[90vw] md:w-80 pointer-events-auto z-20"
                                >
                                    <div className="bg-black/60 backdrop-blur-md border-l-2 border-white/20 shadow-2xl relative">
                                        {/* Accent border based on flow */}
                                        <div className={`absolute top-0 left-0 w-1 h-full ${activeFlow === 'front' ? 'bg-cyan-400' : 'bg-ferrari-red'}`} />

                                        {/* Panel Content */}
                                        <div className="p-3 md:p-6">
                                            <h3 className={`text-lg md:text-2xl font-orbitron font-bold mb-3 md:mb-6 ${activeFlow === 'front' ? 'text-cyan-400' : 'text-ferrari-red'}`}>
                                                {activeFlow === 'front' ? frontAeroData.title : rearAeroData.title}
                                            </h3>

                                            <div className="space-y-2 md:space-y-4">
                                                {(activeFlow === 'front' ? frontAeroData.stats : rearAeroData.stats).map((stat, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="border-b border-white/10 pb-1 md:pb-3"
                                                    >
                                                        <div className="text-[10px] md:text-xs text-metal-silver font-rajdhani tracking-wider uppercase mb-0.5 md:mb-1">
                                                            {stat.label}
                                                        </div>
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="text-lg md:text-3xl font-orbitron font-bold text-white">
                                                                {stat.value}
                                                            </span>
                                                            <span className={`text-xs md:text-sm font-orbitron ${activeFlow === 'front' ? 'text-cyan-400' : 'text-ferrari-red'}`}>
                                                                {stat.unit}
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Title - Hidden when flow is active */}
                    {!activeFlow && (
                        <motion.div
                            style={{ opacity: titleOpacity, y: titleY, willChange: "transform, opacity" }}
                            className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 text-center px-4 w-full max-w-4xl"
                        >
                            <h1 className="text-3xl md:text-6xl lg:text-7xl font-orbitron font-bold text-gradient-platinum mb-2 md:mb-3 drop-shadow-2xl">
                                AERODYNAMICS
                            </h1>
                            <p className="text-sm md:text-xl lg:text-2xl font-rajdhani tracking-[0.3em] text-ferrari-red uppercase">
                                Active Aero Excellence
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
                    )}

                    {/* Front Splitter & Underbody - Left side - Hidden when flow is active */}
                    {!activeFlow && (
                        <motion.div
                            style={{ opacity: frontOpacity, x: frontX, willChange: "transform, opacity" }}
                            className="absolute left-6 md:left-12 lg:left-20 top-24 md:top-1/2 md:-translate-y-1/2 max-w-[80vw] md:max-w-md pointer-events-auto"
                        >
                            <div className="bg-black/20 backdrop-blur-sm p-4 md:p-6 rounded-lg border-l-2 border-ferrari-red">
                                <h2 className="text-ferrari-red font-orbitron tracking-[0.3em] text-[10px] md:text-xs mb-1 md:mb-2">
                                    DOWNFORCE GENERATION
                                </h2>
                                <h3 className="text-2xl md:text-5xl font-orbitron font-bold mb-4 text-white">
                                    FRONT SPLITTER
                                </h3>

                                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-4">
                                    <div>
                                        <div className="text-xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                            390<span className="text-ferrari-red text-xs md:text-sm ml-1">kg</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                            Downforce @ 250 km/h
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                            -9<span className="text-ferrari-red text-xs md:text-sm ml-1">%</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                            Drag Coefficient
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[10px] md:text-sm text-metal-silver font-rajdhani leading-relaxed">
                                    Advanced underbody channeling maximizes ground effect
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Active Aero System - Right side - Hidden when flow is active */}
                    {!activeFlow && (
                        <motion.div
                            style={{ opacity: aeroOpacity, x: aeroX, willChange: "transform, opacity" }}
                            className="absolute right-6 md:right-12 lg:right-20 bottom-24 md:top-1/2 md:-translate-y-1/2 max-w-[80vw] md:max-w-md pointer-events-auto text-right"
                        >
                            <div className="bg-black/20 backdrop-blur-sm p-4 md:p-6 rounded-lg border-r-2 border-ferrari-red">
                                <h2 className="text-ferrari-red font-orbitron tracking-[0.3em] text-[10px] md:text-xs mb-1 md:mb-2 text-right">
                                    INTELLIGENT CONTROL
                                </h2>
                                <h3 className="text-2xl md:text-5xl font-orbitron font-bold mb-4 text-white text-right">
                                    ACTIVE REAR WING
                                </h3>

                                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-4">
                                    <div className="col-start-2">
                                        <div className="text-xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                            4<span className="text-ferrari-red text-xs md:text-sm ml-1">Modes</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                            Aero Configurations
                                        </div>
                                    </div>
                                    <div className="col-start-1 row-start-1">
                                        <div className="text-xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                            &lt;0.01<span className="text-ferrari-red text-xs md:text-sm ml-1">s</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                            Response Time
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[10px] md:text-sm text-metal-silver font-rajdhani leading-relaxed mt-2 md:mt-4 text-right">
                                    Dynamically adjusts for optimal balance in every scenario
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Performance Stats - Bottom center - Hidden when flow is active */}
                    {!activeFlow && (
                        <motion.div
                            style={{ opacity: statsOpacity, y: statsY, willChange: "transform, opacity" }}
                            className="absolute bottom-8 md:bottom-20 left-1/2 -translate-x-1/2 max-w-6xl w-full px-4 md:px-6 pointer-events-auto"
                        >
                            <div className="bg-deep-black/60 backdrop-blur-md p-4 md:p-8 rounded-2xl border-t border-ferrari-red/30 shadow-2xl">
                                <h2 className="text-ferrari-red font-orbitron tracking-[0.3em] text-[10px] md:text-sm mb-2 md:mb-4 text-center">
                                    CUTTING EDGE PERFORMANCE
                                </h2>
                                <h3 className="text-2xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-4 md:mb-10 text-white text-center tracking-tight">
                                    FORMULA 1 DERIVED
                                </h3>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                                    <div className="text-center group">
                                        <div className="text-xl md:text-5xl font-bold font-orbitron text-white mb-1 md:mb-2 group-hover:text-ferrari-red transition-colors duration-300">
                                            1.77<span className="text-ferrari-red text-sm md:text-lg ml-1">G</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-widest uppercase border-t border-white/10 pt-2 inline-block px-4">
                                            Lateral Grip
                                        </div>
                                    </div>
                                    <div className="text-center group">
                                        <div className="text-xl md:text-5xl font-bold font-orbitron text-white mb-1 md:mb-2 group-hover:text-ferrari-red transition-colors duration-300">
                                            0.34<span className="text-ferrari-red text-sm md:text-lg ml-1">Cd</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-widest uppercase border-t border-white/10 pt-2 inline-block px-4">
                                            Drag Coefficient
                                        </div>
                                    </div>
                                    <div className="text-center group">
                                        <div className="text-xl md:text-5xl font-bold font-orbitron text-white mb-1 md:mb-2 group-hover:text-ferrari-red transition-colors duration-300">
                                            390<span className="text-ferrari-red text-sm md:text-lg ml-1">kg</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-widest uppercase border-t border-white/10 pt-2 inline-block px-4">
                                            Max Downforce
                                        </div>
                                    </div>
                                    <div className="text-center group">
                                        <div className="text-xl md:text-5xl font-bold font-orbitron text-white mb-1 md:mb-2 group-hover:text-ferrari-red transition-colors duration-300">
                                            60<span className="text-ferrari-red text-sm md:text-lg ml-1">%</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-widest uppercase border-t border-white/10 pt-2 inline-block px-4">
                                            Efficiency Gain
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
