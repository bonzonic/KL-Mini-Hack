import { Outlet, NavLink } from 'react-router-dom'
import logo from '../assets/react.svg'

const RootLayout = () => {
    return (
        <div>
            <header className='bg-teal-700 shadow-md px-3 py-6 text-lg'>
                <nav className="flex justify-between">
                    <div className="flex flex-row items-center">
                        <NavLink className="text-white" to="/">
                            <h1>ZKP Voting System</h1>
                        </NavLink>
                    </div>
                    <div className="flex flex-row items-center text-white">
                        <NavLink to="login" className="hover:">Log In</NavLink>
                        <p className="px-1"> | </p>
                        <NavLink to="sign-up" className="">Sign Up</NavLink>
                    </div>
                </nav>
            </header>

            <Outlet />
        </div>
    )
}

export default RootLayout