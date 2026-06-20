import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Education from "./components/sections/Education";
import Skills from "./components/sections/Skills";
import Achievements from "./components/sections/Achievements";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-surface font-body text-ink-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
