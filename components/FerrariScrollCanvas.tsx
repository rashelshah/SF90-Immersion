"use client";

import { useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface FerrariScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function FerrariScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: FerrariScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const frameIndexRef = useRef(0);

    // Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            img.src = `${imageFolderPath}/${i}.jpg`;
            img.onload = () => {
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                    console.log("✅ All images loaded!");
                }
            };
            img.onerror = () => {
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };
            imgArray.push(img);
        }
        setImages(imgArray);
    }, [totalFrames, imageFolderPath]);

    // Draw Function
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const img = images[index];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        const dpr = window.devicePixelRatio || 1;
        const canvasWidth = canvas.width / dpr;
        const canvasHeight = canvas.height / dpr;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgRatio;
            offsetY = 0;
            offsetX = (canvasWidth - drawWidth) / 2;
        }

        // Crop bottom 10% of source image to hide watermark
        const cropBottomPercent = 0.10;
        const sourceHeight = img.height * (1 - cropBottomPercent);

        ctx.drawImage(
            img,
            0, 0, img.width, sourceHeight,  // Source: crop bottom
            offsetX * dpr,
            offsetY * dpr,
            drawWidth * dpr,
            drawHeight * dpr
        );
    };

    // Sync with Scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        const frameIndex = Math.min(
            totalFrames - 1,
            Math.max(0, Math.floor(latest * totalFrames))
        );

        if (frameIndexRef.current !== frameIndex) {
            frameIndexRef.current = frameIndex;
            renderFrame(frameIndex);
        }
    });

    // Handle Resize & Initial Draw
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const dpr = window.devicePixelRatio || 1;
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                canvas.style.width = `${window.innerWidth}px`;
                canvas.style.height = `${window.innerHeight}px`;

                if (isLoaded && images.length > 0) {
                    renderFrame(frameIndexRef.current);
                }
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, images]);

    // Initial draw once loaded
    useEffect(() => {
        if (isLoaded && images.length > 0) {
            console.log("Drawing initial frame");
            renderFrame(0);
        }
    }, [isLoaded, images]);

    return (
        <div className="absolute inset-0">
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-ferrari-black z-50">
                    <div className="flex flex-col items-center max-w-md w-full px-6">
                        <div className="text-ferrari-red font-orbitron tracking-widest text-xl mb-6 text-center">
                            LOADING {loadingProgress}%
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-ferrari-red transition-all duration-300"
                                style={{ width: `${loadingProgress}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="block w-full h-full bg-ferrari-black"
                style={{ opacity: isLoaded ? 1 : 0 }}
            />
        </div>
    );
}
