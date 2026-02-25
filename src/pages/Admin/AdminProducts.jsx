import axios from "axios"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import "./css/AdminProducts.css"

function AdminProducts() {

  const [product, setProduct] = useState([])
  const [search, setSearch] = useState("");

  const navigate = useNavigate()
  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((res) => setProduct(res.data))
  }, [])

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`)

        setProduct((prev) => prev.filter((item) => item.id !== id))

        toast.success("Product deleted successfully!");
      } catch (error) {
        console.log("delete failled", error)
        toast.error("Could not delete product. Please try again.");
      }
    }
  }
  const FilterProduct = product.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="admin-products-page">


      <div className="admin-products-header">
        <h2 className="admin-products-title">Manage Products</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="add-product-btn"
          onClick={() => navigate("/adminpanel/addproduct")}
        >
          Add Product
        </button>
      </div>


      <div className="admin-products-grid">
        {FilterProduct.map((item) => (
          <div key={item.id} className="admin-product-card">

            <div className="product-image-wrapper">
              <img
                src={item.image}
                alt={item.name}
                className="product-image"
              />
            </div>

            <div className="product-info">
              <h3 className="product-name">{item.name}</h3>
              <p className="product-price">₹{item.price}</p>
              <p className="product-brand"> Brand: <span>{item.brand}</span></p>
            </div>

            <div className="product-actions">
              <button
                className="edit-btn"
                onClick={() => navigate(`/adminpanel/editproduct/${item.id}`)}
              >
                Edit
              </button>

              <button
                className="delete-btn-edit"
                onClick={() => deleteProduct(item.id)}
              >
                Remove
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );

}

export default AdminProducts