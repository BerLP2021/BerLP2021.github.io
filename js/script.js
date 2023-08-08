const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close'),
      scrollMargin = getScrollWidth();
hamburger.addEventListener('click', () => {
    menu.classList.add('active');
    document.body.style.marginRight = `${scrollMargin}px`;
    document.body.style.overflow = 'hidden';
});
closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
    document.body.style.marginRight = '';
    document.body.style.overflow = '';
});

const counters = document.querySelectorAll('.skills__graph-title span'),
    lines = document.querySelectorAll('.skills__graph-line span');
counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});

const upArrow = document.querySelector('.pageup');
window.addEventListener('scroll', function(){
    
    if(document.documentElement.scrollTop >= 800 ) {
        upArrow.classList.add('animated', 'fadeIn');
        upArrow.classList.remove('fadeOut');
    } else {
        upArrow.classList.add('fadeOut');
        upArrow.classList.remove('fadeIn');
    }
});

function getScrollWidth() {
  const div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';
  document.body.append(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
};