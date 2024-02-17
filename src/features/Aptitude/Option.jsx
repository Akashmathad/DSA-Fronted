import { useContext } from 'react';
import { AptitudeContext } from '../../pages/AptitudeTest';

function Option({ value, qNum, children }) {
  const { ans, dispatch } = useContext(AptitudeContext);
  const currentAns = ans.find((ans) => ans.question === qNum);
  return (
    <div
      className={`options ${currentAns.answer === children ? 'option' : ''}`}
      data-value={value}
      onClick={(e) => {
        console.log(e.target.textContent);
        dispatch({
          type: 'answer',
          payload: {
            question: qNum,
            answer: e.target.textContent,
          },
        });
      }}
    >
      {children}
    </div>
  );
}

export default Option;
