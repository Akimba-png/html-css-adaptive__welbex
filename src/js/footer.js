const DESKTOP_WIDTH = 1170;
const MENU_DESKTOP_LIST = [
  'Расчёт стоимости',
  'Кейсы',
  'Услуги',
  'Благодарственные письма',
  'Виджеты',
  'Сертификаты',
  'Интеграции',
  'Блог на Youtube',
  'Наши клиенты',
  'Вопрос / Ответ',
];

const MENU_MOBILE_LIST = [
  'Расчёт стоимости',
  'Благодарность клиентов',
  'Услуги',
  'Кейсы',
  'Виджеты',
  'Сертификаты',
  'Интеграции',
  'Блог на Youtube',
  'Наши клиенты',
  'Вопрос / Ответ',
];

function switchContent(currentWidth, nodeList) {
  if (currentWidth >= DESKTOP_WIDTH) {
    nodeList.forEach((node, i) => {
      node.textContent = MENU_DESKTOP_LIST[i];
    });
  } else {
    nodeList.forEach((node, i) => {
      node.textContent = MENU_MOBILE_LIST[i];
    });
  }
}

export function observeCurrentWidth() {
  window.addEventListener('load', (evt) => {
    const footerElement = document.querySelector('.page-footer');
    const menuLinks = footerElement.querySelectorAll('.menu__link');
    let width = footerElement.clientWidth;
    switchContent(width, menuLinks);

    evt.currentTarget.addEventListener('resize', () => {
      const width = footerElement.clientWidth;
      switchContent(width, menuLinks);
    });
  });
}
