import styled from 'styled-components';
import {
  colorGreyDark300,
  colorPrimaryDarkest,
  colorSecondary,
  colorSecondaryDark,
  colorTritary,
  colorTritaryDark,
  colorWhite,
} from '../styles/colors';
import { useState } from 'react';
import Signup from '../features/Register/Signup';
import Login from '../features/Register/Login';
import { useNavigate } from 'react-router';

function Register() {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [loginOver, setLoginOver] = useState(false);
  const navigate = useNavigate();

  return (
    <RegisterContainer>
      {openSignup && (
        <Signup setOpenLogin={setOpenLogin} setOpenSignup={setOpenSignup} />
      )}
      {openLogin && (
        <Login setOpenLogin={setOpenLogin} setLoginOver={setLoginOver} />
      )}
      <div className="buttons">
        {!loginOver && (
          <>
            <button
              className="button signup"
              onClick={() => setOpenSignup(true)}
            >
              Sign up
            </button>
            <button className="button login" onClick={() => setOpenLogin(true)}>
              Login
            </button>
          </>
        )}
        {loginOver && (
          <button className="button login" onClick={() => navigate('/')}>
            Home Page &rarr;
          </button>
        )}
      </div>
    </RegisterContainer>
  );
}

const RegisterContainer = styled.div`
  /* background-image: radial-gradient(
    circle,
    #4f0e8c,
    #471181,
    #3f1276,
    #38136b,
    #311360,
    #2b1356,
    #26124d,
    #211143,
    #1c1038,
    #180d2e,
    #140824,
    #0e031a
  ); */
  background-color: ${colorPrimaryDarkest};
  width: 100%;
  height: 100vh;
  position: relative;

  .buttons {
    padding: 4.8rem;
    background-color: ${colorGreyDark300};
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.3);
    border-radius: 16px;
  }

  .button {
    width: 35rem;
    padding: 1.8rem;
    border-radius: 10px;
    border: none;
    font-size: 2rem;
    font-weight: 600;
    font-family: inherit;
    transition: all 0.3s;
  }

  .signup {
    background-color: ${colorSecondary};
    color: ${colorWhite};

    &:hover {
      background-color: ${colorSecondaryDark};
    }
  }

  .login {
    background-color: ${colorTritary};
    color: ${colorWhite};

    &:hover {
      background-color: ${colorTritaryDark};
    }
  }
`;

export default Register;
