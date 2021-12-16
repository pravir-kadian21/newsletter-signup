const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;

    var data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/4c0e06182b";
    var options = {
        method: "POST",
        auth:"pravir:14fe250e306742a0283cf95e17c59d37-us20"
    }

    var request = https.request(url,options,function(response){

        var responseCode = response.statusCode;

        if(responseCode===200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        // response.on("data",function(data){
        //     console.log(JSON.parse(data));
        // });
    });

    request.write(jsonData);
    request.end();

    //console.log(fname + " " + lname);
});

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen("3000",function(){
    console.log("Server Running on port 3000");
});


//list id
//4c0e06182b

//api 
//14fe250e306742a0283cf95e17c59d37-us20