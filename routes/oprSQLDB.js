var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var SqlString = require('sqlstring');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "customer"
  });


  var pool  = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "customer"
  });

router.get('/', function(req, res, next) {
    res.render('sqlDBoperationView');
  });


  router.post('/insertData', function(req, res, next) {
    pool.getConnection( function(err,connection){
        if(err)throw err;
        console.log("database connected....");
        console.log(req.body);
        var sqlQuery = "INSERT INTO cust_details (cust_first_name,cust_last_name,username) VALUES ('"+req.body.firstName+"' ,'"+req.body.lastName+"','"+req.body.userName+"')";
        
        console.log(sqlQuery);
            connection.query(sqlQuery,function(error,results,fields){

            connection.release();
            if(error) throw error
        });
    });
    res.render('sqlDBoperationView');
  });

  
  router.post('/updateData', function(req, res, next) {
    pool.getConnection( function(err,connection){
        if(err)throw err;
        console.log("database connected....");
        console.log(req.body);
        var sqlQuery =SqlString.format('UPDATE cust_details SET cust_first_name = ?, cust_last_name = ? where username = ?',[req.body.firstName,req.body.lastName,req.body.userName]);
      
        console.log(sqlQuery);
            connection.query(sqlQuery,function(error,results,fields){

            connection.release();
            if(error) throw error
        });
    });
    res.render('sqlDBoperationView');
  });


  router.post('/deleteData', function(req, res, next) {
    pool.getConnection( function(err,connection){
        if(err)throw err;
        console.log("database connected....");
        console.log(req.body);
        var sqlQuery =SqlString.format('DELETE FROM cust_details where username = ?',[req.body.userName]);
      
        console.log(sqlQuery);
            connection.query(sqlQuery,function(error,results,fields){

            connection.release();
            if(error) throw error
        });
    });
    res.render('sqlDBoperationView');
  });


  router.get('/fetchRecords', function(req, res, next) {
    pool.getConnection( function(err,connection){
        if(err)throw err;
        console.log("database connected....");
        console.log(req.params);
        var sqlQuery =SqlString.format('SELECT * FROM cust_details where username = ?',[req.param('userName')]);
      
        console.log(sqlQuery);
            connection.query(sqlQuery,function(error,results,fields){

            connection.release();
            console.log(results)
            if(error) throw error
        });
    });
    res.render('sqlDBoperationView');
  });



module.exports =router;