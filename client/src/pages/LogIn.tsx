import { useState, useContext } from "react"
import Login from "../layouts/Login"
import { UserAuthenticationContext } from "../contexts/UserAuthenticationContext"

const LogIn = () => {
    const [state, setState] = useState({
        step: 1,
        id: '',
    })

    const isLoggedIn = useContext(UserAuthenticationContext)

    console.log("isLoggedIn:", isLoggedIn)

    if (isLoggedIn) {
        return <div className=""><p>You're logged in as {state.id}</p></div>
    }
    
    return (
        <>
           <Login />
        </>)
}

export default LogIn