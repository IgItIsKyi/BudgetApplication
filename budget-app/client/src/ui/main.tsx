import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Title from '../components/title.tsx';
import Registration  from '../components/Launchpage/registration.tsx';
import Bills from '../components/homepage/bills.tsx'
import './App.css'
import Users from '../components/Launchpage/Users.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Title />
    <Bills />
    <Users />
    <Registration />
  </StrictMode>,
)
