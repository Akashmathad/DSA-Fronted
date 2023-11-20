import AptitudePreviousContest from './AptitudePreviousContest';
import { useState } from 'react';

function AptitudePreviousContestCard({ contestName, contestNumber }) {
  const [openAptitude, setAptitudeOpen] = useState(false);
  return (
    <>
      <div className="contest-card" onClick={() => setAptitudeOpen(true)}>
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
