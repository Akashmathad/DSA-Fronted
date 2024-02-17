import styled from 'styled-components';

const getColor = (index) => {
  if (index % 2 === 0) return (props) => props.theme.colors.colorBlack;

  return 'rgba(90,33,255,0.08)';
};

function DisplayStats({ results, subject }) {
  return (
    <DisplayStatsContainer>
      {results.length !== 0 && (
        <div className="table">
          <p className="table-heading">Rank</p>
          <p className="table-heading">Name</p>
          <p className="table-heading">USN</p>
          <p className="table-heading">Branch</p>
          <p className="table-heading">Score</p>
          <p className="table-heading">Time</p>
        </div>
      )}

      {results.map((result) => (
        <Stats result={result} subject={subject} />
      ))}
    </DisplayStatsContainer>
  );
}

const DisplayStatsContainer = styled.div`
  padding: 3.2rem 0;
  max-width: 120rem;
  margin: 0 auto;
  overflow: scroll;
  height: 64vh;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 0;
  }

  .table {
    height: 5.2rem;
    background-color: ${(props) => props.theme.colors.colorBlack};
    padding: 0 3.2rem;
    width: 100%;
    display: grid;
    grid-template-columns: 10fr 25fr 25fr 15fr 15fr 10fr;
    border-bottom: 1px solid ${(props) => props.theme.colors.colorPrimary};
    border-top-right-radius: 11px;
    border-top-left-radius: 11px;
    z-index: 3;
  }

  .table-heading {
    font-size: 2.4rem;
    font-weight: 500;
    align-self: center;
  }
`;

function Stats({ result, subject }) {
  function calculateTime(timeLeft) {
    let time;
    if (subject === 'dsa') {
      time = 3600 - timeLeft;
    } else {
      time = 1500 - timeLeft;
    }
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formattedMinutes} : ${formattedSeconds}`;
  }
  return (
    <StatsContainer rank={result.rank}>
      <p className="table-heading table-elements">{result.rank}</p>
      <p className="table-heading table-elements">{result.name}</p>
      <p className="table-heading table-elements space">
        {result.usn.toUpperCase()}
      </p>
      <p className="table-heading table-elements space">
        {result.branch.toUpperCase()}
      </p>
      <p className="table-heading table-elements">{result.points}</p>
      <p className="table-heading table-elements">
        {calculateTime(result.timeLeft)}
      </p>
    </StatsContainer>
  );
}

const StatsContainer = styled.div`
  background-color: ${(props) => getColor(props.rank)};
  height: 5.2rem;
  padding: 0 3.2rem;
  width: 100%;
  display: grid;
  grid-template-columns: 10fr 25fr 25fr 15fr 15fr 10fr;
  border-bottom: 1px solid ${(props) => props.theme.colors.colorPrimary};
  z-index: 3;

  &:last-child {
    border-bottom-left-radius: 11px;
    border-bottom-right-radius: 11px;
    border: none;
  }

  .table-elements {
    font-size: 2.2rem;
  }

  .space {
    letter-spacing: 1.5px;
  }
`;

export default DisplayStats;
