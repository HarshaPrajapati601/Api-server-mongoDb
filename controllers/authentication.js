const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

//fn to take users id and encode it with our secret

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

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
            res.json({ token: tokenForUser(newUser) });
        }); //talking to db to save it there

        //Respond to request user was created
    })
}

exports.signin = function(req, res, next) {
   //user already has emial and passwrd

   //we just need to give them token
   res.send({ token: tokenForUser(req.user)});

}