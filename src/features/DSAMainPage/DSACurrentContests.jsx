import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../utils/Loader';
import { ContestContext } from '../../App';

const padWithZero = (number) => (number < 10 ? `0${number}` : number);

function DSACurrentContests({ contests, loader }) {
  return (
    <div className="current-contest-container">
      <h3 className="heading">Active Contests</h3>
      {loader ? (
        <Loader />
      ) : contests && contests.length !== 0 ? (
        <div className="contest-box">
          {contests.map((contest) =>
            contest.visibility ? (
              <ContestCard contest={contest} key={contest.contestNumber} />
            ) : (
              <UpcomingContestCard
                contest={contest}
                key={contest.contestNumber}
              />
            )
          )}
        </div>
      ) : (
        <p className="contest-message">No contests available!!</p>
      )}
    </div>
  );
}

function ContestCard({ contest }) {
  const { setAptitudeContest, setAptitudeName } = useContext(ContestContext);
  console.log(contest);
  return (
    <Link
      className="contest-card"
      onClick={() => {
        setAptitudeContest(contest.contestNumber);
        setAptitudeName(contest.contestName);
      }}
      to="/dsa-test"
    >
      <p className="contest-date">
        {`${padWithZero(new Date(contest.time).getUTCDate())}/${padWithZero(
          new Date(contest.time).getUTCMonth() + 1
        )}/${new Date(contest.time).getUTCFullYear()}`}
      </p>
      <h3 className="contest-name">{contest.contestName}</h3>
    </Link>
  );
}

function UpcomingContestCard({ contest }) {
  return (
    <div className="contest-card">
      <div className="contest-timer-box">
        <p className="contest-time">
          <ContestTimer time={contest.time} />
        </p>
      </div>
      <p className="contest-date">
        {`${new Date(contest.time).getUTCDate()}/${
          new Date(contest.time).getUTCMonth() + 1
        }/${new Date(contest.time).getUTCFullYear()}`}
      </p>
      <h3 className="contest-name">{contest.contestName}</h3>
    </div>
  );
}

function ContestTimer({ time }) {
  const [timer, setTimer] = useState(
    new Date(time).getTime() - new Date().getTime()
  );
  const totalSeconds = Math.floor(timer / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const remainingSeconds = totalSeconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        if (timer >= 0) {
          setTimer((timer) => timer - 1000);
        }
      }, 1000);
      return () => clearInterval(id);
    },
    [timer]
  );

  if (timer < 0) {
    return <p>Refresh</p>;
  }
  return (
    <>
      {hours < 10 && '0'}
      {hours}h {minutes < 10 && '0'}
      {minutes}m {seconds < 10 && '0'}
      {seconds}s
    </>
  );
}

export default DSACurrentContests;
