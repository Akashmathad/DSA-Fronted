import AptitudePreviousContest from './AptitudePreviousContest';
import { useState } from 'react';

function AptitudePreviousContestCard({ contest }) {
  const [openAptitude, setAptitudeOpen] = useState(false);
  console.log(contest);
  const { contestName, time: contestTime, contestNumber, points } = contest;
  return (
    <>
      <div className="contest-card" onClick={() => setAptitudeOpen(true)}>
        <p className="contest-date">
          {`${new Date(contestTime).getUTCDate()}/${
            new Date(contestTime).getUTCMonth() + 1
          }/${new Date(contestTime).getUTCFullYear()}`}
        </p>
        <h3 className="contest-name">{contestName}</h3>
      </div>
      {openAptitude && (
        <AptitudePreviousContest
          points={points}
          contestNumber={contestNumber}
          setOpen={setAptitudeOpen}
          contestName={contestName}
        />
      )}
    </>
  );
}

export default AptitudePreviousContestCard;
