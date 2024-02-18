import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import AptitudePreviousContestCard from './AptitudePreviousContestCard';
import Loader from '../../utils/Loader';

function AptitudePreviousContests({ contests, loader }) {
  console.log(contests);
  return (
    <>
      <div className="previous-contests-container">
        <h3 className="heading">Completed Contests</h3>
        {loader ? (
          <Loader />
        ) : contests ? (
          <div className="contest-box">
            {contests.map((contest) => (
              <AptitudePreviousContestCard
                key={contest.contestNumber}
                contestTime={contest.time}
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
