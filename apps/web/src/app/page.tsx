import CoffeeshopHero from "@/components/CoffeeshopHero";
import Collection from "@/components/Collection";
import Hero from "@/components/Hero";
import Partnership from "@/components/Partnership";
import Testimonial from "@/components/Testimonial";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <>
    <Hero />
    <Welcome />
    <Collection />
    <CoffeeshopHero />
    <Partnership />
    <Testimonial />
    </>
  );
}
