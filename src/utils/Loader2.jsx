import ClockLoader from 'react-spinners/ClockLoader';
import styled from 'styled-components';

function Loader2() {
  return (
    <LoaderContainer>
      <ClockLoader color="#39ffe4" size={100} speedMultiplier={2} />
    </LoaderContainer>
  );
}
const LoaderContainer = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loader2;
