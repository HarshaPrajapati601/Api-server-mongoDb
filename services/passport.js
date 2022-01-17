const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStratergy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStratergy = require('passport-local');

//create local stratergy
const localOptions = { usernameField: 'email'};
const localLogin = new localStratergy(localOptions, function(email, password, done) {

    //Verfiy the email and passwrod call done with user
    User.findOne({email: email}, function(err, user) {

        //if correct email and passwrd
        if(err) { return done(err); }

        //else call with false
        if(!user) { return done(null, false)}

        //compare passwords - is 'password - encrypted paswrd ' = '(user.password')
        
        user.comparePassword(password, function(err, isMatch) {
            if(err) { return done(err); }

            if(!isMatch) { return done(null, false); }

            return done(null, user);
        })
    })

})

//setup options for JWT stratergy
const jwtStratergy = {
    //to tell the JwtStratergy to where to look for the key
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret

};

//1. that whenever we request comes in and we want passport to handle it it needs to look at the request
// header and specifically a header called authorization to find the token.
//2.secret to decode the token

//Create JWT stratergy
const jwtLogin = new JwtStratergy(jwtStratergy, function(payload, done) {
    //See if the user ID in the payload exisits in our database
    User.findById(payload.sub, function(err, user) {
        if(err) { return(err, false); }

        if(user) {
            done(null, user); //person authenticated 
        }
        else {
            done(null, false); //tells passport no person not authenticated 
        }

    })

    //If it does , call done with that other

    //If not call done wiothout a user obj
})


//Tell passport to use this stratergy
passport.use(jwtLogin);
passport.use(localLogin);