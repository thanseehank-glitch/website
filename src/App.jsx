import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Routing from "./Routing"
function App() {

  return (
    <div>
        <Routing />
    
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
      />
    </div>
  )
}

export default App
