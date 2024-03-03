import { IoCloseOutline } from 'react-icons/io5';
import styled from 'styled-components';
function ProfileDetails({ setOpenProfileDetails, profile }) {
  const { name, DSAEachPoints: DSA, AptitudeEachPoints: aptitude } = profile;
  console.log(aptitude);
  return (
    <ProfileDisplayContainer className="previous-contest-container">
      <IoCloseOutline
        className="close"
        onClick={() => setOpenProfileDetails(false)}
      />
      <div className="previous-contest-box profile-box">
        <h3 className="previous-contest-heading profile-heading">
          {name}'s Stats
        </h3>

        <div className="profile-grid">
          <div className="profile-grid-box">
            <h4 className="profile-subheading">Aptitude Stats</h4>
            <div className="stats-box">
              <div className="stats-grid">
                <p>Contest No</p>
                <p>Contest Name</p>
                <p>Points</p>
              </div>

              {aptitude.map((apti) => (
                <div className="stats-grid" key={apti.contestNumber}>
                  <p>{apti.contestNumber}</p>
                  <p>{apti.contestName}</p>
                  <p>{apti.points}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-grid-box">
            <h4 className="profile-subheading">DSA Stats</h4>
            <div className="stats-box">
              <div className="stats-grid">
                <p>Contest No</p>
                <p>Contest Name</p>
                <p>Points</p>
              </div>

              {DSA.map((dsa) => (
                <div className="stats-grid" key={dsa.contestNumber}>
                  <p>{dsa.contestNumber}</p>
                  <p>{dsa.contestName}</p>
                  <p>{dsa.points}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProfileDisplayContainer>
  );
}

const ProfileDisplayContainer = styled.div`
  .profile-box {
    background-color: ${(props) => props.theme.colors.colorPrimaryDark};
  }

  .profile-heading {
    color: ${(props) => props.theme.colors.colorPrimaryLight};
  }

  .profile-grid {
    display: flex;
    justify-content: space-around;
    margin-top: 5.2rem;
  }

  .profile-grid-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;
    max-width: 50rem;
  }

  .profile-subheading {
    color: ${(props) => props.theme.colors.colorPrimaryLight};
    font-size: 3rem;
    font-weight: 500;
    letter-spacing: 1px;
    text-align: center;
  }

  .stats-box {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    font-size: 2rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 30fr 40fr 30fr;
    gap: 3.2rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.colorPrimaryLight};
    padding-bottom: 1rem;
    text-align: center;
  }
`;

export default ProfileDetails;
