import { useContext, useEffect } from 'react';
import { GiSandsOfTime } from 'react-icons/gi';
import styled from 'styled-components';
import {
  colorGreyDark500,
  colorSecondary,
  colorTritary,
  colorWhite,
} from '../../styles/colors';
import { DSAContext } from '../../pages/DSATest';

function DSATimer() {
  const { dispatch, secondsRemaining } = useContext(DSAContext);
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: 'tick' });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <TimerContainer className="time">
      <StopWatch />
      {mins < 10 && '0'}
      {mins}:{seconds < 10 && '0'}
      {seconds}
    </TimerContainer>
  );
}

const TimerContainer = styled.div`
  width: 100%;
  height: 100%;
  color: ${colorWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  font-size: 4.4rem;
  background-color: ${colorGreyDark500};
  border-radius: 11px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StopWatch = styled(GiSandsOfTime)`
  color: ${colorSecondary};
`;

export default DSATimer;
