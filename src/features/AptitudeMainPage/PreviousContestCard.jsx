import PreviousContest from './PreviousContest';
import { useState } from 'react';

function PreviousContestCard({ contestName, contestNumber }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="contest-card" onClick={() => setOpen(true)}>
        <h3 className="contest-name">{contestName}</h3>
      </div>
      {open && (
        <PreviousContest contestNumber={contestNumber} setOpen={setOpen} />
      )}
    </>
  );
}

export default PreviousContestCard;
