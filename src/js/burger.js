const body = document.body;
const burgerBtn = document.querySelector('.burger-btn');
const header = document.querySelector('.header');
const navList = document.querySelector('.nav__list');
const headerBox = document.querySelector('.header__box');
console.log(headerBox);

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