"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

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

    if (!mounted) return null;

    return (
        <motion.nav
            style={{
                backgroundColor,
                backdropFilter: backdropBlur,
                borderBottomColor: borderColor,
                willChange: "transform, opacity",
            }}
            className="fixed top-0 left-0 w-full h-16 md:h-20 z-50 flex items-center justify-between px-4 md:px-6 lg:px-12 border-b border-transparent transition-colors duration-300 transform-gpu"
        >
            <div className="flex items-center gap-4">
                <span className="font-orbitron font-bold text-xl md:text-2xl tracking-widest text-ferrari-red drop-shadow-md">
                    FERRARI
                </span>
            </div>

            <button
                onClick={() => window.open('https://www.ferrari.com/en-US/auto/ferrari-sf90-stradale', '_blank')}
                className="px-4 md:px-6 py-2 border border-white/20 hover:bg-ferrari-red hover:border-ferrari-red transition-all duration-300 text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase font-orbitron font-medium cursor-pointer min-h-[44px] flex items-center"
            >
                Inquire
            </button>
        </motion.nav>
    );
}
