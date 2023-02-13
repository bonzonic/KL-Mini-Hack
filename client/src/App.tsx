import { useState } from 'react'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import reactLogo from './assets/react.svg'
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />}/>
      <Route path="login" element={<LogIn />}/>
    </Route>)
)

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
