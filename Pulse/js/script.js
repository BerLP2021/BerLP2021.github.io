

//slick-slider
$(document).ready(function(){
    $('.carousel__inner').slick({
        autoplay: true,
        autoplaySpeed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
        speed: 300,
        dots: false,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                dots: true,
                arrows: false
              }
            }]
    });
//tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
  
    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function (e){
          e.preventDefault();
          $('.catalog-item__facial').eq(i).toggleClass('catalog-item__facial_active');
          $('.catalog-item__back').eq(i).toggleClass('catalog-item__back_active');
        })
      })
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back-link');
  
  //Modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #callme').fadeIn(300); 
  });
  $('.modal__close').on('click', function() {
    $('.overlay, #callme, #order, #thanks').fadeOut(300);
    $('form').trigger('reset');
  });

  $('.button_buy').each(function(i){
    $(this).on('click', function(){
      $('#order .modal__subtitle').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn(300); 
    });
  });

//Validation
  function govno(Nform) {
    $(Nform).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Введите Ваше имя",
          minlength: jQuery.validator.format("Минимальное количество букв - {0}")
        },
        phone: "Введите ваш номер телефона",
        email: {
          required: "Введите Ваш email, чтобы мы смогли связаться с вами",
          email: "Ваш email должен быть в формате name@domain.com"
        }
      }
    });
  };

  govno('#form_callme');
  govno('#form_order');
  govno('#consul');

  $('input[name=phone]').mask("+38 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input, textarea").val("");
      $('#callme, #order').fadeOut();
      $('.overlay, #thanks').fadeIn(300);
      $('form').trigger('reset');
    });
    return false;
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

  new WOW().init();
});
