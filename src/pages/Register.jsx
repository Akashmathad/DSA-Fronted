import styled from 'styled-components';
import { colorPrimaryDarkest, colorSecondary } from '../styles/colors';
import { useState } from 'react';
import Signup from '../features/Register/Signup';
import Login from '../features/Register/Login';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../utils/Button';

function Register({ setUsnAndJwt }) {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [loginOver, setLoginOver] = useState(false);
  const navigate = useNavigate();

  function handleToast(string) {
    toast.success(string);
  }

  return (
    <>
      <RegisterContainer open={openSignup}>
        {openSignup && (
          <Signup
            setOpenLogin={setOpenLogin}
            setOpenSignup={setOpenSignup}
            handleToast={handleToast}
          />
        )}
        {openLogin && (
          <Login
            setOpenLogin={setOpenLogin}
            setLoginOver={setLoginOver}
            handleToast={handleToast}
            setUsnAndJwt={setUsnAndJwt}
          />
        )}

        {!openSignup && !openLogin && (
          <div className="buttons">
            <div className="gradient-line top"></div>
            {!loginOver && (
              <>
                <Button onClick={() => setOpenSignup(true)} color="blue">
                  Sign up
                </Button>
                <Button onClick={() => setOpenLogin(true)} color="green">
                  Login
                </Button>
              </>
            )}
            {loginOver && (
              <Button onClick={() => navigate('/')} color="purple">
                Home page &rarr;
              </Button>
            )}
            <div className="gradient-line bottom"></div>
          </div>
        )}
        <Toaster
          toastOptions={{
            className: '',
            duration: 5000,
            style: {
              border: `1px solid ${(props) =>
                props.theme.colors.colorSecondary}`,
              padding: '0.9rem 1.5rem',
              fontSize: '1.8rem',
              fontFamily: 'inherit',
              color: colorPrimaryDarkest,
            },
          }}
        />
      </RegisterContainer>
    </>
  );
}

const RegisterContainer = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .buttons {
    width: 45rem;
    padding: 4.8rem;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    background-image: linear-gradient(rgba(90, 33, 255, 0.15), #080315);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 3.2rem 1.2rem;
  }
`;

export default Register;
