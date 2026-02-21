import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./css/Collections.css";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
function Collections() {
  const [product, setProduct] = useState([]);
  const [filter, setFilter] = useState([]);
  const [activeBrand, setActiveBrand] = useState("ALL");
  const [search, setSearch] = useState("");

  
  const brands = ["ALL", "ROLLEX", "BVLGARI", "FOSSIL", "TISSOT", "PATEK PHILIPPE"];

  const handleBrand = (brand) => {
    setActiveBrand(brand);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((response) => {
        setProduct(response.data);
        setFilter(response.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load products");
      });
  }, []);

  useEffect(() => {
    let updatedProducts = product;

    
    if (activeBrand !== "ALL") {
      updatedProducts = updatedProducts.filter(
        (item) => item.brand.toUpperCase() === activeBrand.toUpperCase()
      );
    }

    
    if (search) {
      updatedProducts = updatedProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilter(updatedProducts);
  }, [search, activeBrand, product]);

  return (
    <>
     <Navbar />
      <div className="page-">
        <div className="filter-header">
          <div className="brand-filter">
            {brands.map((b) => (
              <button
                key={b}
                className={activeBrand === b ? "active" : ""}
                onClick={() => handleBrand(b)}
              >
                {b}
              </button>
            ))}
            
            <div className="search-box">
              <input
                type="text"
                value={search}
                placeholder="Search luxury watches..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <hr />

        <div className="products-container">
          {filter.length > 0 ? (
            filter.map((item) => (
              <div key={item.id} className="product-card">
                <div className="product-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="product-info">
                  <p className="brand-name">{item.brand}</p>
                  <h3>{item.name}</h3>
                  <p className="price">₹{item.price.toLocaleString('en-IN')}</p>
                  <Link to={`/product/${item.id}`} className="details-link">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No watches found in this category.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Collections;   

