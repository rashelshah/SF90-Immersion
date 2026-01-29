"use client";

import { useScroll, useTransform, motion, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import UniversalScrollCanvas from "@/components/UniversalScrollCanvas";

export default function InteriorExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [isInView, setIsInView] = useState(false);
    const [showDots, setShowDots] = useState(true);
    const [activeFeature, setActiveFeature] = useState<'cockpit' | 'steering' | 'speedometer' | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const [currentFrame, setCurrentFrame] = useState(0);

    // Update view state and scroll position
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setIsInView(latest < 1);
        setScrollProgress(latest);
        // Map 0-1 to 1-192 (Frame 1 to Frame 192)
        const frame = Math.floor(latest * 192) + 1;
        setCurrentFrame(frame);

        // Show dots at key positions (Zones) based on Frame Targets
        // Wheel (70/192 = 0.36): 0.31 - 0.41
        // Speedometer (100/192 = 0.52): 0.47 - 0.57
        // Display (181/192 = 0.94): 0.89 - 1.0
        if (!activeFeature) {
            // Only show at the very beginning (First Frame)
            // Removed other zones as per request to only show at the "first frame"
            setShowDots(latest < 0.01);
        }
    });

    // Helper to check if frame is within range (tolerance of +/- 15 frames for better visibility)
    const isFrameVisible = (targetFrame: number) => {
        // Special case for Display (Frame 181) - visible until end
        if (targetFrame === 181) {
            return currentFrame >= 166; // 181 - 15
        }
        return Math.abs(currentFrame - targetFrame) <= 15;
    };

    // Function to scroll to specific position with custom smooth animation
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

    // Handle dot click with instant scroll (no animation lag)
    const handleDotClick = (featureType: 'cockpit' | 'steering' | 'speedometer') => {
        setActiveFeature(featureType);
        setShowDots(false);
        // Instant scroll to precise frame positions
        // Steering (Wheel): Frame 70 (36.4%)
        // Speedometer: Frame 100 (52.1%)
        // Cockpit (Display): Frame 181 (94.2%)
        const targetProgress = featureType === 'steering' ? (70 / 192) :
            featureType === 'speedometer' ? (100 / 192) :
                (181 / 192);

        // Instant scroll without animation for immediate response
        if (containerRef.current) {
            const containerHeight = containerRef.current.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrollableHeight = containerHeight - viewportHeight;
            const targetScroll = scrollableHeight * targetProgress;
            window.scrollTo({
                top: containerRef.current.offsetTop + targetScroll,
                behavior: 'auto' // Instant, no smooth animation
            });
        }
    };

    // Handle close with instant scroll back to start
    const handleClose = () => {
        setActiveFeature(null);
        // Instant scroll back to frame 1 (start)
        if (containerRef.current) {
            window.scrollTo({
                top: containerRef.current.offsetTop,
                behavior: 'auto' // Instant, no animation
            });
        }
        // Show dots immediately after close
        setTimeout(() => {
            setShowDots(true);
        }, 100);
    };

    // Title animations
    const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.22], [1, 1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.22], [0, -100]);

    // Data Panel Logic: Reordered to match Video Flow (Wheel -> Speedometer -> Display)

    // 1. Steering (Wheel) - Frame ~70 (0.36)
    // Appear: 0.30 - 0.42
    const steeringOpacity = useTransform(scrollYProgress, [0.28, 0.36, 0.42, 0.48], [0, 1, 1, 0]);
    const steeringX = useTransform(scrollYProgress, [0.28, 0.36], [-50, 0]); // From Left now

    // 2. Speedometer - Frame ~100 (0.52)
    // Appear: 0.46 - 0.58
    const speedometerOpacity = useTransform(scrollYProgress, [0.46, 0.52, 0.58, 0.64], [0, 1, 1, 0]);
    const speedometerY = useTransform(scrollYProgress, [0.46, 0.52], [50, 0]);

    // 3. Cockpit (Display) - Frame ~181 (0.94)
    // Appear: 0.85 - 1.0 (End)
    const cockpitOpacity = useTransform(scrollYProgress, [0.80, 0.88, 1.0], [0, 1, 1]); // Stays visible
    const cockpitX = useTransform(scrollYProgress, [0.80, 0.88], [50, 0]); // From Right

    // Final stats - shifted slightly
    const statsOpacity = useTransform(scrollYProgress, [0.90, 0.95, 1], [0, 0, 1]);

    const cockpitData = {
        title: "DIGITAL COCKPIT",
        stats: [
            { label: "Display Type", value: "Curved HD", unit: "Screen" },
            { label: "Information", value: "Real-Time", unit: "Telemetry" },
            { label: "Display Quality", value: "Premium", unit: "Resolution" },
            { label: "View Modes", value: "Multiple", unit: "Layouts" }
        ]
    };

    const steeringData = {
        title: "STEERING WHEEL",
        stats: [
            { label: "Drive Modes", value: "Manettino", unit: "System" },
            { label: "Material", value: "Carbon", unit: "Fiber" },
            { label: "Shifters", value: "F1-Style", unit: "Paddles" },
            { label: "Interface", value: "Integrated", unit: "Controls" }
        ]
    };

    const speedometerData = {
        title: "SPEEDOMETER",
        stats: [
            { label: "Precision", value: "Digital", unit: "Accuracy" },
            { label: "Visibility", value: "High-Contrast", unit: "Display" },
            { label: "Design", value: "Racing", unit: "Inspired" },
            { label: "Response", value: "Instant", unit: "Feedback" }
        ]
    };

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            {/* Fixed container - stays in viewport */}
            <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
                {/* Scroll Canvas */}
                <UniversalScrollCanvas
                    scrollYProgress={scrollYProgress}
                    totalFrames={192}
                    imageFolderPath="/Interior-Frames"
                    imagePrefix=""
                    imageExtension="jpg"
                    padLength={4}
                    startIndex={1}
                    cropBottomPercent={0.08}
                />

                {/* Interactive Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Interactive Dots - Only show when no feature is active AND frame matches */}
                    <AnimatePresence>
                        {showDots && !activeFeature && (
                            <>
                                {/* Steering Wheel Dot - Frame 70 */}
                                <motion.button
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    onClick={() => handleDotClick('steering')}
                                    className="absolute left-1/2 -translate-x-1/2 top-[50%] md:top-[40%] w-6 h-6 md:w-8 md:h-8 flex items-center justify-center pointer-events-auto cursor-pointer group z-30"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="absolute inset-0 rounded-full border-2 border-white/80 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />
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
                                        <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                                            <span className="text-[10px] md:text-xs font-orbitron font-bold text-white tracking-wider uppercase bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-xl">Wheel</span>
                                        </div>
                                    </div>
                                </motion.button>

                                {/* Speedometer Dot - Frame 100 */}
                                <motion.button
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    onClick={() => handleDotClick('speedometer')}
                                    className="absolute right-[20%] md:right-[20%] top-[50%] md:top-[50%] w-6 h-6 md:w-8 md:h-8 flex items-center justify-center pointer-events-auto cursor-pointer group z-30"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="absolute inset-0 rounded-full border-2 border-white/80 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />
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
                                        <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                                            <span className="text-[10px] md:text-xs font-orbitron font-bold text-white tracking-wider uppercase bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-xl">Speedometer</span>
                                        </div>
                                    </div>
                                </motion.button>

                                {/* Digital Cockpit Dot - Frame 181 */}
                                <motion.button
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    onClick={() => handleDotClick('cockpit')}
                                    className="absolute left-[20%] md:left-[20%] top-[50%] md:top-[45%] w-6 h-6 md:w-8 md:h-8 flex items-center justify-center pointer-events-auto cursor-pointer group z-30"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="absolute inset-0 rounded-full border-2 border-white/80 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />
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
                                        <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                                            <span className="text-[10px] md:text-xs font-orbitron font-bold text-white tracking-wider uppercase bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-xl">Display</span>
                                        </div>
                                    </div>
                                </motion.button>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Feature Detail Panels */}
                    <AnimatePresence>
                        {activeFeature && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0"
                            >
                                <motion.button
                                    onClick={() => {
                                        setActiveFeature(null);
                                        scrollToPosition(0);
                                        setTimeout(() => {
                                            setShowDots(true);
                                        }, 150);
                                    }}
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 90 }}
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(220, 38, 38, 0.8)", borderColor: "rgba(220, 38, 38, 1)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute top-24 right-6 md:top-28 md:right-12 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors pointer-events-auto z-[60] group"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="text-white group-hover:text-white transition-colors">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </motion.button>

                                <motion.div
                                    initial={{ y: 100, opacity: 0, scale: 0.9 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    exit={{ y: 100, opacity: 0, scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.4 }}
                                    className="absolute left-4 right-4 bottom-12 md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:-translate-y-1/2 max-w-[80vw] md:w-80 pointer-events-auto z-20"
                                >
                                    <div className="bg-black/60 backdrop-blur-md border-l-2 border-white/20 shadow-2xl relative">
                                        <div className={`absolute top-0 left-0 w-1 h-full ${activeFeature === 'cockpit' ? 'bg-amber-400' : activeFeature === 'steering' ? 'bg-white' : 'bg-blue-400'}`} />
                                        <div className="p-3 md:p-6">
                                            <motion.h3
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                                className={`text-lg md:text-3xl font-orbitron font-bold mb-3 md:mb-6 ${activeFeature === 'cockpit' ? 'text-amber-400' : activeFeature === 'steering' ? 'text-white' : 'text-blue-400'}`}
                                            >
                                                {activeFeature === 'cockpit' ? cockpitData.title : activeFeature === 'steering' ? steeringData.title : speedometerData.title}
                                            </motion.h3>
                                            <div className="space-y-2 md:space-y-4">
                                                {(activeFeature === 'cockpit' ? cockpitData.stats : activeFeature === 'steering' ? steeringData.stats : speedometerData.stats).map((stat, i) => (
                                                    <motion.div
                                                        key={stat.label}
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
                                                            <span className={`text-xs md:text-sm font-orbitron ${activeFeature === 'cockpit' ? 'text-amber-400' : activeFeature === 'steering' ? 'text-white' : 'text-blue-400'}`}>
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

                    {/* Title - Hidden when feature is active */}
                    {!activeFeature && (
                        <motion.div
                            style={{ opacity: titleOpacity, y: titleY, willChange: "transform, opacity" }}
                            className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 text-center px-4 w-full max-w-4xl"
                        >
                            <h1 className="text-3xl md:text-6xl lg:text-7xl font-orbitron font-bold text-gradient-platinum mb-2 md:mb-3 drop-shadow-2xl">
                                INTERIOR
                            </h1>
                            <p className="text-sm md:text-xl lg:text-2xl font-rajdhani tracking-[0.3em] text-amber-400 uppercase">
                                Driver-Focused Luxury
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

                    {/* Steering Wheel Info - Left side - First Feature */}
                    {!activeFeature && (
                        <motion.div
                            style={{ opacity: steeringOpacity, x: steeringX, willChange: "transform, opacity" }}
                            className="absolute left-6 md:left-12 lg:left-20 top-24 md:top-1/2 md:-translate-y-1/2 max-w-[60vw] md:max-w-md pointer-events-auto"
                        >
                            <div className="bg-black/20 backdrop-blur-sm p-3 md:p-6 rounded-lg border-l-2 border-white">
                                <h2 className="text-white font-orbitron tracking-[0.3em] text-[8px] md:text-xs mb-1 md:mb-2">
                                    RACE-INSPIRED CONTROL
                                </h2>
                                <h3 className="text-xl md:text-5xl font-orbitron font-bold mb-2 md:mb-4 text-white">
                                    CARBON FIBER WHEEL
                                </h3>
                                <div className="grid grid-cols-2 gap-y-2 md:gap-y-4 gap-x-2 md:gap-x-6 mb-2 md:mb-4">
                                    <div>
                                        <div className="text-lg md:text-3xl font-bold font-orbitron text-white mb-1">
                                            4<span className="text-white text-xs md:text-sm ml-1">modes</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                            Manettino Settings
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                            12<span className="text-white text-xs md:text-sm ml-1">controls</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                            Fingertip Buttons
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[10px] md:text-sm text-metal-silver font-rajdhani leading-relaxed">
                                    F1-derived technology with paddle shifters and integrated controls
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Speedometer Info - Bottom center - Second Feature */}
                    {!activeFeature && (
                        <motion.div
                            style={{ opacity: speedometerOpacity, y: speedometerY, willChange: "transform, opacity" }}
                            className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 max-w-[80vw] md:max-w-2xl pointer-events-auto"
                        >
                            <div className="bg-black/20 backdrop-blur-sm p-3 md:p-6 rounded-lg border-b-2 border-blue-400">
                                <h2 className="text-blue-400 font-orbitron tracking-[0.3em] text-[8px] md:text-xs mb-1 md:mb-2 text-center">
                                    PREMIUM CRAFTSMANSHIP
                                </h2>
                                <h3 className="text-xl md:text-5xl font-orbitron font-bold mb-2 md:mb-4 text-white text-center">
                                    LUXURY CONSOLE
                                </h3>
                                <div className="grid grid-cols-3 gap-2 md:gap-6">
                                    <div className="text-center">
                                        <div className="text-lg md:text-3xl font-bold font-orbitron text-white mb-1">
                                            2<span className="text-blue-400 text-xs md:text-sm ml-1">zones</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                            Climate Control
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                            3<span className="text-blue-400 text-xs md:text-sm ml-1">types</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                            Premium Materials
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                            15<span className="text-blue-400 text-xs md:text-sm ml-1">W</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                            Wireless Charging
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Digital Cockpit Info - Right side - Third Feature */}
                    {!activeFeature && (
                        <motion.div
                            style={{ opacity: cockpitOpacity, x: cockpitX, willChange: "transform, opacity" }}
                            className="absolute right-6 md:right-12 lg:right-20 top-24 md:top-1/2 md:-translate-y-1/2 max-w-[60vw] md:max-w-md pointer-events-auto"
                        >
                            <div className="bg-black/20 backdrop-blur-sm p-3 md:p-6 rounded-lg border-r-2 border-amber-400">
                                <h2 className="text-amber-400 font-orbitron tracking-[0.3em] text-[8px] md:text-xs mb-1 md:mb-2">
                                    CONNECTED TECHNOLOGY
                                </h2>
                                <h3 className="text-xl md:text-5xl font-orbitron font-bold mb-2 md:mb-4 text-white">
                                    16" CURVED DISPLAY
                                </h3>
                                <div className="grid grid-cols-2 gap-y-2 md:gap-y-4 gap-x-2 md:gap-x-6 mb-2 md:mb-4">
                                    <div>
                                        <div className="text-lg md:text-3xl font-bold font-orbitron text-white mb-1">
                                            1920<span className="text-amber-400 text-xs md:text-sm ml-1">x720</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                            HD Resolution
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xl md:text-3xl font-bold font-orbitron text-white mb-1">
                                            5<span className="text-amber-400 text-xs md:text-sm ml-1">modes</span>
                                        </div>
                                        <div className="text-metal-silver font-rajdhani text-[10px] md:text-xs tracking-wider uppercase">
                                            Customizable Views
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[10px] md:text-sm text-metal-silver font-rajdhani leading-relaxed">
                                    Real-time telemetry and performance data at your fingertips
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Final Stats - Stays at bottom */}
                    <motion.div
                        style={{ opacity: statsOpacity, willChange: "opacity" }}
                        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-center"
                    >
                        <p className="text-metal-silver font-rajdhani text-xs md:text-sm uppercase tracking-widest">
                            Crafted for Performance • Designed for Luxury
                        </p>
                    </motion.div>
                </div>
            </div>
        </div >
    );
}
