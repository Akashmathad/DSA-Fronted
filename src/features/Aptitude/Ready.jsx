import { useContext } from 'react';
import { AptitudeContext } from '../../pages/AptitudeTest';
import { requestFullscreen } from '../../utils/screenExitHandler';
import Button from '../../utils/Button';

function Ready() {
  const { questions, dispatch } = useContext(AptitudeContext);
  return (
    <div className="ready-container">
      <div className="test-heading">Aptitude Test</div>
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
        <Button
          color="green"
          className="test-start"
          onClick={() => {
            requestFullscreen();
            dispatch({ type: 'start' });
          }}
        >
          Start&rarr;
        </Button>
      )}
    </div>
  );
}

export default Ready;
