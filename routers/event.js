var xssDefender = require('../supplies/xss-defender.js');

module.exports=function(app, models){
    app.get('/event_list', function (req, res) {
        models.Event.findEnabledEvents(function (err, events) {
            if (err) {
                res.status(500);
                res.render('500', {title: '500: Internal Server Error', error: error});
            }else {
                res.render('event_list', {
                    title: 'Event list',
                    events:events
                });
            }
        });
    });

    app.get('/event', function (req, res) {
        res.render('event', {
            title: 'Event'
        });
    });

    app.get('/admin/event_editor', function (req, res) {
        res.render('admin/editor', {
            title: 'Event list'
        });
    });

    app.post('/admin/new_event', function (req, res) {
        var content = req.body.content;
        var title = req.body.title;
        //Jade supplies a facility against XSS
        //var escapedContent = xssDefender.escape(content);
        var escapedContent = content;
        //var escapedTitle = xssDefender.delete(title);
        var escapedTitle = title;
        var parsedTime = Date.parse(req.body.time);

        models.Event.createEvent({
            title:escapedTitle,
            time:parsedTime,
            address:req.body.address,
            frequency:req.body.frequency,
            memberLimit:req.body.memberLimit,
            content:escapedContent
        }, function(err){
            if(err) {
                res.send(500);
            }else {
                res.send(200);
            }
        });
    });
};
