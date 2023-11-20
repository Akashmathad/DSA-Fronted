import { useContext } from 'react';
import { AptitudeContext } from '../../pages/AptitudeTest';
import Timer from './Timer';
import styled from 'styled-components';
import QuestionButtons from './QuestionButtons';
import Option from './Option';
import Button from '../../utils/Button';
import { exitFullscreen } from '../../utils/screenExitHandler';

function Aptitude() {
  const { questions, index, dispatch, contestName } =
    useContext(AptitudeContext);

  const question = questions[index];
  return (
    <AptitudeContainer>
      <h2 className="heading">{contestName}</h2>
      <div className="aptitude-box">
        <div className="box question-box">
          <p className="question">
            <span className="question-number">
              {' '}
              {question.questionNumber}.{'  '}
            </span>
            {question.questionDescription}
          </p>
          <div className="option-box">
            <Option value="A" qNum={question.questionNumber}>
              {question.options.A}
            </Option>
            <Option value="B" qNum={question.questionNumber}>
              {question.options.B}
            </Option>
            <Option value="C" qNum={question.questionNumber}>
              {question.options.C}
            </Option>
            <Option value="D" qNum={question.questionNumber}>
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
    color: ${(props) => props.theme.colors.colorTritary};
    background-color: ${(props) => props.theme.colors.colorBlack100};
    font-weight: 500;
    border-radius: 11px;
    border: 2px solid rgb(0, 194, 168, 0.2);
  }

  .aptitude-box {
    flex-grow: 1;
    display: grid;
    grid-template-columns: 75fr 25fr;
    grid-template-rows: 83fr 17fr;
    gap: 1.2rem;
  }

  .box {
    background-color: ${(props) => props.theme.colors.colorBlack100};
    border-radius: 11px;
    border: 2px solid rgb(0, 194, 168, 0.2);
    padding: 2.4rem;
  }

  .question-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .question {
    font-size: 2rem;
    &-number {
      color: ${(props) => props.theme.colors.colorTritaryLight};
      font-size: 2.2rem;
      font-weight: 500;
    }
  }

  .option-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 1.2rem;
    column-gap: 1.8rem;
  }

  .options {
    background-color: ${(props) => props.theme.colors.colorBlack400};
    color: inherit;
    border: none;
    padding: 1.2rem 0;
    border-radius: 999px;
    font-size: 2rem;
    transition: all 0.3s;
    &:hover {
      background-color: ${(props) => props.theme.colors.colorTritary};
      transform: scale(1.03);
    }
  }

  .option {
    background-color: ${(props) => props.theme.colors.colorTritary};
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

export default Aptitude;
