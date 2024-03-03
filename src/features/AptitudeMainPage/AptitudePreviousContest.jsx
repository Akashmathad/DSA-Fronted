import { IoCloseOutline } from 'react-icons/io5';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import AptiQuestion from './AptiQuestion';
import Loader from '../../utils/Loader';

function AptitudePreviousContest({
  contestNumber,
  contestName,
  setOpen,
  points,
}) {
  const { jwt } = useContext(AuthContext);
  const [questions, setQuestions] = useState();
  const [loader, setLoader] = useState(false);

  const padWithZero = (number) => (number < 10 ? `0${number}` : number);

  function getQuestions(qns, ans) {
    const finalList = qns.map((qn) => {
      const ans1 = ans.find((a) => a.questionNumber === qn.questionNumber);

      return {
        questionNumber: qn.questionNumber,
        questionDescription: qn.questionDescription,
        options: qn.options,
        answer: ans1.answer,
      };
    });
    setQuestions(finalList);
  }

  useEffect(
    function () {
      setLoader(true);
      async function fetchData() {
        try {
          if (!jwt) {
            return;
          }
          const req1 = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/api/v1/aptitude-dsa/question-answers/questions/${contestNumber}/${contestName}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data1 = await req1.json();
          console.log(data1.data.Questions.questions);
          const qns = data1.data.Questions.questions;

          const req2 = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/api/v1/aptitude-dsa/question-answers/answers?contestNumber=${contestNumber}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data2 = await req2.json();
          console.log(data2.data.Answer[0].answers);
          const ans = data2.data.Answer[0].answers;

          getQuestions(qns, ans);
        } catch (e) {
          console.log(e);
        } finally {
          setLoader(false);
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
        <div className="previous-heading-box">
          <h3 className="previous-contest-heading">{contestName}</h3>
          <p className="previous-score">
            Your Score:{' '}
            <span className="color-green"> {padWithZero(points)}</span>
          </p>
        </div>
        {loader ? <Loader /> : ''}
        <div className="question-box">
          {questions &&
            questions.map((question) => <AptiQuestion question={question} />)}
        </div>
      </div>
    </div>
  );
}

export default AptitudePreviousContest;
