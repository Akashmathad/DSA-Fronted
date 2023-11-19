import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import DisplayStats from '../utils/DisplayStats';
import { AuthContext } from '../App';

function LeaderShip() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [branch, setBranch] = useState();
  const [subject, setSubject] = useState('AptitudePoints');
  const { jwt } = useContext(AuthContext);

  useEffect(
    function () {
      async function fetchResults() {
        try {
          if (!jwt) {
            return;
          }

          const url = branch
            ? `https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/leaderShip?fields=name,usn,branch,${subject}&sort=-${subject}&branch=${branch}`
            : `https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/leaderShip?fields=name,usn,branch,${subject}&sort=-${subject}`;

          const req = await fetch(url, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });
          const data = await req.json();
          setResults(data.data.leaderShip);
        } catch (e) {
          console.log(e);
        }
      }
      fetchResults();
    },
    [subject, branch, jwt]
  );

  results.map((result, index) => {
    result.rank = index + 1;
    if (subject === 'AptitudePoints') result.points = result.AptitudePoints;
    else result.points = result.DSAPoints;
    return null;
  });

  const finalResults =
    search !== ''
      ? results.filter((result) =>
          result.name.toLowerCase().includes(search.toLowerCase())
        )
      : results;
  console.log(finalResults);

  return (
    <div className="height">
      <ResultsContainer className="background">
        <div className="input-boxes">
          <div className="subject-box">
            <label htmlFor="contest" className="subject">
              Branch
            </label>
            <select
              name="contest"
              className="details-input subject-input"
              id="contest"
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="" className="subject-input">
                ALL
              </option>
              <option value="cse" className="subject-input">
                CSE
              </option>
              <option value="ise" className="subject-input">
                ISE
              </option>
              <option value="ece" className="subject-input">
                ECE
              </option>
            </select>
          </div>

          <div className="subject-box">
            <label htmlFor="contest" className="subject">
              Subject
            </label>
            <select
              name="contest"
              className="details-input subject-input"
              id="contest"
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="AptitudePoints" className="subject-input">
                Aptitude
              </option>
              <option value="DSAPoints" className="subject-input">
                DSA
              </option>
            </select>
          </div>

          <div className="subject-box">
            <label htmlFor="search" className="subject">
              Search
            </label>
            <input
              className="details-input search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="# Type your name"
            />
          </div>
        </div>
        <DisplayStats results={finalResults} />
      </ResultsContainer>
      <div className="gradient-circle bottom right"></div>
      <div className="gradient-circle bottom left"></div>
    </div>
  );
}

const ResultsContainer = styled.div`
  width: 100%;
  height: 100%;

  .subject-input {
    width: 20rem;
    padding: 1rem;
  }
`;

export default LeaderShip;
