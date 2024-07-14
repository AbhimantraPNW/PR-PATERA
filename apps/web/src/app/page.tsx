import CoffeeshopHero from "@/components/CoffeeshopHero";
import Collection from "@/components/Collection";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Partnership from "@/components/Partnership";
import Testimonial from "@/components/Testimonial";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero />
    <Welcome />
    <Collection />
    <CoffeeshopHero />
    <Partnership />
    <Testimonial />
    <Footer />
    </>
  );
}
