const Authenticstion = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', { session: false});

//route handler for pour signup route

module.exports = function (app) {
    //here we have access to our express app
    //here we will find a route that the user can vist
    //to add rute handler to express
    // app.get('/', function(req, res, next) {
    //     res.send(['hi', 'iam', 'harsha'])
    // })
    app.get('/', requireAuth, function(req, res){
        res.send({ hi: 'there'});
    });
    app.post('/signin', requireSignin, Authenticstion.signin);
    app.post('/signup', Authenticstion.signup);
}


//local stratergy
//1 . npm install --save passport-local