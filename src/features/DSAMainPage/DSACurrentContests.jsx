import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import Loader from '../../utils/Loader';

function DSACurrentContests() {
  const [contestName, setContestName] = useState();
  const [loader, setLoader] = useState(false);
  const { jwt } = useContext(AuthContext);

  useEffect(
    function () {
      async function fetchData() {
        setLoader(true);
        try {
          if (!jwt) return;
          const req = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/api/v1/aptitude-dsa/dsa/questions?fields=contestName,-_id`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await req.json();
          setContestName(data.data.results[0].contestName);
        } catch (e) {
          console.log(e);
        }
        setLoader(false);
      }
      fetchData();
    },
    [jwt]
  );
  return (
    <div className="current-contest-container">
      <h3 className="heading">Current Contests</h3>
      {loader ? (
        <Loader />
      ) : contestName ? (
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
