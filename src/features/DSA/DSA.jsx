import { useContext, useEffect, useState } from 'react';
import { DSAContext } from '../../pages/DSATest';
import styled from 'styled-components';

import DSATimer from './DSATimer';

import IDE from './IDE';
import Button from '../../utils/Button';
import { exitFullscreen } from '../../utils/screenExitHandler';
import CodeResult from './CodeResult';
import { AuthContext } from '../../App';
import Loader2 from '../../utils/Loader2';

function DSA() {
  const [loader, setLoader] = useState(false);
  const {
    questions,
    results,
    index,
    ans,
    language,
    dispatch,
    contestNumber,
    contestName,
    open,
    setOpen,
  } = useContext(DSAContext);
  const { jwt } = useContext(AuthContext);
  const question = questions[index];
  const result = results[index];

  const handleVisibilityChange = () => {
    dispatch({ type: 'check' });
    console.log('Visibility change detected');
  };

  const handleBlur = () => {
    dispatch({ type: 'check' });
    console.log('Blur event detected');
  };

  // useEffect(() => {
  //   const visibilityChangeHandler = () => handleVisibilityChange(dispatch);
  //   const blurHandler = () => handleBlur(dispatch);

  //   // Add event listeners for visibilitychange and blur events
  //   document.addEventListener('visibilitychange', visibilityChangeHandler);
  //   window.addEventListener('blur', blurHandler);

  //   // Remove the event listeners when the component unmounts
  //   return () => {
  //     document.removeEventListener('visibilitychange', visibilityChangeHandler);
  //     window.removeEventListener('blur', blurHandler);
  //   };
  // }, [dispatch]);

  async function setResult() {
    setLoader(true);
    setOpen(false);
    const solution = JSON.stringify({ code: ans[index][language] });
    console.log(solution);
    try {
      if (!jwt) return;
      const req = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/aptitude-dsa/program/complie/${language}/${index + 1}`,
        {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
            authorization: `Bearer ${jwt}`,
          },
          body: solution,
        }
      );

      const data = await req.json();
      if (data.status === 'error') {
        const newResults = [...results];
        newResults[index].error = true;
        newResults[index].status = false;
        newResults[index].message = data.message;
        console.log(newResults);
        dispatch({ type: 'setResult', payload: newResults });
      } else {
        const tests = data.results;
        const varifyTests = tests.filter((test) => test.Result === 'Fail');
        const success = varifyTests.length === 0 ? true : false;
        const newResults = [...results];
        newResults[index].status = success;
        newResults[index].message = data.message;
        newResults[index].tests = tests;
        newResults[index].error = false;
        dispatch({ type: 'setResult', payload: newResults });
      }
    } catch (e) {
      console.log(e);
    }
    setLoader(false);
  }

  return (
    <DSAContainer>
      <h2 className="heading">{contestName}</h2>
      <div className="dsa-box">
        <div className="dsa-question-boxes">
          {open && (
            <div className="dsa-question-box">
              <div className="heading-box">
                <p className="question-number">{question.questionNumber}. </p>
                <p className="question-description">
                  {question.questionDescription}
                </p>
              </div>
              <div className="test-case-box">
                {question.testCases.map((test) => (
                  <div key={test.testCase} className="test-box">
                    <p className="test-name">Test case : {test.testCase}</p>
                    <div className="test-input-box">
                      <p className="inputs">Input: {test.input}</p>
                      <p className="inputs">Output: {test.output}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!open && (
            <div className="dsa-question-box">
              {loader ? <Loader2 /> : <CodeResult />}
            </div>
          )}
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
                  onClick={() => {
                    setOpen(true);
                    dispatch({ type: 'nextQuestion' });
                  }}
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
                <button
                  className="run-button"
                  onClick={setResult}
                  disabled={loader}
                >
                  {loader ? 'Running...' : 'Run'}
                </button>
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
    border: 1px solid rgba(0, 140, 255, 0.2);
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
    border: 1px solid rgba(0, 140, 255, 0.2);
    padding: 2.4rem;
    color: ${(props) => props.theme.colors.colorSecondaryLightest};
    font-size: ${(props) => props.theme.fontSizes.small};
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    height: 62vh;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0.5rem;
      background-color: ${(props) => props.theme.colors.colorBlack200};
    }

    .heading-box {
      display: flex;
      gap: 1rem;
    }

    .question-description {
      font-size: 2rem;
      line-height: 1.4;
    }

    .question-number {
      color: ${(props) => props.theme.colors.colorSecondaryLight};
      font-size: 2rem;
      margin-top: 0.3rem;
    }

    .test-case-box {
      padding-left: 1.6rem;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      font-size: 2rem;

      .test-box {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .test-input-box {
        background-color: ${(props) => props.theme.colors.colorBlack200};
        padding: 1.2rem;
        border-radius: 9px;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        font-size: 2.2rem;
        border: 1px solid rgba(0, 140, 255, 0.2);
      }
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
    border: 1px solid rgba(0, 140, 255, 0.2);
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
    border: 1px solid rgba(0, 140, 255, 0.2);
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
    border: 1px solid rgba(0, 140, 255, 0.2);
    border-radius: 11px;
    overflow: hidden;
  }
`;

export default DSA;
