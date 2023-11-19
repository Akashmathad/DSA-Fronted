import styled from 'styled-components';
import { AiOutlineEye } from 'react-icons/ai';
import { useState } from 'react';

function AptiQuestion({ question }) {
  const [eye, setEye] = useState(false);
  return (
    <AptiQuestionContainer>
      <p className="description">
        <span className="number">{question.questionNumber}. </span>{' '}
        {question.questionDescription}
      </p>
      <div className="options">
        <p className="option">A. {question.options.A}</p>
        <p className="option">B. {question.options.B}</p>
        <p className="option">C. {question.options.C}</p>
        <p className="option">D. {question.options.D}</p>
      </div>
      <p className="answer">Answer - {eye ? question.answer : '#'}</p>
      <AiOutlineEye className="eye" onClick={() => setEye((eye) => !eye)} />
    </AptiQuestionContainer>
  );
}

const AptiQuestionContainer = styled.div`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.colorTritaryLightest};
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;

  .number {
    color: ${(props) => props.theme.colors.colorTritary};
    font-size: 2rem;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .eye {
    color: ${(props) => props.theme.colors.colorTritary};
    font-size: 2.4rem;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    cursor: pointer;
  }
`;

export default AptiQuestion;
