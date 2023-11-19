import styled from 'styled-components';
import Logo from './Logo';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <>
      <MainContainer>
        <Logo />
        <Navbar />
      </MainContainer>
      <Outlet />
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  max-width: 135rem;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: 2.4rem 0;
`;

export default AppLayout;
