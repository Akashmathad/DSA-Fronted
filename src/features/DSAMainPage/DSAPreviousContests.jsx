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

function DSAPreviousContests({ contests, loader }) {
  return (
    <div className="previous-contests-container">
      <h3 className="heading">Completed Contests</h3>
      {loader ? (
        <Loader />
      ) : contests && contests.length !== 0 ? (
        <div className="contest-box">
          {contests.map((contest) => (
            <DSAPreviousContestCard
              key={contest.contestNumber}
              contest={contest}
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
