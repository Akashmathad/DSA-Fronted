import PuffLoader from 'react-spinners/PuffLoader';
import styled from 'styled-components';

function Loader() {
  return (
    <LoaderContainer>
      <PuffLoader color="#fff" size={100} />
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loader;
