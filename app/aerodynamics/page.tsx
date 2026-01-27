"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AerodynamicsExperience from "@/components/AerodynamicsExperience";

export default function AerodynamicsPage() {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative bg-deep-black text-white overflow-x-hidden"
        >
            <Navbar />
            <AerodynamicsExperience />
        </motion.main>
    );
}
