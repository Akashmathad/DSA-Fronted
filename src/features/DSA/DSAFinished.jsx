import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DSAContext } from '../../pages/DSATest';
import { AuthContext } from '../../App';
import Loader from '../../utils/Loader';
function DSAFinished() {
  const [points, setPoints] = useState(0);
  const {
    status,
    dispatch,
    secondsRemaining,
    contestName,
    contestNumber,
    results,
  } = useContext(DSAContext);
  const { usn, jwt } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        let newPoints = 0;
        results.map((result) => (result.status ? (newPoints += 20) : null));
        setPoints(newPoints);

        console.log({
          contestName,
          points: newPoints,
          timeLeft: secondsRemaining,
        });
        const request = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/aptitude-dsa/profile/dsa/${contestNumber}/${usn}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
              contestName,
              points: newPoints,
              timeLeft: secondsRemaining,
            }),
          }
        );
        const data = await request.json();
        console.log(data);
        dispatch({ type: 'finish' });
      } catch (e) {
        console.log(e);
        //dispatch({ type: 'dataFailed' });
      }
    }
    fetchData();
  }, [jwt]);

  console.log(points);

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
      {status === 'finished' ? <Button to="/">Return</Button> : <Loader />}
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
