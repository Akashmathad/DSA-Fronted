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
          setCompletedContests(completedContests);
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
