import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');

  const markup = images
    .map(img => {
      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${img.largeImageURL}">
            <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
          </a>
        <div class="info">
  <div class="info-item"><b>Likes</b><span>${img.likes}</span></div>
  <div class="info-item"><b>Views</b><span>${img.views}</span></div>
  <div class="info-item"><b>Comments</b><span>${img.comments}</span></div>
  <div class="info-item"><b>Downloads</b><span>${img.downloads}</span></div>
</div>
        </li>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoader() {
  document.getElementById('loader-text').classList.remove('hidden');
}

export function hideLoader() {
  document.getElementById('loader-text').classList.add('hidden');
}
