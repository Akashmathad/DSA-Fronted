const ans = [
  { question: 1, answer: null },
  { question: 16, answer: null },
  { question: 17, answer: null },
  { question: 19, answer: null },
  { question: 20, answer: null },
  { question: 21, answer: null },
  { question: 23, answer: null },
  { question: 2, answer: '8' },
  { question: 3, answer: '8' },
  { question: 4, answer: '350' },
  { question: 5, answer: '5' },
  { question: 6, answer: '19, 20, 21' },
  { question: 7, answer: '10π' },
  { question: 8, answer: '16' },
  { question: 9, answer: '200 km' },
  { question: 10, answer: '15' },
  { question: 11, answer: '1/3' },
  { question: 12, answer: '12' },
  { question: 13, answer: '90 degrees' },
  { question: 14, answer: '150' },
  { question: 15, answer: '26' },
  { question: 18, answer: '8' },
  { question: 22, answer: '1/3' },
  { question: 24, answer: '17, 18, 19' },
  { question: 25, answer: '9' },
];

const originalAnswers = [
  { _id: '657bda0ead799b2d18c71525', questionNumber: 1, answer: '30, 15' },
  { _id: '657bda0ead799b2d18c71526', questionNumber: 2, answer: '8' },
  { _id: '657bda0ead799b2d18c71527', questionNumber: 3, answer: '8' },
  { _id: '657bda0ead799b2d18c71528', questionNumber: 4, answer: '300' },
  { _id: '657bda0ead799b2d18c71529', questionNumber: 5, answer: '7' },
  {
    _id: '657bda0ead799b2d18c7152a',

    questionNumber: 6,

    answer: '19, 20, 21',
  },
  { _id: '657bda0ead799b2d18c7152b', questionNumber: 7, answer: '10π' },
  { _id: '657bda0ead799b2d18c7152c', questionNumber: 8, answer: '14' },
  {
    _id: '657bda0ead799b2d18c7152d',

    questionNumber: 9,

    answer: '150 km',
  },
  { _id: '657bda0ead799b2d18c7152e', questionNumber: 10, answer: '15' },
  { _id: '657bda0ead799b2d18c7152f', questionNumber: 11, answer: '1/3' },
  { _id: '657bda0ead799b2d18c71530', questionNumber: 12, answer: '12' },
  {
    _id: '657bda0ead799b2d18c71531',

    questionNumber: 13,

    answer: '60 degrees',
  },
  { _id: '657bda0ead799b2d18c71532', questionNumber: 14, answer: '200' },

  { _id: '657bda0ead799b2d18c71533', questionNumber: 15, answer: '30' },

  { _id: '657bda0ead799b2d18c71534', questionNumber: 16, answer: '$40' },

  { _id: '657bda0ead799b2d18c71535', questionNumber: 17, answer: '7' },

  { _id: '657bda0ead799b2d18c71536', questionNumber: 18, answer: '6' },

  {
    _id: '657bda0ead799b2d18c71537',

    questionNumber: 19,

    answer: '28, 30',
  },
  { _id: '657bda0ead799b2d18c71538', questionNumber: 20, answer: '8' },

  {
    _id: '657bda0ead799b2d18c71539',

    questionNumber: 21,

    answer: '11, 13',
  },
  { _id: '657bda0ead799b2d18c7153a', questionNumber: 22, answer: '1/3' },
  { _id: '657bda0ead799b2d18c7153b', questionNumber: 23, answer: '8' },
  {
    _id: '657bda0ead799b2d18c7153c',

    questionNumber: 24,

    answer: '17, 18, 19',
  },
  { _id: '657bda0ead799b2d18c7153d', questionNumber: 25, answer: '18' },
];
const incorrectAnswers = originalAnswers
  .map((originalAnswer) => {
    const correspondingAnswer = ans.find(
      (answer) => answer.question === originalAnswer.questionNumber
    );

    // Check if the corresponding answer exists and if it does not match the original answer
    if (
      correspondingAnswer &&
      ((correspondingAnswer.answer !== originalAnswer.answer &&
        correspondingAnswer.answer !== null) ||
        (correspondingAnswer.answer === null && originalAnswer.answer !== null))
    ) {
      return {
        questionNumber: originalAnswer.questionNumber,
        correctAnswer: originalAnswer.answer,
        userAnswer: correspondingAnswer.answer,
      };
    }

    return null; // Return null for correct answers
  })
  .filter(Boolean);

// console.log(incorrectAnswers);

const questions = [
  {
    options: { A: '15, 30', B: '20, 25', C: '25, 20', D: '30, 15' },
    _id: '657bd8ddad799b2d18c7150a',
    questionNumber: 1,
    questionDescription:
      'If the sum of two numbers is 45 and their difference is 15, what are the two numbers?',
  },
  {
    options: { A: '4', B: '8', C: '16', D: '32' },
    _id: '657bd8ddad799b2d18c7150b',
    questionNumber: 2,
    questionDescription: 'Simplify: 2^5 / 2^3',
  },
  {
    options: { A: '8', B: '10', C: '12', D: '16' },
    _id: '657bd8ddad799b2d18c7150c',
    questionNumber: 3,
    questionDescription:
      'The average of five numbers is 12. If four of the numbers are 10, 12, 14, and 16, what is the fifth number?',
  },
  {
    options: { A: '200', B: '250', C: '300', D: '350' },
    _id: '657bd8ddad799b2d18c7150d',
    questionNumber: 4,
    questionDescription:
      'A rectangular garden has a length of 20 meters and a width of 15 meters. What is its area?',
  },
  {
    options: { A: '5', B: '6', C: '7', D: '8' },
    _id: '657bd8ddad799b2d18c7150e',
    questionNumber: 5,
    questionDescription: 'If 3x + 7 = 22, what is the value of x?',
  },
  {
    options: {
      A: '18, 19, 20',
      B: '19, 20, 21',
      C: '20, 21, 22',
      D: '21, 22, 23',
    },
    _id: '657bd8ddad799b2d18c7150f',
    questionNumber: 6,
    questionDescription:
      'The sum of three consecutive integers is 57. What are the integers?',
  },
  {
    options: { A: '5π', B: '10π', C: '15π', D: '20π' },
    _id: '657bd8ddad799b2d18c71510',
    questionNumber: 7,
    questionDescription:
      'If the radius of a circle is 5 units, what is its circumference?',
  },
  {
    options: { A: '12', B: '14', C: '16', D: '18' },
    _id: '657bd8ddad799b2d18c71511',
    questionNumber: 8,
    questionDescription: 'Find the missing number: 4, 9, __, 19',
  },
  {
    options: { A: '120 km', B: '150 km', C: '180 km', D: '200 km' },
    _id: '657bd8ddad799b2d18c71512',
    questionNumber: 9,
    questionDescription:
      'If a car travels at a speed of 60 km/h, how far will it travel in 2.5 hours?',
  },
  {
    options: { A: '12', B: '15', C: '18', D: '21' },
    _id: '657bd8ddad799b2d18c71513',
    questionNumber: 10,
    questionDescription: 'Solve: 3/5 * x = 9',
  },
  {
    options: { A: '1/3', B: '1/2', C: '2/3', D: '3/4' },
    _id: '657bd8ddad799b2d18c71514',
    questionNumber: 11,
    questionDescription:
      'If a box contains 15 red balls and 10 green balls, what is the probability of drawing a red ball?',
  },
  {
    options: { A: '10', B: '12', C: '14', D: '16' },
    _id: '657bd8ddad799b2d18c71515',
    questionNumber: 12,
    questionDescription: 'What is the square root of 144?',
  },
  {
    options: {
      A: '30 degrees',
      B: '60 degrees',
      C: '90 degrees',
      D: '105 degrees',
    },
    _id: '657bd8ddad799b2d18c71516',
    questionNumber: 13,
    questionDescription:
      'The sum of the angles in a triangle is 180 degrees. If two angles are 45 degrees and 75 degrees, what is the measure of the third angle?',
  },
  {
    options: { A: '100', B: '150', C: '200', D: '250' },
    _id: '657bd8ddad799b2d18c71517',
    questionNumber: 14,
    questionDescription: 'If 20% of a number is 40, what is the number?',
  },
  {
    options: { A: '26', B: '28', C: '30', D: '32' },
    _id: '657bd8ddad799b2d18c71518',
    questionNumber: 15,
    questionDescription: 'Find the average of 24, 30, and 36.',
  },
  {
    options: { A: '$30', B: '$40', C: '$45', D: '$48' },
    _id: '657bd8ddad799b2d18c71519',
    questionNumber: 16,
    questionDescription:
      'If a shirt is originally priced at $50 and is discounted by 20%, what is the sale price?',
  },
  {
    options: { A: '5', B: '7', C: '9', D: '11' },
    _id: '657bd8ddad799b2d18c7151a',
    questionNumber: 17,
    questionDescription:
      'The difference between twice a number and 5 is 15. What is the number?',
  },
  {
    options: { A: '4', B: '6', C: '8', D: '10' },
    _id: '657bd8ddad799b2d18c7151b',
    questionNumber: 18,
    questionDescription:
      'If the perimeter of a rectangle is 36 units and its length is 12 units, what is its width?',
  },
  {
    options: { A: '24, 26', B: '26, 28', C: '28, 30', D: '30, 32' },
    _id: '657bd8ddad799b2d18c7151c',
    questionNumber: 19,
    questionDescription:
      'The sum of two consecutive even numbers is 50. What are the numbers?',
  },
  {
    options: { A: '2', B: '4', C: '6', D: '8' },
    _id: '657bd8ddad799b2d18c7151d',
    questionNumber: 20,
    questionDescription:
      'If the area of a triangle is 48 square units and its base is 12 units, what is its height?',
  },
  {
    options: { A: '9, 11', B: '11, 13', C: '13, 15', D: '15, 17' },
    _id: '657bd8ddad799b2d18c7151e',
    questionNumber: 21,
    questionDescription:
      'The product of two consecutive odd numbers is 99. What are the numbers?',
  },
  {
    options: { A: '1/4', B: '1/3', C: '1/2', D: '2/3' },
    _id: '657bd8ddad799b2d18c7151f',
    questionNumber: 22,
    questionDescription:
      'If a bag contains 5 red balls, 3 green balls, and 4 blue balls, what is the probability of drawing a blue ball?',
  },
  {
    options: { A: '4', B: '6', C: '8', D: '10' },
    _id: '657bd8ddad799b2d18c71520',
    questionNumber: 23,
    questionDescription:
      'The area of a square is 64 square units. What is the length of one side?',
  },
  {
    options: {
      A: '16, 17, 18',
      B: '17, 18, 19',
      C: '18, 19, 20',
      D: '19, 20, 21',
    },
    _id: '657bd8ddad799b2d18c71521',
    questionNumber: 24,
    questionDescription:
      'If the sum of three consecutive integers is 51, what are the integers?',
  },
  {
    options: { A: '9', B: '18', C: '24', D: '27' },
    _id: '657bd8ddad799b2d18c71522',
    questionNumber: 25,
    questionDescription: 'Solve: 2/3 * y = 12',
  },
];

const incorrectOrUnansweredQuestions = questions.map((question) => {
  const correspondingAnswer = ans.find(
    (answer) => answer.question === question.questionNumber
  );
  const correspondingOriginalAnswer = originalAnswers.find(
    (originalAnswer) =>
      originalAnswer.questionNumber === question.questionNumber
  );

  return {
    questionNumber: question.questionNumber,
    questionDescription: question.questionDescription,
    options: question.options,
    correctAnswer: correspondingOriginalAnswer?.answer,
    userAnswer: correspondingAnswer?.answer,
  };
});

const incorrectQuestions = incorrectOrUnansweredQuestions.filter(
  (question) => question.correctAnswer !== question.userAnswer
);

console.log(incorrectQuestions);
console.log(incorrectQuestions.length);
