import styled from 'styled-components';
import { colorPrimaryLightest } from '../styles/colors';
import { Link } from 'react-router-dom';

function Logo() {
  return <LogoCt to="/">DSA</LogoCt>;
}

const LogoCt = styled(Link)`
  text-decoration: none;
  font-size: 2.2rem;
  color: ${colorPrimaryLightest};
`;

export default Logo;
