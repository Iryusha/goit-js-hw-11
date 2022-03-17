import Notiflix from "notiflix";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './sass/main.scss';

import { fetchCountries } from './js/API/images';


const refs = {
    form: document.querySelector('#search-form'),
    galleryMarkupEl: document.querySelector('div.gallery'),
    formInputEl: document.querySelector('input'),
    submitFormBtnEl: document.querySelector('.form-btn'),
    loadMoreBtnEl: document.querySelector('.load-more'),
}


let page = 2;
let limit = 40;
const totalPages = 500 / limit;


Notiflix.Notify.init({
  position: 'right-top',
  width: '400px',
  fontSize: '20px',
});


refs.form.addEventListener('submit', countryRequest);
refs.loadMoreBtnEl.addEventListener('click', loadMoreImgs);
let name = '';



function countryRequest(e) {
    e.preventDefault();
    const {
        elements: { searchQuery }
    } = e.currentTarget;
    
    name = searchQuery.value.toLowerCase().trim();
    console.log(name);
    clearInput();

    if (name === '') {
        refs.loadMoreBtnEl.classList.add('is-hidden');
        Notiflix.Notify.warning('Please enter request.');
        return
    }
    onCoutriesFetch(name);

    function onCoutriesFetch(name) {
        fetchCountries(name)
            .then(countries => {
                console.log(countries);
                if (countries.total === 0) {
                    refs.loadMoreBtnEl.classList.add('is-hidden');
                    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                    return;
                }
                refs.loadMoreBtnEl.classList.remove('is-hidden');
                addMarkupItems(countries.hits);
            })
            .catch(error => console.log(error));
    }
    e.currentTarget.reset();
};

function loadMoreImgs() {  
    const params = new URLSearchParams({
     page: page,
     per_page: limit,
    });

    const url = `https://pixabay.com/api/?key=25798215-b5224b890c985f6c53280bcb2&q=${name}&${params}&image_type=photo&orientation=horizontal&safesearch=true`;

     if (page > totalPages) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        return;
    }
    return fetch(url)
        .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
        })
        .then(countries => {
            addMarkupItems(countries.hits);
             page += 1;
        });
}

// function addMarkupItems(images) {
//     images.map(img => {
//             const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = img;
//             return refs.galleryMarkupEl.insertAdjacentHTML('beforeend',
//                 `<div class="photo-card">
//                         <a class="img-link" href=${largeImageURL}>
//                             <img class = "gallery-image" src="${webformatURL}" data-source=${largeImageURL} alt="${tags}" loading="lazy" />
//                         </a>
//                         <div class="info">
//                             <p class="info-item">
//                                 <b>Likes</b> ${likes}
//                             </p>
//                             <p class="info-item">
//                                 <b>Views</b> ${views}
//                             </p>
//                             <p class="info-item">
//                                 <b>Comments</b> ${comments}
//                             </p>
//                             <p class="info-item">
//                                 <b>Downloads</b> ${downloads}
//                             </p>
//                         </div>
//                     </div>
//                 </div>   
//                 `)
//         })
//         .join('');
// };


function clearInput() {
  refs.galleryMarkupEl.innerHTML = '';
}


const lightbox = new SimpleLightbox('.gallery .photo-card a', { captionsData: `alt`, captionDelay: 250 });