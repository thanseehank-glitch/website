import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Authprovider } from './Context/AuthContext.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './Context/CartContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>

      </CartProvider>
    </Authprovider>

  </StrictMode>,
)
