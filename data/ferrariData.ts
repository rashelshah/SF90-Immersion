export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    aspectRatio: 'square' | 'portrait' | 'landscape';
}

export interface FerrariFactCategory {
    category: string;
    facts: string[];
}

// Ferrari Fun Facts - Racing History, Engineering, Design Philosophy, Brand Milestones
export const ferrariFacts: string[] = [
    // Racing Heritage
    "Ferrari has won more Formula 1 Constructors' Championships than any other team - 16 titles since 1950.",
    "Enzo Ferrari started Scuderia Ferrari in 1929 as a racing team before building road cars.",
    "Ferrari's first race win came just 3 months after their debut at the 1947 Rome Grand Prix.",
    "Michael Schumacher won 5 consecutive F1 world titles with Ferrari from 2000-2004.",
    "Ferrari is the only team to have competed in every Formula 1 season since 1950.",

    // Engineering Achievements
    "The SF90 Stradale produces 1,000 hp from its hybrid V8 powertrain - Ferrari's most powerful production car ever.",
    "Ferrari pioneered the use of carbon fiber in Formula 1 with the 1981 Ferrari 126 CK.",
    "The SF90 can accelerate from 0-60 mph in just 2.5 seconds thanks to its electric motors.",
    "Ferrari's first hybrid production car was the LaFerrari in 2013, producing 949 hp.",
    "The Prancing Horse engine has won 'International Engine of the Year' award 4 consecutive times.",

    // Design Philosophy
    "Ferrari's iconic Rosso Corsa red became racing's most recognizable color since the 1920s.",
    "Every Ferrari is designed at the Maranello headquarters in Italy - a tradition since 1943.",
    "Pininfarina has designed most iconic Ferrari bodies for over 70 years of collaboration.",
    "The Prancing Horse emblem came from WWI pilot Francesco Baracca's fighter plane.",
    "Ferrari uses wind tunnels and CFD to optimize every curve for both beauty and aerodynamic efficiency.",

    // Brand Milestones
    "Enzo Ferrari's motto: 'Aerodynamics are for people who can't build engines.'",
    "The first Ferrari road car was the 1947 125 S with a 1.5L V12 engine.",
    "Ferrari became a public company in 2015, but the Ferrari family retains special voting rights.",
    "Only about 10,000 Ferraris are produced each year to maintain exclusivity.",
    "Ferrari's logo yellow background represents Modena, Enzo Ferrari's birthplace.",

    // Innovation & Records
    "The SF90 name honors Ferrari's 90th anniversary since founding Scuderia Ferrari.",
    "Ferrari holds over 200 speed and endurance records across racing categories.",
    "The LaFerrari was the first Ferrari to use active aerodynamics that adjust in real-time.",
    "Ferrari's V12 engine technology traces back to Gioacchino Colombo's 1947 design.",
    "The SF90 can drive up to 15.5 miles on pure electric power at up to 84 mph.",

    // Craftsmanship
    "Each Ferrari engine is hand-assembled by a single technician who signs their work.",
    "Ferrari offers over 300 exterior colors and infinite customization through their Tailor Made program.",
    "It takes approximately 3 months to hand-build each Ferrari from start to finish.",
    "Ferrari leather interiors use hides from cattle raised in temperate climates to avoid imperfections.",
    "The company's founder famously said: 'The most important victory is the one which has to arrive.'",
];

// Helper function to get a random fun fact
export const getRandomFact = (): string => {
    const randomIndex = Math.floor(Math.random() * ferrariFacts.length);
    return ferrariFacts[randomIndex];
};

// Gallery image data
export const galleryImages: GalleryImage[] = [
    {
        id: 1,
        src: '/gallery/ferrari-01.png',
        alt: 'Ferrari SF90 Stradale front three-quarter view',
        aspectRatio: 'landscape'
    },
    {
        id: 2,
        src: '/gallery/ferrari-02.png',
        alt: 'Ferrari SF90 Stradale rear view with quad taillights',
        aspectRatio: 'portrait'
    },
    {
        id: 3,
        src: '/gallery/ferrari-03.png',
        alt: 'Ferrari SF90 Stradale headlight detail',
        aspectRatio: 'square'
    },
    {
        id: 4,
        src: '/gallery/ferrari-04.png',
        alt: 'Ferrari SF90 Stradale in motion',
        aspectRatio: 'landscape'
    },
    {
        id: 5,
        src: '/gallery/ferrari-05.png',
        alt: 'Ferrari SF90 Stradale wheel and brake detail',
        aspectRatio: 'square'
    },
    {
        id: 6,
        src: '/gallery/ferrari-06.png',
        alt: 'Ferrari SF90 Stradale luxury interior',
        aspectRatio: 'landscape'
    },
    {
        id: 7,
        src: '/gallery/ferrari-07.png',
        alt: 'Ferrari SF90 Stradale hybrid V8 engine',
        aspectRatio: 'square'
    },
    {
        id: 8,
        src: '/gallery/ferrari-08.png',
        alt: 'Ferrari SF90 Stradale aerial view',
        aspectRatio: 'landscape'
    },
    {
        id: 9,
        src: '/gallery/ferrari-09.png',
        alt: 'Ferrari Prancing Horse emblem close-up',
        aspectRatio: 'square'
    },
    {
        id: 10,
        src: '/gallery/ferrari-10.png',
        alt: 'Ferrari SF90 Stradale racing on track',
        aspectRatio: 'landscape'
    },
    {
        id: 11,
        src: '/gallery/ferrari_gallery_11_1769605447378.png',
        alt: 'Ferrari SF90 Stradale driving on mountain road at sunset',
        aspectRatio: 'landscape'
    },
    {
        id: 12,
        src: '/gallery/ferrari_gallery_12_1769605522971.png',
        alt: 'Ferrari SF90 Stradale rear spoiler and diffuser detail with carbon fiber',
        aspectRatio: 'square'
    },
    {
        id: 13,
        src: '/gallery/ferrari_gallery_13_1769605822531.png',
        alt: 'Ferrari SF90 Stradale side mirror with carbon fiber detail',
        aspectRatio: 'portrait'
    },
    {
        id: 14,
        src: '/gallery/ferrari_gallery_14_1769605908424.png',
        alt: 'Ferrari SF90 Stradale at Ferrari factory assembly line in Maranello',
        aspectRatio: 'landscape'
    },
    {
        id: 15,
        src: '/gallery/ferrari_gallery_15_1769605979565.png',
        alt: 'Ferrari SF90 Stradale in luxury garage with dramatic lighting',
        aspectRatio: 'landscape'
    },
];
