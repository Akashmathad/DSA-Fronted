import styled from 'styled-components';
import { colorPrimaryDarkest, colorPrimaryLightest } from '../../styles/colors';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { Link } from 'react-router-dom';

function CurrentContests() {
  const [contestName, setContestName] = useState();
  const { jwt } = useContext(AuthContext);

  useEffect(
    function () {
      async function fetchData() {
        try {
          if (!jwt) return;

          const req = await fetch(
            `https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/question-answers/questions?fields=contestName,-_id`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await req.json();
          setContestName(data.data.Questions[0].contestName);
          console.log(data.data.Questions[0]?.contestName);
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    },
    [jwt]
  );

  return (
    <CurrentContestsContainer>
      <h3 className="heading">Current Contests</h3>
      {contestName ? (
        <Link className="contest-card" to="/aptitude-test">
          <h3 className="contest-name">{contestName}</h3>
        </Link>
      ) : (
        <p className="contest-message">No contests available!!</p>
      )}
    </CurrentContestsContainer>
  );
}
const CurrentContestsContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 130rem;
  margin: 0 auto;
  padding: 3.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  .heading {
    font-size: 3rem;
    font-weight: 500;
    color: ${colorPrimaryLightest};
  }

  .contest-card {
    width: 30rem;
    height: 16rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colorPrimaryLightest};
    border-radius: 11px;
    box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.5);
    cursor: pointer;
    text-decoration: none;
  }

  .contest-name {
    font-size: 4rem;
    font-weight: 600;
    color: ${colorPrimaryDarkest};
  }

  .contest-message {
    color: ${colorPrimaryLightest};
    font-size: 4.4rem;
    margin-top: 2rem;
  }
`;
export default CurrentContests;
