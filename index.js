const { fetchBreedDescription } = require('./breedFetcher');

const breedName = process.argv[2];

if (!breedName) {
  console.error('Error: Please provide a breed name as a command-line argument.');
  return;
}

fetchBreedDescription(breedName, (error, description) => {
  if (error) {
    console.error(error);
  } else {
    console.log(description);
  }
});