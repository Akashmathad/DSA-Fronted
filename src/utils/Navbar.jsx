import styled from 'styled-components';
import {
  colorPrimary,
  colorPrimaryDark,
  colorPrimaryLight,
  colorWhite,
} from '../styles/colors';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../App';

function Navbar() {
  const { usn } = useContext(AuthContext);

  return (
    <nav>
      <NavList>
        <NavLink className="items" to="/dsa">
          DSA
        </NavLink>
        <NavLink className="items" to="/aptitude">
          Aptitude
        </NavLink>
        <NavLink className="items" to="/results">
          Results
        </NavLink>
        <NavLink className="items" to="/leaderShip">
          Leadership Board
        </NavLink>
        {usn && (
          <NavLink className="items" to="/profile">
            Profile
          </NavLink>
        )}
        {usn && (
          <NavLink className="button" to="/register">
            Register
          </NavLink>
        )}
      </NavList>
    </nav>
  );
}

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 4.8rem;
  align-items: center;
  justify-content: center;

  .items {
    text-decoration: none;
    font-size: ${(props) => props.theme.fontSizes.small};
    color: ${(props) => props.theme.colors.colorPrimaryLightest};
    cursor: pointer;
    transition: all 0.3s;

    &:hover,
    &:active,
    &.active {
      color: ${(props) => props.theme.colors.colorWhite};
    }
  }
`;

export default Navbar;
