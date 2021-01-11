/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calc(){
    const result = document.querySelector('.calculating__result span');
    //два елемента по умолчанию стоят
    let sex, height, weight, age, ratio;
     //условия,если в localStorage уже есть значение ,то будем использовать,а если нету заполненного sex & ratio,то ставим по умолчанию
     //для пола
        if(localStorage.getItem('sex')){
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex','female');
        }
   
    //ratio
        if(localStorage.getItem('ratio')){
            ratio = localStorage.getItem('ratio');
        }else{
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375);
        }

    //функция для ratio(запоминает значение другие после перезагрузки и будет выдавать неправильные значения(фиксим это))
    //инициализация
    function initLocalSettings(selector,activeClass){
      const elements = document.querySelectorAll(selector);
        elements.forEach(elem =>{
        elem.classList.remove(activeClass);
        if(elem.getAttribute('id') === localStorage.getItem('sex')){
            elem.classList.add(activeClass);
        }
        //data-ratio
        if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
         elem.classList.add(activeClass);
        }
        });
    }
    initLocalSettings('#gender div','calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div','calculating__choose-item_active');


    function calcTotal(){
    //проверка,чтобы все поля были заполнены
    if(!sex || !height || !weight || !age || !ratio){
        result.textContent = '____';
        return;
    }   
      if(sex === 'female'){
          //math.round() - округления чисел
          result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height )  - (4.3 * age)) * ratio);
      } else {//male
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
}
calcTotal();

function getStaticInformation(selector,activeClass){
    // const elements = document.querySelectorAll(`${parentSelector} div`);
     const elements = document.querySelectorAll(selector);

        //фиксим баг с подложками(ставим на елементи обработчики события)
        elements.forEach(elem =>{
            //подставляєм функционал
            elem.addEventListener('click',(e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));//запоминаются значение
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }
            // console.log(ratio,sex);
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);
            calcTotal();
        });
    });
}
    getStaticInformation('#gender div','calculating__choose-item_active');//sex id,class
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');//ratio class + class sex
    //функция ддя всех ('инпутов')
    function getDynamicInformation(selector){
        const input = document.querySelector(selector);
        input.addEventListener('input',() =>{
        //2 часть проверка
            if (input.value.match(/\D/g)){//не число
                input.style.border = `1px solid red`;
            }else{
                input.style.border = 'none';//убираем красную обводку
            }
                switch(input.getAttribute('id')){
                //проверка на строку
                case 'height'://если эта строка рост(height)
                    height = +input.value;//то записываем
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;   
        }
        calcTotal();
        });
        
    }
    //вызов функции по id
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function card(){
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH(); 
    }

    changeToUAH() {
        this.price = this.price * this.transfer; 
    }

    render() {
        const element = document.createElement('div');

        if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parent.append(element);
    }
}



(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')//(запрос на меню карточек)
.then(data => {
   data.forEach(({img, altimg, title, descr, price}) => {//деструктуризация
         new MenuCard(img, altimg, title, descr, price, ".menu .container").render();//буду создавать сколько и обьектов в массиве 
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (card);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function forms(formsSelector, modalTimerId) {
    const forms = document.querySelectorAll(formsSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "closeModal": () => /* binding */ closeModal,
/* harmony export */   "openModal": () => /* binding */ openModal
/* harmony export */ });
        function closeModal(modalSelector) {
            const modal = document.querySelector(modalSelector);
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        function openModal(modalSelector, modalTimerId) {
            const modal = document.querySelector(modalSelector);
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            //если есть modalTimerId,то запускаем
            if(modalTimerId){
                clearInterval(modalTimerId);
            }
        
        }


        
function modal(triggerSelector, modalSelector, modalTimerId){//main function
    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click',() => openModal(modalSelector,modalTimerId));
    });

   

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal(modalSelector);
        }
    });

   
    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector,modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, inner}){

    const slides = document.querySelectorAll(slide),//slide
     prev = document.querySelector(prevArrow),
     next = document.querySelector(nextArrow),
     total = document.querySelector(totalCounter),//некст слайд номер 03
     current = document.querySelector(currentCounter),//prev слайд номер04
     slidesWrapper = document.querySelector(wrapper),
     slidesField = document.querySelector(inner),
     width = window.getComputedStyle(slidesWrapper).width,
     slider = document.querySelector(container);

    let slideIndex = 1;//первый слайд
    let offset = 0;
    //total
     if (slides.length < 10 ) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
     } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
     }
    //количество слайдов умножаем на 100%
    slidesField.style.width = 100 * slides.length + '%';//помещаем все слайды у рамку
    slides.forEach(slide => {
        slide.style.width = width;
    });

    //создаємо навигацию для слайдера
    function SlidePoints(){
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1 ].style.opacity = 1;
    }

    slider.style.position = "relative";//елементы будут нормально отображатся
    const indicators = document.createElement('ol'),
    //создаем массив слайдеров (активностей)
         dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);//помещаем наш блок
    
    for(let i = 0; i < slides.length; i++){
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
            opacity: .5;
            transition: opacity .6s ease;       
        `;
        
        if(i == 0){
            dot.style.opacity = 1;//прозрачность первой  ячейки белым цветом(активна)
        }
        indicators.append(dot);
        //массив dots закидуем(пушим) на сайт
        dots.push(dot);
        SlidePoints();
    }

    function deleteNotDigits(str){
        return +str.replace(/\D/g,'');
    }

    //плавность переходов картинок+флекс горизонтально ставим елементы
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.8s all';
    //после того как все елементы стали горизонтально,мы скрываем их
    slidesWrapper.style.overflow = 'hidden';
    
    next.addEventListener('click', () => {//смещения елемента
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
        offset = 0;
        } else {//еслі не на последний слайд
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == slides.length) {//конец слайда
            slideIndex = 1;//переход на первую позицию(слайд)
        } else {//если не дошел до конца 
            slideIndex++;
        }
        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        SlidePoints();
    });

    //пред кнопка(стрелка)
    prev.addEventListener('click',() => {//смещения елемента
        if( offset == 0 ){
            offset = deleteNotDigits(width) * (slides.length - 1);//запис послед слайда(ширина слайда ==количество ширине всех)
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
   
//условия

if (slideIndex == 1) {
    slideIndex = slides.length;
} else {
    slideIndex--;
}

if (slides.length < 10) {
    current.textContent =  `0${slideIndex}`;
} else {
    current.textContent =  slideIndex;
}

    SlidePoints();
 });

    //продолжения навигации слайдера
    dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
    const slideTo = e.target.getAttribute('data-slide-to');

    slideIndex = slideTo;
    offset = deleteNotDigits(width) * (slideTo - 1);//ширина умножаем на slideTo 
    //смещения слайдера
    slidesField.style.transform = `translateX(-${offset}px)`;
    
     //условия
     if (slides.length < 10) {
        current.textContent =  `0${slideIndex}`;
    } else {
        current.textContent =  slideIndex;
    }
      //точки
      SlidePoints();
    });
 });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){

        let tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector),
            tabsParent = document.querySelector(tabsParentSelector);

        function hideTabContent() { 
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });
            tabs.forEach(item => {
                item.classList.remove(activeClass);
            });
        }

        function showTabContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add(activeClass);
        }
        
        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', function(event) {
            const target = event.target;
            if(target && target.classList.contains(tabsSelector.slice(1))) {//удаляем первый символ(у нас там класс (.tabheader__item))
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
            });
		}
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(timerId){
    
    const deadline = '2021-03-30';
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(timerId, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
     
      
     
     
     
     
     
     

     
window.addEventListener('DOMContentLoaded', function() {
     const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 300000);


     (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
     (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]','.modal', modalTimerId);
     (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer');
     (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__.default)({
          container:'.offer__slider',
          slide: '.offer__slide',
          nextArrow: '.offer__slider-next',
          prevArrow: '.offer__slider-prev',
          totalCounter: '#total',
          currentCounter: '#current',
          wrapper: '.offer__slider-wrapper',
          inner:'.offer__slider-inner',

     });
     (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form', modalTimerId);
     (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__.default)();
     (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();     

});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => /* binding */ getResource,
/* harmony export */   "postData": () => /* binding */ postData
/* harmony export */ });
const postData = async (url, data )=>{
    const res = await fetch(url,{//запрос на сервер
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
       body: data
    });
    return await res.json();//возращаєм промис(возращає в обичний об'єкт)
};

  async function getResource (url){//get запрос(функція)
    let res = await fetch(url);//запрос на сервер
    if(!res.ok){
       throw new Error (`Could not fetch ${url},status:${res.status} `);//
    }
    return await res.json();//возращаєм промис(возращає в обичний об'єкт)
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
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map