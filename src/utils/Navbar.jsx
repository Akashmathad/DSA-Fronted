import styled from 'styled-components';
import { defaultFontSize } from '../styles/defaults';
import {
  colorPrimary,
  colorPrimaryDark,
  colorPrimaryLight,
  colorPrimaryLightest,
  colorWhite,
} from '../styles/colors';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <NavList>
        <Items>DSA</Items>
        <Items>Aptitude</Items>
        <Items to="/results">Results</Items>
        <Items>Leadership Board</Items>
        <Button to="/register">Register</Button>
      </NavList>
    </nav>
  );
}

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 6.4rem;
  align-items: center;
  justify-content: center;
`;

const Items = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  color: ${colorWhite};
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s;
  position: relative;

  &:hover {
    color: ${colorPrimaryLight};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1.6rem;
    width: 100%;
    height: 2px;
    background-color: ${colorPrimary};
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const Button = styled(Link)`
  background-color: ${colorPrimary};
  color: ${colorWhite};
  font-size: 2rem;
  padding: 1.2rem 3.2rem;
  border-radius: 999px;
  border: none;
  transition: all 0.3s;
  text-decoration: none;

  &:hover {
    background-color: ${colorPrimaryDark};
  }
`;

export default Navbar;
