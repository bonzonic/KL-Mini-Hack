import { useState, createContext } from 'react'
import { UserAuthenticationContext } from './contexts/UserAuthenticationContext'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import reactLogo from './assets/react.svg'
import './App.css'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />}/>
      <Route path="login" element={<LogIn />}/>
      <Route path="sign-up" element={<SignUp />}/>
    </Route>)
)



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      <UserAuthenticationContext.Provider value={isLoggedIn}>
        <RouterProvider router={router} />
      </UserAuthenticationContext.Provider>
    </div>
  )
}

export default App
