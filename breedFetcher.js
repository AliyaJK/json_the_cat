const request = require('request');

const fetchBreedDescription = (breedName, callback) => {
  const apiUrl = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;
  
  request.get(apiUrl, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }

    if (response.statusCode !== 200) {
      if (response.statusCode === 404) {
        callback(`Error: Breed '${breedName}' not found.`);
      } else {
        callback(`Error: ${response.statusCode}`);
      }
      return;
    }

    let data;
    try {
      data = JSON.parse(body);
    } catch (error) {
      callback(`Error: ${error.message}`);
      return;
    }

    if (data.length === 0) {
      callback(`Error: Breed '${breedName}' not found.`);
      return;
    }

    callback(null, data[0].description);
  });
};

module.exports = { fetchBreedDescription };