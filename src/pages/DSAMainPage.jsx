import DSACurrentContests from '../features/DSAMainPage/DSACurrentContests';
import DSAPreviousContests from '../features/DSAMainPage/DSAPreviousContests';

function DSAMainPage() {
  return (
    <div className="height">
      <div className="background main-page-container">
        <DSACurrentContests />
        <div className="previous-test-box">
          <DSAPreviousContests />
        </div>
      </div>
    </div>
  );
}

export default DSAMainPage;
