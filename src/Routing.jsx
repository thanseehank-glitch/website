import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import Collections from "./pages/Collections"
import About from "./pages/About"
import Order from "./pages/order"
import ProductDetails from "./pages/ProductDetails"
import CartPage from "./pages/Cart"
import Checkout from "./pages/Checkout"
function Routing() {
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/product" element={<Collections/>}/>
      <Route path="/product/:id" element={<ProductDetails/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/order" element={<Order/>}/>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  )
}

export default Routing
