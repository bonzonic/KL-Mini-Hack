import { useState, useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import Sweetalert2 from 'sweetalert2';

type Props = {
    onAlreadyHaveAccountClick: () => void;
};

function FormRegister({ onAlreadyHaveAccountClick }: Props): JSX.Element {
  const [Username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  useEffect(() => {
    const sr = ScrollReveal();
    sr.reveal('.register-form', {
      duration: 400,
      distance: '40px',
      easing: 'ease-out',
      origin: 'bottom',
      reset: true,
      viewFactor: 0.2,
      delay: 0,
    });

  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // formData.append('email', email)
    // formData.append('password', password)
    if (formData.get("email")!.toString().length < 1) {
        Sweetalert2.fire({
            icon: 'error',
            iconColor: 'teal',
            title: 'Oops...',
            text: 'Empty email',
          })
        return null
    }

    if (formData.get("password") !== formData.get("confirmPassword")) {
        Sweetalert2.fire({
            icon: 'error',
            iconColor: 'teal',
            title: 'Oops...',
            text: 'Passwords do not match',
          })
        return null
    }

    // send the form data to the server using fetch
    const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        body: formData,
    });

    // handle the response from the server
    if (response.ok) {
        Sweetalert2.fire({
            icon: 'success',
            iconColor: 'teal',
            title: 'To login...',
            text: 'Registration is successful!',
          }).then (()=> {
            // the request was successful
            console.log('Registration successful!');
            handleSignInClick()
          })
    } else {
        // there was an error
        console.error('Registration failed.');
    }

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
              Username
            </label>
            <input
              type="Username"
              name="Username"
              id="Username"
              className="input-field"
              placeholder="Username"
              value={Username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
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