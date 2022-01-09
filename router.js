const { process_params } = require("express/lib/router")

module.exports = function (app) {
    //here we have access to our express app
    //here we will find a route that the user can vist
    //to add rute handler to express
    app.get('/', function(req, res, next) {
        res.send(['hi', 'iam', 'harsha'])
    })
}