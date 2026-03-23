import './index.css' // This connects your CSS to the app
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// ... rest of the file
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
