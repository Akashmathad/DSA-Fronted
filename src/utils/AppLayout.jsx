import styled from 'styled-components';
import Logo from './Logo';
import Navbar from './Navbar';
import { colorPrimaryDarkest } from '../styles/colors';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <MainContainer>
      <Container>
        <AppLayoutContainer>
          <Logo />
          <Navbar />
        </AppLayoutContainer>
      </Container>
      <Outlet />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  background-color: ${colorPrimaryDarkest};
`;

const AppLayoutContainer = styled.div`
  display: flex;
  max-width: 140rem;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 0;
`;
export default AppLayout;
