//main starting point of application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { ppid } = require('process');

const app = express();
const router = require('./router');
const mongoose =  require('mongoose');

// DB Setup
mongoose.connect("mongodb://localhost/auth", { useNewUrlParser: true });
 
const connection = mongoose.connection;
 
connection.on("connected", function() {
  console.log("connected to db");
});
//it creates a new db inside of mongo DB called auth ..give any name you like

//App setup - how we want express to  work through
//1; tell our app to use morgan and we pass morgan string to combine
//morgan and body parser are middleware in express -middle ware here is somthing any incoming request to our server
// is going to pass into morgan an d also into body parser
//morgan is a login framework to login incoming req
//body parser is to parse the incoming req esp into json
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);


//server setup 
//getting our express app to talk to the outsifde world



//1. find a port that our server is going to run on local machine
const port = process.env.PORT || 3200
//2. create a http server that knows how to recieve request and anything that
//comes in export it to our express application i.e here is app
const server = http.createServer(app);
//3. THEN WE TELL THE server to listen to the port that we just declared.
server.listen(port);
console.log('server listenring on port:', port)