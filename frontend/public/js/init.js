$(function () {
  $('.iso-box-wrapper').imagesLoaded(function () {
    var $container = $('.iso-box-wrapper');
    $container.isotope({
      layoutMode: 'fitRows',
      itemSelector: '.iso-box',
    });

    $('.filter-wrapper li a').click(function () {
      var filterValue = $(this).attr('data-filter');
      $container.isotope({ filter: filterValue });
      $('.filter-wrapper li a').removeClass('selected');
      $(this).addClass('selected');
      return false;
    });
  });

  $('.iso-box-wrapper').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: { enabled: true },
  });

  $('.tm-current-year').text(new Date().getFullYear());
});