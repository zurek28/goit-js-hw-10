import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import _ from 'lodash';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 500;

let input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener(
  'input',
  _.debounce(e => {
    fetchCountries(e.target.value.trim()).then(response => {
      if (response.length > 10) {
        Notify.info(
          'To many matches found. Please enter a more specific name.'
        );
      } else if (response.length <= 10 && response.length > 1) {
        htmlListInjection(response);
      } else if (response.length === 1) {
        countryList.innerHTML = '';
        htmlInfoInjection(response);
      }

      if (response['status'] === 404) {
        Notify.failure('Oops, there in no country with that name.');
      }
    });
  }, DEBOUNCE_DELAY)
);

function htmlListInjection(countriesArray) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  countriesArray.forEach(elem => {
    const listLine = document.createElement('div');
    listLine.classList.add('list-element');

    listLine.innerHTML = `<li><img src="${elem['flags']['svg']}" alt="Flag of ${elem['name']}" height="16" width="22"/> ${elem['name']}</li>`;

    countryList.append(listLine);
  });
}

function htmlInfoInjection(countryArray) {
  const singleCountry = countryArray[0];
  const languages = singleCountry['languages'];
  let languagesArray = [];

  languages.forEach(elem => {
    languagesArray.push(elem['name']);
  });
  countryInfo.innerHTML = `<h1><img src="${
    singleCountry['flags']['svg']
  }" alt="Flag of ${
    singleCountry['name']
  }" height="24" width="30" style="margin-right: 10px;"/>${
    singleCountry['name']
  }</h1>
  <p><b>Capital:</b> ${singleCountry['capital']}</p>
  <p><b>Population:</b> ${singleCountry['population']}</p>
  <p><b>Launguages:</b> ${languagesArray.join(', ')}</p>`;
}
