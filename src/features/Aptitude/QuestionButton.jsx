import { useContext } from 'react';
import { AptitudeContext } from '../../pages/AptitudeTest';
import styled from 'styled-components';

const Button = styled.button`
  height: 3rem;
  width: 3rem;
  color: ${(props) => props.theme.colors.colorTritaryLightest};

  background-color: ${(props) =>
    props.green === 'green'
      ? props.theme.colors.colorTritary
      : props.theme.colors.colorBlack200};

  border: none;
  border-radius: 4px;
  align-self: center;
  justify-self: center;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 500;
`;

function QuestionButton({ num }) {
  const { ans, dispatch } = useContext(AptitudeContext);
  const currentAns = ans.find((ans) => ans.question === num);
  return (
    <Button
      green={`${currentAns.answer !== null ? 'green' : ''}`}
      onClick={() => dispatch({ type: 'jumpQuestion', payload: num - 1 })}
    >
      {num}
    </Button>
  );
}

export default QuestionButton;
