import { useContext } from 'react';
import { AptitudeContext } from '../../pages/AptitudeTest';
import styled from 'styled-components';
import {
  colorPrimaryLightest,
  colorTritary,
  colorTritaryDarkest,
  colorTritaryLight,
  colorWhite,
} from '../../styles/colors';
import { defaultFontSize } from '../../styles/defaults';

function requestFullscreen() {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function Ready() {
  const { questions, dispatch } = useContext(AptitudeContext);
  return (
    <ReadyContainer>
      <div className="heading">Aptitude Test</div>
      <div className="rules-box">
        <p className="rules-heading">Rules:</p>
        <ul className="rules">
          <li className="rule">
            Test contains <span className="rule-important">X</span> questions
            with time limit of <span className="rule-important">X</span>.
          </li>
          <li className="rule">
            Each correct answer carries{' '}
            <span className="rule-important">5</span> points
          </li>
          <li className="rule">
            U are not allowed to exit{' '}
            <span className="rule-important">Full-Screen Mode</span>. If u do
            so, test will automatically gets submitted without any prior
            warning.
          </li>
          <li className="rule">
            You will be awarded with{' '}
            <span className="rule-important">Extra points</span> , if u complete
            the test within time.
          </li>
        </ul>
      </div>
      {questions && (
        <button
          className="start"
          onClick={() => {
            requestFullscreen();
            dispatch({ type: 'start' });
          }}
        >
          Start&rarr;
        </button>
      )}
    </ReadyContainer>
  );
}

const ReadyContainer = styled.div`
  width: 100%;
  padding: 9.6rem;
  display: flex;
  flex-direction: column;
  gap: 9.6rem;
  align-items: center;
  justify-content: center;

  .heading {
    color: ${colorTritary};
    font-size: 7.4rem;
    font-weight: 600;
    letter-spacing: 1.5px;
  }

  .rules-box {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  .rules-heading {
    font-size: ${defaultFontSize};
    color: ${colorTritaryLight};
    font-weight: 700;
  }

  .rules {
    list-style: decimal;
    padding-left: 2.4rem;
    color: ${colorPrimaryLightest};
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  .rule-important {
    color: ${colorTritaryLight};
    font-weight: 700;
  }

  .start {
    background-color: ${colorTritary};
    color: ${colorWhite};
    padding: 1.2rem 4.8rem;
    font-size: 2.2rem;
    letter-spacing: 1.5px;
    border: none;
    border-radius: 11px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover,
    &:active {
      background-color: ${colorTritaryLight};
      color: ${colorTritaryDarkest};
      transform: scale(1.1);
    }
  }
`;

export default Ready;
