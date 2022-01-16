const User = require('../models/user');

exports.signup = function(req, res, next) {
    //to pull out data from req object
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({error: 'You must provide email and password'});
    }
    //see if the user with a given email and passwrod exist
    User.findOne({email: email}, function(err, exisitingUser) {
        if(err) { return next(err)}

        //If email already does exist return an error
        if(exisitingUser) {
            return res.status(422).send({ err: 'Email already in use'})
        }

        //if not exist aand  a frsh email thern create and save user record
        const newUser = new User({
            email: email,
            password: password
        })

        newUser.save(function(err) {
            if(err) {
                return next(err);
            }
            res.json({"success:": true});
        }); //talking to db to save it there

        //Respond to request user was created
    })


}