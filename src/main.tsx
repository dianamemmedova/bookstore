import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthModalProvider } from './context/AuthModalContext'
import { AuthProvider } from './context/AuthContext'
import { OrderProvider } from './context/OrderContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <OrderProvider>
          <AuthModalProvider>
            <App />
          </AuthModalProvider>
        </OrderProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)