import { useState } from 'react';
import styled from 'styled-components';
import DisplayStats from '../../utils/DisplayStats';
import { colorPrimaryDarkest, colorPrimaryLightest } from '../../styles/colors';
import { defaultFontSize } from '../../styles/defaults';

function Results() {
  const [subject, setSubject] = useState();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  async function getResults(value) {
    try {
      const url =
        value === 'aptitude'
          ? 'http://localhost:7002/Results'
          : 'http://localhost:7001/Results';
      const req = await fetch(url);
      const data = await req.json();
      setResults(data);
    } catch (e) {
      console.log(e);
    }
  }

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
          <label htmlFor="subject" className="subject">
            Subject :
          </label>
          <select
            className="subject-input"
            name="subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              getResults(e.target.value);
            }}
          >
            <option value="">choose your subject</option>
            <option value="dsa">DSA</option>
            <option value="aptitude">Aptitude</option>
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
