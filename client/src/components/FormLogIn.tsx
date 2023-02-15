import { NavLink } from "react-router-dom"
import './FormLogin.css'
import FormInput from './FormInput'
import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';


export default function FormLogIn() {
  const formdata = [['Username', 'username'], ['Password', 'password']]


  useEffect(() => {
    const sr = ScrollReveal();
    sr.reveal('.login-form', {
      duration: 500,
      distance: '40px',
      easing: 'ease-out',
      origin: 'bottom',
      reset: true,
      viewFactor: 0.2,
      delay: 0,
    });

  }, []);

return (
  <div className="login-form container">
    <section className="wrapper">
      <div className="heading">
        <h1 className="text text-large">Sign In</h1>
        <p className="text text-normal">
          New user?{" "}
          <span>
            <a href="#" className="text text-links">
              Create an account
            </a>
          </span>
        </p>
      </div>
      <form name="signin" className="form">
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

  {/* // return (
  //   <div classNameName="login-container">
  //     <form classNameName="login-form">
  //       <div classNameName="user-name">
  //         <FormInput label="Username" propclassName="username" placeholder="Enter your name"/>
  //       </div> 
  //       <div classNameName="password">
  //         <FormInput label="Password" propclassName="password" placeholder="Enter your password"/>
  //       </div>
  //       <div classNameName="button">
  //         <input type="submit" value="Register"/>
  //       </div>
  //     </form>
  //   </div>
  // ) */}
}
