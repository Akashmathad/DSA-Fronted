import styled from 'styled-components';
import PreviousContests from '../features/AptitudeMainPage/PreviousContests';
import { colorPrimaryLightest } from '../styles/colors';
import CurrentContests from '../features/AptitudeMainPage/CurrentContests';

function AptitudeMainPage() {
  return (
    <AptitudeMainPageContatiner>
      <CurrentContests />
      <div className="box">
        <PreviousContests className="box" />
      </div>
    </AptitudeMainPageContatiner>
  );
}

const AptitudeMainPageContatiner = styled.div`
  flex-grow: 1;
  padding: 3.2rem 0 4.8rem 0;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(
    to bottom,
    #0e031a,
    #0c0517,
    #0b0714,
    #0a0810,
    #0a0a0a
  );
  .box {
    width: 140rem;
    margin: 0 auto;
    border-top: 1px solid ${colorPrimaryLightest};
  }
`;

export default AptitudeMainPage;
