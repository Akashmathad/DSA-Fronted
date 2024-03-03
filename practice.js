function generateData(dsapointsArray, aptitudePointsArray) {
  // Create a function to get points for a specific contestNumber
  const getPoints = (contestNumber, pointsArray) => {
    const contest = pointsArray.find(
      (item) => item.contestNumber === contestNumber
    );
    return contest ? contest.points : 0;
  };

  // Determine the maximum length of the two arrays
  const maxLength = Math.max(dsapointsArray.length, aptitudePointsArray.length);

  // Create the data array with a length equal to the maximum length
  const data = Array.from({ length: maxLength }, (_, index) => {
    const dsapoint = dsapointsArray[index] || { contestNumber: 0, points: 0 };
    const aptitudePoint = aptitudePointsArray[index] || {
      contestNumber: 0,
      points: 0,
    };

    const contestNumber = Math.max(
      dsapoint.contestNumber,
      aptitudePoint.contestNumber
    );
    const formattedContest =
      contestNumber < 10 ? `0${contestNumber}` : contestNumber;
    const DSA = dsapoint.points;
    const Aptitude = getPoints(contestNumber, aptitudePointsArray);

    return { name: `contest - ${formattedContest}`, DSA, Aptitude };
  });

  return data;
}

// Example usage:
const dsapointsArray = [
  {
    _id: '65d08fbd7cb87725a4e46bb6',
    contestNumber: 1,
    contestName: 'DSA - 01',
    points: 295,
  },
];

const aptitudePointsArray = [
  {
    _id: '65e2d21b7f848c60b026c0bc',
    contestNumber: 1,
    contestName: 'Aptitude - 01',
    points: 3,
  },
  {
    _id: '65e2d2367f848c60b026c0cc',
    contestNumber: 2,
    contestName: 'Aptitude - 02',
    points: 2,
  },
];

const result = generateData(dsapointsArray, aptitudePointsArray);
console.log(result);
