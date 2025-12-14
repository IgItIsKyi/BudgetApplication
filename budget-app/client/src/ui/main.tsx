import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DTIRatio from '../components/homepage/dtiratio.tsx'
import Title from '../components/title.tsx';
import Registration  from '../components/Launchpage/registration.tsx';

import Registration  from '../components/registration.tsx';
import Bills from '../components/homepage/bills.tsx'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Title />
    <Bills />
    <Registration />
    <DTIRatio />
  </StrictMode>,
)
