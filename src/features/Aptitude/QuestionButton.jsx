import { useContext } from 'react';
import { AptitudeContext } from '../../pages/AptitudeTest';
import styled from 'styled-components';
import {
  colorGreyDark300,
  colorTritary,
  colorTritaryLightest,
} from '../../styles/colors';

const Button = styled.button`
  height: 3rem;
  width: 3rem;
  color: ${colorTritaryLightest};

  background-color: ${(props) =>
    props.green === 'green' ? colorTritary : colorGreyDark300};

  border: none;
  border-radius: 4px;
  align-self: center;
  justify-self: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 600;
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
