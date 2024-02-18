import { useContext } from 'react';
import { AptitudeContext } from '../../pages/AptitudeTest';
import { requestFullscreen } from '../../utils/screenExitHandler';
import Button from '../../utils/Button';
import Loader from '../../utils/Loader';

function Ready() {
  const { questions, dispatch } = useContext(AptitudeContext);
  return (
    <div className="ready-container">
      <div className="test-heading">Aptitude Test</div>
      <div className="rules-box">
        <p className="rules-heading">Rules:</p>
        <ul className="rules">
          <li className="rule">
            Test contains <span className="rule-important">25</span> questions
            with time limit of{' '}
            <span className="rule-important">25 minutes</span>.
          </li>
          <li className="rule">
            Each correct answer carries{' '}
            <span className="rule-important">1</span> point.
          </li>
          <li className="rule">
            Not allowed to exit{' '}
            <span className="rule-important">Full-Screen Mode</span> or{' '}
            <span className="rule-important">Switch tabs</span>. If you do so,
            test will automatically gets submitted without any prior warning.
          </li>
        </ul>
      </div>
      {questions ? (
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
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Ready;
