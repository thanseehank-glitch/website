import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import "./css/product.css"
import { toast } from "react-toastify"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import {useCart} from "../Context/CartContext"
import { useAuth } from "../Context/AuthContext"

function ProductDetails() {

  const { id } = useParams()
  const navigate = useNavigate();
  const [product, setProduct] = useState(null)

  const [loading, setloading] = useState(true)
  const {authUser} = useAuth()
  const { addToCart} = useCart()

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        setProduct(res.data)
        setloading(false)
      }).catch((data) => {
        console.log(data)
        toast.error("product not Found")
        navigate("/product")
      })
  }, [id, navigate]);


  async function handleAddToCart() {
    if(!authUser){
      toast.error("You must login first")
      setTimeout(() => {
        navigate("/")
      }, 2000);
        
      return
    }

    try {
      await addToCart(product,1)
      toast.success(`Added`)
    } catch (error) {
      toast.error("Failed to add")
    }
  }
  if (loading) {
    return <div className="loading">Loading Watch Details...</div>
  }
  if (!product) {
    return (
      <div className="opposite-loading">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/product")}>← Go back to Shop</button>
      </div>
    )
  }
  return (
    <div>
      <Navbar />
      <div className="continer">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <div>

          <div className="image-box">
            <img src={product.image} alt={product.name} />
          </div>

        </div>
        <div className="info-product">
          <span className="brand-info">{product.brand}</span>

          <h1>{product.name}</h1>
          <p className="description">
            {product.description}
          </p>

          <h2 className="price">₹{product.price}</h2>
        
          <div className="action-buttons">
            <button className="add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default ProductDetails