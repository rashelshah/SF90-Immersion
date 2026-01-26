"use client";

import { useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface UniversalScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
    imagePrefix?: string; // e.g., "ezgif-frame-" or "frame-"
    imageExtension?: string; // e.g., "jpg" or "webp"
    cropBottomPercent?: number; // 0 to 1, e.g., 0.10 for 10%
    loadingText?: string;
}

export default function UniversalScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
    imagePrefix = "",
    imageExtension = "jpg",
    cropBottomPercent = 0,
    loadingText = "LOADING EXPERIENCE"
}: UniversalScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const frameIndexRef = useRef(0);

    // Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];
        const padLength = 3; // Assuming 001, 002 based on current files

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const paddedIndex = String(i).padStart(padLength, '0');
            img.src = `${imageFolderPath}/${imagePrefix}${paddedIndex}.${imageExtension}`;

            img.onload = () => {
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };

            img.onerror = () => {
                console.error(`Failed to load image: ${img.src}`);
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };

            imgArray.push(img);
        }
        setImages(imgArray);
    }, [totalFrames, imageFolderPath, imagePrefix, imageExtension]);

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

        // "Cover" logic
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

        // Apply cropping if requested (e.g., to remove watermark)
        const sourceHeight = img.height * (1 - cropBottomPercent);

        // Adjust source dimensions if cropping
        // If we crop the source, we simply draw less of the image.
        // However, the aspect ratio calculation above usually assumes full image.
        // For correct 'cover' with cropping, we should probably crop first then scale?
        // But the simplified approach is: draw the image normally, but use drawImage parameters to slice.

        // Correct approach for cropping + cover:
        // We effectively treat the CROPPED image as the source for aspect ratio calculations.
        const effectiveImgHeight = img.height * (1 - cropBottomPercent);
        const effectiveImgRatio = img.width / effectiveImgHeight;

        if (effectiveImgRatio > canvasRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / effectiveImgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * effectiveImgRatio;
            offsetY = 0;
            offsetX = (canvasWidth - drawWidth) / 2;
        }

        ctx.drawImage(
            img,
            0, 0, img.width, effectiveImgHeight,
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
            requestAnimationFrame(() => renderFrame(frameIndex));
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
            renderFrame(0);
        }
    }, [isLoaded, images]);

    return (
        <div className="absolute inset-0 z-0">
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-deep-black z-50">
                    <div className="flex flex-col items-center max-w-md w-full px-6">
                        <div className="text-ferrari-red font-orbitron tracking-widest text-xl mb-6 text-center animate-pulse">
                            {loadingText} {loadingProgress}%
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
                className="block w-full h-full bg-deep-black"
                style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in' }}
            />
        </div>
    );
}
