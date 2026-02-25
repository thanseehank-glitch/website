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
import ProtectedRoute from "./components/ProtectedRouter"
import AdminLogin from "./pages/Admin/AdminLogin"
import AdminLayout from "./pages/Admin/Layout"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import AdminOrders from "./pages/Admin/AdminOrder"
import AdminUsers from "./pages/Admin/AdminUser"
import AdminProducts from "./pages/Admin/AdminProducts"
import Edit from "./pages/Admin/Edit"
import AddProduct from "./pages/Admin/AddProduct"
function Routing() {
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/product" element={<Collections/>}/>
      <Route path="/product/:id" element={<ProductDetails/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/order" element={<ProtectedRoute><Order/></ProtectedRoute>}/>
      <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
      <Route path="/admin" element={<AdminLogin/>} />
      <Route
        path="/adminpanel" element={<ProtectedRoute adminOnly={true}><AdminLayout/></ProtectedRoute>}
      >
        <Route path="dashboard" element={< AdminDashboard/>}/>
        <Route path="orders" element={< AdminOrders/>}/>
        <Route path="users" element={<AdminUsers/>}/>
        <Route path="products" element={< AdminProducts/>}/>
        <Route path="editproduct/:id" element={< Edit/>}/>
        <Route path="addproduct" element={<AddProduct/>}/>
      </Route>
    </Routes>
  )
}

export default Routing
