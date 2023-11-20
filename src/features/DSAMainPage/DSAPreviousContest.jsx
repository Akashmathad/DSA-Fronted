import { IoCloseOutline } from 'react-icons/io5';
import styled from 'styled-components';
function DSAPreviousContest({ contestNumber, setOpen }) {
  return (
    <DSAPreviousConest className="previous-contest-container ">
      <div className="previous-contest-box dsa-container">
        <IoCloseOutline className="close" onClick={() => setOpen(false)} />
        <h3 className="previous-contest-heading">{contestNumber}</h3>
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
