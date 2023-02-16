import { func } from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormLogIn from "../components/FormLogIn";
import FormRegister from "../components/FormRegister";
import Sweetalert2 from 'sweetalert2';
import { login, logout } from "../slice/authenticationSlice";

const Login = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLogOutForm, setshowLogOutForm] = useState(false);

  const handleCreateAccountClick = () => {
    setShowRegisterForm(true);
  };

  const handleAlreadyHaveAccountClick = () => {
    setShowRegisterForm(false);
  };

  const logoutlogic = () => {
    if (showLogOutForm) {
      setshowLogOutForm(false);
    }
    else {
      setshowLogOutForm(true);
    }
  };

  const loggedIn = useSelector((state: boolean) => (state.authentication! as AuthenticationState).loggedIn);
  const dispatch = useDispatch();

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

  return (
    <div>
      {showRegisterForm ? (
        <FormRegister onAlreadyHaveAccountClick={handleAlreadyHaveAccountClick} />
      ) : (
        (<FormLogIn onCreateAccountClick={handleCreateAccountClick} />)
      )}    
    </div>
  );
};

export default Login;