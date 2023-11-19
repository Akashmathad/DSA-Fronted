import styled from 'styled-components';
import PreviousContests from '../features/AptitudeMainPage/PreviousContests';
import CurrentContests from '../features/AptitudeMainPage/CurrentContests';

function AptitudeMainPage() {
  return (
    <div className="height">
      <AptitudeMainPageContatiner className="background">
        <CurrentContests />
        <div className="box">
          <PreviousContests />
        </div>
      </AptitudeMainPageContatiner>
    </div>
  );
}

const AptitudeMainPageContatiner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .box {
    width: 140rem;
    height: 100%;
    margin: 0 auto;
    border-top: 1px solid ${(props) => props.theme.colors.colorPrimaryLight};
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default AptitudeMainPage;
