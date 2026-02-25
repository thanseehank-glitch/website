import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./css/Add.css";
function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    brand: "",
    name: "",
    price: "",
    description: "",
    image: ""
  });
  const handilChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };




  const handilSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.image) {
      return toast.error("Please fill in all required fields");
    }

    try {
      await axios.post(`http://localhost:3000/products`, product);
      toast.success("Product added successfully!");
      navigate("/adminpanel/products");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="edit-page">
      <div className="edit-card">
        <h2 className="edit-title">Add New Watches</h2>

        <form onSubmit={handilSubmit} className="edit-form">
          <div className="form-group">
            <label className="form-label">Brand</label>
            <input
              className="form-input"
              type="text"
              name="brand"
              placeholder="e.g. Nike"
              value={product.brand}
              onChange={handilChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="e.g. Air Jordan 1"
              value={product.name}
              onChange={handilChange}
            />
          </div>


          <div className="form-group">
            <label className="form-label">Price (₹)</label>
            <input
              className="form-input"
              type="number"
              name="price"
              value={product.price}
              onChange={handilChange}
            />
          </div>


          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              name="description"
              placeholder="Write something about this sneaker..."
              value={product.description}
              onChange={handilChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              className="form-input"
              type="text"
              name="image"
              placeholder="Paste image link here"
              value={product.image}
              onChange={handilChange}
            />
          </div>
          <button type="submit" className="update-btn">
            Add Product to Store
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;