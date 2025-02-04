/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calc() {
  //Calculator
  const calcResult = document.querySelector('.calculating__result span');
  let sex, ratio, weight, height, age;

  function initActiveClasses(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
    } else {
      sex = "female";
      localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
    } else {
      ratio = 1.375;
      localStorage.setItem('ratio', ratio);
    }

    elements.forEach(elem => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute("data-ratio") === ratio) {
        elem.classList.add(activeClass);
      }

      if (elem.getAttribute("id") === sex) {
        elem.classList.add(activeClass);
      }
    });
  }

  initActiveClasses('#gender div', 'calculating__choose-item_active');
  initActiveClasses('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcCalories() {
    if (!sex || !weight || !height || !age || !ratio) {
      calcResult.textContent = '____';
      return;
    }

    if (sex === 'male') {
      calcResult.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    } else if (sex === 'female') {
      calcResult.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    }
  }

  calcCalories();

  function getStaticInfo(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = e.target.getAttribute('data-ratio');
          localStorage.setItem("ratio", +e.target.getAttribute('data-ratio'));
        } else if (e.target.getAttribute('id')) {
          sex = e.target.getAttribute('id');
          localStorage.setItem("sex", e.target.getAttribute('id'));
        }

        elements.forEach(item => {
          item.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcCalories();
      });
    });
  }

  getStaticInfo('#gender', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

  function getDynamicInfo(parentSelector) {
    const inputs = document.querySelectorAll(`${parentSelector} input`);
    let reg = /\D/g;
    inputs.forEach(elem => elem.addEventListener('input', () => {
      if (elem.value.match(/\D/g)) {
        elem.style.border = '2px solid red';
      } else {
        elem.style.border = 'none';
      }

      switch (elem.getAttribute('id')) {
        case "weight":
          weight = +elem.value;
          break;

        case "height":
          height = +elem.value;
          break;

        case 'age':
          age = +elem.value;
          break;
      }

      calcCalories();
    }));
  }

  getDynamicInfo('.calculating__choose_medium');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  //Создаём карточки с помощью классов
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;

      for (var _len = arguments.length, classesName = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classesName[_key - 6] = arguments[_key];
      }

      this.classes = classesName;
      this.parent = document.querySelector(parentSelector);
      this.exchange = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.exchange;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes = 'menu__item';
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(item => element.classList.add(item));
      }

      element.innerHTML = `<img src=${this.src} alt=${this.alt}>
                            <h3 class="menu__item-subtitle">${this.title}</h3>
                            <div class="menu__item-descr">${this.descr}</div>
                            <div class="menu__item-divider"></div>
                            <div class="menu__item-price">
                                <div class="menu__item-cost">Цена:</div>
                                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                            </div>`;
      this.parent.append(element);
    }

  } // const getResource = async (url) => {
  //   const res = await fetch(url);
  //   if (!res.ok) {
  //     throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
  //   }
  //   return await res.json();
  // };
  // const exchange = 27;
  // getResource('http://localhost:3000/menu')
  //   .then(data => {
  //       data.forEach(({img, altimg, title, descr, price}) => {
  //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //       });
  // });
  // // new MenuCard(
  // //   "img/tabs/vegy.jpg",
  // //   "vegy",
  // //   'Меню "Фитнес"',
  // //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  // //   9,
  // //   '.menu .container',
  // //   'menu__item'
  // // ).render();
  // // new MenuCard(
  // //   "img/tabs/post.jpg",
  // //   "post",
  // //   'Меню "Постное"',
  // //   'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  // //   14,
  // //   '.menu .container',
  // //   'menu__item'
  // // ).render();
  // // new MenuCard(
  // //   "img/tabs/elite.jpg",
  // //   "elite",
  // //   'Меню “Премиум”',
  // //   'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  // //   21,
  // //   '.menu .container',
  // //   'menu__item'
  // // ).render();
  // axios.get('http://localhost:3000/menu')
  //   .then(data => {
  //     data.data.forEach(({
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price
  //     }) => {
  //       new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //     })
  //   });


  const exchange = 27;

  function createCard(data) {
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      const element = document.createElement('div');
      element.classList.add('menu__item');
      element.innerHTML = `<img src=${img} alt=${altimg}>
                            <h3 class="menu__item-subtitle">${title}</h3>
                            <div class="menu__item-descr">${descr}</div>
                            <div class="menu__item-divider"></div>
                            <div class="menu__item-price">
                                <div class="menu__item-cost">Цена:</div>
                                <div class="menu__item-total"><span>${price * exchange}</span> грн/день</div>
                            </div>`;
      document.querySelector('.menu .container').append(element);
    });
  } // getResource('http://localhost:3000/menu')


  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('https://my-json-server.typicode.com/BerLP2021/db/menu').then(data => createCard(data));
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(form, modalSelector, timerOpenModal) {
  //Обработчик форм
  const forms = document.querySelectorAll(form);
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы свами свяжемся',
    failure: 'Что-то пошло не так!..'
  };
  forms.forEach(item => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const messDiv = document.createElement('img');
      messDiv.src = message.loading;
      messDiv.style.cssText = `
                  display: block;
                  margin: 0 auto;`;
      form.insertAdjacentElement('afterend', messDiv);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries())); // formData.forEach((item, i) => {
      //   obj[i] = item;
      // });
      // postData('http://localhost:3000/requests', json)

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('https://my-json-server.typicode.com/BerLP2021/db/requests', json).then(data => {
        console.log(data);
        showThanksModal(message.success);
        messDiv.remove();
      }, () => showThanksModal(message.failure)).finally(() => {
        form.reset();
      }); // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');
      //           //Запрос с передачей данных в формате form-data
      //           // const formData = new FormData(form);
      //           // // request.setRequestHeader('Content-type', 'multipart/form-data');
      //           // request.send(formData);
      // //Запрос с передачей данных в формате JSON
      // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      // const formData = new FormData(form);
      // const obj = {};
      // formData.forEach((item, i) => {
      //   obj[i] = item;
      // });
      // request.send(JSON.stringify(obj));
      // request.addEventListener('load', () => {
      //   if (request.status === 200) {
      //     // console.log(request.response);
      //     showThanksModal(message.success);
      //     form.reset();
      //     messDiv.remove();
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector, timerOpenModal);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
               <div class="modal__content">
               <div class="modal__close" data-close>&times;</div>
               <div class="modal__title">${message}</div>
               </div>`;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      prevModalDialog.classList.add('show');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
    }, 3000);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; },
/* harmony export */   "openModal": function() { return /* binding */ openModal; }
/* harmony export */ });
function openModal(modalSelector, timerOpenModal) {
  const modal = document.querySelector(modalSelector); // modal.style.display = 'block';

  modal.classList.remove('hide');
  modal.classList.add('show'); // modal.classList.toggle('show');

  document.body.style.overflow = 'hidden';
  document.body.style.marginRight = '17px';

  if (timerOpenModal) {
    clearTimeout(timerOpenModal);
  }
}

function closeModal(modalSelector) {
  // closeModal.closest('.modal').style.display = 'none';
  // closeModal.closest('.modal').classList.remove('show');
  // closeModal.closest('.modal').classList.add('hide');
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide'); // modal.classList.toggle('show');

  document.body.style.overflow = '';
  document.body.style.marginRight = '0px';
}

function modal(triggerOpenModal, modalSelector, timerOpenModal) {
  const btnsOpenModal = document.querySelectorAll(triggerOpenModal),
        modal = document.querySelector(modalSelector);
  window.addEventListener('scroll', showModalByScroll);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, timerOpenModal);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  btnsOpenModal.forEach(item => {
    item.addEventListener('click', () => {
      openModal(modalSelector, timerOpenModal);
      window.removeEventListener('scroll', showModalByScroll);
    });
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      // if (e.target === modal || e.target === document.querySelector('[data-close]')) {
      closeModal(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code == "Escape" && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function slider(_ref) {
  let {
    slide,
    container,
    previousArrow,
    nextArrow,
    sliderWrapper,
    field,
    totalCounter,
    currentCounter
  } = _ref;

  //Create slider dynamically
  function createSlider(data) {
    data.forEach(_ref2 => {
      let {
        src,
        alt
      } = _ref2;
      const slideWrap = document.createElement('div');
      slideWrap.classList.add(slide.slice(1));
      slideWrap.innerHTML = `
                    <img src=${src} alt=${alt}>
               `;
      document.querySelector(field).append(slideWrap);
    });
  } // getResource('http://localhost:3000/slider-images')


  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('https://my-json-server.typicode.com/BerLP2021/db/slider-images').then(data => createSlider(data)).then(() => {
    // Slider carousel
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(previousArrow),
          next = document.querySelector(nextArrow),
          wrapper = document.querySelector(sliderWrapper),
          inner = document.querySelector(field),
          width = window.getComputedStyle(wrapper).width,
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          dotWrap = document.createElement('ol');
    let slideIndex = 1,
        offSet = 0,
        dots = [];
    slider.style.position = 'relative'; // dotWrap.classList.add('carousel-indicators');

    dotWrap.style.cssText = `
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 15;
                    display: flex;
                    justify-content: center;
                    margin-right: 15% ;
                    margin-left: 15% ;
                    list-style: none;
               `;
    slider.append(dotWrap);

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
                         box-sizing: content-box;
                         flex: 0 1 auto;
                         width: 30px;
                         height: 6px;
                         margin-right: 3px;
                         margin-left: 3px;
                         cursor: pointer;
                         background-color: #fff;
                         background-clip: padding-box;
                         border-top: 10px solid transparent;
                         border-bottom: 10px solid transparent;
                         opacity: .3;
                         transition: opacity .6s ease;
                    `;
      dotWrap.append(dot);
      dots[i] = dot;

      if (i == 0) {
        dot.style.opacity = 1;
      }
    } // inner.style.cssText = `width = ${(100 * slides.length)}%; display: flex; transition: 0.5s all;`;


    inner.style.width = 100 * slides.length + '%';
    inner.style.display = 'flex';
    inner.style.transition = '0.5s all'; // slides.forEach(item => {
    //   item.style.width = width;
    // });

    wrapper.style.overflow = 'hidden';
    changePage(slides.length, total);
    changePage(slideIndex, current);
    next.addEventListener('click', () => {
      if (offSet == pxToNumber(width) * (slides.length - 1)) {
        offSet = 0;
        slideIndex = 1;
      } else {
        offSet += pxToNumber(width);
        slideIndex++;
      }

      showNextSlide(offSet, slideIndex, current);
    });
    prev.addEventListener('click', () => {
      if (offSet == 0) {
        offSet = pxToNumber(width) * (slides.length - 1);
        slideIndex = slides.length;
      } else {
        offSet -= pxToNumber(width);
        slideIndex--;
      }

      showNextSlide(offSet, slideIndex, current);
    });

    function showNextSlide(offSet, slideIndex, current) {
      inner.style.transform = `translateX(-${offSet}px)`;
      changePage(slideIndex, current);
      dots.forEach(dot => dot.style.opacity = '0.5');
      dots[slideIndex - 1].style.opacity = 1;
    }

    function pxToNumber(str) {
      return +str.replace(/\D/g, '');
    }

    function changePage(n, elem) {
      if (n < 10) {
        elem.textContent = `0${n}`;
      } else {
        elem.textContent = n;
      }
    }

    dots.forEach(dot => {
      dot.addEventListener('click', e => {
        offSet = (e.target.getAttribute('data-slide-to') - 1) * pxToNumber(width);
        slideIndex = e.target.getAttribute('data-slide-to');
        showNextSlide(offSet, slideIndex, current);
      });
    });
  }); // Slider simple
  // const slides = document.querySelectorAll('.offer__slide'),
  //   prev = document.querySelector('.offer__slider-prev'),
  //   next = document.querySelector('.offer__slider-next'),
  //   total = document.querySelector('#total'),
  //   current = document.querySelector('#current');
  // let slideIndex = 1;
  // showSlide(slideIndex);
  // changePage(slides.length, total);
  // function changePage(n, elem) {
  //   if (n < 10) {
  //     elem.textContent = `0${n}`;
  //   } else {
  //     elem.textContent = n;
  //   }
  // }
  // function showSlide(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   } else if (n < 1) {
  //     slideIndex = slides.length;
  //   }
  //   slides.forEach(item => {
  //     item.style.display = 'none';
  //   });
  //   slides[slideIndex - 1].style.display = 'block';
  //   changePage(slideIndex, current);
  // }
  // function slideChange(n) {
  //   showSlide(slideIndex += n);
  // }
  // prev.addEventListener('click', () => {
  //   slideChange(-1);
  // });
  // next.addEventListener('click', () => {
  //   slideChange(1);
  // });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs(titleParentSelector, titleSelector, tabContentSelector, activeTabSelector) {
  const tabs = document.querySelectorAll(titleSelector),
        tabContents = document.querySelectorAll(tabContentSelector),
        tabsParents = document.querySelector(titleParentSelector);

  function hideTabContent() {
    tabContents.forEach(tab => {
      tab.classList.remove('show', 'fade');
      tab.classList.add('hide');
    });
    tabs.forEach(tab => {
      tab.classList.remove(activeTabSelector);
    });
  }

  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabContents[i].classList.remove('hide');
    tabContents[i].classList.add('fade', 'show');
    tabs[i].classList.add(activeTabSelector);
  }

  hideTabContent();
  showTabContent();
  tabsParents.addEventListener('click', e => {
    if (e.target && e.target.matches(titleSelector)) {
      tabs.forEach((item, i) => {
        if (e.target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
  //Timer
  function getTimeRemaining(endTimer) {
    let days, hours, minutes, seconds;
    const t = new Date(endTimer) - new Date();

    if (t <= 0) {
      // Тут можно впилить любой код вместо нулевого таймера
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = parseInt(t / 1000 / 60 / 60 / 24);
      hours = parseInt(t / 1000 / 60 / 60 % 24);
      minutes = parseInt(t / 1000 / 60 % 60);
      seconds = parseInt(t / 1000 % 60);
    }

    return {
      total: t,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function getZero(num) {
    return num >= 0 && num < 10 ? `0${num}` : num; // if (num >= 0 && num < 10) {
    //   return `0${num}`;
    //   } else if (num >= 10) {
    //     return num;
    //   } else {
    //     return '00';
    //   }
  }

  function setClock(selector, endTimer) {
    const timerTag = document.querySelector(selector),
          days = timerTag.querySelector('#days'),
          hours = timerTag.querySelector('#hours'),
          minutes = timerTag.querySelector('#minutes'),
          seconds = timerTag.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endTimer);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": function() { return /* binding */ getResource; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
const postData = async (url, data) => {
  const request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    body: data
  });
  return await request.json();
}; // Создаём карточки динамически


const getResource = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");








window.addEventListener('DOMContentLoaded', () => {
  const timerOpenModal = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', timerOpenModal), 10000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', timerOpenModal);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-10-25 21:28:00');
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', '.modal', timerOpenModal);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    container: '.offer__slider',
    slide: '.offer__slide',
    previousArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    sliderWrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
    totalCounter: '#total',
    currentCounter: '#current'
  });
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map