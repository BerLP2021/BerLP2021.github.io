new WOW().init();
const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      overlay = document.querySelector('.menu__overlay');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

menu.addEventListener('click', (e) => {
    if(e.target === overlay || 
        e.target.closest('.menu__close') ||
        e.target.closest('.menu__link') ||
        e.target.closest('.menu__social-link')) {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
});

const upArrow = document.querySelector('.pageup');

window.addEventListener('scroll', function(){
    
    if(document.documentElement.scrollTop >= 800 ) {
        upArrow.classList.add('animate__animated', 'animate__fadeIn');
        upArrow.classList.remove('animate__fadeOut');
    } else {
        upArrow.classList.add('animate__fadeOut');
        upArrow.classList.remove('animate__fadeIn');
    }
});