
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickInfo from "@/components/QuickInfo";
import Notices from "@/components/Notices";
import About from "@/components/About";
import Admissions from "@/components/Admissions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <QuickInfo />
        <Notices />
        <About />
        <Admissions />
        <Contact />
      </main>

      <Footer />
    </>
  );
}