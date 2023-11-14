import { useContext, useEffect, useState } from 'react';
import { AptitudeContext } from '../../pages/AptitudeTest';
import styled from 'styled-components';
import {
  colorTritary,
  colorTritaryDarkest,
  colorTritaryLight,
  colorTritaryLightest,
  colorWhite,
} from '../../styles/colors';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App';

let once = true;

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
        if (once) {
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
          once = false;
        }

        dispatch({ type: 'finish' });
      } catch (e) {
        console.log(e);
        //dispatch({ type: 'dataFailed' });
      }
    }
    fetchData();
  }, [jwt]);

  return (
    <FinishedContainer>
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 3.2rem;

  .greeting-icon {
    font-size: 6.2rem;
  }

  .greetings {
    padding: 1.2rem;
    color: ${colorWhite};
    font-size: 6.2rem;
    font-weight: 500;
    font-style: italic;
    letter-spacing: 1.5px;
    background-image: linear-gradient(
      to right,
      #f68989,
      #f09d71,
      #dbb368,
      #bdc876,
      #9ad997,
      #6fddb4,
      #3eddd4,
      #00dbf3,
      #00cbff,
      #36b7ff,
      #819eff,
      #b680e8
    );

    text-align: center;
    -webkit-background-clip: text;
    color: transparent;
  }

  .score {
    margin-top: 3.2rem;
    font-size: 3.2rem;
    color: ${colorTritaryLightest};
    text-align: center;

    .points {
      font-size: 6.2rem;
      margin: 0 1.2rem;
      color: ${colorTritaryLight};
      border-bottom: 2px solid ${colorTritary};
    }
  }
`;

const Button = styled(Link)`
  background-color: ${colorTritary};
  color: ${colorWhite};
  padding: 1.2rem 4.8rem;
  font-size: 2.2rem;
  border: none;
  border-radius: 11px;
  transition: all 0.3s;
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:active {
    background-color: ${colorTritaryLight};
    color: ${colorTritaryDarkest};
    transform: scale(1.1);
  }
`;

export default Finished;
