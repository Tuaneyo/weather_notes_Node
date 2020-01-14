// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

$(document).ready(function(){
    new WOW().init();
    $(document).on('click', '.delete-a',function(e){
         e.preventDefault();
         var href = $(this).attr('href');
         console.log(href);
         $('#delete-form').attr("action", href)
    });

    var msg = $('#messages');
    if(msg.length){
        fadeInLeft('.message-wrap', true);
    }

    $(document).on('click', '#navbar-ham',function(){
        fadeInLeft('.fixed-modal', false);
    });

    function fadeInLeft(element,  vanish)
    {
        $(element).css({"right": '0', "transition": "all .7s"})
        if(vanish){
            setTimeout(function(){
                $(element).fadeOut('slow');
            }, 5000);
        }
    }

    // responsesive navigation
    $(window).scroll(function(){
        $('#navbar-ham').addClass('navbar-response');
        if($(window).scrollTop() == 0){
            $('#navbar-ham').removeClass('navbar-response');
        }
        $('#add-btn').addClass('animated bounce slower')
    });

    // file upload show html filenam


    $('#my-file').change(function() {
        var filename = $('#my-file').val().replace("C:\\fakepath\\", "");
        console.log(filename);
        $("#my-filename").attr("placeholder",  filename);
    });

    $(document).on('click', '.toggle-nav',function(e){
        var stringsArr = ['forum', 'info', 'account', 'logout'];
        var iconsArr = ['<i class="fas fa-comments"></i>','<i class="fas fa-info"></i>','<i class="fas fa-cog"></i>','<i class="fas fa-power-off"></i>'];
        if ($('#toggle-input').is(':checked')){
            // toggle on
            $( ".toggle-text" ).each(function(k,v){
                $(this).html(iconsArr[k])
            });
        }else{
            // toggle off
            $( ".toggle-text" ).each(function(k,v){
                $(this).html('<small>'+ stringsArr[k] +'</small>')
            });
        }

    });




});

