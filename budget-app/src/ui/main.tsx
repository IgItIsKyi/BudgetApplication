import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DTIRatio from '../components/homepage/dtiratio.tsx'
import Bills from '../components/homepage/bills.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DTIRatio />
    <App />
  </StrictMode>,
)
