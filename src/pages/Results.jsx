import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import DisplayStats from '../utils/DisplayStats';
import { colorPrimaryDarkest, colorPrimaryLightest } from '../styles/colors';
import { defaultFontSize } from '../styles/defaults';
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
    <ResultsContainer>
      <div className="input-boxes">
        <div className="subject-box">
          <label htmlFor="contest" className="subject">
            Contest &rarr;
          </label>
          <select
            name="contest"
            className="subject-input"
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
        <div className="search-box">
          <input
            className="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="# Type your name"
          />
        </div>
      </div>
      <DisplayStats results={finalResults} />
    </ResultsContainer>
  );
}

const ResultsContainer = styled.div`
  flex-grow: 1;
  background-image: linear-gradient(
    to bottom,
    #0e031a,
    #0c0517,
    #0b0714,
    #0a0810,
    #0a0a0a
  );

  .input-boxes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 120rem;
    margin: 0 auto;
    padding: 6.4rem 0;
  }

  .subject-box {
    align-self: center;
    justify-self: center;
    display: flex;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
  }

  .subject {
    font-size: 2rem;
    font-weight: 600;
    color: ${colorPrimaryLightest};
  }

  .subject-input {
    width: 30rem;
    padding: 1.2rem;
    background-color: ${colorPrimaryLightest};
    border-radius: 15px;
    border: none;
    font-size: ${defaultFontSize};
    font-family: inherit;
    color: ${colorPrimaryDarkest};
  }

  .search-box {
    align-self: center;
    justify-self: center;
  }

  .search {
    padding: 1.2rem 2.4rem;
    background-color: ${colorPrimaryLightest};
    color: ${colorPrimaryDarkest};
    font-size: ${defaultFontSize};
    border-radius: 15px;
    width: 40rem;
    font-family: inherit;
    transition: all 0.3s;
    outline: none;
    position: relative;

    &:focus {
      width: 45rem;
      box-shadow: 0 0 1.2rem rgb(135, 38, 232, 0.5);
    }
  }
`;

export default Results;
