import Navbar from "../components/landingPage/Navbar"
import Hero from "../components/landingPage/Hero";
import Footer from "../components/landingPage/Footer";
import './LandingPage.css'

const LandingPage = () => {
  return (
    <>
      <div id="landing-page">
        <Navbar />
        <Hero />
        <Footer />
      </div>
      <br />
    </>
  );
};

export default LandingPage;

