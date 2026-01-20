import { useState } from 'react'
import './App.css'
import { SignInButton } from "@clerk/clerk-react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <h1>Welcome to the website</h1>
       <SignInButton mode="modal">
  <button>Sign in</button>
</SignInButton>
    </>
  )
}

export default App;
