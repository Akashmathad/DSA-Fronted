import styled from 'styled-components';
import { BiLockOpen } from 'react-icons/bi';
import { AiFillEye } from 'react-icons/ai';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../../utils/Button';
import { RiAdminLine } from 'react-icons/ri';

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
        setSubmit(false);
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
      <div className={`register-container  ${shake ? 'start' : ''}`}>
        <div className="gradient-line top"></div>
        <div className="gradient-circle topest"></div>
        <h3 className="heading">Login Details</h3>
        <form className="details-form">
          <div className="details-box">
            <RiAdminLine className="icons" />
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
            <Button
              className="cancel"
              color="lightPurple"
              onClick={() => setOpenLogin(false)}
            >
              Cancel
            </Button>
            <Button
              color="purple"
              className="submit"
              onClick={handleSubmit}
              disabled={submit ? true : false}
            >
              {submit ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            padding: '0.9rem 1.5rem',
            fontSize: '1.8rem',
            fontFamily: 'inherit',
            color: (props) => props.theme.colors.colorBlack,
          },
        }}
      />
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.colorBlack};

  .icon-eye {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2.4rem;
    color: ${(props) => props.theme.colors.colorPrimaryLight};
    right: 1rem;
    cursor: pointer;
  }
`;

export default Login;
