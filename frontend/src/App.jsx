import { useState } from 'react'
import './App.css'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserProfile } from "@clerk/clerk-react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <h1>Welcome to the website</h1>

       <SignedOut><SignInButton mode="modal">
        <button>Sign in</button>
      </SignInButton></SignedOut>
      
      <SignedIn>
        <SignOutButton>
          <button>Sign Out</button>
        </SignOutButton>
        </SignedIn>
        <UserProfile/>
    </>
  )
}

export default App;
