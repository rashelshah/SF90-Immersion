"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HybridExperience from "@/components/HybridExperience";

export default function HybridSystemsPage() {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative bg-deep-black text-white overflow-x-hidden"
        >
            <Navbar />
            <HybridExperience />
        </motion.main>
    );
}
