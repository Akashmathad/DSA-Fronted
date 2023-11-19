import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import DisplayStats from '../utils/DisplayStats';
import { AuthContext } from '../App';

function Results() {
  const [contestNumber, setContestNumber] = useState();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [contests, setContests] = useState([]);
  const { jwt } = useContext(AuthContext);

  useEffect(
    function () {
      async function fetchData() {
        try {
          if (!jwt) {
            return;
          }
          const req = await fetch(
            'https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/result?fields=contestNumber,contestName&sort=-contestNumber',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await req.json();
          setContests(data.data.results);
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    },
    [jwt]
  );

  useEffect(
    function () {
      async function fetchResults() {
        try {
          if (!contestNumber) return;
          const req = await fetch(
            `https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/result/${contestNumber}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await req.json();
          setResults(data.data.result[0].Results);
        } catch (e) {
          console.log(e);
        }
      }
      fetchResults();
    },
    [contestNumber, jwt]
  );

  results.map((result, index) => (result.rank = index + 1));

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
              Contest
            </label>
            <select
              name="contest"
              className="details-input result-input"
              id="contest"
              onChange={(e) => setContestNumber(e.target.value)}
            >
              <option value="" hidden>
                Contest name
              </option>
              {contests.map((contest) => (
                <option
                  className="subject-input"
                  value={contest.contestNumber}
                  key={contest.contestNumber}
                >
                  {contest.contestName}
                </option>
              ))}
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
`;

export default Results;
