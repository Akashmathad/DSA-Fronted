import { useContext } from 'react';
import styled from 'styled-components';
import { DSAContext } from '../../pages/DSATest';
import { requestFullscreen } from '../../utils/screenExitHandler';
import Button from '../../utils/Button';

function DSAReady() {
  const { status, questions, dispatch } = useContext(DSAContext);
  console.log(status, questions);
  return (
    <ReadyContainer className="ready-container">
      <div className="test-heading">DSA Test</div>
      <div className="rules-box">
        <p className="rules-heading">Rules:</p>
        <ul className="rules">
          <li className="rule">
            Test contains <span className="rule-important">3</span> questions
            with time limit of{' '}
            <span className="rule-important">60 minutes</span>.
          </li>
          <li className="rule">
            Each correct answer carries{' '}
            <span className="rule-important">20 points</span>
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
      {status === 'ready' && (
        <Button
          color="blue"
          className="test-start"
          onClick={() => {
            requestFullscreen();
            dispatch({ type: 'start' });
          }}
        >
          Start&rarr;
        </Button>
      )}
    </ReadyContainer>
  );
}

const ReadyContainer = styled.div`
  .test-heading {
    color: ${(props) => props.theme.colors.colorSecondary};
  }

  .rules-heading {
    color: ${(props) => props.theme.colors.colorSecondaryLight};
  }

  .rule-important {
    color: ${(props) => props.theme.colors.colorSecondaryLight};
  }
`;

export default DSAReady;
