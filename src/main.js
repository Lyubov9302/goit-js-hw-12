import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Увага!',
      message: 'Введіть запит для пошуку зображень',
      position: 'topRight',
    });
  } return;

  clearGallery();
  showLoader();

  try {
    const images = await getImagesByQuery(query);

    if (images.length === 0) {
      iziToast.info({ message: 'Нічого не знайдено за цим запитом.', position: 'topRight' });
    } else {
      createGallery(images);
    }
  } catch (error) {
    iziToast.error({ message: 'Помилка при завантаженні зображень!', position: 'topRight' });
    console.error(error);
  } finally {
    hideLoader();
  }
});