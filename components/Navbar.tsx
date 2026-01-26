"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
    const backgroundColor = useTransform(bgOpacity, (v) => `rgba(11, 11, 11, ${v})`);
    const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
    const borderColor = useTransform(scrollY, [0, 100], ["rgba(255,255,255,0)", "rgba(255,255,255,0.1)"]);
    const shadowOpacity = useTransform(scrollY, [0, 100], [0, 1]);

    if (!mounted) return null;

    return (
        <motion.nav
            style={{
                backgroundColor,
                backdropFilter: backdropBlur,
                borderBottomColor: borderColor,
                willChange: "transform, opacity",
            }}
            className="fixed top-0 left-0 w-full h-16 md:h-20 z-50 flex items-center justify-between px-4 md:px-6 lg:px-12 border-b border-transparent transition-all duration-300 transform-gpu"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            {/* Premium shadow effect on scroll */}
            <motion.div
                className="absolute inset-0 -z-10 luxury-shadow opacity-0"
                style={{
                    opacity: shadowOpacity
                }}
            />

            <div className="flex items-center gap-4 md:gap-8">
                <motion.div
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    <Link href="/" className="font-orbitron font-bold text-xl md:text-2xl tracking-widest text-gradient-red drop-shadow-md relative cursor-pointer">
                        FERRARI
                        <motion.div
                            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-ferrari-red via-racing-red to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                    </Link>
                </motion.div>

                {/* Engine Navigation Link */}
                <Link href="/engine" className="block">
                    <motion.button
                        className="flex items-center gap-2 text-white/70 hover:text-ferrari-red transition-colors duration-300 font-rajdhani tracking-wider uppercase text-xs md:text-sm"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <span>Engine</span>
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </motion.button>
                </Link>

                {/* Hybrid Systems Navigation Link */}
                <Link href="/hybrid-systems" className="block">
                    <motion.button
                        className="flex items-center gap-2 text-white/70 hover:text-blue-400 transition-colors duration-300 font-rajdhani tracking-wider uppercase text-xs md:text-sm"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <span>Hybrid</span>
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </motion.button>
                </Link>
            </div>

            <motion.button
                onClick={() => window.open('https://www.ferrari.com/en-US/auto/ferrari-sf90-stradale', '_blank')}
                className="relative px-4 md:px-6 py-2 border border-white/20 transition-all duration-300 text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase font-orbitron font-medium cursor-pointer min-h-[44px] flex items-center overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Gradient background on hover */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-ferrari-red via-racing-red to-ferrari-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                />

                {/* Metallic shine effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                />

                {/* Glow effect */}
                <motion.div
                    className="absolute inset-0 glow-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <span className="relative z-10">Inquire</span>
            </motion.button>
        </motion.nav>
    );
}
