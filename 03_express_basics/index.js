var express = require('express');

const app = express();

app.get('/',(req,res) => {
    res.send('Hello World');
})

app.get('/about', (req,res) => {
    res.send('i am the about page')
})

app.get('/contact', (req,res) => {
    res.send('Contact us page')
})

app.get('/services', (req,res) => {
    var html = '<ul><li> Web Development</li><li> Logo Design</li><li>Mobile Development</li></ul>'
    res.send(html);
})

// -- Regex request
app.get('/ab*cd', (req,res) => {
    res.send('I am a regex');
}) 

// -- Request Params

app.get('/user/:id', (req,res) => {
    res.send(req.params)
})

app.get('/user/:id/status/:status_id', (req,res) => {
    res.send(req.params)
})

app.get('/flights/:from-:to', (req,res) => {
    res.send(req.params)
})

// Post Request 

app.post('/login',(req,res) => {
    res.send('Login Successfull');
})

//Delete Request

app.delete('/delete',(req,res) => {
    res.send('Deleted Successfully');
})

app.listen(3000,() => {
    console.log('Listening on port 3000');
})