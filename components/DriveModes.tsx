"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CAR_DATA } from "@/data/carData";

type DriveModeName = "eDrive" | "hybrid" | "performance" | "qualify";

export default function DriveModes() {
    const [selectedMode, setSelectedMode] = useState<DriveModeName>("hybrid");

    const modes = CAR_DATA.hybridSystem.driveModes;
    const currentMode = modes[selectedMode];

    return (
        <div className="w-full max-w-7xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-blue-400 font-orbitron tracking-[0.3em] text-sm mb-4 uppercase">
                    eManettino Drive Modes
                </h2>
                <h3 className="text-4xl md:text-5xl font-orbitron font-bold text-white">
                    Adaptive Performance
                </h3>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Mode Buttons */}
                <div className="space-y-4">
                    {(Object.keys(modes) as DriveModeName[]).map((modeKey, index) => {
                        const mode = modes[modeKey];
                        const isSelected = selectedMode === modeKey;

                        return (
                            <motion.button
                                key={modeKey}
                                onClick={() => setSelectedMode(modeKey)}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    w-full text-left p-6 rounded-xl border-2 transition-all duration-300
                                    ${isSelected
                                        ? 'bg-black/60 backdrop-blur-md shadow-lg'
                                        : 'bg-black/20 backdrop-blur-sm hover:bg-black/30'
                                    }
                                `}
                                style={{
                                    borderColor: isSelected ? mode.color : 'rgba(255,255,255,0.1)'
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h4 className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-1">
                                            {mode.name}
                                        </h4>
                                        {isSelected && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="text-sm text-metal-silver/80 font-rajdhani mt-2"
                                            >
                                                {mode.description}
                                            </motion.p>
                                        )}
                                    </div>

                                    {/* Mode Indicator */}
                                    <div
                                        className={`w-4 h-4 rounded-full flex-shrink-0 transition-all duration-300 ${isSelected ? 'ring-2 ring-offset-2 ring-offset-black' : 'opacity-30'}`}
                                        style={{
                                            backgroundColor: mode.color,
                                            ['--tw-ring-color' as any]: isSelected ? mode.color : 'transparent'
                                        }}
                                    />
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Mode Visualization */}
                <motion.div
                    key={selectedMode}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                >
                    <div className="relative bg-black/40 backdrop-blur-md p-12 rounded-2xl border border-white/10">
                        {/* Dynamic Glow */}
                        <div
                            className="absolute inset-0 rounded-2xl blur-2xl transition-all duration-500"
                            style={{
                                background: `radial-gradient(circle at center, ${currentMode.color}40, transparent 70%)`
                            }}
                        />

                        {/* Car Silhouette */}
                        <div className="relative aspect-video flex items-center justify-center">
                            <svg
                                viewBox="0 0 400 200"
                                className="w-full h-auto transition-all duration-500"
                                fill="none"
                                stroke={currentMode.color}
                                strokeWidth="2"
                            >
                                {/* Car body */}
                                <path
                                    d="M 50 140 L 80 120 L 120 110 L 200 110 L 280 120 L 320 130 L 350 140 L 350 150 L 320 155 L 320 145 L 280 145 L 280 155 L 120 155 L 120 145 L 80 145 L 80 155 L 50 150 Z"
                                    fill={`${currentMode.color}15`}
                                    className="transition-all duration-500"
                                />
                                {/* Windshield */}
                                <path
                                    d="M 140 110 L 160 90 L 220 90 L 240 110"
                                    strokeWidth="1.5"
                                />
                                {/* Wheels */}
                                <circle cx="110" cy="155" r="15" fill={currentMode.color} opacity="0.3" />
                                <circle cx="290" cy="155" r="15" fill={currentMode.color} opacity="0.3" />

                                {/* Energy lines for electric modes */}
                                {(selectedMode === "eDrive" || selectedMode === "hybrid") && (
                                    <>
                                        <motion.path
                                            d="M 200 100 L 110 145"
                                            stroke={currentMode.color}
                                            strokeWidth="1"
                                            strokeDasharray="4 2"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                        <motion.path
                                            d="M 200 100 L 290 145"
                                            stroke={currentMode.color}
                                            strokeWidth="1"
                                            strokeDasharray="4 2"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
                                        />
                                    </>
                                )}
                            </svg>
                        </div>

                        {/* Mode Name */}
                        <div className="mt-8 text-center">
                            <motion.h5
                                key={selectedMode}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl font-orbitron font-bold transition-all duration-300"
                                style={{ color: currentMode.color }}
                            >
                                {currentMode.name.toUpperCase()}
                            </motion.h5>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
