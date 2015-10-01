module.exports=function(app, models){
    app.get('/checker-list', function (req, res) {
        models.Checker.findCheckers(function (err, checkers) {
            if (err) {
                res.status(500);
                res.render('500', {title: '500: Internal Server Error', error: error});
            }else {
                res.render('checker-list', {
                    title: 'Checker list',
                    checkers:checkers
                });
            }
        });
    });

    app.get('/checker', function (req, res) {
        res.render('checker', {
            title: 'Checker'
        });
    });

    app.get('/checker-editor', function (req, res) {
        res.render('checker-editor', {
            title: 'Checker Editor'
        });
    });

    app.post('/new-checker', function (req, res) {
        models.Checker.createChecker({
            title:req.body.title,
            frequency:req.body.frequency,
            url:req.body.url
        }, function(err){
            if(err) {
                res.send(500);
            }else {
                res.send(200);
            }
        });
    });
};
