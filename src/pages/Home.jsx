import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "./css/Home.css";

function Home() {
  return (
    <>
      <Navbar />

      
      <section className="hero">
        <div className="hero-content">
          <span className="hero-sub">ESTABLISHED 2026</span>
          <h1>Timeless Elegance<br />For The Modern Woman</h1>
          <div className="hero-buttons">
            <Link to="/product" className="btn-primary">
              Explore Collection
            </Link>
            <Link to="/about" className="btn-outline">
              View Heritage
            </Link>
          </div>
        </div>
      </section>

      
      <section className="featured">
        <h2>Featured Collections</h2>
        <div className="featured-grid">
          <div className="featured-card">
            <h3>Luxury Gold</h3>
            <p>Grace in every detail</p>
          </div>
          <div className="featured-card">
            <h3>Modern Minimal</h3>
            <p>Refined simplicity</p>
          </div>
          <div className="featured-card">
            <h3>Classic Heritage</h3>
            <p>Timeless tradition</p>
          </div>
        </div>
      </section>

      
      <section className="why">
        <h2>Why Choose ZIVORA</h2>
        <div className="why-grid">
          <div>
            <h4>Premium Materials</h4>
            <p>Sapphire glass, stainless steel & flawless finish.</p>
          </div>
          <div>
            <h4>Secure Payments</h4>
            <p>100% safe & encrypted checkout process.</p>
          </div>
          <div>
            <h4>Worldwide Shipping</h4>
            <p>Fast and reliable delivery service.</p>
          </div>
        </div>
      </section>

    
<section className="luxury-banner">
  <div className="luxury-content">
    <Link to="/product" className="btn-primary banner-btn">
  Shop Now
</Link>

    <h2>Own Your Time</h2>
    <p>Luxury is not about time — it's about presence.</p>
  </div>
</section>


      <Footer />
    </>
  );
}

export default Home;
