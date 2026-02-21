import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "./css/About.css";

function About() {
  return (
    <>
      <Navbar />

    
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="established">ESTABLISHED 2026</span>
          <h1>Timeless Craftsmanship</h1>
          <p>Luxury Redefined For The Modern Generation</p>
        </div>
      </section>

      
      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              ZIVORA was founded with a vision to redefine luxury timepieces.
              We believe a watch is more than an accessory — it is a statement
              of power, elegance, and identity.
            </p>
            <p>
              Every collection reflects refined craftsmanship, precision
              engineering, and timeless aesthetics designed for modern
              sophistication.
            </p>
          </div>

          <div className="about-image">
            <img
              src="https://media.rolex.com/image/upload/q_auto:eco/f_auto/t_v7/c_limit,w_1920/v1/catalogue/2025/upright-c/m127285tbr-0002"
              alt="Luxury Watch"
            />
          </div>
        </div>
      </section>

      
      <section className="craft-section">
        <h2>Craftsmanship</h2>
        <div className="craft-grid">
          <div className="craft-box">
            <h3>Premium Materials</h3>
            <p>
              Crafted from stainless steel, sapphire crystal glass and
              luxurious finishes.
            </p>
          </div>
          <div className="craft-box">
            <h3>Precision Engineering</h3>
            <p>
              Each movement is designed for durability, accuracy and
              performance.
            </p>
          </div>
          <div className="craft-box">
            <h3>Elegant Design</h3>
            <p>
              A seamless blend of classic heritage and contemporary minimalism.
            </p>
          </div>
        </div>
      </section>

      
      <section className="timeline-section">
        <h2>Our Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <span>2026</span>
            <p>Brand Founded</p>
          </div>
          <div className="timeline-item">
            <span>2027</span>
            <p>Global Expansion</p>
          </div>
          <div className="timeline-item">
            <span>2028</span>
            <p>Luxury Heritage Collection Launch</p>
          </div>
        </div>
      </section>

      
      <section className="quote-section">
        <p>
          “Luxury is not about owning time.  
          It is about mastering it.”
        </p>
      </section>

      <Footer />
    </>
  );
}

export default About;