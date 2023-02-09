const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close');
hamburger.addEventListener('click', () => {
    menu.classList.add('active');
    document.body.style.overflow = 'hidden';
});
closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
    document.body.style.overflow = '';
});

const counters = document.querySelectorAll('.skills__graph-title span'),
    lines = document.querySelectorAll('.skills__graph-line span');
counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});

 //smooth scroll and pageup
 $(window).scroll(function() {
    if ($(this).scrollTop() > 1000) {
      $('.pageup').fadeIn()
    } else {
      $('.pageup').fadeOut()
    }
  });

  $("a[href^='#']").click(function() {
    const _href=$(this).attr('href');
    $('html, body').animate({scrollTop: $(_href).offset().top+'px'});
    return false;
  });