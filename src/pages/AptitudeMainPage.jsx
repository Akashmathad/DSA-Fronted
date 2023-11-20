import AptitudeCurrentContests from '../features/AptitudeMainPage/AptitudeCurrentContests';
import AptitudePreviousContests from '../features/AptitudeMainPage/AptitudePreviousContests';

function AptitudeMainPage() {
  return (
    <div className="height">
      <div className="background main-page-container">
        <AptitudeCurrentContests />
        <div className="previous-test-box">
          <AptitudePreviousContests />
        </div>
      </div>
    </div>
  );
}

export default AptitudeMainPage;
