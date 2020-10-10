const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fetch = require('node-fetch');

var https = require('https');
https.createServer(app).listen(8080);
var http = require('http');

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.get('/:inputNumber', function (req, res) {
    var url = 'https://gxxph4h9l6.execute-api.us-east-1.amazonaws.com/default/front_end_hiring?input=' + req.params.inputNumber;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            res.send(err);
        });
});
app.listen(port, () => console.log(`Listening on port${port}`));
