import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '25810966-6fb22a4db6c9a757ebd742847';
let pageNumber = 1;

export const getSearchImg = () => {
  return axios.get(`${BASE_URL}?key=${KEY}&page=${pageNumber}&per_page=40`);
};

// export const aaaAaaa = www => {
//   fetch(`${BASE_URL}/?key=${KEY}&page=${pageNumber}&per_page=40&q=${www}&image_type=photo`)
//     .then(res => {
//       if (!res.ok) {
//         throw new res();
//       }
//       console.log(res);

//       return res.json();
//     })
//     .then(res => {
//       console.log(res);
//       return res;
//     });
// };

// function fetchCountries(params) {
//   fetch(`${URL}/?key=${KEY}&page=${pageNumber}&per_page=40&q=${params}&image_type=photo`)
//     .then(res => {
//       if (!res.ok) {
//         throw new res();
//       }
//       return res.json();
//     })
//     .then(res => {
//       return res;
//     });
// }

// let qqq = e.target.value;

// fetchCountries(qqq)
//   .then(img => {
//     const templateCountryInfo = createCountryList(img);
//     renderCountryInfo(templateCountryInfo);
//   })
//   .catch(error => {
//     const incorrectInput = '';
//     renderCountryInfo(incorrectInput);
//     Notiflix.Notify.failure('Oops, there is no country with that name');
//     console.log(error);
//   });

function createCountryList(countries) {
  if (countries.length === 1) {
    return countries.map(country => countryTemplate(country)).join('');
  } else if (countries.length >= 2 && countries.length <= 10) {
    return countries.map(country => countryMinTemplate(country)).join('');
  } else {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return '';
  }
}

// fetch(`${URL}/?key=${KEY}&q=${e}&image_type=photo`)
//   .then(response => response.json())
//   .then(posts => console.log(posts))
//   .catch(error => console.log(error));