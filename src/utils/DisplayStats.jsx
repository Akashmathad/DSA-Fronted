import styled from 'styled-components';
import {
  colorBronze,
  colorGold,
  colorPrimary,
  colorPrimaryDarkest,
  colorRed,
  colorSecondary,
  colorSilver,
  colorTritary,
  colorWhite,
} from '../styles/colors';
import { defaultFontSize } from '../styles/defaults';

const getColor = (index) => {
  if (index === 0) {
    return colorGold;
  } else if (index === 1) {
    return colorSilver;
  } else if (index === 2) {
    return colorBronze;
  } else {
    const commonColors = [colorPrimary, colorSecondary, colorTritary]; // Add more common colors as needed
    const commonColorIndex = Math.floor((index - 3) / 4) % commonColors.length;
    return commonColors[commonColorIndex];
  }
};

function DisplayStats({ results }) {
  return (
    <DisplayStatsContainer>
      {results.map((result) => (
        <Stats result={result} />
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
  gap: 1.8rem;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

function Stats({ result }) {
  return (
    <StatsContainer rank={result.rank}>
      <div className="rank-box">
        <p className="rank">{result.rank}</p>
      </div>
      <div className="details-box">
        <p className="usn">{result.usn}</p>
        <p className="name">{result.name}</p>
        <p className="points">{result.points}</p>
      </div>
    </StatsContainer>
  );
}

const StatsContainer = styled.div`
  color: ${colorWhite};
  display: grid;
  grid-template-columns: 5fr 95fr;
  padding: 1.8rem 4rem;
  background-color: ${(props) => getColor(props.rank - 1)};
  font-size: ${defaultFontSize};
  border-radius: 999px;

  .details-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      font-weight: 500;
      letter-spacing: 1px;
    }

    .points {
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
`;

export default DisplayStats;
