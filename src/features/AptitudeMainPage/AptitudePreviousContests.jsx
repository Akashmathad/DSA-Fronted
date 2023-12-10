import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import AptitudePreviousContestCard from './AptitudePreviousContestCard';
import Loader from '../../utils/Loader';

const data = [
  {
    contestName: 'Aptitude - 01',
    contestNumber: 1,
  },
  {
    contestName: 'Aptitude - 02',
    contestNumber: 2,
  },
  {
    contestName: 'Aptitude - 03',
    contestNumber: 3,
  },
];

function AptitudePreviousContests() {
  const [contests, setContests] = useState();
  const [loader, setLoader] = useState(false);
  const { jwt } = useContext(AuthContext);
  useEffect(
    function () {
      async function fetchdata() {
        setLoader(true);
        try {
          if (!jwt) return;
          const req = await fetch(
            `https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/question-answers/GetQnA?fields=contestNumber,contestName,-_id&sort=contestNumber`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await req.json();
          console.log(data.data.QnA);
          setContests(data.data.QnA);
        } catch (e) {
          console.log(e);
        }
        setLoader(false);
      }
      fetchdata();
    },
    [jwt]
  );

  return (
    <>
      <div className="previous-contests-container">
        <h3 className="heading">Previous Contests</h3>
        {loader ? (
          <Loader />
        ) : contests ? (
          <div className="contest-box">
            {contests.map((contest) => (
              <AptitudePreviousContestCard
                key={contest.contestNumber}
                contestName={contest.contestName}
                contestNumber={contest.contestNumber}
              />
            ))}
          </div>
        ) : (
          <p className="contest-message">No contests available!!</p>
        )}
      </div>
    </>
  );
}

export default AptitudePreviousContests;
