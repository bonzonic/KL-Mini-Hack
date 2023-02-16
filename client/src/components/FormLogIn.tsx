import './FormLogin.css'
import FormInput from './FormInput'
import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { useState } from 'react';
import Sweetalert2 from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slice/authenticationSlice";
import { RootState } from '../main';

interface Props {
  onCreateAccountClick: () => void;
}

interface AuthenticationState {
  loggedIn: boolean;
}

export default function FormLogIn({ onCreateAccountClick }: Props): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: RootState) => (state.authentication as AuthenticationState).loggedIn);

  console.log(loggedIn)
    
  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const sr = ScrollReveal();
    sr.reveal('.login-form', {
      duration: 400,
      distance: '40px',
      easing: 'ease-out',
      origin: 'bottom',
      reset: true,
      viewFactor: 0.2,
      delay: 0,
    });

  }, []);

  const handleCreateAccountClick = () => {
    onCreateAccountClick();
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(event.currentTarget);

    // Perform some validation on the email and password fields
    if (email.trim() === '' || password.trim() === '') {
      Sweetalert2.fire({
        icon: 'error',
        iconColor: 'teal',
        title: 'Oops...',
        text: 'Please enter email & password',
      })
      return;
    }
    
    // You can perform the login logic here, such as calling an API to authenticate the user
    const response = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      // handle login logic
      localStorage.setItem("email", email)
      localStorage.setItem("password", password)
      console.log("User logged in")
      //window.location.href = '/'
      handleLogin()
      console.log(localStorage)
      console.log(loggedIn)

      Sweetalert2.fire({
        icon: 'success',
        iconColor: 'teal',
        title: 'Successful',
      })
      return;
    }

    else {
      Sweetalert2.fire({
        icon: 'error',
        iconColor: 'teal',
        title: 'Oops...',
        text: 'Invalid email or Password',
      })
      return;
    }

    localStorage.clear
 
    // Clear the form fields
    setEmail('');
    setPassword('');
  };

return (
  <div className="login-form container">
    <section className="wrapper">
      <div className="heading">
        <h1 className="text text-large">Sign In</h1>
        <p className="text text-normal">
          New user?{" "}
          <span>
            <a href="#" className="text text-links" onClick={handleCreateAccountClick}>
              Create an account
            </a>
          </span>
        </p>
      </div>
      <form name="signin" className="form" onSubmit={handleLoginSubmit}>
        <div className="input-control input-field">
          <label htmlFor="email" className="input-label" hidden>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="input-field"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input-control input-field">
          <label htmlFor="password" className="input-label" hidden>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="input-control">
          <input
            type="submit"
            name="submit"
            className="input-submit button-submit"
            value="Sign In"
          />
        </div>
      </form>
    </section>
  </div>
)
}
