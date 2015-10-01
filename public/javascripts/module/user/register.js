$('#register_btn').click(function(){
    var valid = true;
    var username = $('#username').val();
    if (username.length == 0) {
        $('#username').addClass('invalid');
        valid = false;
    }

    var phone = $('#m_phone').val();
    if (phone.length != 11 || !phone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
        $('#m_phone').addClass('invalid');
        valid = false;
    }

    var password = $('#password').val();
    if (password.length < 6 || password.length > 16) {
        $('#password').addClass('invalid');
        valid = false;
    }

    var param = {
        name:username,
        mobilePhone:phone,
        passwordMd5:$.md5(password)
    }

    if (!valid) {
        //TODO waiting for materialize fixes error message width issue
        //See:https://github.com/Dogfalo/materialize/issues/1690
        return;
    }else {
        $.post('/register', param).done(function(data){
            console.log("su")
        }).error(function(data){
            if(data.status == 409){
                $('#username').addClass('invalid');
            }
        });

    }
});