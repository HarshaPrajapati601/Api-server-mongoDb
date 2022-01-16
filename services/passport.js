const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStratergy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//setup options for JWT stratergy
const jwtStratergy = {};

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