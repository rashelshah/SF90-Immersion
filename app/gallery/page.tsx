import type { Metadata } from 'next';
import MasonryGallery from '@/components/MasonryGallery';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
    title: 'Gallery | Ferrari SF90 Stradale',
    description: 'Explore the stunning design and engineering excellence of the Ferrari SF90 Stradale through our premium photo gallery. Discover fascinating Ferrari facts.',
    keywords: 'Ferrari SF90 Stradale, Ferrari Gallery, Supercar Photos, Ferrari Design, Automotive Photography',
};

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-ferrari-black">
            <Navbar />
            <MasonryGallery />
        </main>
    );
}
