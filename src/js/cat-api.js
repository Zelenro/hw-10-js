const API_KEY =
  'live_JBjwDNB5FoxRuL5w11uoP0NHA9ktzLXDDifvMNTdM93LEuuxtzMDqnnQJjJrSTtA';
const ENDPOINT = 'https://api.thecatapi.com/v1/';
const options = {
  headers: { 'x-api-key': API_KEY },
};

function fetchBreeds() {
  return fetch(`${ENDPOINT}breeds`, options).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${ENDPOINT}images/search?breed_ids=${breedId}`, options).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
}

export { fetchCatByBreed, fetchBreeds };
