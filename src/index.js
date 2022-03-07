import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getSearchImg } from './js/images';



const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

searchFormEl.addEventListener('submit', onSearchBtn);
searchFormEl.addEventListener('input', onSearchInput);

getSearchImg().then(({ data }) => {
  const firstImage = data.hits[2];
  const firstImageTamplate = imagesCardTemplate(firstImage);

  galleryEl.innerHTML = firstImageTamplate;

  // console.log(firstImageTamplate);
});

function onSearchBtn(e) {
  e.preventDefault();
  console.log(searchFormEl.searchQuery.value);
}

function onSearchInput(e) {
  console.log(e.target.value);
}
