import './css/styles.css';
import { fetchCountries } from '../src/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');
let list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry() {
  const input = inputRef.value.trim();
  if (!input) {
    cleanListMarkup();
    cleanCountryMarkup();
    return;
  }

  fetchCountries(input)
    .then(data => markupFetch(data))
    .catch(error => {
      if (error.message === '404') {
        cleanListMarkup();
        cleanCountryMarkup();
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else {
        alert('Пришла ПИЗДА!!!!!! : -)');
      }
    });
}

function markupFetch(countries) {
  console.log(countries);

  if (countries.length > 10) {
    cleanListMarkup();
    cleanCountryMarkup();
    Notiflix.Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (countries.length > 1 && countries.length < 10) {
    cleanCountryMarkup();
    markupListCountry(countries);
  }

  if (countries.length == 1) {
    cleanListMarkup();
    markupCountry(countries);
  }
}

function markupListCountry(countries) {
  const markup = countries.map(({ flags: { svg }, name: { official } }) => {
    return `<li class='list__item'> <img src="${svg}" width="50" class="img__item"> <p class="list__title">${official}</p></li>`;
  });

  return (list.innerHTML = markup.join(''));
}

function markupCountry(countries) {
  const values = Object.values(countries[0].languages);

  const {
    flags: { svg },
    name: { official },
    population,
    capital,
  } = countries[0];

  const markup = `<div class="country__wrapper">
<img class="country__img" src="${svg}" alt="" width='150'/>
</div>
<h2 class="country__title">${official}</h2>
<p class="text country__capital"> <b>Capital:</b> ${capital}</p>
<p class="text country__popul"> <b>Population:</b> ${population}</p>
<p class="text country__lang"> <b>Languages:</b> ${values.join(', ')}</p>
<p></p>`;

  return (info.innerHTML = markup);
}

function cleanListMarkup() {
  list.innerHTML = '';
}

function cleanCountryMarkup() {
  info.innerHTML = '';
}
