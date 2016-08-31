var express = require("express");
var app = express();

//===== should be exported to a util Class ==========
var mongo = require('mongodb');
var client = mongo.MongoClient;
var _db;
var path = "//localhost";
var port = ":27017";
var dbName = "/mean"

client.connect('mongodb:' + path + port + dbName, function (err, db) {
    if (err) {
        console.log("Error connecting to Mongo - check mongod connection");
        process.exit(1);
    }
    _db = db;
    console.log("connected to mongo.");
});

//====================================================

app.use(express.static(__dirname + "/../client"));

app.get("/api", function (request, response) {
    _db.collection('content')
    .find().toArray(function(err,docs){
        console.log(JSON.stringify(docs));
        var header = docs.map(function(item){
            return item;
        });
        response.json(header[0]);
    });
    
});

// app.get("/api", function(request, response){
//     response.json({ header: "Hello, World!"});
// });

app.listen(8181, function () {
    console.log('App listening on port 8181!');
});