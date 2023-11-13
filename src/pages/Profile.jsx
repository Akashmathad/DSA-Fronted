import styled from 'styled-components';
import Graph from '../features/profile/graph';

function Profile() {
  return (
    <ProfileContainer>
      <Graph />
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  flex-grow: 1;
  background-image: linear-gradient(
    to bottom,
    #0e031a,
    #0c0517,
    #0b0714,
    #0a0810,
    #0a0a0a
  );
`;

export default Profile;
