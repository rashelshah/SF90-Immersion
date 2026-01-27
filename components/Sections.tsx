"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export function SpecsGrid() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const specs = [
        { label: "ICE POWER", value: "780", unit: "cv" },
        { label: "ELECTRIC MOTORS", value: "220", unit: "cv" },
        { label: "MAX TORQUE", value: "800", unit: "Nm" },
        { label: "DRY WEIGHT", value: "1570", unit: "kg" },
        { label: "BATTERY CAPACITY", value: "7.9", unit: "kWh" },
        { label: "E-DRIVE RANGE", value: "25", unit: "km" }
    ];

    return (
        <section
            id="specs"
            ref={ref}
            className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 bg-gradient-to-b from-ferrari-black via-carbon-gray to-ferrari-black relative overflow-hidden transform-gpu"
        >
            {/* Animated corner brackets */}
            <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-ferrari-red/30"></div>
            <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-ferrari-red/30"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-ferrari-red/30"></div>
            <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-ferrari-red/30"></div>

            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-ferrari-red/5 via-transparent to-transparent"></div>

            {/* Animated scan line */}
            <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-1 h-full bg-gradient-to-b from-transparent via-ferrari-red/30 to-transparent"
            ></motion.div>

            <div className="max-w-7xl mx-auto border-t border-white/10 pt-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-ferrari-red font-orbitron tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm mb-4 block">
                        PERFORMANCE DATA
                    </span>
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-6 text-white">
                        TECHNICAL SPECIFICATIONS
                    </h3>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="w-32 h-1 bg-ferrari-red mx-auto"
                    ></motion.div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {specs.map((spec, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, rotateX: 10 }}
                            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                            transition={{
                                duration: 0.6,
                                delay: 0.4 + i * 0.08,
                                type: "spring",
                                stiffness: 120,
                                damping: 15
                            }}
                            whileHover={{
                                y: -12,
                                scale: 1.02,
                                transition: { duration: 0.3, type: "spring", stiffness: 300 }
                            }}
                            style={{ willChange: "transform, opacity" }}
                            className="relative p-6 md:p-8 glass-panel-red border-white/10 hover:border-ferrari-red/60 transition-all group overflow-hidden transform-gpu luxury-shadow"
                        >
                            {/* Premium glow effect on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-ferrari-red/10 via-racing-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            ></motion.div>

                            {/* Animated border shine */}
                            <motion.div
                                className="absolute inset-0 border-2 border-transparent group-hover:border-ferrari-red/30 transition-all duration-500"
                                animate={{
                                    boxShadow: ["0 0 0px rgba(192,0,0,0)", "0 0 20px rgba(192,0,0,0.3)", "0 0 0px rgba(192,0,0,0)"]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                            />

                            {/* Top corner accent - enhanced */}
                            <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-ferrari-red/40 group-hover:border-ferrari-red group-hover:w-16 group-hover:h-16 transition-all duration-300"></div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h4 className="text-xs font-rajdhani text-metal-silver mb-4 tracking-[0.3em] uppercase group-hover:text-gradient-red transition-all">
                                    {spec.label}
                                </h4>
                                <div className="flex items-baseline gap-2">
                                    <motion.span
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                        className="text-5xl md:text-6xl font-orbitron font-bold text-gradient-platinum"
                                    >
                                        {spec.value}
                                    </motion.span>
                                    <span className="text-xl md:text-2xl font-orbitron text-gradient-red">{spec.unit}</span>
                                </div>
                            </div>

                            {/* Bottom accent line - enhanced */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
                                className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-ferrari-red via-racing-red to-transparent origin-left group-hover:h-2 transition-all duration-300"
                            ></motion.div>

                            {/* Number indicator - enhanced */}
                            <motion.div
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/20 group-hover:border-ferrari-red/50 text-white/30 group-hover:text-ferrari-red/70 font-orbitron text-xs transition-all duration-300 glass-panel"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                {String(i + 1).padStart(2, '0')}
                            </motion.div>

                            {/* Metallic shine on hover */}
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{
                                    background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)",
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Heritage() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const stats = [
        { year: "2019", title: "90 YEARS", desc: "Scuderia Ferrari Anniversary" },
        { year: "1000", title: "CV", desc: "Total Power Output" },
        { year: "2.5s", title: "0-100", desc: "Acceleration km/h" },
        { year: "340", title: "km/h", desc: "Top Speed" }
    ];

    return (
        <section
            ref={ref}
            className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 bg-gradient-to-b from-ferrari-black via-carbon-gray to-ferrari-black relative overflow-hidden transform-gpu"
        >
            {/* Animated corner brackets */}
            <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-ferrari-red/30"></div>
            <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-ferrari-red/30"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-ferrari-red/30"></div>
            <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-ferrari-red/30"></div>

            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-ferrari-red/5 via-transparent to-transparent"></div>

            {/* Animated scan line */}
            <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-1 h-full bg-gradient-to-b from-transparent via-ferrari-red/30 to-transparent"
            ></motion.div>

            <div className="max-w-7xl mx-auto border-t border-white/10 pt-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-ferrari-red font-orbitron tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm mb-4 block">
                        FERRARI HERITAGE
                    </span>
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-6 text-white">
                        RACING DNA
                    </h3>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="w-32 h-1 bg-ferrari-red mx-auto"
                    ></motion.div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-lg md:text-xl font-rajdhani text-metal-silver leading-relaxed mb-6 text-center max-w-4xl mx-auto px-4"
                >
                    The SF90 Stradale represents Ferrari's most advanced technological achievements,
                    drawing directly from decades of Formula 1 expertise. Every element, from the
                    hybrid powertrain to the aerodynamic solutions, embodies the Prancing Horse's
                    relentless pursuit of performance.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-base md:text-lg font-rajdhani text-metal-silver leading-relaxed mb-16 text-center max-w-4xl mx-auto px-4"
                >
                    Named after the 90th anniversary of Scuderia Ferrari's foundation (1929-2019),
                    the SF90 Stradale is the first plug-in hybrid series-production sports car
                    from Maranello.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, rotateX: 10 }}
                            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                            transition={{
                                duration: 0.6,
                                delay: 0.4 + i * 0.08,
                                type: "spring",
                                stiffness: 120,
                                damping: 15
                            }}
                            whileHover={{
                                y: -12,
                                scale: 1.02,
                                transition: { duration: 0.3, type: "spring", stiffness: 300 }
                            }}
                            style={{ willChange: "transform, opacity" }}
                            className="relative p-6 md:p-8 glass-panel-red border-white/10 hover:border-ferrari-red/60 transition-all group overflow-hidden transform-gpu luxury-shadow"
                        >
                            {/* Premium glow effect on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-ferrari-red/10 via-racing-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            ></motion.div>

                            {/* Animated border shine */}
                            <motion.div
                                className="absolute inset-0 border-2 border-transparent group-hover:border-ferrari-red/30 transition-all duration-500"
                                animate={{
                                    boxShadow: ["0 0 0px rgba(192,0,0,0)", "0 0 20px rgba(192,0,0,0.3)", "0 0 0px rgba(192,0,0,0)"]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                            />

                            {/* Top corner accent - enhanced */}
                            <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-ferrari-red/40 group-hover:border-ferrari-red group-hover:w-16 group-hover:h-16 transition-all duration-300"></div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h4 className="text-xs font-rajdhani text-metal-silver mb-4 tracking-[0.3em] uppercase group-hover:text-gradient-red transition-all">
                                    {stat.desc}
                                </h4>
                                <div className="text-4xl md:text-5xl font-orbitron font-bold text-gradient-red mb-2">{stat.year}</div>
                                <div className="text-lg md:text-xl font-orbitron text-gradient-platinum">{stat.title}</div>
                            </div>

                            {/* Bottom accent line - enhanced */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
                                className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-ferrari-red via-racing-red to-transparent origin-left group-hover:h-2 transition-all duration-300"
                            ></motion.div>

                            {/* Number indicator - enhanced */}
                            <motion.div
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/20 group-hover:border-ferrari-red/50 text-white/30 group-hover:text-ferrari-red/70 font-orbitron text-xs transition-all duration-300 glass-panel"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                {String(i + 1).padStart(2, '0')}
                            </motion.div>

                            {/* Metallic shine on hover */}
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{
                                    background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)",
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Technology() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const technologies = [
        {
            title: "Hybrid Architecture",
            icon: "⚡",
            desc: "RAC-e (Race derived electronic controls) manages the torque distribution between front and rear axles for unprecedented traction and stability.",
            link: "/hybrid-systems"
        },
        {
            title: "Aerodynamics",
            icon: "✈",
            desc: "Shut-off Gurney, active front flaps, and rear diffuser generate 390 kg of downforce at 250 km/h - a 25% increase over the 488 GTB.",
            link: "/aerodynamics"
        },
        {
            title: "8-Speed DCT",
            icon: "⚙",
            desc: "Redesigned dual-clutch transmission optimized for hybrid architecture with 30% faster gear changes than previous generation."
        },
        {
            title: "Carbon Fiber",
            icon: "🏎",
            desc: "Extensive use of carbon fiber in chassis and bodywork achieves optimal power-to-weight ratio of 0.64 kg/cv."
        },
        {
            title: "Side Slip Control 8.0",
            icon: "🎯",
            desc: "Latest evolution of Ferrari's vehicle dynamics controls integrates hybrid powertrain management for ultimate precision."
        },
        {
            title: "eManettino",
            icon: "🔘",
            desc: "New rotary switch on steering wheel controls four power modes: eDrive, Hybrid, Performance, and Qualify."
        }
    ];

    return (
        <section
            ref={ref}
            className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 bg-gradient-to-b from-ferrari-black via-carbon-gray to-ferrari-black relative overflow-hidden transform-gpu"
        >
            {/* Animated corner brackets */}
            <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-ferrari-red/30"></div>
            <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-ferrari-red/30"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-ferrari-red/30"></div>
            <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-ferrari-red/30"></div>

            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-ferrari-red/5 via-transparent to-transparent"></div>

            {/* Animated scan line */}
            <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-1 h-full bg-gradient-to-b from-transparent via-ferrari-red/30 to-transparent"
            ></motion.div>

            <div className="max-w-7xl mx-auto border-t border-white/10 pt-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-ferrari-red font-orbitron tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm mb-4 block">
                        INNOVATIVE SYSTEMS
                    </span>
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-6 text-white">
                        TECHNOLOGY
                    </h3>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="w-32 h-1 bg-ferrari-red mx-auto"
                    ></motion.div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {technologies.map((tech, i) => {
                        const CardContent = (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.4 + i * 0.08,
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 15
                                }}
                                whileHover={{
                                    y: -12,
                                    scale: 1.02,
                                    transition: { duration: 0.3, type: "spring", stiffness: 300 }
                                }}
                                style={{ willChange: "transform, opacity" }}
                                className={`relative p-6 md:p-8 glass-panel-red border-white/10 hover:border-ferrari-red/60 transition-all group overflow-hidden transform-gpu luxury-shadow ${tech.link ? 'cursor-pointer' : ''}`}
                            >
                                {/* Premium glow effect on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-ferrari-red/10 via-racing-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                ></motion.div>

                                {/* Animated border shine */}
                                <motion.div
                                    className="absolute inset-0 border-2 border-transparent group-hover:border-ferrari-red/30 transition-all duration-500"
                                    animate={{
                                        boxShadow: ["0 0 0px rgba(192,0,0,0)", "0 0 20px rgba(192,0,0,0.3)", "0 0 0px rgba(192,0,0,0)"]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 1
                                    }}
                                />

                                {/* Top corner accent - enhanced */}
                                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-ferrari-red/40 group-hover:border-ferrari-red group-hover:w-16 group-hover:h-16 transition-all duration-300"></div>

                                {/* Icon with enhanced hover effect */}
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 8 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                    className="text-5xl md:text-6xl mb-6 relative z-10 filter drop-shadow-lg"
                                >
                                    {tech.icon}
                                </motion.div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-xl md:text-2xl font-orbitron font-bold mb-4 text-gradient-platinum group-hover:text-gradient-red transition-all duration-300">
                                        {tech.title}
                                    </h3>
                                    <p className="text-sm md:text-base font-rajdhani text-white/80 leading-relaxed">
                                        {tech.desc}
                                    </p>
                                </div>

                                {/* Bottom accent line - enhanced */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
                                    className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-ferrari-red via-racing-red to-transparent origin-left group-hover:h-2 transition-all duration-300"
                                ></motion.div>

                                {/* Number indicator - enhanced */}
                                <motion.div
                                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/20 group-hover:border-ferrari-red/50 text-white/30 group-hover:text-ferrari-red/70 font-orbitron text-xs transition-all duration-300 glass-panel"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </motion.div>

                                {/* Metallic shine on hover */}
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                    style={{
                                        background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)",
                                    }}
                                />

                                {/* Link indicator for clickable cards */}
                                {tech.link && (
                                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-ferrari-red text-xl">→</span>
                                    </div>
                                )}
                            </motion.div>
                        );

                        return tech.link ? (
                            <Link key={i} href={tech.link}>
                                {CardContent}
                            </Link>
                        ) : (
                            CardContent
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="py-24 bg-ferrari-black relative border-t border-white/5"
        >
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-ferrari-red font-orbitron tracking-[0.3em] text-sm mb-4 block">OPTIONAL PACKAGE</span>
                    <h2 className="text-5xl font-orbitron font-bold mb-6">ASSETTO FIORANO</h2>
                    <p className="text-lg font-rajdhani text-metal-silver leading-relaxed mb-8">
                        The SF90 Stradale is also available with the Assetto Fiorano specification, which includes significant upgrades,
                        including special GT racing-derived Multimatic shock absorbers, extra lightweight features made from high-performance
                        materials such as carbon-fiber (door panels, underbody) and titanium (springs, entire exhaust line).
                    </p>
                    <div className="space-y-4">
                        {[
                            { title: "Weight Reduction", desc: "30 kg lighter than standard spec" },
                            { title: "Michelin Pilot Sport Cup 2", desc: "Track-focused tire compound" },
                            { title: "Exclusive Livery", desc: "Iconic Italian racing stripes" }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                                className="flex items-start gap-3"
                            >
                                <div className="w-1 h-8 bg-ferrari-red flex-shrink-0"></div>
                                <div>
                                    <h4 className="font-orbitron text-white mb-1">{feature.title}</h4>
                                    <p className="text-sm font-rajdhani text-metal-silver">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-96 w-full bg-gradient-to-br from-ferrari-red/5 to-ferrari-black border border-ferrari-red/20 flex items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-ferrari-red/10 via-transparent to-transparent"></div>
                    <span className="font-orbitron text-ferrari-red/40 tracking-widest relative z-10">ASSETTO FIORANO</span>
                </motion.div>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="relative bg-ferrari-black py-12 border-t border-white/10 overflow-hidden">
            {/* Premium background glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-ferrari-red/5 via-transparent to-transparent pointer-events-none"></div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'linear-gradient(rgba(192,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,0,0,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }}></div>

            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                <motion.div
                    className="font-orbitron font-bold text-2xl tracking-widest text-gradient-red relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    FERRARI
                    <motion.div
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-ferrari-red via-racing-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                    />
                </motion.div>

                <div className="flex gap-8 text-sm font-rajdhani tracking-wider">
                    {['MODELS', 'RACELINE', 'UNIVERSE', 'STORE'].map((link, i) => (
                        <motion.a
                            key={link}
                            href="#"
                            className="relative text-metal-silver hover:text-gradient-red transition-all group"
                            whileHover={{ y: -2 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            {link}
                            <motion.div
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-ferrari-red to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                            />
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    className="text-xs text-metal-silver/50 font-rajdhani"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    © 2024 FERRARI S.p.A
                </motion.div>
            </div>
        </footer>
    );
}
