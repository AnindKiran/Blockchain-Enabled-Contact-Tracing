function generatePassword(){
    fetch("/generate", 
    {
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: 'generatedPassword'}),
    method: "POST"
    }).then( 
        response => response.json()
    ).then({}).catch(function(res){
        console.log(res);
    });
}