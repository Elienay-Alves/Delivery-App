import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../helpers/requests';

export default function Login() {
  const navigate = useNavigate();
  const [disabled, setDisebled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const MIN_DIG = 6;
    const regex = /^.*@.*\.com$/;
    setDisebled(!(password.length >= MIN_DIG && email.match(regex)));
  }, [email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await post('/login', { email, password });

      navigate('/customer/products');
    } catch ({ response }) {
      const { status, data } = response;
      console.log(`${status} - ${data.message}`);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form action="" method="post">
        <label htmlFor="input-login">
          Login
          <input
            type="email"
            name="input-login"
            data-testid="common_login__input-email"
            id="input-login"
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </label>
        <label htmlFor="input-password">
          Senha
          <input
            type="password"
            name="input-password"
            data-testid="common_login__input-password"
            id="input-password"
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>
        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ disabled }
          onClick={ handleSubmit }
        >
          LOGIN
        </button>

        <button
          type="submit"
          id="register-button"
          data-testid="common_login__button-register"
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
      <div data-testid="common_login__element-invalid-email" />
    </div>
  );
}
