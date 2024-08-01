import CoffeeshopHeroTestimonial from "@/components/CoffeehopHeroTestimonial";
import Collection from "@/components/Collection";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Partnership from "@/components/Partnership";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero />
    <Welcome />
    <Collection />
    <CoffeeshopHeroTestimonial />
    <Partnership />
    <Footer />
    </>
  );
}
