import axios from 'axios';

const API_KEY =
  'live_JBjwDNB5FoxRuL5w11uoP0NHA9ktzLXDDifvMNTdM93LEuuxtzMDqnnQJjJrSTtA';
const ENDPOINT = 'https://api.thecatapi.com/v1/';
const options = {
  headers: { 'x-api-key': API_KEY },
};

function fetchBreeds() {
  return axios.get(`${ENDPOINT}breeds`, options).then(response => {
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${ENDPOINT}images/search?breed_ids=${breedId}`, options)
    .then(response => {
      return response.data;
    });
}

export { fetchCatByBreed, fetchBreeds };
