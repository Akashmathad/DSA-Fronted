const milliseconds =
  new Date(2023, 11, 17, 9, 0, 0, 0).getTime() - new Date().getTime();

// Calculate hours and minutes
const hours = Math.floor(milliseconds / (1000 * 60 * 60));
const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

console.log(` ${hours} hours and ${minutes} minutes.`);

console.log(new Date(2023, 11, 17, 9, 0, 0, 0).getTime());
