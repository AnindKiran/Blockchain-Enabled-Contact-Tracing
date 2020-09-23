const express = require('express');
const app = express();
const got = require('got');
var cheerio = require('cheerio');


app.listen(8080);
app.use("/root_contact_tracing", express)
app.use("/static", express.static('./static/'));
app.use("/css", express.static('./css/'));
app.use("/pictures", express.static('./pictures/'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/tracing/:id', function(req, res){
    res.sendFile(__dirname + `/html/tracing${req.params.id}.html`);
})

var isInfected = false; 
var password; 
var acrossID;

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 
app.post('/generate', function(request, response) {
    if(request.body.data == 'generatedPassword'){
        console.log('Enter generate');
        isInfected = true;
        password = makeid(6);
        response.json(false);
    } 
})


app.post('/continuousCheck', function(request, response) {
    console.log({isInfected: isInfected, password: password});
    response.json({isInfected: isInfected, password: password});
    isInfected = false;
})
    
    
app.post('/authenticate', function(request, response) {
    if (request.body.password == password){
        response.json(true);
    } else {
        response.json(false);
    }
})


app.post('/commonID', function(request, response) {
    if (request.body.function == 'sendCommonID'){
        console.log(request.body);
        acrossID = request.body.data;
        response.json(false);
    }
    if(request.body.function == 'getCommonID'){
        response.json(acrossID);
        console.log(request.body, acrossID);
    }
})

var numberOfCases;
var recoveredCases;

const vgmUrl= 'https://www.worldometers.info/coronavirus/country/india/';

async function getValue(){
    const response = await got(vgmUrl);
    const $ = cheerio.load(response.body);
    numberOfCases = $('.maincounter-number').children().first().text();
    recoveredCases = $('.maincounter-number').children().eq(2).text();
    console.log({numberOfCases:numberOfCases, recoveredCases:recoveredCases});
}

setInterval(getValue, 1000);

app.post('/scrape', function (request, response) {
    response.json({numberOfCases:numberOfCases, recoveredCases:recoveredCases});
})
