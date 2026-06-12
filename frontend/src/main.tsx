import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './style.css'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext.tsx'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <LanguageProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)