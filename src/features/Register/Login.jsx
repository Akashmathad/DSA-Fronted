import styled from 'styled-components';
import {
  colorPrimary,
  colorPrimaryDarkest,
  colorPrimaryLightest,
  colorRed,
} from '../../styles/colors';
import { defaultFontSize } from '../../styles/defaults';
import { BiLockOpen } from 'react-icons/bi';
import { GrUserAdmin } from 'react-icons/gr';
import { AiFillEye } from 'react-icons/ai';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function Login({ setOpenLogin, setLoginOver, handleToast, setUsnAndJwt }) {
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const [shake, setShake] = useState(false);
  const [eye, setEye] = useState(false);
  const [submit, setSubmit] = useState(false);

  function startShaking() {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 1000);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmit(true);
    const details = {
      usn,
      password,
    };
    try {
      const req = await fetch(
        'https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(details),
        }
      );
      const data = await req.json();
      if (data?.error?.status === 'error') {
        startShaking();
        toast.error('Incorrect USN or Password!!');
        return;
      }
      console.log(data);
      setUsnAndJwt(usn, data.token);
    } catch (e) {
      console.log(e);
    }
    handleToast('Login Successful');
    setSubmit(false);
    setLoginOver(true);
    setOpenLogin(false);
  }
  return (
    <LoginContainer>
      <div className={`loginContainer ${shake ? 'start' : ''}`}>
        <h3 className="heading">Login Details</h3>
        <form className="details-form">
          <div className="details-box">
            <GrUserAdmin className="icons" />
            <input
              type="text"
              className="details-input"
              placeholder="Enter your USN: "
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              required
            />
          </div>
          <div className="details-box">
            <BiLockOpen className="icons" />
            <AiFillEye className="icon-eye" onClick={() => setEye(!eye)} />
            <input
              type={`${eye ? 'text' : 'password'}`}
              className="details-input"
              placeholder="Enter Password: "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="buttons-box">
            <button className="cancel" onClick={() => setOpenLogin(false)}>
              Cancel
            </button>
            <button
              className="submit"
              onClick={handleSubmit}
              disabled={submit ? true : false}
            >
              {submit ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            border: `1px solid ${colorRed}`,
            padding: '1.2rem 2.4rem',
            fontSize: '1.8rem',
            fontFamily: 'inherit',
            color: colorPrimaryDarkest,
          },
        }}
      />
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  .loginContainer {
    padding: 3.2rem 6.4rem;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${colorPrimary};
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    align-items: center;
    border-radius: 16px;
    transition: all 0.3s;
  }

  .heading {
    font-size: 3.8rem;
    color: ${colorPrimaryDarkest};
  }

  .details-form {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
  }

  .details-box {
    position: relative;
  }

  .details-input {
    width: 40rem;
    padding: 1rem 4.8rem;
    font-size: ${defaultFontSize};
    background-color: ${colorPrimaryLightest};
    color: ${colorPrimaryDarkest};
    border: none;
    border-radius: 10px;
    outline: none;

    &:focus {
      outline: 3px solid ${colorPrimaryDarkest};
    }
  }

  .icons {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2.4rem;
    color: ${colorPrimaryDarkest};
    left: 1rem;
  }

  .icon-eye {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2.4rem;
    color: ${colorPrimaryDarkest};
    right: 1rem;
    cursor: pointer;
  }

  .buttons-box {
    padding: 0 2.4rem;
    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: center;
    margin-top: 1.2rem;
  }

  .cancel {
    width: 100%;
    padding: 1.2rem 0;
    border-radius: 10px;
    font-size: ${defaultFontSize};
    font-weight: 600;
    border: none;
    background-color: ${colorPrimaryLightest};
    box-shadow: inset 0 0 0 1px ${colorPrimaryDarkest};
    color: ${colorPrimaryDarkest};
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      color: ${colorPrimaryLightest};
      background-color: ${colorPrimaryDarkest};
    }
  }

  .submit {
    width: 100%;
    padding: 1.2rem 0;
    border-radius: 10px;
    font-size: ${defaultFontSize};
    font-weight: 600;
    border: none;
    color: ${colorPrimaryLightest};
    background-color: ${colorPrimaryDarkest};
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      color: ${colorPrimaryDarkest};
      background-color: ${colorPrimaryLightest};
    }
  }

  @keyframes shake {
    0%,
    100% {
      transform: translate(-50%, -50%) rotate(0) scale(1);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translate(-50%, -50%) rotate(-2deg) scale(1.1);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translate(-50%, -50%) rotate(2deg) scale(1.1);
    }
  }
  .start {
    animation: shake 1s infinite;
  }
`;

export default Login;
