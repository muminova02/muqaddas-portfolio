import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowIWork from "./components/HowIWork";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

export default function App() {
  return (
    <>
      {/* Ambient premium background layers */}
      <div className="aurora" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <HowIWork />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
