import { debounce } from "./utils.js";
import { openModal } from "./modal.js";
import productsData from "../data/products.json";

const body = document.body;
const burgerBtn = document.querySelector('.burger-btn');
const header = document.querySelector('.header');
const navList = document.querySelector('.nav__list');
const headerBox = document.querySelector('.header__box');
const menuList = document.querySelector('.menu__list');
const tabs = document.querySelector('.menu__tabs');
const loadMoreBtn = document.querySelector('.load-more');

let currentCategory = 'coffee';
let visibleCount = 4;
let filteredProducts = [];

burgerBtn.addEventListener('click', () => {
  body.classList.add('scroll-hidden');
  header.classList.toggle('open');
  headerBox.classList.toggle('open');
})

navList.addEventListener('click', () => {
  if (header.classList.contains('open')) {
    header.classList.remove('open');
    headerBox.classList.remove('open');
    body.classList.remove('scroll-hidden');
  }
});

renderProducts(productsData);

function getVisibleCount(list) {
  return (window.innerWidth < 1089) ? Math.min(4, list.length) : list.length;
}

function renderProducts(products) {
  const oldCards = [...menuList.children];

  filteredProducts = products.filter((product) => product.category === currentCategory);
  visibleCount = getVisibleCount(filteredProducts);

  if (oldCards.length > 0) {
    oldCards.forEach((card, id) => {
      card.classList.remove('fade-in');
      card.classList.add('fade-out');
      card.style.animationDelay = `${id * 0.04}s`;
    });

    setTimeout(() => {
      drawCards(filteredProducts.slice(0, visibleCount))
    }, oldCards.length * 30 + 300)
  } else {
    drawCards(filteredProducts.slice(0, visibleCount))
  }

  toggleLoadMoreBtn(filteredProducts);
}

function toggleLoadMoreBtn(filtered) {
  if (visibleCount <= 4 && filtered.length > 4) {
    loadMoreBtn.classList.remove('hidden');
  }
  else {
    loadMoreBtn.classList.add('hidden');
  }
}

function drawCards(items) {
  menuList.innerHTML = '';
  items.forEach((item, index) => {
    const prod = createCard(item, index, menuList);
    prod.style.animationDelay = `${index * 0.01}s`;
  });
}

function createCard(product, index, parent) {
  const card = document.createElement('li');
  card.classList.add('product-card', 'fade-in');
  parent.appendChild(card);

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('product__img-wrapper')
  const img = document.createElement('img');
  img.src = `/assets/img/${product.category}-${index + 1}.jpg`;
  img.alt = product.name;
  img.classList.add('product__img');
  imageWrapper.append(img);

  const content = document.createElement('div');
  content.classList.add('product__content');

  const title = document.createElement('h4');
  title.classList.add('product__title');
  title.textContent = `${product.name}`;

  const description = document.createElement('p');
  description.classList.add('product__descr');
  description.textContent = `${product.description}`;

  const price = document.createElement('h4');
  price.classList.add('product__price');
  price.textContent = `$${product.price}`;

  content.append(title, description, price);
  card.append(imageWrapper, content);
  card.addEventListener('click', () => {
    const src = card.firstElementChild.firstElementChild.src;
    openModal(product, src);
  });

  return card;
}


tabs.addEventListener('change', (event) => {
  currentCategory = event.target.value;
  renderProducts(productsData);
})

loadMoreBtn.addEventListener('click', () => {
  drawCards(filteredProducts);
  loadMoreBtn.classList.add('hidden');
})

window.addEventListener('resize', debounce(() => {
  renderProducts(productsData)
}, 200))