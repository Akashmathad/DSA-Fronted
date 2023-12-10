import styled from 'styled-components';
import Graph from '../features/profile/graph';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';
import Loader from '../utils/Loader';

function Profile() {
  const { usn, jwt } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [profile, setProfile] = useState();
  useEffect(
    function () {
      async function fetchData() {
        setLoader(true);
        try {
          if (!jwt) return;
          const req = await fetch(
            `https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/profile/${usn}`,
            {
              method: 'GET',
              headers: {
                authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await req.json();
          setProfile(data.Profiles);
        } catch (e) {
          console.log(e);
        }
        setLoader(false);
      }
      fetchData();
    },
    [usn, jwt]
  );
  console.log(profile);
  return (
    <div className="height">
      {loader ? (
        <Loader />
      ) : (
        <ProfileContainer>
          {profile && (
            <>
              <div className="personal-details-box background">
                <div>
                  <h3 className="profile-heading">Personal Details</h3>
                  <div className="personal-details">
                    <div className="detail-box">
                      <p className="detail-heading">Name: </p>
                      <p className="detail-text">{profile.name}</p>
                    </div>
                    <div className="detail-box">
                      <p className="detail-heading">USN: </p>
                      <p className="detail-text">{profile.usn.toUpperCase()}</p>
                    </div>
                    <div className="detail-box">
                      <p className="detail-heading">Branch: </p>
                      <p className="detail-text">
                        {profile.branch.toUpperCase()}
                      </p>
                    </div>
                    <div className="detail-box">
                      <p className="detail-heading">Contact: </p>
                      <p className="detail-text">{profile.contact}</p>
                    </div>
                    <div className="detail-box">
                      <p className="detail-heading">Email: </p>
                      <p className="detail-text">{profile.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="performance-details">
                <div className="performance-box">
                  <h3 className="performance-heading">Performance</h3>
                  <div className="performance-card-box">
                    <div className="performance-card">
                      <div className="gradient-line top"></div>
                      <p className="card-heading">Contests</p>
                      <div>
                        <p className="card-text">
                          DSA:
                          <span className="number">
                            {profile.DSAEachPoints.length}
                          </span>
                        </p>
                        <p className="card-text">
                          Aptitude:
                          <span className="number">
                            {profile.AptitudeEachPoints.length}
                          </span>
                        </p>
                      </div>
                      <div className="gradient-line bottom"></div>
                    </div>

                    <div className="performance-card">
                      <div className="gradient-line top"></div>
                      <p className="card-heading">DSA Points</p>
                      <p className="points blue">{profile.DSAPoints}</p>
                      <div className="gradient-line bottom"></div>
                    </div>

                    <div className="performance-card">
                      <div className="gradient-line top"></div>
                      <p className="card-heading">Aptitude Points</p>
                      <p className="points green">{profile.AptitudePoints}</p>
                      <div className="gradient-line bottom"></div>
                    </div>
                  </div>
                </div>
                <div className="graph">
                  <Graph />
                </div>
              </div>
            </>
          )}
        </ProfileContainer>
      )}
    </div>
  );
}

const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 25fr 75fr;
  gap: 1.2rem;

  .personal-details-box {
    width: 100%;
    height: 100%;
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile-heading {
    font-size: 2.8rem;
    font-weight: 400;
    color: ${(props) => props.theme.colors.colorPrimaryLightest};
  }

  .personal-details {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding-top: 3.2rem;
  }
  .detail-box {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .detail-heading {
    color: ${(props) => props.theme.colors.colorPrimaryLight};
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .detail-text {
    color: ${(props) => props.theme.colors.colorPrimaryLighter};
    font-size: 2rem;
  }

  .performance-details {
    display: grid;
    gap: 1.2rem;
    grid-template-rows: 1fr 1fr;
  }

  .performance-box {
    padding: 3.2rem;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .performance-heading {
    font-size: 4.4rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.colorPrimaryLighter};
    text-align: center;
    letter-spacing: 1px;
  }

  .performance-card-box {
    display: flex;
    justify-content: space-around;
  }

  .performance-card {
    width: 27rem;
    background-image: linear-gradient(
      rgba(90, 33, 255, 0.15),
      rgba(0, 0, 0, 0)
    );
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 2.5rem 1rem;
    flex-direction: column;
    display: flex;
    align-items: center;
    padding: 3.2rem;
    justify-content: center;
    gap: 1.2rem;
    position: relative;
  }

  .card-heading {
    font-size: 2.8rem;
    color: ${(props) => props.theme.colors.colorPrimaryLightest};
  }

  .card-text {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .number {
    margin-left: 5px;
    font-weight: 600;
  }

  .points {
    font-size: 4.4rem;
    font-weight: 700;
    letter-spacing: 2px;
  }

  .blue {
    color: ${(props) => props.theme.colors.colorSecondaryLightest};
  }

  .green {
    color: ${(props) => props.theme.colors.colorTritaryLightest};
  }
`;

export default Profile;
