import { useState } from 'react';
import PreviousContestCard from '../AptitudeMainPage/AptitudePreviousContestCard';
import DSAPreviousContestCard from './DSAPreviousContestCard';

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
  return (
    <div className="previous-contests-container">
      <h3 className="heading">Previous Contests</h3>
      <div className="contest-box">
        {data.map((contest) => (
          <DSAPreviousContestCard
            key={contest.contestNumber}
            contestName={contest.contestName}
            contestNumber={contest.contestNumber}
          />
        ))}
      </div>
    </div>
  );
}

export default DSAPreviousContests;
