import { useContext } from 'react';
import { DSAContext } from '../../pages/DSATest';
import styled from 'styled-components';
import {
  colorGreyDark500,
  colorRed,
  colorSecondary,
  colorTritary,
  colorWhite,
} from '../../styles/colors';

import DSATimer from './DSATimer';

import IDE from './IDE';

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function DSA() {
  const { questions, index, dispatch, contestName } = useContext(DSAContext);

  const question = questions[index];
  return (
    <DSAContainer>
      <h2 className="heading">DSA - 01</h2>
      <div className="dsa-box">
        <div className="dsa-question-boxes">
          <div className="dsa-question-box">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores,
            itaque.
          </div>
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
                  color="green"
                  onClick={() => dispatch({ type: 'nextQuestion' })}
                >
                  Next
                </Button>
              )}
              {index === questions.length - 1 && (
                <Button
                  color="blue"
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
    color: ${colorSecondary};
    background-color: ${colorGreyDark500};
    font-weight: 500;
    border-radius: 11px;
    border: 1px solid rgba(255, 255, 255, 0.2);
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
  }

  .dsa-question-box {
    background-color: ${colorGreyDark500};
    border-radius: 11px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .dsa-control-box {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .dsa-buttons {
    background-color: ${colorGreyDark500};
    border-radius: 11px;
    border: 1px solid rgb(255, 255, 255, 0.2);
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
    background-color: ${colorGreyDark500};
    border-radius: 11px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .run-button {
    height: 5.2rem;
    width: 18rem;
    background-color: ${colorTritary};
    border: none;
    font-size: 2rem;
    font-weight: 600;
    color: ${colorWhite};
    border-radius: 11px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }

  .dsa {
    background-color: ${colorGreyDark500};
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 11px;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 5.2rem;
  border: none;
  border-radius: 11px;
  cursor: pointer;
  color: ${colorWhite};
  font-size: 2rem;
  font-weight: 600;
  transition: all 0.3s;
  background-color: ${(props) => {
    switch (props.color) {
      case 'green':
        return colorSecondary;
      case 'red':
        return colorRed;
      case 'blue':
        return colorTritary;
      default:
        return colorSecondary;
    }
  }};

  &:hover {
    transform: scale(1.04);
  }
`;

export default DSA;
