
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('header__burger_active');
    menu.classList.toggle('menu_active');
    document.body.classList.toggle('locked');
});

const sliderBody = document.querySelector('.slider__body');
const dots = document.querySelectorAll('.slider__dots span');

let position = 0;
let prevTranslate = 0;;

console.log(dots);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        dots[position].classList.remove('active');
        dot.classList.add('active');
        if (position < index) {
            prevTranslate += parseInt(sliderBody.offsetWidth) * (position - index);
            sliderBody.style.transform = `translateX(${prevTranslate}px)`;
        }
        else {
            prevTranslate -= parseInt(sliderBody.offsetWidth) * (index - position);
            sliderBody.style.transform = `translateX(${prevTranslate}px)`;
        }

        position = index;
    });
});

