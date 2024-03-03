import { useContext, useEffect, useState } from 'react';
import AptitudePreviousContests from '../features/AptitudeMainPage/AptitudePreviousContests';
import { AuthContext } from '../App';
import AptitudeActiveContests from '../features/AptitudeMainPage/AptitudeActiveContests';

function AptitudeMainPage() {
  const [contests, setContests] = useState();
  const [completedContests, setCompletedContests] = useState();
  const { usn, jwt } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);

  function removeDuplicates(array1, array2) {
    const contestNumbersToRemove = array2.map((item) => item.contestNumber);
    const filteredArray1 = array1.filter(
      (item) => !contestNumbersToRemove.includes(item.contestNumber)
    );
    return filteredArray1;
  }

  function getCompletedContests(array1, array2) {
    const mergedArray = array1
      .map((contest1) => {
        const matchingContest2 = array2.find(
          (contest2) => contest2.contestNumber === contest1.contestNumber
        );
        if (matchingContest2) {
          return {
            contestNumber: contest1.contestNumber,
            contestName: contest1.contestName,
            points: matchingContest2.points,
            time: contest1.time,
          };
        } else {
          return null; // Handle the case where no matching contest is found in contests2
        }
      })
      .filter(Boolean);
    return mergedArray;
  }

  useEffect(
    function () {
      async function fetchData() {
        setLoader(true);
        if (!jwt) return;
        try {
          const req1 = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/api/v1/aptitude-dsa/question-answers/aptitude/contests`,
            {
              method: 'GET',
              headers: {
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data1 = await req1.json();
          const contests = data1.data.Contests;

          const req2 = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/api/v1/aptitude-dsa/question-answers/aptitude/contests/${usn}`
          );
          const data2 = await req2.json();
          const completedContests = data2.data.Contest;
          const avaliableContests = removeDuplicates(
            contests,
            completedContests
          );
          setContests(avaliableContests);
          setCompletedContests(
            getCompletedContests(contests, completedContests)
          );
          setLoader(false);
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    },
    [jwt, usn]
  );

  return (
    <div className="height">
      <div className="background main-page-container">
        <AptitudeActiveContests contests={contests} loader={loader} />
        <div className="previous-test-box">
          <AptitudePreviousContests
            contests={completedContests}
            loader={loader}
          />
        </div>
      </div>
    </div>
  );
}

export default AptitudeMainPage;
