import { Outlet, NavLink } from "react-router-dom";
import profileLogo from "../assets/person-fill.svg";
import "./Navbar.css";
import Sweetalert2 from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { AuthenticationState, login, logout } from "../slice/authenticationSlice";
import { useState } from "react";
import logo from "../assets/cabbage.svg";


const RootLayout = () => {
  const loggedIn = useSelector(
    (state: any) => (state.authentication! as AuthenticationState).loggedIn
  );
  const dispatch = useDispatch();
  const [coins, setCoins] = useState(0);
  // fetch coin data from server
  const email = localStorage.getItem("email") || "";
  if (email !== undefined && email !== "") {
    fetch(`http://localhost:8080/user/wallet?email=${email}`, {
      method: "GET",
    })
      .then((response) => {
        let resJson = response.json();
        return resJson;
      })
      .then((json) => {
        const wallet = Object(json)["address"];
        if (wallet !== undefined && wallet !== "") {
          fetch(`http://localhost:8080/user/get-coin?walletAddress=${wallet}`, {
            method: "GET",
          })
            .then((resp) => {
              let resJson = resp.json();
              return resJson;
            })
            .then((json) => {
              setCoins(Object(json)["coins"]);
              console.log(coins);
            });
        }
      });
  }
    const handleLog = () => {
        if (loggedIn) {
            Sweetalert2.fire({
                icon: "info",
                iconColor: "teal",
                title: "Logout?",
                text: "You are already logged in",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "logout",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(logout());
                }
            });
        }
    }
    return (
        <div>
            <header className=' nav-container text-black'>
                <nav className="flex justify-between">
                    <div className="flex flex-row items-center">
                        <NavLink className="flex items-center text-black my-5 mx-3 transition duration-500 hover:scale-110" to="/">
                            <img className="logo w-10 h-10" src={logo} />
                            <h1 className="ml-2">ZKP Voting System</h1>
                        </NavLink>
                    </div>
                    <div className="flex flex-row items-center">
                        {loggedIn ? (<span className="nav-list-item font-bold" onClick={handleLog}>Log In</span>) :
                        (<NavLink to="login" className="nav-list-item">Log In</NavLink>)}
                        <NavLink to="profile" className="rounded-full bg-gray-100 p-1 mr-2 shadow-lg border-2 border-solid border-teal-600 transition duration-500 hover:scale-110">
                            <img src={profileLogo} className="w-6 h-6 !fill-white profile-icon-nav" alt="Profile Logo" />
                        </NavLink>
                    </div>
                </nav>
            </header>

            <Outlet context={[coins, setCoins]} />
        </div>
    )
}

export default RootLayout
