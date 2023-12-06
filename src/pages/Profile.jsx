import styled from 'styled-components';
import Graph from '../features/profile/graph';

function Profile() {
  return (
    <div className="height">
      <ProfileContainer className="background">
        <Graph />
      </ProfileContainer>
    </div>
  );
}

const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default Profile;
