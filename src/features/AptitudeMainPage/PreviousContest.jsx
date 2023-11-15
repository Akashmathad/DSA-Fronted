import styled from 'styled-components';
import { colorBlack, colorTritary, colorWhite } from '../../styles/colors';
import { IoCloseOutline } from 'react-icons/io5';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import AptiQuestion from './AptiQuestion';

function PreviousContest({ contestNumber, setOpen }) {
  const { jwt } = useContext(AuthContext);
  const [questions, setQuestions] = useState();
  const [contestName, setContestName] = useState();

  useEffect(
    function () {
      async function fetchData() {
        try {
          if (!jwt) {
            return;
          }
          const req = await fetch(
            `https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/question-answers/GetQnA?fields=-_id&contestNumber=${contestNumber}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await req.json();
          setContestName(data.data.QnA[0].contestName);
          setQuestions(data.data.QnA[0].questions);
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    },
    [jwt]
  );

  return (
    <PreviousContestContainer>
      <div className="boxx">
        <IoCloseOutline className="close" onClick={() => setOpen(false)} />
        <h3 className="previous-contest-heading">{contestName}</h3>
        <div className="question-box">
          {questions &&
            questions.map((question) => <AptiQuestion question={question} />)}
        </div>
      </div>
    </PreviousContestContainer>
  );
}

const PreviousContestContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(1rem);
  display: flex;
  align-items: center;
  justify-content: center;

  .boxx {
    width: 130rem;
    height: 90vh;
    background-color: ${colorBlack};
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 11px;
    padding: 3.2rem;
    overflow: scroll;
  }

  .close {
    color: rgba(255, 255, 255, 0.7);
    font-size: 5.2rem;
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    cursor: pointer;
  }

  .previous-contest-heading {
    color: ${colorTritary};
    font-size: 3.6rem;
    font-weight: 500;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 1.2rem;
  }
  ::-webkit-scrollbar {
    width: 0;
  }
  .question-box {
    overflow: scroll;
  }
`;

export default PreviousContest;
