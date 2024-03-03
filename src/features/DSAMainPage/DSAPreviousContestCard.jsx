import { useState } from 'react';
import DSAPreviousContest from './DSAPreviousContest';

const padWithZero = (number) => (number < 10 ? `0${number}` : number);

function DSAPreviousContestCard({ contest }) {
  const [openDSA, setOpenDSA] = useState(false);
  console.log(contest);
  const { contestName, time: contestTime, contestNumber, points } = contest;
  return (
    <>
      <div className="contest-card" onClick={() => setOpenDSA(true)}>
        <p className="contest-date">
          {`${padWithZero(new Date(contestTime).getUTCDate())}/${padWithZero(
            new Date(contestTime).getUTCMonth() + 1
          )}/${new Date(contestTime).getUTCFullYear()}`}
        </p>
        <h3 className="contest-name">{contestName}</h3>
      </div>
      {openDSA && (
        <DSAPreviousContest
          contestNumber={contestNumber}
          setOpen={setOpenDSA}
          contestName={contestName}
          points={points}
        />
      )}
    </>
  );
}

export default DSAPreviousContestCard;
