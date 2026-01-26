"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import EngineExperience from "@/components/EngineExperience";

export default function EnginePage() {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative bg-deep-black text-white overflow-x-hidden"
        >
            <Navbar />
            <EngineExperience />
        </motion.main>
    );
}
