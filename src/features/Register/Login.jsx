import styled from 'styled-components';
import {
  colorPrimary,
  colorPrimaryDarkest,
  colorPrimaryLightest,
} from '../../styles/colors';
import { defaultFontSize } from '../../styles/defaults';
import { BiLockOpen } from 'react-icons/bi';
import { GrUserAdmin } from 'react-icons/gr';
import { useState } from 'react';

function Login({ setOpenLogin, setLoginOver, set }) {
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    setLoginOver(true);
    setOpenLogin(false);
  }
  return (
    <LoginContainer>
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
          <input
            type="password"
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
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
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
`;

export default Login;
