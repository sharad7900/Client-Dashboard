import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "./components/ui/provider"
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
 
  // <StrictMode>
    <Provider>
    <App />
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    />
    </Provider>
  /* </StrictMode> */
  ,
)
