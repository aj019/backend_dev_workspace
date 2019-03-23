const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');

const app = express();
app.set('view engine','ejs');
app.use(express.static('./public'));
const port = process.env.PORT || 3000;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/myuploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

var upload = multer({
    storage: storage
}).single('profilepic');  

app.get('/', (req,res) => {
    console.log('Multer is doing fine');
    res.render('index');
})

app.post('/upload', (req,res) => {
    upload(req,res, (err) => {
        if(err) {
            res.render('index', {
                message: err
            })
        } else {
            res.render('index',{
                message: 'Upload Successful',
                filename: `myuploads/${req.file.filename}`
            })
        }
    });
})

app.listen(port,() =>{
    console.log('Server is running at 3000');
})
