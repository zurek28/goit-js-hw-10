function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name.trim()}?fields=${searchFilter[
      'fields'
    ].join()}`
  )
    .then(response => response.json())
    .catch(error => console.log('Error: ', error));
}

const searchFilter = {
  fields: ['name', 'capital', 'population', 'flags', 'languages'],
};

export { fetchCountries };
