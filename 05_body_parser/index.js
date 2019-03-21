const express = require('express');
const bodyparser = require('body-parser');

let app = express();

app.use(bodyparser.urlencoded({extended:false}));

app.use('/login',express.static(__dirname + '/public'));

app.get('/',(req,res) => {
    res.send('Hello App');
})

app.post('/login', (req,res) => {
    console.log(req.body);
    // Do some data processing
    res.redirect('/');
})


app.listen(3000, () => {
    console.log("Listening on port 3000");
})