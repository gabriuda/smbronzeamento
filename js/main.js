// SMOOTH WINDOW
const internalLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

const getMenuHeight = () => {
  const menu = document.querySelector('.menu');
  const menuDimensions = menu.getBoundingClientRect();
  return menuDimensions.height;
};

const getTopFromElement = (event) => {
  const element = event.currentTarget;
  const id = element.getAttribute('href');
  const to = document.querySelector(id).offsetTop;
  return to;
};

const scrollToPosition = (to) => {
  smoothScrollTo(0, to);
};

const scrollTo = (event) => {
  event.preventDefault();
  const topItem = getTopFromElement(event);
  scrollToPosition(topItem);
};

const addSmoothScrollEvent = () => {
  internalLinks.forEach((link) => link.addEventListener('click', scrollTo));
};

/*
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
}

addSmoothScrollEvent();

// RESPONSIVE MENU
const activeClass = 'active';

const btnMobile = document.querySelector('.btn-mobile');
const menu = document.querySelector('.menu ul');
const html = document.documentElement;

const openMenu = () => {
  menu.classList.add(activeClass);
  btnMobile.classList.add(activeClass);
  setTimeout(() => html.addEventListener('click', closeMenu));
};

const closeMenu = () => {
  menu.classList.remove(activeClass);
  btnMobile.classList.remove(activeClass);
  setTimeout(() => html.removeEventListener('click', closeMenu));
};

const addMenuEvent = () => {
  btnMobile.addEventListener('click', openMenu);
};

addMenuEvent();

// SCROLL SECTIONS ACTIVE
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 200;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(`.menu li a[href*=${sectionId}]`)
        .classList.add(activeClass);
    } else {
      document
        .querySelector(`.menu li a[href*=${sectionId}]`)
        .classList.remove(activeClass);
    }
  });
};

const addScrollSectionEvent = () => {
  window.addEventListener('scroll', scrollActive);
};

scrollActive();
addScrollSectionEvent();
