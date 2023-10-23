import Hero from "@components/Hero";
import About from "@components/About";
import Footer from "@components/Footer";
import PriceCard from "@components/PriceCard";
import Nav from "@components/Nav";

export default function Home() {
  return (
    <>
    <Nav />
    <Hero />
    <About />
    <PriceCard />
    <Footer />
    </>
  );
}
