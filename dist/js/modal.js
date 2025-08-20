import { createNode } from "./utils.js";

const body = document.body;
const additivesList = [
  'Sugar',
  'Cinnamon',
  'Syrup'
]

let sizeInputs;
let additivInputs;
let modal;

export function openModal(product, src) {
  modal = createNode({ parent: body, classNames: ['modal'] });
  const overlay = createNode({ classNames: ['modal__overlay'], parent: modal });
  const container = createNode({ classNames: ['modal__container'], parent: modal });
  const imageWrap = createNode({ classNames: ['modal__image-wrap'], parent: container });
  const content = createNode({ classNames: ['modal__content'], parent: container });
  const img = createNode({ tag: 'img', classNames: ['modal__img'], parent: imageWrap });
  img.src = src;

  const descr = createNode({ classNames: ['modal__descr'], parent: content });
  const title = createNode({ tag: 'h4', text: product.name, classNames: ['modal__title'], parent: descr });
  const text = createNode({ tag: 'p', text: product.description, classNames: ['modal__text'], parent: descr });

  const form = createNode({ tag: 'form', classNames: ['modal__form'], parent: content });
  const sizes = createNode({ classNames: ['modal__size'], parent: form });
  createNode({ tag: 'p', text: 'Size', classNames: ['size-title'], parent: sizes });
  const sizeInputsWrap = createNode({ classNames: ['modal__input-wrapper'], parent: sizes });
  sizeInputs = ['s', 'm', 'l'].map((elem, index) => {
    const input = createNode({ tag: 'input', classNames: ['input'], parent: sizeInputsWrap });
    input.name = 'size';
    input.id = elem;
    input.setAttribute('type', 'radio');
    input.setAttribute('value', index * 0.5);
    return input;
  });
  sizeInputs[0].checked = true;
  const sizeLabels = ['s', 'm', 'l'].map((elem, index) => {
    const label = createNode({ tag: 'label', classNames: ['modal__label', 'label'], parent: sizeInputsWrap });
    label.setAttribute('for', elem);
    const circle = createNode({ tag: 'span', text: `${elem.toUpperCase()}`, classNames: ['label-circle'], parent: label });
    const text = createNode({ tag: 'span', text: `${100 + (100 * (index + 1))} ml`, classNames: ['label-text'], parent: label })
    return label;
  })

  const additives = createNode({ classNames: ['modal__additives'], parent: form });
  createNode({ tag: 'p', text: 'Additives', classNames: ['additives-title'], parent: additives });
  const additivInputsWrap = createNode({ classNames: ['modal__input-wrapper'], parent: additives });

  additivInputs = additivesList.map((elem) => {
    const input = createNode({ tag: 'input', classNames: ['input'], parent: additivInputsWrap });
    input.name = 'additives';
    input.id = elem;
    input.setAttribute('type', 'checkbox');
    input.setAttribute('value', '0.5');
    return input;
  })

  const additivLabels = additivesList.map((elem, index) => {
    const label = createNode({ tag: 'label', classNames: ['modal__label', 'label'], parent: additivInputsWrap });
    label.setAttribute('for', elem);
    const circle = createNode({ tag: 'span', text: index + 1, classNames: ['label-circle'], parent: label });
    const text = createNode({ tag: 'span', text: elem, classNames: ['label-text'], parent: label })
    return label;
  })

  const price = createNode({ classNames: ['modal__price'], parent: content });
  createNode({ tag: 'h4', text: 'Total:', classNames: ['price-title'], parent: price });
  const totalPrice = createNode({ tag: 'h4', text: `$${product.price}`, classNames: ['total-price'], parent: price })

  const info = createNode({
    tag: 'p',
    text: 'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.',
    classNames: ['modal__info'],
    parent: content
  });

  const modalBtn = createNode({ tag: 'button', text: 'Close', classNames: ['modal__btn'], parent: content });
  body.classList.add('scroll-hidden');

  form.addEventListener('change', () => {
    totalPrice.textContent = `$${countTotalPrice(product.price).toFixed(2)}`;
  })

  modalBtn.addEventListener('click', () => {
    closeModal();
  })

  overlay.addEventListener('click', (event) => {
    closeModal();
  })
}

function closeModal() {
  body.classList.remove('scroll-hidden');
  modal.classList.add('fade-out');
  setTimeout(() => {
    modal.remove();
  }, 200);
}

function countTotalPrice(basePrice) {
  const addPrice = [...sizeInputs, ...additivInputs]
    .reduce((sum, input) => sum + (input.checked ? +input.value : 0), 0);

  return +basePrice + addPrice;
}


