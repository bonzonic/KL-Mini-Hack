import './FormLogin.css'
import FormInput from './FormInput'
import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

interface Props {
  onCreateAccountClick: () => void;
}

export default function FormLogIn({ onCreateAccountClick }: Props): JSX.Element {

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
}
