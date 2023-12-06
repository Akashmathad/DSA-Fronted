import Editor from '@monaco-editor/react';
import { useContext } from 'react';
import { DSAContext } from '../../pages/DSATest';
import styled from 'styled-components';
function IDE() {
  const { ans, starterCodes, index, language, dispatch, setOpen } =
    useContext(DSAContext);

  const options = {
    autoIndent: 'full',
    fontFamily: 'monospace',
    fontSize: 20,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: 'always',
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };

  function handleEditorChange(value, event) {
    const newAns = [...ans];
    newAns[index][language] = value;
    dispatch({ type: 'setAnswer', payload: newAns });
  }

  return (
    <IDEContainer>
      <div className="dsa-controls-box">
        <select
          className="select-language dsa-controls"
          name="language"
          id="language"
          value={language}
          onChange={(e) =>
            dispatch({ type: 'changeLanguage', payload: e.target.value })
          }
        >
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
        </select>

        <button className="dsa-controls" onClick={() => setOpen(true)}>
          Question
        </button>
        <button className="dsa-controls" onClick={() => setOpen(false)}>
          Result
        </button>
      </div>
      <Editor
        key={`${language}-${index}`}
        defaultLanguage="java"
        theme="vs-dark"
        options={options}
        onChange={handleEditorChange}
        defaultValue={
          ans[index][language]
            ? ans[index][language]
            : starterCodes[index][language]
        }
      />
    </IDEContainer>
  );
}

const IDEContainer = styled.div`
  height: 100%;
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .dsa-controls-box {
    padding-top: 1.2rem;
    padding-left: 1.2rem;
    display: flex;
    gap: 2.4rem;
  }

  .dsa-controls {
    padding: 0.9rem 3.2rem;
    background-color: ${(props) => props.theme.colors.colorBlack200};
    color: inherit;
    font-family: inherit;
    border: 1px solid rgba(0, 140, 255, 0.2);
    border-radius: 11px;
    font-size: ${(props) => props.theme.fontSizes.small};
    outline: none;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: ${(props) => props.theme.colors.colorBlack400};
    }
  }
`;

export default IDE;
