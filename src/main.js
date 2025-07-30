import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = '';
let page = 1;
let totalHits = 0;

const loadMoreBtn = document.querySelector('.load-more');

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  query = input.value.trim();
  if (!query) {
    iziToast.warning({ title: 'Увага!', message: 'Введіть запит для пошуку зображень.', position: 'topRight' });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({ message: 'Нічого не знайдено за цим запитом.', position: 'topRight' });
    } else {
      createGallery(data.hits);
      if (page * 15 < totalHits) {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    iziToast.error({ message: 'Помилка при завантаженні зображень!', position: 'topRight' });
    console.error(error);
  } finally {
    hideLoader();
  }
});


loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "Це всі зображення, більше немає!",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Помилка при підвантаженні зображень!',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
});