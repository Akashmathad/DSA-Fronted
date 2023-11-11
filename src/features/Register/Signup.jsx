import styled from 'styled-components';
import { FaRegUser } from 'react-icons/fa6';
import { GrUserAdmin } from 'react-icons/gr';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BsTelephoneForward } from 'react-icons/bs';
import { BiLockOpen, BiLock } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import {
  colorPrimary,
  colorPrimaryDarkest,
  colorPrimaryLightest,
  colorRed,
} from '../../styles/colors';
import { defaultFontSize } from '../../styles/defaults';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function Signup({ setOpenSignup, setOpenLogin, handleToast }) {
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState();
  const [branch, setBranch] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [shake, setShake] = useState(false);

  function startShaking() {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 1000);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !name ||
      !usn ||
      !email ||
      !contact ||
      !password ||
      !cPassword ||
      !branch
    ) {
      startShaking();
      toast.error('Please provide full details');
      return;
    }
    if (password !== cPassword) {
      startShaking();
      toast.error("The passwords aren't matching!");
      return;
    }
    const details = {
      name,
      usn,
      email,
      contact,
      password,
      branch,
    };
    console.log(JSON.stringify(details));
    try {
      const req = await fetch(
        'https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/user/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(details),
        }
      );
      const data = await req.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    handleToast('Signup Successful');
    setOpenSignup(false);
    setOpenLogin(true);
  }

  return (
    <SignupContainer>
      <div className={`signupContainer ${shake ? 'start' : ''}`}>
        <h3 className="heading">Signup Details</h3>
        <form className="details-form" onSubmit={handleSubmit}>
          <div className="details-box">
            <FaRegUser className="icons" />
            <input
              type="text"
              className="details-input"
              placeholder="Enter your Name: "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <MdOutlineAlternateEmail className="icons" />
            <input
              type="email"
              className="details-input"
              placeholder="Enter your EmailId:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="details-box">
            <BsTelephoneForward className="icons" />
            <input
              type="number"
              className="details-input"
              placeholder="Enter your Phone No: "
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="details-box">
            <FiSettings className="icons" />
            <select
              type="number"
              className="details-input"
              placeholder="Select your Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            >
              <option value="" hidden>
                Select your branch
              </option>
              <option value="cse" key="1">
                CSE
              </option>
              <option value="ise" key="3">
                ISE
              </option>
              <option value="ece" key="2">
                ECE
              </option>
            </select>
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
          <div className="details-box">
            <BiLock className="icons" />
            <input
              type="password"
              className="details-input"
              placeholder="Confirm Password: "
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              required
            />
          </div>
          <div className="buttons-box">
            <button className="cancel" onClick={() => setOpenSignup(false)}>
              Cancel
            </button>
            <button className="submit" type="submit">
              Submit
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
    </SignupContainer>
  );
}
const SignupContainer = styled.div`
  .signupContainer {
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
    transition: all 0.3s;
  }
`;
export default Signup;
