// $(function () {
//     console.log($('.welcome_name'));

// });

(function () {

    //handle form submit
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
})();