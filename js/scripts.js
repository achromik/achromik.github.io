var target = location.hash,
    target = target.replace('#', ''),
    offset = $('nav').outerHeight();

(function () {
    var win = $('html, body');

    if (target) {
        $(win).animate({
            // scrollTop: $("#" + target).offset().top 
            scrollTop: $("#" + target).offset().top - offset
        }, 700, 'swing', function () {
            waypoints();
        });
    } else {
        waypoints();
    }

    //collapse menu bar if click on menu item
    $('nav').on('click','.navbar-collapse.show', function(event) {
        console.log(event.target);
        if(  $(event.target).is('a') ) {
            $(this).collapse('hide');
        }
    });

    //Smooth scroll on menu click
    $('.nav-item .nav-link[href^="#"]').each(function () {
        var target = $($(this).attr('href'));

        

        $(this).click(function () {
            timeout = setTimeout(function() {
                $('.navbar-collapse.show').collapse('hide');
            },800);
            win.stop().animate({ scrollTop: target.offset().top - offset }, 600);
            return false;
        });
    });


})();


function waypoints() {

    //Setup
    var lastId,
        // topMenu = $("#navigation"),
        menuItems = $("#navigation").find("a.nav-link"),
        scrollItems = menuItems.map(function (index, val) {
            var itemHref = $(val).attr("href");
            if (itemHref.substring(0, 1) === "#") {
                var item = $(itemHref);
                if (item.length) {
                    return item;
                }
            }
        });

    //remove space from name in section 'header'
    var $pageName = $('.page-name');
    $pageName.map(function (item, value) {
        value.firstChild.textContent = value.firstChild.textContent.trim();
    });

    //Do magic on scroll
    $(window).on('scroll', function () {

        changeMenuVisibility();

        // Get container scroll position
        var fromTop = $(this).scrollTop() + offset;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top <= fromTop + 1)
                return this;
        });

        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            $('#navigation li').removeClass('active');
            $('#navigation li a[href="#' + id + '"]').parent().addClass('active');

            //change url
            if (history.pushState) {
                history.pushState(null, null, '#' + id);
            }
        }
    });
}

function changeMenuVisibility() {
    var $navbarBrand = $('.navbar-brand');
    if ($(window).scrollTop() > $(window).height() - 2 * offset) {
        $('.bg').addClass('visible');
        $navbarBrand.addClass('visible');
    } else {
        $navbarBrand.removeClass('visible');
        $('.bg').removeClass('visible');
    }
}

function handleFormSubmit() {

    emailjs.init("user_6VSJRTVkfpALXvVSH1C32");

    $('#contact_form').on('submit', function (event) {
        event.preventDefault();
        var $special = $('.special')[0].value.length;
        var $button = $('#form_submit')[0];
        $button.innerHTML = '<i class="fa fa-spinner fa-spin fa-fw"></i> Wysyłam';

        //check if not a bot that can make spam
        //if hidden input has got value than it is bot. Human can't see a hidden input
        if ($special > 0) {
            $('#contact_form')[0].reset();
        } else {
            emailjs.sendForm("achromik.com", "portfolio_form", "contact_form")
                .then(function (response) {
                    console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
                    $('#contact_form')[0].reset();
                    $button.innerHTML = "Wysłano!";
                }, function (err) {
                    $('#form_submit').removeClass('btn-success').addClass('btn-danger');
                    $button.innerHTML = '<i class="fa fa-exclamation" aria-hidden="true"></i> Error <i class="fa fa-exclamation" aria-hidden="true"></i>';
                    console.log("FAILED. error=", err);
                });
        }
    });

}



(function () {
    changeMenuVisibility();



    // $(window).scroll(function () {
    //     changeMenuVisibility();
    // });






})();