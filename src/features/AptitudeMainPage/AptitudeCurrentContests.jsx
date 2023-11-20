import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { Link } from 'react-router-dom';

function AptitudeCurrentContests() {
  const [contestName, setContestName] = useState();
  const { jwt } = useContext(AuthContext);

  useEffect(
    function () {
      async function fetchData() {
        try {
          if (!jwt) return;

          const req = await fetch(
            `https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/question-answers/questions?fields=contestName,-_id`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await req.json();
          setContestName(data.data.Questions[0].contestName);
          console.log(data.data.Questions[0]?.contestName);
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    },
    [jwt]
  );

  return (
    <div className="current-contest-container">
      <h3 className="heading">Current Contests</h3>
      {contestName ? (
        <Link className="contest-card" to="/aptitude-test">
          <h3 className="contest-name">{contestName}</h3>
        </Link>
      ) : (
        <p className="contest-message">No contests available!!</p>
      )}
    </div>
  );
}
export default AptitudeCurrentContests;
