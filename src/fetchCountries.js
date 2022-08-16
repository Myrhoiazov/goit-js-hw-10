import Notiflix from 'notiflix';

export default function fetchCountries(country) {
  return fetch(`https://restcountries.com/v3.1/name/${country}?fields=name,capital,currencies,languages,population,flags`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      if (error.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        ;
      } else {
        alert('Пришла ПИЗДА!!!!!! : -)');
      }
    });
}

// const BASE_URL = 'https://restcountries.com/v2/all?fields';


// https://restcountries.com/v2/all?fields=name.official,capital,currencies,languages,population



