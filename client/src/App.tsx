import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Login from './layouts/Login'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import './App.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./slice/authenticationSlice";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />}/>
      <Route path="login" element={<Login />}/>
      <Route path="profile" element={<Profile />}/>
      <Route path="dashboard" element={<Dashboard />}/>
    </Route>), {
      basename: "/KL-Mini-Hack"
    }
)

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
