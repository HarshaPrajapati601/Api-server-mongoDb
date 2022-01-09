const mongoose = require('mongoose');
const schema = mongoose.Schema;
//scheme tells about the particular model that our mongosse qwill have

//Define our model
const userSchema  = new schema({
    email: { type: String, unique: true, lowercase: true}, //mongoo db is not  case senstive
    password: String
})

//create model class
const ModelClass = mongoose.model('user', userSchema); //a class of user


//Export the model
module.exports = ModelClass;