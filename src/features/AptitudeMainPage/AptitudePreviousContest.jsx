import { IoCloseOutline } from 'react-icons/io5';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import AptiQuestion from './AptiQuestion';

function AptitudePreviousContest({ contestNumber, setOpen }) {
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
    <div className="previous-contest-container">
      <div className="previous-contest-box">
        <IoCloseOutline className="close" onClick={() => setOpen(false)} />
        <h3 className="previous-contest-heading">{contestName}</h3>
        <div className="question-box">
          {questions &&
            questions.map((question) => <AptiQuestion question={question} />)}
        </div>
      </div>
    </div>
  );
}

export default AptitudePreviousContest;
