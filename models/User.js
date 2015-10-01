module.exports = function (app, mongoose) {
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

    var UserSchema = new Schema({
        user_id: {type: ObjectId},
        name: {type: String, unique: true, required: true},
        mobilePhone: {type: String, unique: true, required: true},
        passwordMd5: {type: String, required: true},
        date: {type: Date, default: Date.now, required: true}
    });

    var User = mongoose.model('User', UserSchema);

    var registerUser = function (name, mobilePhone, passwordMd5, callback) {
        console.log('Registering ' + name);
        var new_user = new User({
            name: name,
            mobilePhone: mobilePhone,
            passwordMd5: passwordMd5
        });
        new_user.save(function (err) {
            callback(err);
        });
    };

    var login = function (mobilePhone, passwordMd5, callback) {
        User.findOne({'mobilePhone': mobilePhone}, function (err, user) {
            if (err) throw err;
            callback(user)
        });
    };

    return {
        registerUser: registerUser,
        login: login,
        User: User
    }
};


