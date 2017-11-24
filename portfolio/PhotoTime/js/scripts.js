$(function () {

// ******************* COLAPSING MENUBAR **************** */


    //collapse menu bar if click on menu item
    $(document).on('click','.navbar-collapse.in', function(event) {
        if( $(event.target).is('a') ) {
            $(this).collapse('hide');
        }
    });


//******************** SLIDING MENU BAR on scroll ****************** */

    //show or hide nav bar if scroll page
    var lastScrollTop = 0;
    $(window).on('scroll', function(event) {
        var st = $(this).scrollTop();
        
        //seting background color of navbar related to scroll from top and to screen width
        //viewport is 798px or more
        if ($(this).width() > 797) {
            //set backgroud-color of navbar when scroll is more than 250px from top
            if ($(this).scrollTop() > 250) {
                $('.navbar-nav').css({'background-color': 'rgba(0, 0, 0, .6'});
            //set transparent background if scroll is less than 250px    
            } else {
                $('.navbar-nav').css({'background-color': 'rgba(0, 0, 0, 0'});
            }
        //viewport on small screens
        } else {

            $('.navbar-nav').css({'background-color': 'rgba(0, 0, 0, .6'});            
            if ($(this).scrollTop() > 50) {
                $('.navbar-header').css({'background-color': 'rgba(0, 0, 0, .6'});
            } else {
                $('.navbar-header').css({'background-color': 'rgba(0, 0, 0, 0'});
            }
        }

        //hide navbar when downscroll is more than 25px
        if (st - lastScrollTop > 25 ){
            $('.navbar-nav').slideUp(400);
            $('.navbar-header').slideUp(400);
            $('.navbar-collapse.in').collapse('hide');
            lastScrollTop = st;
        //show navbar when upscroll is more than 25px    
        } else if (st - lastScrollTop < -25 ){
            
            $('.navbar-nav').slideDown(400);
            $('.navbar-header').slideDown(400);
            lastScrollTop = st;
        }
    }); 

    
// ********************** SMOOTH SCROLL *************************

    $("a").on('click', function(event) {

        //duration of the top scrolling animation (in ms)
        var scroll_duration = $(document).height() /2.5;

        

        // Make sure this.hash has a value before overriding default behavior
        if ((this.hash !== "") && (this.hash !== "#slider-comunity")) {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (1200) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, scroll_duration, function(){
        
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });



// **************** SLIDER ***************************************

    var CONST = Object.freeze({
        CAROUSEL_INTERVAL: 0,
        CAROUSEL_MOVE_TIME: 700,
        CAROUSEL_IMAGE_WIDTH: 261,
        CAROUSEL_FORWARD : 1, 
    });
  
    //initialize carousel 
    var sliderInterval,
        $carouselList = $('#js-carousel ul'),
        //default rotation forward
        carouselDirection = CONST.CAROUSEL_FORWARD,
        //get first and last image 
        $firstItem = $carouselList.find('li:first'),
        $lastItem = $carouselList.find('li:last');
    

    //add to each list item attrbute 'item' whit index of position in list (first is 0)
    $carouselList.children('li').each(function(index,elements) {
        $(this).attr('item', index);
    });

    //set last image before first and set left margin to value of image width
    $firstItem.before($lastItem);
    $carouselList.css({marginLeft: -CONST.CAROUSEL_IMAGE_WIDTH});


    //previous slide 
    $('#js-left').on('click', function() {  
        rotateCarousel(!CONST.CAROUSEL_FORWARD);
    });

    //next slide
    $('#js-right').on('click', function() {  
        rotateCarousel(CONST.CAROUSEL_FORWARD);
    });


    function rotateCarousel(dir, time) { 
        var direction,
            moveTime;
        if (dir !== undefined ) {
            direction = dir;
        } else {
            direction = carouselDirection;
        }
        /*jshint -W030 */
        time !== undefined  ? moveTime = time : moveTime = CONST.CAROUSEL_MOVE_TIME;

        if (direction ) { 
            $carouselList.animate({'marginLeft': -2*CONST.CAROUSEL_IMAGE_WIDTH}, moveTime, moveForwardSlide);
        } else {
            $carouselList.animate({'marginLeft': 0 }, moveTime, moveBackwardSlide);
        }

    }


    function moveForwardSlide() {
        var $firstItem = $carouselList.find('li:first'),
            $lastItem = $carouselList.find('li:last'),

            //get current image index wich is second in table of list item (because last id is before first - it's prepare to backward rotation )
            $currentItem = $carouselList.find('li:nth-child(2)').attr('item'); 
    
        //set first item after last    
        $lastItem.after($firstItem);

        //get id of current displayed item
        $currentItem = $carouselList.find('li:nth-child(2)').attr('item');

        //update Counter of items
        updateCounter($currentItem);

        $carouselList.css({marginLeft:-CONST.CAROUSEL_IMAGE_WIDTH});
    }


    function moveBackwardSlide() {
        var $firstItem = $carouselList.find('li:first'),
            $lastItem = $carouselList.find('li:last'),
            $currentItem = $carouselList.find('li:nth-child(2)').attr('item');
        
        $firstItem.before($lastItem);
        
        $currentItem = $carouselList.find('li:nth-child(2)').attr('item');
        
        updateCounter($currentItem);
    
        $carouselList.css({marginLeft:-CONST.CAROUSEL_IMAGE_WIDTH});
    }

    function updateCounter(item) {
    var $counter = $('#js-counter');
        $carouselListItems = $('#js-carousel > ul > li');
        
    item++;
    $counter.text('0' + item + '/0' + $carouselListItems.length ); 

    }
  
}); 