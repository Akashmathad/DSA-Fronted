import { useContext, useEffect, useState } from 'react';
import { AptitudeContext } from '../../pages/AptitudeTest';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import Loader from '../../utils/Loader';
import { exitFullscreen } from '../../utils/screenExitHandler';
import Graph from './Graph';
import IncorrectQuestion from './IncorrectQuestion';

function Finished() {
  console.log('hello');
  const [points, setPoints] = useState();
  const [incorrectQuestions, setIncorrectQuestions] = useState();
  const [submitted, setSubmitted] = useState(false);
  const {
    questions,
    status,
    ans,
    dispatch,
    secondsRemaining,
    contestName,
    contestNumber,
  } = useContext(AptitudeContext);
  const { usn, jwt } = useContext(AuthContext);
  exitFullscreen();
  function getIncorrectQuestions(originalAnswers) {
    const incQuestions = questions.map((question) => {
      const correspondingAnswer = ans.find(
        (answer) => answer.question === question.questionNumber
      );
      const correspondingOriginalAnswer = originalAnswers.find(
        (originalAnswer) =>
          originalAnswer.questionNumber === question.questionNumber
      );

      return {
        questionNumber: question.questionNumber,
        questionDescription: question.questionDescription,
        options: question.options,
        correctAnswer: correspondingOriginalAnswer?.answer,
        userAnswer: correspondingAnswer?.answer,
      };
    });

    const finalList = incQuestions.filter(
      (question) => question.correctAnswer !== question.userAnswer
    );

    console.log(finalList);
    console.log(finalList.length);

    setIncorrectQuestions(finalList);

    setPoints(25 - finalList.length);
  }

  const padWithZero = (number) => (number < 10 ? `0${number}` : number);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!jwt) return;
        const req = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/aptitude-dsa/question-answers/answers?contestNumber=${contestNumber}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = await req.json();
        const originalAns = data.data.Answer[0].answers;
        console.log(originalAns);
        getIncorrectQuestions(originalAns);
      } catch (e) {
        console.log(e);
        //dispatch({ type: 'dataFailed' });
      }
    }
    fetchData();
  }, [jwt]);

  useEffect(
    function () {
      async function fetchData() {
        if (!points) return;
        try {
          const request = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/api/v1/aptitude-dsa/profile/aptitude/${contestNumber}/${usn}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                contestName,
                points,
                timeLeft: secondsRemaining,
              }),
            }
          );
          const data2 = await request.json();
          console.log(data2);
          if (request.status === 200) {
            setSubmitted(true);
          }
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    },
    [points]
  );

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
      <div>
        <div className="button-box">
          {' '}
          <p className="finished-heading">Test Analysis</p>{' '}
          {submitted ? <Button to="/">Return</Button> : ''}
        </div>

        <div className="stats-container">
          <div className="stats">
            <p className="stats-text">
              Total Questions : <span className="color-grey">25</span>{' '}
            </p>
            <p>
              Correct Questions:{' '}
              <span className="color-grey color-green">
                {incorrectQuestions &&
                  padWithZero(25 - incorrectQuestions.length)}
              </span>
            </p>
            <p>
              Incorrect Questions :{' '}
              <span className="color-grey color-red">
                {incorrectQuestions &&
                  padWithZero(
                    incorrectQuestions.filter(
                      (question) => question.userAnswer !== null
                    ).length
                  )}
              </span>
            </p>
            <p>
              Unanswered Questions:{' '}
              <span className="color-grey">
                {incorrectQuestions &&
                  padWithZero(
                    incorrectQuestions.filter(
                      (question) => question.userAnswer === null
                    ).length
                  )}{' '}
              </span>
            </p>
          </div>
          <div className="stats-graph">
            {incorrectQuestions && (
              <Graph
                data={[
                  { name: 'correct', value: 25 - incorrectQuestions.length },
                  {
                    name: 'incorrect',
                    value: incorrectQuestions.filter(
                      (question) => question.userAnswer !== null
                    ).length,
                  },
                  {
                    name: 'unanswered',
                    value: incorrectQuestions.filter(
                      (question) => question.userAnswer === null
                    ).length,
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <p className="finished-heading">Incorrect / Unanswered Questions</p>
        <div className="question-box">
          {incorrectQuestions &&
            incorrectQuestions.map((question) => (
              <IncorrectQuestion
                question={question}
                key={question.questionNumber}
              />
            ))}
        </div>
      </div>
    </FinishedContainer>
  );
}

const FinishedContainer = styled.div`
  width: 120rem;
  margin: 0 auto;
  min-height: 100vh;
  padding: 8rem 0rem;
  display: flex;
  flex-direction: column;
  gap: 6rem;

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

  .button-box {
    display: flex;
    justify-content: space-between;
  }

  .finished-heading {
    font-size: 4rem;
    color: ${(props) => props.theme.colors.colorTritaryLight};
  }

  .stats-container {
    margin-top: 2.4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 1.8rem 0;
    border: 2px solid #ffffff27;
    border-radius: 11px;
  }

  .stats {
    padding: 5.2rem 0;
    font-size: 3.4rem;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding-left: 12.8rem;
    justify-content: center;
  }

  .stats-graph {
    width: 100%;
    height: 100%;
  }

  .color-red {
    color: ${(props) => props.theme.colors.colorRed};
    font-weight: 600;
  }

  .color-grey {
    font-weight: 600;
    letter-spacing: 1.5px;
  }

  .question-box {
    margin-top: 2.4rem;
    padding: 1.2rem;
    border: 2px solid #ffffff27;
    border-radius: 11px;
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
