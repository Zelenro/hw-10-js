import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import '../css/main.css';
import '../css/slimselect.css';
import '../css/loader.css';

const breedSelectRef = document.querySelector('.breed-select');
const catInfoRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');
catInfoRef.classList.add('cat-card');

const slim = new SlimSelect({
  select: breedSelectRef,
  data: [],
  settings: {
    disabled: false, // Disable the select
    alwaysOpen: false, // Keep dropdown always open
    showSearch: true, // Show search input
    focusSearch: true, // Auto focus search on open
    keepSearch: false, // Keep search input value when dropdown closes
    ariaLabel: 'Combobox', // ARIA label for accessibility
    searchPlaceholder: 'Search', // Search input placeholder
    searchText: 'No Results', // Text when no results found
    searchingText: 'Searching...', // Text while searching
    searchHighlight: false, // Highlight search terms
    closeOnSelect: true, // Close dropdown after selection
    contentLocation: document.body, // Where to append dropdown
    contentPosition: 'absolute', // CSS position: absolute, relative, fixed
    contentWidth: '', // Content width: "500px" exact, ">500px" min-width, "<500px" max-width
    openPosition: 'auto', // Open direction: auto, up, down
    placeholderText: 'Cats', // Placeholder text
    allowDeselect: false, // Allow deselecting in single select
    hideSelected: false, // Hide selected options in dropdown
    keepOrder: false, // Keep user click order (not DOM order) for getSelected
    showOptionTooltips: false, // Show tooltips on options
    minSelected: 0, // Minimum selections (multi-select)
    maxSelected: 1000, // Maximum selections (multi-select)
    timeoutDelay: 200, // Delay for callbacks (ms)
    maxValuesShown: 20, // Max values shown before message
    maxValuesMessage: '{number} selected', // Message when max values exceeded
    addableText: 'Press "Enter" to add {value}', // Text for addable option
  },
});

errorRef.style.display = 'none';
loaderRef.style.display = 'none';

breedSelectRef.addEventListener('change', handleSelect);

function makeCatCard(catItem) {
  const imgCat = document.createElement('img');
  const textWrapper = document.createElement('div');
  const breedCat = document.createElement('h2');
  const infoCat = document.createElement('p');
  const temperamentCat = document.createElement('p');

  imgCat.style.width = '400px';
  imgCat.style.objectFit = 'cover';
  imgCat.src = catItem.url;
  imgCat.alt = catItem.breeds[0].name;

  textWrapper.className = 'cat-card__info';
  breedCat.textContent = catItem.breeds[0].name;
  infoCat.textContent = catItem.breeds[0].description;
  temperamentCat.textContent = catItem.breeds[0].temperament;

  textWrapper.append(breedCat, infoCat, temperamentCat);
  catInfoRef.innerHTML = '';
  catInfoRef.append(imgCat, textWrapper);
}

function handleSelect(e) {
  e.preventDefault();

  loaderRef.style.display = 'block';
  errorRef.style.display = 'none';
  fetchCatByBreed(e.target.value)
    .then(idCat => {
      makeCatCard(idCat[0]);
      errorRef.style.display = 'none';
    })
    .catch(err => {
      console.log(err);
      errorRef.style.display = 'block';
    })
    .finally(() => {
      loaderRef.style.display = 'none';
    });
}

function injectSelect() {
  loaderRef.style.display = 'block';
  errorRef.style.display = 'none';
  fetchBreeds()
    .then(data => {
      const dataInSlimSelect = data.map(el => ({
        text: el.name,
        value: el.id,
      }));
      slim.setData(dataInSlimSelect);
      errorRef.style.display = 'none';
    })
    .catch(err => {
      console.log('Error', err);
      errorRef.style.display = 'block';
    })
    .finally(() => {
      loaderRef.style.display = 'none';
    });
}

injectSelect();
