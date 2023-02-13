import { Outlet, NavLink } from 'react-router-dom'
import logo from '../assets/react.svg'
import '../styles/RootLayout.css'

const RootLayout = () => {
    return (
        <div className="root-layout">
            <header>
                <nav className="nav">
                    <div className="logo-and-name">
                        <NavLink to="/">
                            <img className="logo" src={logo} />
                        </NavLink>
                        <NavLink to="/">
                            <h1>ZKP Voting System</h1>
                        </NavLink>
                    </div>
                    <NavLink to="login"><button className="login-button">Log In</button></NavLink>
                </nav>
            </header>

            <Outlet />
        </div>
    )
}

export default RootLayout