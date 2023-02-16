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