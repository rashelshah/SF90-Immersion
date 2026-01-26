"use client";

import { motion, useTransform, MotionValue, useSpring } from "framer-motion";

interface FerrariExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function FerrariExperience({ scrollYProgress }: FerrariExperienceProps) {
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Phase 1: Hero (0 - 0.33)
    const heroOpacity = useTransform(smoothProgress, [0, 0.25, 0.3], [1, 1, 0]);
    const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.95]);
    const heroBlur = useTransform(smoothProgress, [0, 0.3], ["blur(0px)", "blur(10px)"]);

    // Phase 2: Design (0.33 - 0.66)
    const designOpacity = useTransform(smoothProgress, [0.3, 0.35, 0.6, 0.65], [0, 1, 1, 0]);
    const designX = useTransform(smoothProgress, [0.3, 0.4], [-50, 0]);

    // Phase 3: Performance (0.66 - 1.0)
    const perfOpacity = useTransform(smoothProgress, [0.65, 0.7, 0.95], [0, 1, 1]);
    const perfY = useTransform(smoothProgress, [0.65, 0.75], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full overflow-hidden transform-gpu">
            {/* Decorative HUD Lines - hidden on very small screens */}
            <div className="absolute top-24 left-4 right-4 md:left-8 md:right-8 h-[1px] bg-white/10 mix-blend-overlay" />
            <div className="absolute bottom-24 left-4 right-4 md:left-8 md:right-8 h-[1px] bg-white/10 mix-blend-overlay" />
            <div className="hidden md:block absolute top-1/2 left-8 w-[1px] h-32 bg-ferrari-red/50 -translate-y-1/2" />
            <div className="hidden md:block absolute top-1/2 right-8 w-[1px] h-32 bg-ferrari-red/50 -translate-y-1/2" />

            {/* Phase 1: Hero */}
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, filter: heroBlur, willChange: "transform, opacity" }}
                className="absolute inset-0 flex flex-col items-start justify-start pt-24 md:pt-32 pl-6 md:pl-12 lg:pl-32 text-left z-20 transform-gpu"
            >
                <span className="text-ferrari-red font-orbitron tracking-[0.3em] md:tracking-[0.5em] text-xs md:text-sm lg:text-base mb-4 md:mb-6 drop-shadow-[0_0_10px_rgba(192,0,0,0.5)]">
                    SCUDERIA FERRARI
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-orbitron font-bold tracking-tighter mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
                    SF90
                </h1>
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-orbitron uppercase tracking-[0.15em] md:tracking-[0.2em] text-white mb-6 md:mb-8">
                    Stradale
                </h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-4"
                >
                    <button
                        onClick={() => {
                            const specsSection = document.getElementById('specs');
                            specsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="px-6 md:px-8 py-3 bg-ferrari-red text-white font-orbitron tracking-widest text-xs md:text-sm hover:bg-racing-red transition-colors pointer-events-auto cursor-pointer min-h-[44px] flex items-center justify-center"
                    >
                        <span className="hidden md:inline">DISCOVER PERFORMANCE</span>
                        <span className="md:hidden">DISCOVER</span>
                    </button>
                </motion.div>
            </motion.div>

            {/* Phase 2: Design */}
            <motion.div
                style={{ opacity: designOpacity, x: designX, willChange: "transform, opacity" }}
                className="absolute inset-0 flex items-center justify-start pl-6 md:pl-12 lg:pl-32 pr-6 md:pr-12 z-20 transform-gpu"
            >
                <div className="bg-black/20 backdrop-blur-sm p-6 md:p-8 border-l-4 border-ferrari-red max-w-xl">
                    <h3 className="text-ferrari-red font-orbitron tracking-[0.3em] text-xs md:text-sm mb-2">AESTHETICS</h3>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-orbitron font-bold mb-4 md:mb-6 text-white">DESIGN</h2>
                    <p className="text-lg md:text-xl lg:text-2xl font-rajdhani text-metal-silver leading-relaxed">
                        Extreme performance defined by a carbon-fiber monocoque.
                        Every surface is sculpted for active aerodynamics and Italian elegance.
                    </p>
                </div>
            </motion.div>

            {/* Phase 3: Powertrain */}
            <motion.div
                style={{ opacity: perfOpacity, y: perfY, willChange: "transform, opacity" }}
                className="absolute inset-0 flex items-center justify-end pr-6 md:pr-12 lg:pr-32 pl-6 md:pl-12 z-20 transform-gpu"
            >
                <div className="bg-black/20 backdrop-blur-sm p-6 md:p-8 border-r-4 border-ferrari-red text-right">
                    <h3 className="text-ferrari-red font-orbitron tracking-[0.3em] text-xs md:text-sm mb-2">ENGINEERING</h3>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-orbitron font-bold mb-6 md:mb-8 text-white">POWERTRAIN</h2>

                    <div className="space-y-4 md:space-y-6">
                        <div className="flex flex-col items-end">
                            <span className="text-3xl md:text-4xl font-bold font-orbitron text-white">1000<span className="text-ferrari-red text-base md:text-lg ml-1">CV</span></span>
                            <span className="text-metal-silver font-rajdhani tracking-widest text-xs md:text-sm uppercase">V8 Turbo + 3 Electric Motors</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-3xl md:text-4xl font-bold font-orbitron text-white">2.5<span className="text-ferrari-red text-base md:text-lg ml-1">s</span></span>
                            <span className="text-metal-silver font-rajdhani tracking-widest text-xs md:text-sm uppercase">0-100 km/h</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-3xl md:text-4xl font-bold font-orbitron text-white">340<span className="text-ferrari-red text-base md:text-lg ml-1">km/h</span></span>
                            <span className="text-metal-silver font-rajdhani tracking-widest text-xs md:text-sm uppercase">Top Speed</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
