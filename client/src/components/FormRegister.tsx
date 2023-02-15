import { useState, useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

type Props = {
    onAlreadyHaveAccountClick: () => void;
};

function FormRegister({ onAlreadyHaveAccountClick }: Props): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const sr = ScrollReveal();
    sr.reveal('.register-form', {
      duration: 1500,
      distance: '40px',
      easing: 'ease-out',
      origin: 'bottom',
      reset: true,
      viewFactor: 0.2,
      delay: 0,
    });

  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Handle form submission
  };

  const handleSignInClick = () => {
    if (onAlreadyHaveAccountClick) {
        onAlreadyHaveAccountClick();
    }
  };

  return (
    <div className="register-form container">
      <section className="wrapper">
        <div className="heading">
          <h1 className="text text-large">Create an Account</h1>
          <p className="text text-normal">
            Already have an account?{' '}
            <span>
              <a href="#" className="text text-links" onClick={handleSignInClick}>
                Sign In
              </a>
            </span>
          </p>
        </div>
        <form name="register" className="form" onSubmit={handleSubmit}>
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
          <div className="input-control input-field">
            <label htmlFor="confirmPassword" className="input-label" hidden>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="input-field"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <div className="input-control">
            <input
              type="submit"
              name="submit"
              className="input-submit button-submit"
              value="Create Account"
            />
          </div>
        </form>
      </section>
    </div>
  );
}

export default FormRegister;