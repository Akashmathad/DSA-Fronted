import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DSAContext } from '../../pages/DSATest';
function DSAFinished() {
  const [points, setPoints] = useState(0);
  const {
    status,
    ans,
    dispatch,
    secondsRemaining,
    contestName,
    contestNumber,
  } = useContext(DSAContext);
  return (
    <DSAFinishedContainer className="finished-container">
      <div>
        <h2 className="greeting-icon">
          <span className="greetings">Congratulations</span>🎉
        </h2>
        <p className="score">
          You have scored <span className="points">{points}</span> points
        </p>
      </div>
      {/* {status === 'finished' && <Button to="/">Return</Button>} */}
      <Button to="/">Return</Button>
    </DSAFinishedContainer>
  );
}

const DSAFinishedContainer = styled.div`
  .score {
    margin-top: 3.2rem;
    font-size: 3.2rem;
    color: ${(props) => props.theme.colors.colorTritaryLightest};
    text-align: center;

    .points {
      font-size: 6.2rem;
      margin: 0 1.2rem;
      color: ${(props) => props.theme.colors.colorSecondaryLight};
      border-bottom: 2px solid ${(props) => props.theme.colors.colorSecondary};
    }
  }
`;

const Button = styled(Link)`
  background-color: ${(props) => props.theme.colors.colorSecondary};
  color: inherit;
  padding: 1.2rem 4.8rem;
  font-size: 2.2rem;
  border: none;
  border-radius: 11px;
  transition: all 0.3s;
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:active {
    background-color: ${(props) => props.theme.colors.colorSecondaryLight};
    color: ${(props) => props.theme.colors.colorBlack100};
    transform: scale(1.1);
  }
`;

export default DSAFinished;
