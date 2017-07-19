$(function () {
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
            utils.alert({
                title:'Thong bao',
                msg: 'Tai khoan chua duoc kich hoat'
            })
        }
        if($.url().param('login_message') == 'password_not_correct'){
            utils.alert({
                title:'Thong bao',
                msg: 'Sai mat khau'
            })
        }
    }

    $( "#change_pass_form" ).validate( {
        rules: {
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
            }
        },
        messages: {
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
    $("#save_pass_btn").click(function(){
        if(!$( "#change_pass_form" ).valid()) return;
        console.log('validate')
        var password = $('#password').val().trim();
        var code = $.url().param('code');
        $.post("/user/changepassword",{password:password, code: code}, function(data, status){
            switch(data.message) {
                case 'email_not_found':
                    utils.alert({
                        title:'Thong bao',
                        msg: 'Co loi gi do xay ra. Doi mat khau khong thanh cong'
                    })
                    break;
                case 'have_error':
                    utils.alert({
                        title:'Thong bao',
                        msg: 'Co loi gi do xay ra. Doi mat khau khong thanh cong'
                    })
                    break;
                case 'success':
                    utils.alert({
                        title:'Thong bao',
                        msg: 'Doi mat khau thanh cong',
                        callback: function(){
                            window.location = window.location.origin;
                        },
                        callbackClose:function(){
                            window.location = window.location.origin;
                        }
                    })
                    break;
            }
        });
    });
} );