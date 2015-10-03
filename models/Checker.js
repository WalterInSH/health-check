module.exports = function (app, mongoose) {
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

    var CheckerSchema = new Schema({
        checker_id: {type: ObjectId},
        title: {type: String, required: true},
        frequency: {type: String, enum: ['one-min','five-min','fifteen-min','one-hour'], required: true},
        url: {type: String, required: true},
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

    var findCheckers = function(callback, frequency){
        frequency == undefined?
            Checker.find({}).exec(callback):
            Checker.find({'frequency':frequency}).exec(callback);
    };

    return {
        createChecker:createChecker,
        findCheckers:findCheckers
    }
};
