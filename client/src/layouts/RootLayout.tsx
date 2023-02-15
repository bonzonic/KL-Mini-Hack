import { Outlet, NavLink } from 'react-router-dom'
import profileLogo from '../assets/person-fill.svg'

const RootLayout = () => {
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
                        <NavLink to="profile" className="rounded-full bg-gray-100 p-1 mr-3 shadow-lg border-2 border-solid border-teal-600">
                            <img src={profileLogo} className="w-6 h-6 !fill-white" alt="Profile Logo" />
                        </NavLink>
                        <NavLink to="login">Log In</NavLink>
                        <p className="px-1"> | </p>
                        <NavLink to="sign-up">Sign Up</NavLink>
                    </div>
                </nav>
            </header>

            <Outlet />
        </div>
    )
}

export default RootLayout