window.addEventListener('DOMContentLoaded', function() {
    $("body").queryLoader2({
      backgroundColor:"#fff",
      barColor:"#15AD9E",
      completeAnimation:"grow",
      percentage:true,
      barHeight:10
    });
});

$(document).ready( function () {

    $('textarea').autosize();

    var window_width = $(window).width();
    var window_height = $(window).height() ;
    var width_page = $(document).width();

    $('#subheader').css('height', window_height - 88);

    // ARROW TO TOP///////////////////////////////
    var window_height = $(window).innerHeight();

      //scroll to the top icon////////////////////////
      var to_top_icon = $('#top');
      $(to_top_icon).hide();
      $(window).scroll(function(){
      if ($(this).scrollTop() > 75 ) {
      to_top_icon.fadeIn();
      } else {
      to_top_icon.fadeOut();
      }
    });
    
    var originalWidth = $(document).width();
    if(originalWidth <= 750) {
        $('#menu-filter').addClass('mobile');
    }
     
    $(window).resize(function() {
        var originalWidth = $(document).width();
       if(originalWidth <= 750) {
           $('#menu-filter').addClass('mobile').hide();

       } else {
           $('#menu-filter').removeClass('mobile').show();
       }
    });

  

    $('#select').click(function() {
        $('.mobile').toggle();
    });

    $('.filter').click(function() {
       var title = $(this).text();
       $('#select').text(title); 
       $('.mobile').toggle();
    });


  // adds mobile browser class to html tag

  var ua = navigator.userAgent.toLowerCase();
    function removeSpaces(ua) {
      return ua.split(' ').join('');
    }
  ua = removeSpaces(ua);
  var iOS = ua.match(/(iphone|ipod|ipad)/);
    if(iOS) {
      $('html').addClass('iOS');
    }

  // MAGNIFIC POPUP////////////////////////////////////

  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function(item) {
        return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
      }
    }
  });

  $('.popup-youtube, .popup-vimeo').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: true
  })

  // HEADER DROP-DOWN MENU /////////////////////////////

  $('header nav span').click(function(){
    $(this).toggleClass('active').next().toggleClass('active');
  });

  $('header nav ul li a').click(function(e){
    e.preventDefault();
    $(this).parent().parent().removeClass('active').prev().removeClass('active');
  })


  //SCROLL PAGE////////////////////////////////////////
  
  var top_ofset = $('header').height() - 0 ;
  
  //scroll page on click header links//////////////////

  $('header li a, #top ,#subheader a ,#about a ,#clients a ,#team a').smoothScroll({
    offset: - top_ofset,
    // one of 'top' or 'left'
    direction: 'top',
    // only use if you want to override default behavior
    scrollTarget: null,
    // fn(opts) function to be called before scrolling occurs.
    // `this` is the element(s) being scrolled
    beforeScroll: function() {},
    // fn(opts) function to be called after scrolling occurs.
    // `this` is the triggering element
    afterScroll: function() {},
    easing: 'swing',
    speed: 400,
    // coefficient for "auto" speed
    autoCoefficent: 2,
    // $.fn.smoothScroll only: whether to prevent the default click action
    preventDefault: true      
  });

  // LINK DISABLE///////////////////////////////////

  $('#about ul li a,#service ul li a').click(function(e){
  e.preventDefault();
  });


  // HIDE MAP///////////////////////////////////////

  $('#contact .show-map').click(function(){
    if ($(this).parent().hasClass("active")) {
        $(this).text("Hide Map")
        $(this).parent().removeClass('active');
    }
    else {
        $(this).text("Show Map")        
        $(this).parent().addClass('active');
    }
  });

  // IN-VIEW///////////////////////////////////////////
	
  $('#about').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) { 
      $(this).addClass('active');
    }
  }); 

  $('#subheader, #write').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        $(this).addClass('active').delay(2400).queue(function(){
            $(this).addClass('active1');
        });
      }
      
  });

  // SLIDER1//////////////////////////////////////////

  $("#owl1").owlCarousel({
 
    autoPlay: 1000000, //Set AutoPlay to 3 seconds
     
    items : 1,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,3],
    navigation : true
     
  });
	
	 $('#contact').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) { 

        var styles = [ { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] },{ "featureType": "landscape", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#d9d9d9" } ] },{ "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#d9d9d9" } ] },{ "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#ffffff" } ] },{ "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] },{ "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#1d282d" } ] },{ "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#15ad9e" } ] },{ } ];

            var styledMap = new google.maps.StyledMapType(styles,
              {name: "Styled Map"});

            var mapOptions = {
              zoom: 15,
              center: new google.maps.LatLng(40.737863,  -73.988368),
              scrollwheel: false,

              // disable mapType-top_right corner
              mapTypeControl: true,
              disableDefaultUI: false, 

              mapTypeControlOptions: { 
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map-canvas']
              }
            };

              var map = new google.maps.Map(document.getElementById('map-canvas'),
              mapOptions);

              var marker1 = new google.maps.Marker({
                  position: new google.maps.LatLng(40.737863,  -73.988368),
                  map: map,
                  icon: 'images/pin1.png' // This path is the custom pin to be shown. Remove this line and the proceeding comma to use default pin
              });



          map.mapTypes.set('map-canvas', styledMap);
          map.setMapTypeId('map-canvas');    

      }
    }); 

  // SLIDER2///////////////////////////////////////////

  var owl = $("#owl2");
 
    owl.owlCarousel({
    itemsCustom : [
    [0, 1],
    [450, 2],
    [600, 2],
    [700, 3],
    [1000, 4],
    [1200, 4],
    [1400, 4],
    [1600, 4]
    ],
    navigation : true
     
  });


  // MAP///////////////////////////////////////////////

  $('#contact').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) { 

        var styles = [ { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] },{ "featureType": "landscape", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#d9d9d9" } ] },{ "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#d9d9d9" } ] },{ "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#ffffff" } ] },{ "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] },{ "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#1d282d" } ] },{ "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#15ad9e" } ] },{ } ];

            var styledMap = new google.maps.StyledMapType(styles,
              {name: "Styled Map"});

            var mapOptions = {
              zoom: 15,
              center: new google.maps.LatLng(40.737863,  -73.988368),
              scrollwheel: false,

              // disable mapType-top_right corner
              mapTypeControl: true,
              disableDefaultUI: false, 

              mapTypeControlOptions: { 
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map-canvas']
              }
            };

              var map = new google.maps.Map(document.getElementById('map-canvas'),
              mapOptions);

              var marker1 = new google.maps.Marker({
                  position: new google.maps.LatLng(40.737863,  -73.988368),
                  map: map,
                  icon: 'images/pin1.png' // This path is the custom pin to be shown. Remove this line and the proceeding comma to use default pin
              });



          map.mapTypes.set('map-canvas', styledMap);
          map.setMapTypeId('map-canvas');    

      }
    }); 



  //FILTER///////////////////////////////////////


  $('#grid').mixitup({
    targetSelector: '.mix',
    filterSelector: '.filter',
    sortSelector: '.sort',
    buttonEvent: 'click',
    effects: ['fade','scale ',' blur','grayscale'],
    listEffects: null,
    easing: 'windup',
    layoutMode: 'grid',
    targetDisplayGrid: 'inline-block',
    targetDisplayList: 'block',
    gridClass: '',
    listClass: '',
    transitionSpeed: 600,
    showOnLoad: 'all',
    sortOnLoad: false,
    multiFilter: false,
    filterLogic: 'or',
    resizeContainer: true,
    minHeight: 0,
    failClass: 'fail',
    perspectiveDistance: '3000',
    perspectiveOrigin: '50% 50%',
    animateGridList: true,
    onMixLoad: null,
    onMixStart: null,
    onMixEnd: null
  });

  
});


