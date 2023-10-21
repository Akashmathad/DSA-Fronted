import { useContext } from 'react';
import { AptitudeContext } from '../../pages/AptitudeTest';

function Option({ value, qNum, children }) {
  const { ans, dispatch } = useContext(AptitudeContext);
  const currentAns = ans.find((ans) => ans.question === qNum);
  return (
    <button
      className={`options ${currentAns.answer === value ? 'option' : ''}`}
      data-value={value}
      onClick={(e) =>
        dispatch({
          type: 'answer',
          payload: {
            question: qNum,
            answer: e.target.dataset.value,
          },
        })
      }
    >
      {children}
    </button>
  );
}

export default Option;
