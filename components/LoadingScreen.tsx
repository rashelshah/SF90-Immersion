"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        // Check if we've already shown the loading screen in this session
        const hasLoaded = sessionStorage.getItem("ferrari_loaded");
        if (hasLoaded) {
            setIsLoading(false);
            return;
        }

        // Minimum display time of 2.5 seconds
        const minTimer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 2500);

        // Check if page is fully loaded
        const handleLoad = () => {
            setContentLoaded(true);
        };

        if (document.readyState === "complete") {
            setContentLoaded(true);
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            clearTimeout(minTimer);
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    // Hide loading screen only when both conditions are met
    useEffect(() => {
        if (minTimeElapsed && contentLoaded) {
            // Add a small delay for smooth transition
            setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem("ferrari_loaded", "true");
            }, 300);
        }
    }, [minTimeElapsed, contentLoaded]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-ferrari-black flex flex-col items-center justify-center"
                >
                    {/* Ferrari Logo Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-12"
                    >
                        <span className="font-orbitron font-bold text-5xl md:text-7xl tracking-widest text-ferrari-red drop-shadow-[0_0_30px_rgba(192,0,0,0.6)]">
                            FERRARI
                        </span>
                    </motion.div>

                    {/* SF90 Stradale Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-orbitron text-2xl md:text-4xl text-white tracking-[0.3em] mb-2">
                            SF90
                        </h2>
                        <p className="font-orbitron text-lg md:text-xl text-metal-silver tracking-[0.2em]">
                            STRADALE
                        </p>
                    </motion.div>

                    {/* Loading Bar */}
                    <div className="w-64 md:w-96 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="h-full w-1/2 bg-gradient-to-r from-transparent via-ferrari-red to-transparent"
                        />
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-ferrari-red/30"></div>
                    <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-ferrari-red/30"></div>
                    <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-ferrari-red/30"></div>
                    <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-ferrari-red/30"></div>

                    {/* Loading Text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-16 text-xs md:text-sm font-rajdhani text-metal-silver tracking-[0.3em] uppercase"
                    >
                        Loading Experience
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
