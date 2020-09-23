// web3 API -> Interfacing with Rinkeby Test Chain.
web3 = new Web3(window.ethereum)
window.ethereum.enable().catch(error => {
    // User denied account access
    console.log(error)
})
var account;
web3.eth.getAccounts((err, res) => {                   
  account = res[0];
});

// Contract address and ABI
var address = '0xb7eeEDe8968646A791198fb7169Ef9a9964721B3';
var abi = [{"constant":true,"inputs":[{"internalType":"bytes32[]","name":"exchangedIDs","type":"bytes32[]"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"checkIDs","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32[]","name":"infectedID","type":"bytes32[]"}],"name":"insertToBlockchain","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"listofIDs","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"readFromBlockchain","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"}];

// contract object 
contract = new web3.eth.Contract(abi, address);

// Button for uploading -> Enabled only after it's authenticated by the server. 
const button = document.getElementById('Upload');
button.disabled = true;

// With each function call we check some values in the blockchain. 
// This variable indicates how many values in the chain have been checked. 
var index = 0;
var convertedExchanged = 0; // Variable for how many generated IDs have been converted to hex. 

// found -> Matched ID in the blockchain.
// positive -> Hospital has confirmed that the person has tested positive. 
let found = false, positive = false;

// Arrays to hold exchanged IDs and this person's individual IDs.  
exchangedIDs = [];
selfIDs = [];

idGenerationInterval = 30;
checkIfPositiveInterval = 60;
safetyCheckerInterval = 1;
IDlength = 7;
// -----------------X--------------------------------X---------------------------------X-----------------------------X-----------------------X


// FUNCTIONS
function ascii_to_hexa(str)
{
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n ++) 
    {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
}

// Makes a random ID of given length. 
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Adds generated IDs to arrays. 
function IDgenerator(){
    result1 = makeid(IDlength); // exchanged IDs
    console.log(result1);
    result1 = ascii_to_hexa(result1);
    length = 66 - result1.length;
    str = new Array(length - 1).join('0');
    result1 = '0x' + result1 + str;
    result2 = makeid(5); // self IDs
    exchangedIDs.push(result1);
    selfIDs.push(result2);
}
setInterval(IDgenerator, idGenerationInterval * 1000);

// Authenticates the password entered. 
function authenticate(){
    let password = $("#password").val();
    let authentication = {password:password};
    fetch("/authenticate",
    {
    headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(authentication),
    method: "POST"
    }).then( 
        response => response.json()
    ).then(function(res){
        if(res == true){
            button.disabled = !res;
            $("#auth").html("Authenticated")
            $("#auth").css({"background-color":"green"});
        } else {
            window.alert("Bad authentication");
        }
    })
    .catch(function(res){
        console.log(res);
    });
}

// Uploads the data after successful authentication. Disables the button after 1 upload. 
var converted = 0;
function upload(){
    for(i = converted; i < selfIDs.length; ++i){
      selfIDs[i] = web3.utils.asciiToHex(selfIDs[i]);
      ++converted;
    }
    contract.methods.insertToBlockchain(selfIDs).send({from:account});
    $("#auth").html("Authenticate")
    $("#auth").css({"background-color":"blue"});
    button.disabled = true;
}

// Function that keeps querying the server for the infection status. 
// This is to check if this person has been CONFIRMED diagnosed positive. 
function checkIfPositive() {
    fetch("/continuousCheck",
    {
    headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({data :'check'}),
    method: "POST"
    }).then( 
        response => response.json()
    ).then(function(res){
        if(!positive){
            positive = res.isInfected;
            if(res.isInfected == true){
                $("#warning").css({"background-color":"red" ,"text-align":"center", "color":"white"})
                $("#warning").html("You have been tested Covid +ve");
                $("#passwordDisplay").html("Generated Password: " + res.password);
                $("#passwordDisplay").css({"background-color":"grey", "color":"white", "text-align": "center", "font-size":"30px"});
                found = 1;
            }
        }
    })
    .catch(function(res){
        console.log(res);
    });
}
setInterval(checkIfPositive, checkIfPositiveInterval * 1000);

// This is the blockchain function. 
// It queries the blockchain continuously and checks if this person has come in contact with
// anyone who has been infected(aka a case). 
function safetyChecker(){
    if (found === false){
        contract.methods.checkIDs(exchangedIDs, index).call().then((f) => {
            found = f[0];
            index = f[1];
        });
    }

    if(!positive){
        if (found == 1){
            $("#container").css({"background":"linear-gradient(#ffe3e0, #ef6351)"});
            $("#status").css({"color":"red", "font-size":"20px"});
            $("#status").html("You have come in contact with a diagnosed person!");
            setTimeout(safetyChecker, 80000);
        }
    }
};
setInterval(safetyChecker, safetyCheckerInterval * 1000);

function updatingCases(){
    $("#numberOfPeople").html(exchangedIDs.length + " people");
    $("#numberOfPeople").css({"color":"red"});
}

setInterval(updatingCases, 14000);

function liveCases(){
    fetch("/scrape", 
    {
    headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({data :'check'}),
    method: "POST"
    }).then( 
        response => response.json()
    ).then(function(response){
        if (response == undefined){
            $("#liveCases").html('Fetching data...');
        }
        else{
            $("#liveCases").html(response.numberOfCases + " cases");
            $("#recovered").html(response.recoveredCases + " people");
        }
    }).catch(function(res){
        console.log(res);
    });
}
setInterval(liveCases, 5000);

function getCommonID(){
    fetch("/commonID",
    {
    headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({function: 'getCommonID'}),
    method: "POST"
    }).then( 
        response => response.json()
    ).then(function(res){
        exchangedIDs.push(web3.utils.asciiToHex(res));
    })
    .catch(function(res){
        console.log(res);
    });
}
setTimeout(getCommonID, 10000);