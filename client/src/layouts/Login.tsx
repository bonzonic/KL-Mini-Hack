import { useState } from "react";
import FormLogIn from "../components/FormLogIn";
import FormRegister from "../components/FormRegister";

const Login = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleCreateAccountClick = () => {
    setShowRegisterForm(true);
  };

  const handleAlreadyHaveAccountClick = () => {
    setShowRegisterForm(false);
  };

  return (
    <div>
      {showRegisterForm ? (
        <FormRegister onAlreadyHaveAccountClick={handleAlreadyHaveAccountClick} />
      ) : (
        <FormLogIn onCreateAccountClick={handleCreateAccountClick} />
      )}
    </div>
  );
};

export default Login;