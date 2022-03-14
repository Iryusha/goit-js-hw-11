import axios from 'axios';


const BASE_URL = 'https://pixabay.com/api/';
const KEY = '25810966-6fb22a4db6c9a757ebd742847';
let pageNumber = 1;

export const getSearchImg = () => {
  return axios.get(`${BASE_URL}?key=${KEY}`)
  // return axios.get(`${BASE_URL}?key=${KEY}&page=${pageNumber}&per_page=40`);
};


// function createCountryList(countries) {
//   if (countries.length === 1) {
//     return countries.map(country => countryTemplate(country)).join('');
//   } else if (countries.length >= 2 && countries.length <= 10) {
//     return countries.map(country => countryMinTemplate(country)).join('');
//   } else {
//     Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
//     return '';
//   }
// }

