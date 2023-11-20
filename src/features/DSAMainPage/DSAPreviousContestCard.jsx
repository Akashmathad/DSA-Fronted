import { useState } from 'react';
import DSAPreviousContest from './DSAPreviousContest';

function DSAPreviousContestCard({ contestName, contestNumber }) {
  const [openDSA, setOpenDSA] = useState(false);
  return (
    <>
      <div className="contest-card" onClick={() => setOpenDSA(true)}>
        <h3 className="contest-name">{contestName}</h3>
      </div>
      {openDSA && (
        <DSAPreviousContest
          contestNumber={contestNumber}
          setOpen={setOpenDSA}
        />
      )}
    </>
  );
}

export default DSAPreviousContestCard;
