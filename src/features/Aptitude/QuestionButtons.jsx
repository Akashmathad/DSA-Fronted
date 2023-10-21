import { useContext } from 'react';
import { AptitudeContext } from '../../pages/AptitudeTest';
import QuestionButton from './QuestionButton';

function QuestionButtons() {
  const { questions } = useContext(AptitudeContext);
  return (
    <>
      {questions.map((question) => (
        <QuestionButton
          num={question.question_number}
          key={question.question_number}
        />
      ))}
    </>
  );
}

export default QuestionButtons;
