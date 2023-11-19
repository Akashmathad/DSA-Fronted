import styled from 'styled-components';
import { FaRegUser } from 'react-icons/fa6';
import { RiAdminLine } from 'react-icons/ri';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BsTelephoneForward } from 'react-icons/bs';
import { BiLockOpen, BiLock } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../../utils/Button';

function Signup({ setOpenSignup, setOpenLogin, handleToast }) {
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState();
  const [branch, setBranch] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [shake, setShake] = useState(false);
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
      setSubmit(false);
      return;
    }
    if (password !== cPassword) {
      startShaking();
      toast.error("The passwords aren't matching!");
      setSubmit(false);
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
    setSubmit(false);
    setOpenSignup(false);
    setOpenLogin(true);
  }

  return (
    <SignupContainer>
      <div className={`register-container ${shake ? 'start' : ''}`}>
        <div className="gradient-line top"></div>
        <div className="gradient-circle top"></div>
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
            <Button
              color="lightPurple"
              className="cancel"
              onClick={() => setOpenSignup(false)}
            >
              Cancel
            </Button>
            <Button
              color="purple"
              type="submit"
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
            fontSize: '1.6rem',
            fontFamily: 'inherit',
            color: (props) => props.theme.colors.colorBlack,
          },
        }}
      />
    </SignupContainer>
  );
}
const SignupContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.colorBlack};
`;
export default Signup;
