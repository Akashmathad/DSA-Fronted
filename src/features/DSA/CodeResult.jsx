import { useContext } from 'react';
import styled from 'styled-components';
import { DSAContext } from '../../pages/DSATest';
import { GiCheckMark } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
function CodeResult() {
  const { results, index } = useContext(DSAContext);
  const result = results[index];

  return (
    <CodeResultContainer>
      {result.status && !result.error && (
        <h3 className="result-heading result-green">Success</h3>
      )}
      {!result.status && !result.error && (
        <h3 className="result-heading result-red">Wrong Answer</h3>
      )}
      {!result.status && result.error && (
        <h3 className="result-heading result-red">Compilation Error!!</h3>
      )}
      {result.tests && !result.error && (
        <div className="testCases">
          {result.tests.map((test) =>
            test.Result === 'Pass' ? (
              <TestCasePass number={test.TestCase} />
            ) : (
              <TestCaseFail test={test} />
            )
          )}
        </div>
      )}
      {result.error && <p className="error-message">{result.message}</p>}
    </CodeResultContainer>
  );
}

function TestCasePass({ number }) {
  return (
    <p className="test-number">
      Testcase: {number}
      <span className="correct">
        <GiCheckMark />
      </span>
    </p>
  );
}

function TestCaseFail({ test }) {
  return (
    <div className="test-case-fail">
      <p className="test-number">
        Testcase: {test.TestCase}{' '}
        <span className="wrong">
          <ImCross />
        </span>
      </p>
      <p className="test-input">Input: {`${test.Input}`}</p>
      <p className="test-input">Expected: {`${test.Expected}`}</p>
      <p className="test-input">Output: {`${test.Actual}`}</p>
    </div>
  );
}

const CodeResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem;
  width: 100%;
  height: 100%;

  .result-heading {
    font-size: 3.8rem;
    font-weight: 400;
  }

  .result-green {
    color: ${(props) => props.theme.colors.colorTritaryLight};
  }

  .result-red {
    color: ${(props) => props.theme.colors.colorRed};
  }

  .testCases {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  .test-number {
    font-size: 2.2rem;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
  }

  .correct {
    margin-left: 2rem;
    color: ${(props) => props.theme.colors.colorTritary};
  }
  .wrong {
    margin-left: 2rem;
    color: ${(props) => props.theme.colors.colorRed};
  }

  .test-case-fail {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .test-input {
    font-size: 1.8rem;
    letter-spacing: 1.5px;
  }

  .error-message {
    font-size: 2rem;
    line-height: 1.6;
  }
`;

export default CodeResult;
