var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";


router.get('/', function(req, res, next) {
    res.render('mongoDBoperationView');
  });
/** *This function is for the inserting the data in database  */
  router.post('/insertData', function(req, res, next) {
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        var dbo = db.db("personInfo");
        dbo.collection("person").insertOne(req.body,function(err,result){
            if (err) throw err;
            console.log("1 document inserted");
            db.close();

        });
    });
    res.render('mongoDBoperationView');
  });


  router.post('/updateData', function(req, res, next) {
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        var dbo = db.db("personInfo");
        var id=  { userName: req.body.userName };
        console.log(req.body);
        console.log(req.body.userName);
        var updateValue = {$set:{firstName:req.body.firstName,lastName:req.body.lastName }};
        dbo.collection("person").updateOne(id,updateValue,function(err,resp){
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        })
    });
    res.render('mongoDBoperationView');
  });

  router.post("/deleteData", function(req,res,next){
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        var dbo = db.db("personInfo");
        var id=  { userName: req.body.userName };
        dbo.collection("person").remove(id,function(err,resp){
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        })
    })
    res.render('mongoDBoperationView');
  })

  router.get("/fetchRecords",function(req,res){
  
MongoClient.connect(url,function(err,db){
    var resp1= '';
    if(err) throw err;
    console.log(req.query)
    var id=  req.query;
    var dbo = db.db("personInfo");
    
    dbo.collection("person").find(id).toArray(function(err,resp){
        if (err) throw err;
        console.log(resp);
        resp1=resp;
        console.log(resp1)
        db.close();
    })
    return res.render('userDetailsView',{respData:resp1});
})


  })




module.exports= router;