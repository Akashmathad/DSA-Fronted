import styled from 'styled-components';
import {
  colorPrimary,
  colorPrimaryDark,
  colorPrimaryDarkest,
  colorPrimaryLight,
  colorPrimaryLightest,
} from '../../styles/colors';
import PreviousContest from './PreviousContest';
import { useState } from 'react';

function PreviousContestCard({ contestName, contestNumber }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PreviousContestCardContainer onClick={() => setOpen(true)}>
        <h3 className="contest-name">{contestName}</h3>
      </PreviousContestCardContainer>
      {open && (
        <PreviousContest contestNumber={contestNumber} setOpen={setOpen} />
      )}
    </>
  );
}

const PreviousContestCardContainer = styled.div`
  width: 30rem;
  height: 16rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colorPrimaryLightest};
  border-radius: 11px;
  box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.5);
  cursor: pointer;

  .contest-name {
    font-size: 4rem;
    font-weight: 600;
    color: ${colorPrimaryDarkest};
  }
`;

export default PreviousContestCard;
