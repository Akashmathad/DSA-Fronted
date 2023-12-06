import { useContext } from 'react';
import { DSAContext } from '../../pages/DSATest';
import styled from 'styled-components';

import DSATimer from './DSATimer';

import IDE from './IDE';
import Button from '../../utils/Button';
import { exitFullscreen } from '../../utils/screenExitHandler';

function DSA() {
  const { questions, results, index, dispatch, contestName, open } =
    useContext(DSAContext);
  const question = questions[index];
  const result = results[index];

  return (
    <DSAContainer>
      <h2 className="heading">{contestName}</h2>
      <div className="dsa-box">
        <div className="dsa-question-boxes">
          {open && (
            <div className="dsa-question-box">
              <p className="question-description">
                <span className="question-number">
                  {question.questionNumber}.{' '}
                </span>
                {question.questionDescription}
              </p>
              <div className="test-case-box">
                <p className="test-case">{question.TestCase1}</p>
                <p className="test-case">{question.TestCase2}</p>
                <p className="test-case">{question.TestCase2}</p>
              </div>
            </div>
          )}
          {!open && <div className="dsa-question-box">{result.message}</div>}
          <div className="dsa-control-box">
            <div className="dsa-buttons">
              {index !== 0 && (
                <Button
                  color="red"
                  onClick={() => dispatch({ type: 'previousQuestion' })}
                >
                  Back
                </Button>
              )}
              {index !== questions.length - 1 && (
                <Button
                  color="blue"
                  onClick={() => dispatch({ type: 'nextQuestion' })}
                >
                  Next
                </Button>
              )}
              {index === questions.length - 1 && (
                <Button
                  color="green"
                  onClick={() => {
                    exitFullscreen();
                    dispatch({ type: 'check' });
                  }}
                >
                  Finish
                </Button>
              )}
            </div>
            <div className="dsa-timer-box">
              <div className="dsa-timer">
                <DSATimer />
              </div>
              <div className="dsa-run">
                <button className="run-button">Run</button>
              </div>
            </div>
          </div>
          {result.status && <p className="completed">Completed!</p>}
        </div>
        <div className="dsa">
          <IDE />
        </div>
      </div>
    </DSAContainer>
  );
}

const DSAContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .heading {
    text-align: center;
    font-size: 4rem;
    padding: 1.2rem 0;
    color: ${(props) => props.theme.colors.colorSecondary};
    background-color: ${(props) => props.theme.colors.colorBlack100};
    font-weight: 500;
    border-radius: 11px;
    border: 1px solid rgba(0, 140, 255, 0.1);
  }

  .dsa-box {
    flex-grow: 1;
    display: grid;
    grid-template-columns: 45fr 55fr;
    column-gap: 1.2rem;
  }

  .dsa-question-boxes {
    display: grid;
    grid-template-rows: 76fr 24fr;
    gap: 1.2rem;
    position: relative;
  }

  .dsa-question-box {
    background-color: ${(props) => props.theme.colors.colorBlack100};
    border-radius: 11px;
    border: 1px solid rgba(0, 140, 255, 0.1);
    padding: 2.4rem;
    color: ${(props) => props.theme.colors.colorSecondaryLightest};
    font-size: ${(props) => props.theme.fontSizes.small};
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    .question-number {
      color: ${(props) => props.theme.colors.colorSecondaryLight};
      font-size: 2.2rem;
    }

    .test-case-box {
      padding-left: 1.6rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
  }

  .dsa-control-box {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .dsa-buttons {
    background-color: ${(props) => props.theme.colors.colorBlack100};
    border-radius: 11px;
    border: 1px solid rgba(0, 140, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6.4rem;
    gap: 4.2rem;
    height: 100%;
  }

  .dsa-timer-box {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
  }

  .dsa-run {
    background-color: ${(props) => props.theme.colors.colorBlack100};
    border-radius: 11px;
    border: 1px solid rgba(0, 140, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .completed {
    color: ${(props) => props.theme.colors.colorTritaryLight};
    font-size: 2.2rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .run-button {
    height: 5.2rem;
    width: 18rem;
    background-color: ${(props) => props.theme.colors.colorTritary};
    border: none;
    color: inherit;
    font-size: 2rem;
    font-weight: 600;
    border-radius: 11px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }

  .dsa {
    background-color: ${(props) => props.theme.colors.colorBlack100};
    height: 100%;
    border: 1px solid rgba(0, 140, 255, 0.1);
    border-radius: 11px;
    overflow: hidden;
  }
`;

export default DSA;
