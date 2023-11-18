import Editor from '@monaco-editor/react';
import { useContext } from 'react';
import { DSAContext } from '../../pages/DSATest';
import styled from 'styled-components';
function IDE() {
  const { ans, starterCodes, index, language, dispatch } =
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
      <div>
        <select
          className="select-language"
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
`;

export default IDE;
