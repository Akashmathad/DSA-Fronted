import { useContext, useEffect, useState } from 'react';
import { AptitudeContext } from '../../pages/AptitudeTest';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../App';

function Finished() {
  const [points, setPoints] = useState(0);
  const {
    status,
    ans,
    dispatch,
    secondsRemaining,
    contestName,
    contestNumber,
  } = useContext(AptitudeContext);
  const { usn, jwt } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!jwt) return;
        const req = await fetch(
          'https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/question-answers/answers',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = await req.json();
        const originalAns = data.data.Answer[0].answers;
        let newPoints = 0;
        ans.forEach((ans, index) =>
          ans.answer === originalAns[ans.question - 1].answerOption
            ? (newPoints += 5)
            : null
        );
        setPoints(newPoints);

        console.log({
          contestName,
          points: newPoints,
          timeLeft: secondsRemaining,
        });
        const request = await fetch(
          `https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/profile/${contestNumber}/${usn}`,
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
        const data2 = await request.json();
        console.log(data2);
        dispatch({ type: 'finish' });
      } catch (e) {
        console.log(e);
        //dispatch({ type: 'dataFailed' });
      }
    }
    fetchData();
  }, [jwt]);

  return (
    <FinishedContainer className="finished-container">
      <div>
        <h2 className="greeting-icon">
          <span className="greetings">Congratulations</span>🎉
        </h2>
        <p className="score">
          You have scored <span className="points">{points}</span> points
        </p>
      </div>
      {status === 'finished' && <Button to="/">Return</Button>}
    </FinishedContainer>
  );
}

const FinishedContainer = styled.div`
  .score {
    margin-top: 3.2rem;
    font-size: 3.2rem;
    color: ${(props) => props.theme.colors.colorTritaryLightest};
    text-align: center;

    .points {
      font-size: 6.2rem;
      margin: 0 1.2rem;
      color: ${(props) => props.theme.colors.colorTritaryLight};
      border-bottom: 2px solid ${(props) => props.theme.colors.colorTritary};
    }
  }
`;

const Button = styled(Link)`
  background-color: ${(props) => props.theme.colors.colorTritary};
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
    background-color: ${(props) => props.theme.colors.colorTritaryLight};
    color: ${(props) => props.theme.colors.colorBlack100};
    transform: scale(1.1);
  }
`;

export default Finished;
