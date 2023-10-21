import { useContext } from 'react';
import { AptitudeContext } from '../../pages/AptitudeTest';
import Timer from './Timer';
import styled from 'styled-components';
import QuestionButtons from './QuestionButtons';
import Option from './Option';
import {
  colorGreyDark300,
  colorGreyDark400,
  colorRed,
  colorSecondary,
  colorTritary,
  colorTritaryLight,
  colorWhite,
} from '../../styles/colors';
import { defaultFontSize } from '../../styles/defaults';

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

function Aptitude() {
  const { questions, index, dispatch } = useContext(AptitudeContext);

  const question = questions[index];
  return (
    <AptitudeContainer>
      <h2 className="heading">Aptitude test</h2>
      <div className="aptitude-box">
        <div className="box question-box">
          <p className="question">
            <span className="question-number">
              {' '}
              {question.question_number}.{'  '}
            </span>
            {question.question_description}
          </p>
          <div className="option-box">
            <Option value="A" qNum={question.question_number}>
              {question.options.A}
            </Option>
            <Option value="B" qNum={question.question_number}>
              {question.options.B}
            </Option>
            <Option value="C" qNum={question.question_number}>
              {question.options.C}
            </Option>
            <Option value="D" qNum={question.question_number}>
              {question.options.D}
            </Option>
          </div>
        </div>
        <div className="box questions-box">
          <QuestionButtons />
        </div>
        <div className="box button-box">
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

        <div className="box timer-box">
          <Timer />
        </div>
      </div>
    </AptitudeContainer>
  );
}

const AptitudeContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .heading {
    text-align: center;
    font-size: 4.4rem;
    padding: 0.6rem 0 1.8rem 0;
    color: ${colorTritary};
    background-color: ${colorGreyDark400};
    font-weight: 500;
    border-radius: 11px;
    border: 2px solid rgb(0, 173, 144, 0.2);
  }

  .aptitude-box {
    flex-grow: 1;
    display: grid;
    grid-template-columns: 75fr 25fr;
    grid-template-rows: 83fr 17fr;
    gap: 1.2rem;
  }

  .box {
    background-color: ${colorGreyDark400};
    border-radius: 11px;
    border: 2px solid rgb(0, 173, 144, 0.2);
    padding: 2.4rem;
  }

  .question-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .question {
    font-size: ${defaultFontSize};
    color: ${colorWhite};
    &-number {
      color: ${colorTritaryLight};
      font-weight: 700;
    }
  }

  .option-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
  }

  .options {
    background-color: ${colorGreyDark300};
    color: ${colorWhite};
    border: none;
    padding: 1.2rem 0;
    border-radius: 999px;
    font-size: ${defaultFontSize};
    transition: all 0.3s;
    &:hover {
      background-color: ${colorTritary};
      transform: scale(1.03);
    }
  }

  .option {
    background-color: ${colorTritary};
  }

  .questions-box {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    padding: 9.6rem 2.4rem;
  }

  .button-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4.8rem;
    padding: 0 9.6rem;
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
        return colorTritary;
      case 'red':
        return colorRed;
      case 'blue':
        return colorSecondary;
      default:
        return colorTritary;
    }
  }};

  &:hover {
    transform: scale(1.04);
  }
`;

export default Aptitude;
