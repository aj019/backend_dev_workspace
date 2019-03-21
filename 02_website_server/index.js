const htttp = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const mimeTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpg': 'image/jpg',
    'jpeg': 'image/jpeg',
}

const port = 5000;
const hostname = '127.0.0.1'

htttp.createServer((req,res) => {
    var myUri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(),unescape(myUri));
    console.log('File name looking for ',filename);
    var loadFile;
    try{
        loadFile = fs.lstatSync(filename);
    }catch(e){
        res.writeHead(404);
        res.write('Page Not Found');
        res.end();
        return;
    }

    if(loadFile.isFile()){
        var mimeType  = mimeTypes[path.extname(filename).split('.').reverse()[0]];
        res.writeHead(200,'Content-Type:'+mimeType);
        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);
    } else if(loadFile.isDirectory()){
        res.writeHead(302,{'Location':'index.html'});
        res.end();
    } else {
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.write('500 Internal Server Error');
        res.end();
    }

}).listen(port,hostname,() => {
    console.log(`Server is running at port ${port}`);
})