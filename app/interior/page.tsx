import Navbar from "@/components/Navbar";
import InteriorExperience from "@/components/InteriorExperience";

export const metadata = {
    title: "Interior | Ferrari SF90 Stradale",
    description: "Explore the luxurious, driver-focused interior of the Ferrari SF90 Stradale with cutting-edge digital displays and premium materials.",
};

export default function InteriorPage() {
    return (
        <>
            <Navbar />
            <InteriorExperience />
        </>
    );
}
