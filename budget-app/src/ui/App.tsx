import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
    </>
  )
}

export default App
