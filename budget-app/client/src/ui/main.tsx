import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DTIRatio from '../components/homepage/dtiratio.tsx'
import Bills from '../components/homepage/bills.tsx'
import Title from '../components/title.tsx';
import Registration  from '../components/Launchpage/registration.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Title />
    <Registration />
    <DTIRatio />
  </StrictMode>,
)
