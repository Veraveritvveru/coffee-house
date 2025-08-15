const sliderLine = document.querySelector('.slider__line');
const slides = document.querySelectorAll('.slider__card');
const prevBtn = document.querySelector('.slider__btn-prev');
const nextBtn = document.querySelector('.slider__btn-next');
const controls = document.querySelectorAll('.control-wrapper');

let currentIndex = 0;
let autoSlideInterval;
let controlInterval;

const initSlider = () => {
  fillUp();
  const slideWidth = sliderLine.firstElementChild.offsetWidth;
  sliderLine.style.translate = `-${slideWidth * (currentIndex)}px`;
}

const toPrevSlide = () => {
  const slideWidth = sliderLine.firstElementChild.offsetWidth;

  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
    sliderLine.style.translate = `-${slideWidth * (currentIndex)}px`;
    nextBtn.style.pointerEvents = 'auto';
  } else {
    sliderLine.style.translate = `-${slideWidth * (currentIndex)}px`;
    sliderLine.style.transition = 'translate .7s';
  }
  fillUp();
}

const toNextSlide = () => {
  const slideWidth = sliderLine.firstElementChild.offsetWidth;

  currentIndex++;
  if (currentIndex > slides.length - 1) {
    currentIndex = 0;
    sliderLine.style.translate = `-${slideWidth * (currentIndex)}px`;

    nextBtn.style.pointerEvents = 'auto';
  } else {
    sliderLine.style.translate = `-${slideWidth * (currentIndex)}px`;
    sliderLine.style.transition = 'translate .7s';
  }

  fillUp();

  if (currentIndex >= slides.length) {
    nextBtn.style.pointerEvents = 'none';
  }
}

const startAutoSlide = () => {
  stopAutoSlide();
  autoSlideInterval = setInterval(toNextSlide, 7000);
}

const stopAutoSlide = () => {
  clearInterval(autoSlideInterval);
}

prevBtn.addEventListener('click', () => {
  toPrevSlide();
  startAutoSlide();
});

nextBtn.addEventListener('click', () => {
  toNextSlide();
  startAutoSlide();
});

const fillUp = () => {
  clearInterval(controlInterval);
  controls.forEach((control) => {
    control.children[0].style.width = '0';
  })

  let counter = 0;
  controlInterval = setInterval(() => {
    if (counter >= 100) {
      clearInterval(intervalId);
      return;
    }

    controls[currentIndex].children[0].style.width = `${counter}%`;
    counter++;
  }, 70)
}

initSlider();
startAutoSlide();

