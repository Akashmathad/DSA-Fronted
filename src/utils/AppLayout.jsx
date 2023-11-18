import styled from 'styled-components';
import Logo from './Logo';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <MainContainer>
      <div className="appLayout">
        <Logo />
        <Navbar />
      </div>
      <Outlet />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  height: 100vh;

  .appLayout {
    display: flex;
    max-width: 135rem;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    padding: 1.4rem 0;
  }
`;

export default AppLayout;
