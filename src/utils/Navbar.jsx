import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';

function Navbar() {
  const { jwt, removeUsnandJwt, loggedIn, setLoggedIn } =
    useContext(AuthContext);

  return (
    <nav>
      <NavList>
        <NavLink className="items" to={loggedIn ? '/dsa' : 'register'}>
          DSA
        </NavLink>
        <NavLink className="items" to={loggedIn ? '/aptitude' : 'register'}>
          Aptitude
        </NavLink>
        <NavLink className="items" to={loggedIn ? '/results' : 'register'}>
          Results
        </NavLink>
        <NavLink className="items" to={loggedIn ? '/leaderShip' : 'register'}>
          Leadership Board
        </NavLink>
        {loggedIn && (
          <NavLink className="items" to="/profile">
            Profile
          </NavLink>
        )}
        {!loggedIn && (
          <NavLink className="button" to="/register">
            Sign up / Login
          </NavLink>
        )}
        {loggedIn && (
          <button
            className="button"
            onClick={() => {
              removeUsnandJwt();
              setLoggedIn(false);
            }}
          >
            Logout
          </button>
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
