import { Outlet, NavLink } from 'react-router-dom'
import profileLogo from '../assets/person-fill.svg'
import './Navbar.css'
import Sweetalert2 from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slice/authenticationSlice";

const RootLayout = () => {
    const loggedIn = useSelector((state: boolean) => (state.authentication! as AuthenticationState).loggedIn);
    const dispatch = useDispatch();
    
    const handleLog = () => {
        if (loggedIn) {
            Sweetalert2.fire({
                icon: 'info',
                iconColor: 'teal',
                title: 'Logout?',
                text: 'You are already logged in',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'logout'
              }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(logout())
                  }
              })
            }
    }
    
    return (
        <div>
            <header className='bg-teal-700 shadow-md px-3 py-6 text-lg sticky'>
                <nav className="flex justify-between">
                    <div className="flex flex-row items-center">
                        <NavLink className="text-white" to="/">
                            <h1>ZKP Voting System</h1>
                        </NavLink>
                    </div>
                    <div className="flex flex-row items-center text-white">
                        {loggedIn ? (<span className="nav-list-item" onClick={handleLog}>Log In</span>) :
                        (<NavLink to="login" className="nav-list-item">Log In</NavLink>)}
                        <NavLink to="profile" className="rounded-full bg-gray-100 p-1 mr-2 shadow-lg border-2 border-solid border-teal-600">
                            <img src={profileLogo} className="w-6 h-6 !fill-white profile-icon-nav" alt="Profile Logo" />
                        </NavLink>
                    </div>
                </nav>
            </header>

            <Outlet />
        </div>
    )
}

export default RootLayout