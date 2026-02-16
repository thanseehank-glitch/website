import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Authprovider } from './Context/AuthContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <App />
    </Authprovider>


  </StrictMode>,
)
