import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import DisplayStats from '../utils/DisplayStats';
import { AuthContext } from '../App';
import Loader from '../utils/Loader';

function Results() {
  const [contestNumber, setContestNumber] = useState();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [contests, setContests] = useState([]);
  const [loader, SetLoader] = useState(false);
  const [subject, setSubject] = useState('aptitude');
  const { jwt } = useContext(AuthContext);

  useEffect(
    function () {
      async function fetchData() {
        try {
          if (!jwt) {
            return;
          }
          const req = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/api/v1/aptitude-dsa/result/${subject}?fields=contestNumber,contestName&sort=-contestNumber`,
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
    [jwt, subject]
  );

  useEffect(
    function () {
      async function fetchResults() {
        SetLoader(true);
        try {
          if (!contestNumber) return;
          const req = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/api/v1/aptitude-dsa/result/${subject}/${contestNumber}`,
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
        SetLoader(false);
      }
      fetchResults();
    },
    [contestNumber, jwt, subject]
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
              Subject
            </label>
            <select
              name="contest"
              className="details-input subject-input"
              id="contest"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="aptitude" className="subject-input">
                Aptitude
              </option>
              <option value="dsa" className="subject-input">
                DSA
              </option>
            </select>
          </div>

          <div className="subject-box">
            <label htmlFor="contest" className="subject">
              Contest
            </label>
            <select
              name="contest"
              className="details-input subject-input"
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

        {loader ? (
          <Loader />
        ) : (
          <DisplayStats subject={subject} results={finalResults} />
        )}
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

export default Results;
