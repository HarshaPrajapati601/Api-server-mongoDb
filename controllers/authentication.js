const User = require('../models/user');

exports.signup = function(req, res, next) {
    //to pull out data from req object
    const email = req.body.email;
    const password = req.body.password;
    //see if the user with a given email and passwrod exist
    User.findOne({email: email}, function(err, exisitingUser) {
        
    })
    //If it does exist return an error
    //if not exist aand  a frsh email thern create and save user record

    //Respond to request user was created
}