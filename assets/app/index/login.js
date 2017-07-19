$(function () {
    $('.button-checkbox').each(function () {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>');
            }
        }
        init();
    });

    $(window).on('scroll', function() {
        var y_scroll_pos = window.pageYOffset;
        var scroll_pos_test = $('#intro-session').offset().top;
        if(y_scroll_pos > scroll_pos_test) {
            $('#navbar-login').show();
            $('#intro-session').css('padding-top','120px');
        }else{
            $('#navbar-login').hide();
            $('#intro-session').css('padding-top','0px');
        }
    });

    $('.change-to-register').click(function(){
        $('.register-panel').removeClass('animated');
        $('.register-panel').removeClass('fadeInLeft');
        $('.register-panel').removeClass('fadeInRight');
        $('.login-panel').hide();
        $('.register-panel').show();
        $('.register-panel').addClass('animated');
        $('.register-panel').addClass('fadeInLeft');
        $('html, body').animate({
            scrollTop: $(".register-panel").offset().top
        }, 2000);
    })
    $('.change-to-login').click(function(){
        $('.register-panel').removeClass('animated');
        $('.register-panel').removeClass('fadeInLeft');
        $('.register-panel').removeClass('fadeInRight');
        $('.register-panel').hide();
        $('.login-panel').show();
        $('.login-panel').addClass('animated');
        $('.login-panel').addClass('fadeInRight');
        $('html, body').animate({
            scrollTop: $(".login-panel").offset().top
        }, 2000);
    })
});
$( document ).ready( function () {
    if($.url().param('register_message')){
        $('.login-panel').hide();
        $('.register-panel').show();
        if($.url().param('register_message') == 'emailexit'){
            $('#email').val($.url().param('email'));
            $('#displayName').val($.url().param('displayname'));
            utils.alert({
                title:'Thong bao',
                msg: 'Email da ton tai'
            })
        }
    }
    if($.url().param('login_message')){
        $('.login-panel').show();
        $('.register-panel').hide();
        $('#login_email').val($.url().param('email'));
        $('#login_password').val('');
        if($.url().param('login_message') == 'email_not_found'){
            utils.alert({
                title:'Thong bao',
                msg: 'Email khong ton tai'
            })
        }
        if($.url().param('login_message') == 'account_not_active'){
            utils.confirm({
                title:'Thong bao',
                msg: 'Tai khoan chua duoc kich hoat',
                okText:'Gui lai link kick hoat',
                callback:function(){
                    $('#active_send_modal').modal('show');
                }
            })
        }
        if($.url().param('login_message') == 'password_not_correct'){
            utils.alert({
                title:'Thong bao',
                msg: 'Sai mat khau'
            })
        }
    }

    jQuery.validator.addMethod("isEmail", function(value, element){
            var x = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            console.log('sa')
            if (x.test(value)) {
                return true;  // FAIL validation when REGEX matches
            } else {
                return false;   // PASS validation otherwise
            };
    }, ""); 

    jQuery.validator.addMethod("twoSpace", function(value, element){
        if (/\s\s+/.test(value)) {
            return false;  // FAIL validation when REGEX matches
        } else {
            return true;   // PASS validation otherwise
        };
    }, ""); 
    $( "#signupForm" ).validate( {
        rules: {
            email: {
                required: true,
                minlength: 5,
                maxlength:45,
                isEmail: true
            },
            displayName: {
                required: true,
                minlength: 2,
                maxlength:45,
                twoSpace: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength:18
            },
            password_confirmation: {
                required: true,
                minlength: 6,
                maxlength:18,
                equalTo: "#password"
            },
            agree: {
                required: true
            }
        },
        messages: {
            email: {
                required: "Please enter a email",
                minlength: "Your email must consist of at least 5 characters",
                maxlength: "Your email must consist of at most 45 characters",
                isEmail: "Your email must be email"
            },
            displayName: {
                required: "Please provide a display name",
                minlength: "Your display name must be at least 2 characters long",
                maxlength: "Your display name must consist of at most 45 characters",
                twoSpace: "Your display name have 2 consecutive spaces"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long",
                maxlength: "Your password must consist of at most 18 characters"

            },
            password_confirmation: {
                required: "Please provide a password",
                minlength: "Your password confirm must be at least 6 characters long",
                maxlength: "Your password confirm must consist of at most 18 characters",
                equalTo: "Please enter the same password as above"
            },
            agree: {
                required: "Please accept our Terms and Conditions"
            }
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
            error.addClass( "help-block" );

            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
        },
        unhighlight: function (element, errorClass, validClass) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
        }
    } );
    
    $("#active_send_btn").click(function(){
        var email = $('#active_email').val().trim();
        var password = $('#active_password').val().trim();
        $.post("/user/reverify",{email:email, password:password}, function(data, status){
            //console.log(data)
            switch(data.message) {
                case 'email_not_found':
                    utils.alert({
                        title:'Thong bao',
                        msg: 'Email khong ton tai. Chung toi khong the gui lai ma kich hoat cho ban'
                    })
                    break;
                case 'password_not_correct':
                    utils.alert({
                        title:'Thong bao',
                        msg: 'Sai mat khau. Chung toi khong the gui lai ma kich hoat cho ban'
                    })
                    break;
                case 'email_actived':
                    utils.alert({
                        title:'Thong bao',
                        msg: 'Tai khoan da duoc kich hoat. Chung toi khong the gui lai ma kich hoat cho ban'
                    })
                    break;
                case 'have_error':
                    utils.alert({
                        title:'Thong bao',
                        msg: 'Co loi gi do xay ra. Chung toi khong the gui lai ma kich hoat cho ban'
                    })
                    break;
                case 'success':
                    utils.alert({
                        title:'Thong bao',
                        msg: 'Chung toi da gui lai ma kich hoat cho ban.Vui long check mail'
                    })
                    break;
            }
        });
    });
    $("#forgot_send_btn").click(function(){
        var email = $('#forgot_password_email').val().trim();
        $.post("/user/forgot",{email:email}, function(data, status){
            switch(data.message) {
                case 'email_not_found':
                    utils.alert({
                        title:'Thong bao',
                        msg: 'Email khong ton tai. Chung toi khong the gui link doi mat khau cho ban'
                    })
                    break;
                case 'have_error':
                    utils.alert({
                        title:'Thong bao',
                        msg: 'Co loi gi do xay ra. Chung toi khong the gui link doi mat khau cho ban'
                    })
                    break;
                case 'success':
                    utils.alert({
                        title:'Thong bao',
                        msg: 'Chung toi da gui 1 link doi mat khau.Vui long check mail'
                    })
                    break;
            }
        });
    });
} );