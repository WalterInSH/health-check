module.exports = function (app, models) {
    app.get('/register', function (req, res) {
        res.render('register', {
            title: 'Register'
        });
    });

    app.post('/register', function (req, res) {
        var name = req.body.name,
            mobilePhone = req.body.mobilePhone,
            passwordMd5 = req.body.passwordMd5;

        models.User.registerUser(name, mobilePhone, passwordMd5,function(err){
            if (err && err.name === 'MongoError' && (err.code === 11000 || err.code === 11001)) {
                res.send(409)
            }else if (err) {
                throw err;
            }else {
                res.send(200);
            }
        });
    });

    app.get('/login', function (req, res) {
        res.render('login', {
            title: 'Login'
        });
    });

    app.post('/login', function (req, res) {
        var mobilePhone = req.body.mobilePhone,
            passwordMd5 = req.body.passwordMd5;

        models.User.login(mobilePhone, passwordMd5, function(user){
            if (passwordMd5 == user.passwordMd5) {
                req.session.loggedIn = true;
                req.session.onlineUser = user;
                res.send(200);
            }else {
                res.send(401);
            }
        });
    });
};