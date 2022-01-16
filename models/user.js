const mongoose = require('mongoose');
const schema = mongoose.Schema;
//scheme tells about the particular model that our mongosse qwill have

const bcrypt = require('bcrypt-nodejs');

//Define our model
const userSchema  = new schema({
    email: { type: String, unique: true, lowercase: true}, //mongoo db is not  case senstive
    password: String
})

//On Save Hook,encrypt password
//before saving the model run this fn
userSchema.pre('save', function(next) {
    const user = this;

    //generate a salt and run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        //hash (encrypt) password using salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            //overwrite plain text paswrd with encrypted password
            user.password = hash;
            next();
        })
    })
})


//create model class
const ModelClass = mongoose.model('user', userSchema); //a class of user


//Export the model
module.exports = ModelClass;