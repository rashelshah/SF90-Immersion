"use client";

import { motion } from "framer-motion";
import { CAR_DATA } from "@/data/carData";

export default function ElectricMotors() {
    const motors = [
        CAR_DATA.hybridSystem.motors.frontLeft,
        CAR_DATA.hybridSystem.motors.frontRight,
        CAR_DATA.hybridSystem.motors.rear
    ];

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
                    Electric Powertrains
                </h2>
                <h3 className="text-4xl md:text-5xl font-orbitron font-bold text-white">
                    Triple Motor System
                </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {motors.map((motor, index) => (
                    <motion.div
                        key={motor.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className="group relative bg-gradient-to-br from-blue-950/20 to-black/40 backdrop-blur-sm p-8 rounded-2xl border border-blue-400/20 hover:border-blue-400/60 transition-all duration-300"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-2xl transition-all duration-300" />

                        <div className="relative z-10">
                            {/* Motor Icon */}
                            <div className="mb-6 flex justify-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/10 flex items-center justify-center border-2 border-blue-400/40 group-hover:border-blue-400 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300">
                                    <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Motor Name */}
                            <h4 className="text-2xl font-orbitron font-bold text-white mb-3 text-center">
                                {motor.name}
                            </h4>

                            {/* Power */}
                            <div className="text-center mb-4">
                                <span className="text-4xl font-bold font-orbitron text-blue-400">
                                    {motor.power}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-metal-silver/80 font-rajdhani leading-relaxed text-center">
                                {motor.description}
                            </p>

                            {/* Accent line */}
                            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Total Output */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-12 text-center"
            >
                <p className="text-metal-silver font-rajdhani text-lg">
                    Total Electric Output: <span className="text-blue-400 font-bold text-2xl">{CAR_DATA.hybridSystem.electricPower}</span>
                </p>
            </motion.div>
        </div>
    );
}
