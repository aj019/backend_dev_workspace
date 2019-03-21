const express = require('express');

const app = express();

// Middlewares
var myConsoleLog = function(req,res,next) {
    console.log('I am a middleware');
    next();
}

var serverTime = function(req,res,next) {
    console.log(Date.now);
    req.requestTime =  Date.now();
    next();
}

app.use(serverTime);

app.get('/',(req,res) => { 
    console.log("Time is "+ req.requestTime);
    res.send('Hello World');
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})