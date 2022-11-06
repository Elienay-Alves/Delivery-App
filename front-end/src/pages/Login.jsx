import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../helpers/requests';

export default function Login() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const MIN_DIG = 6;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    setDisabled(!(password.length >= MIN_DIG && email.match(regex)));
  }, [email, password]);

  const verifyUser = useCallback(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.role === 'seller') return navigate('/seller/orders');
    if (user?.role === 'admin') return navigate('/admin/manage');
    if (user?.role === 'customer') return navigate('/customer/products');
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await post('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(result));
      verifyUser();
    } catch ({ response }) {
      const { status, data } = response;
      setErrorMessage(`${status} - ${data.message}`);
    }
  };

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

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
      {errorMessage && (
        <p data-testid="common_login__element-invalid-email">{errorMessage}</p>
      )}
    </div>
  );
}
