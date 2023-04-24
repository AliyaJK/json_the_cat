const request = require('request');
const breedName = process.argv[2];

if (!breedName) {
  console.error('Error: Please provide a breed name as a command-line argument.');
  return;
}

const apiUrl = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  if (response.statusCode !== 200) {
    if (response.statusCode === 404) {
      console.error(`Error: Breed '${breedName}' not found.`);
    } else {
      console.error(`Error: ${response.statusCode}`);
    }
    return;
  }

  let data;
  try {
    data = JSON.parse(body);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  if (data.length === 0) {
    console.error(`Error: Breed '${breedName}' not found.`);
    return;
  }

  console.log(data[0].description);
});
