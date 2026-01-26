"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import FerrariScrollCanvas from "@/components/FerrariScrollCanvas";
import FerrariExperience from "@/components/FerrariExperience";
import { SpecsGrid, Heritage, Technology, Footer } from "@/components/Sections";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-ferrari-black min-h-screen text-white">
      <Navbar />

      {/* Master Scroll Section - 600vh height with relative positioning */}
      <section ref={containerRef} className="relative h-[600vh]">
        <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
          <FerrariScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={240}
            imageFolderPath="/images/ferrari-frames"
          />
          <FerrariExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* Content Below */}
      <div className="relative z-20 bg-ferrari-black">
        <SpecsGrid />
        <Heritage />
        <Technology />
        <Footer />
      </div>
    </main>
  );
}
