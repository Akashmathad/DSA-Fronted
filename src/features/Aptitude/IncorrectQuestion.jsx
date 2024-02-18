import styled from 'styled-components';

function IncorrectQuestion({ question }) {
  return (
    <AptiQuestionContainer>
      <p className="description">
        <span>{question.questionNumber}. </span> {question.questionDescription}
      </p>
      <div className="options">
        <p
          className={`option ${
            question.correctAnswer === question.options.A ? 'green' : ''
          } ${question.userAnswer === question.options.A ? 'red' : ''}`}
        >
          A. {question.options.A}
        </p>
        <p
          className={`option ${
            question.correctAnswer === question.options.B ? 'green' : ''
          } ${question.userAnswer === question.options.B ? 'red' : ''}`}
        >
          B. {question.options.B}
        </p>
        <p
          className={`option ${
            question.correctAnswer === question.options.C ? 'green' : ''
          } ${question.userAnswer === question.options.C ? 'red' : ''}`}
        >
          C. {question.options.C}
        </p>
        <p
          className={`option ${
            question.correctAnswer === question.options.D ? 'green' : ''
          } ${question.userAnswer === question.options.D ? 'red' : ''}`}
        >
          D. {question.options.D}
        </p>
      </div>
    </AptiQuestionContainer>
  );
}

const AptiQuestionContainer = styled.div`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.colorTritaryLightest};
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 1.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  .number {
    font-size: 2rem;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .red {
    color: ${(props) => props.theme.colors.colorRed};
  }

  .green {
    color: ${(props) => props.theme.colors.colorTritaryLight};
  }
`;

export default IncorrectQuestion;
