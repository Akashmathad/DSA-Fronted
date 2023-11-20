import { useState } from 'react';
import { Link } from 'react-router-dom';

function DSACurrentContests() {
  const [contestName, setContestName] = useState();
  return (
    <div className="current-contest-container">
      <h3 className="heading">Current Contests</h3>
      {contestName ? (
        <Link className="contest-card" to="/dsa-test">
          <h3 className="contest-name">{contestName}</h3>
        </Link>
      ) : (
        <p className="contest-message">No contests available!!</p>
      )}
    </div>
  );
}

export default DSACurrentContests;
