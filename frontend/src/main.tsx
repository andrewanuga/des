import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import App from './App.tsx'
import ShowCase from './container/ShowCase/ShowCase.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShowCase />
    </BrowserRouter>
  </React.StrictMode>,
)
