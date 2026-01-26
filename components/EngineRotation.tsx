"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function EngineRotation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress to frame number (1-240)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, 240]);
    const [currentFrame, setCurrentFrame] = useState(1);

    useEffect(() => {
        const unsubscribe = frameIndex.on("change", (latest) => {
            setCurrentFrame(Math.round(latest));
        });
        return unsubscribe;
    }, [frameIndex]);

    // Pad frame number to 3 digits
    const paddedFrame = String(currentFrame).padStart(3, '0');

    return (
        <div ref={containerRef} className="relative h-[400vh]">
            {/* Fixed engine display */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-radial from-ferrari-red/10 via-transparent to-transparent opacity-50" />

                {/* Title overlay */}
                <motion.div
                    className="absolute top-32 left-1/2 -translate-x-1/2 z-20 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold text-gradient-platinum mb-4">
                        THE HEART
                    </h1>
                    <p className="text-xl md:text-2xl font-rajdhani tracking-[0.3em] text-ferrari-red">
                        OF SF90 STRADALE
                    </p>
                </motion.div>

                {/* Engine image - scroll-controlled */}
                <motion.div
                    className="relative w-full h-full flex items-center justify-center"
                    style={{ willChange: "transform" }}
                >
                    <Image
                        src={`/engine-frames/ezgif-frame-${paddedFrame}.jpg`}
                        alt="Ferrari SF90 Engine"
                        width={1200}
                        height={800}
                        className="object-contain max-h-[70vh] w-auto drop-shadow-2xl"
                        priority={currentFrame === 1}
                        quality={90}
                    />
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: scrollYProgress.get() < 0.05 ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-metal-silver font-rajdhani tracking-widest text-sm uppercase">
                        Scroll to Explore
                    </span>
                    <motion.div
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <motion.div
                            className="w-1.5 h-3 bg-ferrari-red rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>
                </motion.div>

                {/* Frame counter */}
                <div className="absolute bottom-8 right-8 font-orbitron text-white/50 text-sm">
                    Frame {currentFrame} / 240
                </div>
            </div>
        </div>
    );
}
