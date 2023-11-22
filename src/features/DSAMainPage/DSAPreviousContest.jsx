import { useContext, useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { AuthContext } from '../../App';
function DSAPreviousContest({ contestNumber, setOpen }) {
  const [contestName, setContestName] = useState();
  const [questions, setQuestions] = useState();
  const { jwt } = useContext(AuthContext);
  useEffect(
    function () {
      async function fetchData() {
        try {
          if (!jwt) return;
          const req = await fetch(
            `https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/dsa/previousQuestions?contestNumber=${contestNumber}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await req.json();
          setContestName(data.data.results[0].contestName);
          setQuestions(data.data.results[0].questions);
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    },
    [jwt]
  );

  return (
    <DSAPreviousConest className="previous-contest-container ">
      <div className="previous-contest-box dsa-container">
        <IoCloseOutline className="close" onClick={() => setOpen(false)} />
        <h3 className="previous-contest-heading">{contestName}</h3>
      </div>
    </DSAPreviousConest>
  );
}

const DSAPreviousConest = styled.div`
  .dsa-container {
    background-color: ${(props) => props.theme.colors.colorBlack};
  }

  .previous-contest-heading {
    color: ${(props) => props.theme.colors.colorSecondary};
  }
`;

export default DSAPreviousContest;
