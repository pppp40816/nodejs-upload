const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const fs = require('fs');
const multer = require('multer');
const YAML = require('yaml');
const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = 3000;
app.use(bodyParser.text({ limit: '500mb' }));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(express.static('public'));

app.post('/model/upload', upload.single('model_file'), (req, res) => {
    console.log('---------------')
    console.log(req.body)
    console.log(req.file)
    res.send('200');
})

app.post('/model/binary', (req, res) => {
    if(!req.query.fileName){
        res.send('400');
    }
    let fileName = __dirname + "/uploads/" + req.query.fileName;
    fs.writeFile(fileName, req.body, 'base64', function (err) {
    });
    console.log('save ' + req.query.fileName)
    //以url方式存檔
    // request(body["img"]).pipe(fs.createWriteStream(fileName));
    res.send('200');
});


app.listen(PORT, () => {
    console.log('Listening at ' + PORT);
});