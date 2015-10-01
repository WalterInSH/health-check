module.exports = function (app, mongoose) {
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

    var CheckerSchema = new Schema({
        checker_id: {type: ObjectId},
        title: {type: String, required: true},
        time: {type: Date, required: true},
        address: {type: String, required: true},
        frequency: {type: String, enum: ['one-time','weekly','biweekly'], required: true},
        memberLimit: {type: Number, max:10000, required: false},
        content: {type: String, required: true},
        create_date: {type: Date, default: Date.now, required: true}
    });

    var Checker = mongoose.model('Checker', CheckerSchema);

    var createChecker = function(checker,callback){
        console.log('Creating checker ' + checker.title);
        var new_checker = new Checker(checker);

        new_checker.save(function(err){
            callback(err);
        });
    };

    var findEnabledCheckers = function(callback){
        Checker.find({'time':{$gt:new Date()}}).exec(callback);
    };

    return {
        createChecker:createChecker,
        findEnabledCheckers:findEnabledCheckers
    }
};
