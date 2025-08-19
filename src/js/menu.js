const menuList = document.querySelector('.menu__list');
const tabs = document.querySelector('.menu__tabs');

let currentCategory;
let products;

async function loadProducts() {
  try {
    const response = await fetch('./assets/data/products.json');
    products = await response.json();

    firstRender(products);
  } catch (error) {
    console.log('Ошибка при загрузке данных: ' + error)
  }
}

function firstRender(products) {
  products.filter((product) => product.category === 'coffee').map((item, index) => {
    createCard(item, index, menuList);
  })
}

function renderProducts(products) {
  const oldCards = [...menuList.children];

  if (oldCards.length > 0) {
    oldCards.forEach((card, id) => {
      card.classList.remove('fade-in');
      card.classList.add('fade-out');
      card.style.animationDelay = `${id * 0.04}s`;
    });

    setTimeout(() => {
      menuList.innerHTML = '';
      products
        .filter((product) => product.category === currentCategory)
        .forEach((item, index) => {
          const prod = createCard(item, index, menuList);
          prod.style.animationDelay = `${index * 0.01}s`;
        });
    }, oldCards.length * 30 + 300)
  } else {
    products
      .filter((product) => product.category === currentCategory)
      .forEach((item, index) => {
        const prod = createCard(item, index, menuList);
        prod.style.animationDelay = `${index * 0.01}s`;
      });
  }
}


function createCard(product, index, parent) {
  const card = document.createElement('li');
  card.classList.add('product-card', 'fade-in');
  parent.appendChild(card);

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('product__img-wrapper')

  const img = document.createElement('img');
  img.src = `./assets/img/${product.category}-${index + 1}.jpg`;
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
  return card;
}

tabs.addEventListener('change', (event) => {
  currentCategory = event.target.value;
  renderProducts(products);
})


loadProducts();