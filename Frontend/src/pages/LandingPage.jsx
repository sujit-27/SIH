import CTA from "../components/LandingPage/CTA";
import Features from "../components/LandingPage/Features";
import Footer from "../components/LandingPage/Footer";
import Hero from "../components/LandingPage/Hero";
import HowItWorks from "../components/LandingPage/HowItWorks";
import Navbar from "../components/LandingPage/Navbar";
import Testimonials from "../components/LandingPage/Testimonials";


const LandingPage = () => (
  <div>
    <Navbar />
    <Hero />
    <Features />
    <HowItWorks />
    <Testimonials />
    <CTA />
    <Footer />
  </div>
);

export default LandingPage;
