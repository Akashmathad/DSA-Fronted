import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../App';
import PreviousContestCard from './PreviousContestCard';
import { colorPrimaryLightest } from '../../styles/colors';
import PreviousContest from './PreviousContest';

const data = [
  {
    contestName: 'Aptitude - 01',
    contestNumber: 1,
  },
  {
    contestName: 'Aptitude - 02',
    contestNumber: 2,
  },
  {
    contestName: 'Aptitude - 03',
    contestNumber: 3,
  },
  {
    contestName: 'Aptitude - 04',
    contestNumber: 4,
  },
];

function PreviousContests() {
  const [contests, setContests] = useState();
  const { jwt } = useContext(AuthContext);
  useEffect(
    function () {
      async function fetchdata() {
        try {
          if (!jwt) return;
          const req = await fetch(
            `https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/question-answers/GetQnA?fields=contestNumber,contestName,-_id&sort=contestNumber`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await req.json();
          console.log(data.data.QnA);
          setContests(data.data.QnA);
        } catch (e) {
          console.log(e);
        }
      }
      fetchdata();
    },
    [jwt]
  );

  return (
    <>
      <PreviousContestsContainer>
        <h3 className="heading">Previous Contests</h3>
        <div className="contest-box">
          {contests &&
            contests.map((contest) => (
              <PreviousContestCard
                key={contest.contestNumber}
                contestName={contest.contestName}
                contestNumber={contest.contestNumber}
              />
            ))}
        </div>
      </PreviousContestsContainer>
    </>
  );
}

const PreviousContestsContainer = styled.div`
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

  .contest-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.4rem;
  }
`;

export default PreviousContests;
