import { useContext, useEffect, useState } from 'react';
import PreviousContestCard from '../AptitudeMainPage/AptitudePreviousContestCard';
import DSAPreviousContestCard from './DSAPreviousContestCard';
import { AuthContext } from '../../App';
import Loader from '../../utils/Loader';

const data = [
  {
    contestName: 'DSA - 01',
    contestNumber: 1,
  },
  {
    contestName: 'DSA - 02',
    contestNumber: 2,
  },
  {
    contestName: 'DSA - 03',
    contestNumber: 3,
  },
];

function DSAPreviousContests() {
  const [contests, setContests] = useState();
  const [loader, setLoader] = useState(false);
  const { jwt } = useContext(AuthContext);

  useEffect(
    function () {
      async function fetchData() {
        setLoader(true);
        try {
          if (!jwt) return;
          const req = await fetch(
            'https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/dsa/previousQuestions?fields=contestNumber,contestName,-_id&sort=contestNumber',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await req.json();
          setContests(data.data.results);
        } catch (e) {
          console.log(e);
        }
        setLoader(false);
      }
      fetchData();
    },
    [jwt]
  );

  return (
    <div className="previous-contests-container">
      <h3 className="heading">Previous Contests</h3>
      {loader ? (
        <Loader />
      ) : contests ? (
        <div className="contest-box">
          {contests.map((contest) => (
            <DSAPreviousContestCard
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
  );
}

export default DSAPreviousContests;
