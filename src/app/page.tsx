import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import FeaturedProjects from "@/components/FeaturedProjects";
import ResumeLazy from "@/components/ResumeLazy";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionNavFloat from "@/components/SectionNavFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedProjects />
        <TechStack />
        <ResumeLazy />
        <Contact />
      </main>
      <Footer />
      <SectionNavFloat />
    </>
  );
}
