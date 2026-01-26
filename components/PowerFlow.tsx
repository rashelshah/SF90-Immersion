"use client";

import { motion } from "framer-motion";

export default function PowerFlow() {
    return (
        <div className="w-full max-w-6xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-blue-400 font-orbitron tracking-[0.3em] text-sm mb-4 uppercase">
                    Power Distribution
                </h2>
                <h3 className="text-4xl md:text-5xl font-orbitron font-bold text-white">
                    Intelligent Energy Flow
                </h3>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative bg-black/30 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-blue-400/20"
            >
                {/* SVG Power Flow Visualization */}
                <svg
                    viewBox="0 0 800 500"
                    className="w-full h-auto"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Car Outline - Top Down View */}
                    <g className="car-outline">
                        <path
                            d="M 250 150 L 300 100 L 500 100 L 550 150 L 550 400 L 500 450 L 300 450 L 250 400 Z"
                            fill="rgba(255,255,255,0.05)"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="2"
                        />
                        <path
                            d="M 300 120 L 320 140 L 480 140 L 500 120"
                            fill="none"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="1.5"
                        />
                    </g>

                    {/* Battery Position (center-rear) */}
                    <g className="battery">
                        <rect
                            x="350"
                            y="280"
                            width="100"
                            height="60"
                            rx="5"
                            fill="rgba(59, 130, 246, 0.3)"
                            stroke="rgb(59, 130, 246)"
                            strokeWidth="2"
                        />
                        <text x="400" y="315" fontSize="14" fill="rgb(59, 130, 246)" textAnchor="middle" fontFamily="monospace">
                            BATTERY
                        </text>
                    </g>

                    {/* Engine Position (rear-center) */}
                    <g className="engine">
                        <rect
                            x="360"
                            y="360"
                            width="80"
                            height="60"
                            rx="5"
                            fill="rgba(220, 38, 38, 0.2)"
                            stroke="rgb(220, 38, 38)"
                            strokeWidth="2"
                        />
                        <text x="400" y="395" fontSize="12" fill="rgb(220, 38, 38)" textAnchor="middle" fontFamily="monospace">
                            V8
                        </text>
                    </g>

                    {/* Front Left Motor */}
                    <circle cx="280" cy="150" r="25" fill="rgba(59, 130, 246, 0.2)" stroke="rgb(59, 130, 246)" strokeWidth="2" />
                    <text x="280" y="153" fontSize="10" fill="rgb(59, 130, 246)" textAnchor="middle" fontFamily="monospace">FL</text>

                    {/* Front Right Motor */}
                    <circle cx="520" cy="150" r="25" fill="rgba(59, 130, 246, 0.2)" stroke="rgb(59, 130, 246)" strokeWidth="2" />
                    <text x="520" y="153" fontSize="10" fill="rgb(59, 130, 246)" textAnchor="middle" fontFamily="monospace">FR</text>

                    {/* Rear Motor (MGU-K) */}
                    <circle cx="400" cy="430" r="20" fill="rgba(59, 130, 246, 0.2)" stroke="rgb(59, 130, 246)" strokeWidth="2" />
                    <text x="400" y="433" fontSize="9" fill="rgb(59, 130, 246)" textAnchor="middle" fontFamily="monospace">R</text>

                    {/* Power Flow Gradients */}
                    <defs>
                        <linearGradient id="powerGradientBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                            <stop offset="50%" stopColor="rgb(59, 130, 246)" />
                            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                        </linearGradient>
                        <linearGradient id="powerGradientRed" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(220, 38, 38, 0)" />
                            <stop offset="50%" stopColor="rgb(220, 38, 38)" />
                            <stop offset="100%" stopColor="rgba(220, 38, 38, 0)" />
                        </linearGradient>
                    </defs>

                    {/* Simplified animated power lines */}
                    {/* Battery to Front Left Motor */}
                    <motion.path
                        d="M 380 280 Q 330 220 280 175"
                        fill="none"
                        stroke="url(#powerGradientBlue)"
                        strokeWidth="3"
                        strokeDasharray="8 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1],
                            opacity: [0, 0.8, 0.8, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Battery to Front Right Motor */}
                    <motion.path
                        d="M 420 280 Q 470 220 520 175"
                        fill="none"
                        stroke="url(#powerGradientBlue)"
                        strokeWidth="3"
                        strokeDasharray="8 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1],
                            opacity: [0, 0.8, 0.8, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.3,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Battery to Rear Motor */}
                    <motion.path
                        d="M 400 340 L 400 410"
                        fill="none"
                        stroke="url(#powerGradientBlue)"
                        strokeWidth="3"
                        strokeDasharray="8 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1],
                            opacity: [0, 0.8, 0.8, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0.6,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Engine power to wheels */}
                    <motion.path
                        d="M 360 390 L 280 420 M 440 390 L 520 420"
                        fill="none"
                        stroke="url(#powerGradientRed)"
                        strokeWidth="3"
                        strokeDasharray="8 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1],
                            opacity: [0, 0.8, 0.8, 0]
                        }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            delay: 0.9,
                            ease: "easeInOut"
                        }}
                    />
                </svg>

                {/* Legend */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-rajdhani">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
                        <span className="text-blue-400">Electric Power Flow</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-ferrari-red to-transparent" />
                        <span className="text-ferrari-red">Combustion Power Flow</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
