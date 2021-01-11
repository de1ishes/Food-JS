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

export default slider;