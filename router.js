const Authenticstion = require('./controllers/authentication');


//route handler for pour signup route

module.exports = function (app) {
    //here we have access to our express app
    //here we will find a route that the user can vist
    //to add rute handler to express
    // app.get('/', function(req, res, next) {
    //     res.send(['hi', 'iam', 'harsha'])
    // })

    app.post('/signup', Authenticstion.signup)
}