'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getRandomFact } from '@/data/ferrariData';

interface FlipCardProps {
    src: string;
    alt: string;
    aspectRatio: 'square' | 'portrait' | 'landscape';
    priority?: boolean;
}

export default function FlipCard({ src, alt, aspectRatio, priority = false }: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentFact, setCurrentFact] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

    // Initialize with a random fact on mount
    useEffect(() => {
        setCurrentFact(getRandomFact());
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (clickTimeout) clearTimeout(clickTimeout);
        };
    }, [clickTimeout]);

    // Handle click - toggle flip on single click, new fact on double click while flipped
    const handleClick = () => {
        if (clickTimeout) {
            // This is a double-click
            clearTimeout(clickTimeout);
            setClickTimeout(null);

            // Only get new fact if already flipped
            if (isFlipped) {
                setCurrentFact(getRandomFact());
            }
        } else {
            // This might be a single click - wait to see if double-click
            const timeout = setTimeout(() => {
                // Single click confirmed - toggle flip
                setIsFlipped(!isFlipped);
                setClickTimeout(null);
            }, 250);

            setClickTimeout(timeout);
        }
    };

    // Handle keyboard interaction for accessibility
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    // Determine height based on aspect ratio for masonry effect
    const getHeightClass = () => {
        switch (aspectRatio) {
            case 'portrait':
                return 'h-[400px]';
            case 'landscape':
                return 'h-[280px]';
            case 'square':
            default:
                return 'h-[340px]';
        }
    };

    return (
        <div
            className={`relative ${getHeightClass()} cursor-pointer group`}
            style={{ perspective: '1000px' }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={isFlipped ? 'Ferrari fun fact. Click to see image' : `${alt}. Click to see fun fact`}
            aria-pressed={isFlipped}
        >
            <motion.div
                className="relative w-full h-full will-change-transform"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Front Face - Image */}
                <div
                    className="absolute inset-0 rounded-3xl overflow-hidden premium-shadow"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                >
                    <div className="relative w-full h-full bg-carbon-gray/20">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            priority={priority}
                            loading={priority ? undefined : "lazy"}
                            className={`object-cover transition-all duration-500 ease-out ${isLoaded ? 'scale-100 blur-0' : 'scale-110 blur-sm'
                                } group-hover:scale-110`}
                            onLoad={() => setIsLoaded(true)}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />

                        {/* Gradient overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-ferrari-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Loading skeleton */}
                        {!isLoaded && (
                            <div className="absolute inset-0 bg-gradient-to-r from-carbon-gray via-metal-silver/10 to-carbon-gray animate-pulse" />
                        )}
                    </div>
                </div>

                {/* Back Face - Fun Fact */}
                <div
                    className="absolute inset-0 rounded-3xl overflow-hidden luxury-shadow"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
                        {/* Background gradient with red glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray via-ferrari-black to-carbon-gray" />

                        {/* Red accent glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-ferrari-red/10 via-transparent to-racing-red/5" />

                        {/* Subtle pattern overlay */}
                        <div
                            className="absolute inset-0 opacity-5"
                            style={{
                                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.03) 10px,
                  rgba(255,255,255,0.03) 20px
                )`
                            }}
                        />

                        {/* Border glow */}
                        <div className="absolute inset-0 rounded-3xl border border-ferrari-red/30 glow-red" />

                        {/* Fact content - Added overflow handling for small screens */}
                        <div className="relative z-10 text-center w-full max-h-full overflow-y-auto no-scrollbar py-2">
                            <div className="mb-2 md:mb-4">
                                <div className="inline-block px-3 py-1 rounded-full bg-ferrari-red/20 border border-ferrari-red/30">
                                    <span className="text-[10px] md:text-xs font-orbitron tracking-wider text-ferrari-red uppercase">
                                        Ferrari Fact
                                    </span>
                                </div>
                            </div>

                            <p className="text-white font-rajdhani text-sm md:text-base lg:text-lg leading-relaxed font-medium px-2">
                                {currentFact}
                            </p>

                            <div className="mt-4 md:mt-6 text-metal-silver/50 text-[10px] md:text-xs font-orbitron tracking-wide">
                                DOUBLE-TAP FOR ANOTHER FACT
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Focus ring for accessibility */}
            <div className="absolute inset-0 rounded-3xl ring-2 ring-ferrari-red/0 focus-within:ring-ferrari-red/50 transition-all pointer-events-none" />
        </div>
    );
}
