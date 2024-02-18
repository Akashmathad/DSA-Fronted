import AptitudePreviousContest from './AptitudePreviousContest';
import { useState } from 'react';

function AptitudePreviousContestCard({
  contestName,
  contestNumber,
  contestTime,
}) {
  const [openAptitude, setAptitudeOpen] = useState(false);
  console.log(contestTime);
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
          contestNumber={contestNumber}
          setOpen={setAptitudeOpen}
        />
      )}
    </>
  );
}

export default AptitudePreviousContestCard;
