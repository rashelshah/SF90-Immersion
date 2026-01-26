"use client";

import { motion } from "framer-motion";

const specs = [
    {
        number: "01",
        title: "Variable Torque Dynamics",
        description: "Intelligent torque distribution across all four wheels provides unprecedented traction and cornering capability.",
        icon: "⚡"
    },
    {
        number: "02",
        title: "Transition Manager",
        description: "Seamlessly coordinates power delivery between combustion and electric systems for optimal performance.",
        icon: "🔄"
    },
    {
        number: "03",
        title: "Brake-by-Wire",
        description: "Advanced regenerative braking system maximizes energy recovery while maintaining Ferrari's legendary brake feel.",
        icon: "🎯"
    },
    {
        number: "04",
        title: "eSSC System",
        description: "Electronic Side Slip Control integrates hybrid powertrain for precise, adjustable vehicle dynamics.",
        icon: "📐"
    }
];

export default function EngineSpecs() {
    return (
        <div className="py-32 px-6 md:px-12 lg:px-32">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <h2 className="text-ferrari-red font-orbitron tracking-[0.3em] text-sm mb-4">
                    INNOVATION
                </h2>
                <h3 className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white">
                    TECHNICAL EXCELLENCE
                </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {specs.map((spec, index) => (
                    <motion.div
                        key={spec.number}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -12, transition: { duration: 0.3 } }}
                        className="group relative bg-black/20 backdrop-blur-sm p-8 cursor-pointer transform-gpu"
                    >
                        {/* Animated border glow */}
                        <motion.div
                            className="absolute inset-0 border border-white/10 group-hover:border-ferrari-red/50 transition-colors duration-300"
                            animate={{
                                boxShadow: [
                                    "0 0 0 rgba(220, 38, 38, 0)",
                                    "0 0 20px rgba(220, 38, 38, 0.3)",
                                    "0 0 0 rgba(220, 38, 38, 0)"
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        {/* Corner accent */}
                        <motion.div
                            className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-ferrari-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ width: 0, height: 0 }}
                            whileHover={{ width: 64, height: 64 }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Number indicator */}
                        <motion.div
                            className="absolute -top-4 -left-4 w-12 h-12 bg-ferrari-red flex items-center justify-center font-orbitron font-bold text-white"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            {spec.number}
                        </motion.div>

                        {/* Icon */}
                        <div className="text-5xl mb-6 opacity-30 group-hover:opacity-50 transition-opacity">
                            {spec.icon}
                        </div>

                        {/* Title */}
                        <h4 className="text-2xl md:text-3xl font-orbitron font-bold mb-4 text-white group-hover:text-gradient-platinum transition-all duration-300">
                            {spec.title}
                        </h4>

                        {/* Description */}
                        <p className="text-metal-silver font-rajdhani text-lg leading-relaxed">
                            {spec.description}
                        </p>

                        {/* Bottom accent bar */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-ferrari-red to-transparent"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.4 }}
                        />

                        {/* Metallic shine on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
