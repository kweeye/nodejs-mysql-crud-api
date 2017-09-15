var http     = require('http');
var express  = require('express');
var mysql    = require('mysql');
var bodyParser   = require('body-parser');


var con = mysql.createConnection({
   host : 'localhost',
   user : 'root',
   password : '',
   database : 'student_reg'
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
con.connect(function(err) {
 if (err) throw err;
 console.log("Connected!");
var sql ="SELECT * FROM student";
             
con.query(sql, function (err, result) {
   if (err) throw err;
   res.send(result);
 });
});


});

app.post('/create', function (req,res) {
con.connect(function(err) {
 if (err) throw err;
 console.log("Connected!");
var name = req.body.name, grade = req.body.grade, nrc = req.body.nrc, phone = req.body.phone, address = req.body.address;
var sql ="INSERT INTO student (Name, Grade, NRC, Phone, Address) VALUES ('"+ name+"', '"+ grade+"','"+ nrc+"','"+ phone+"','"+ address+"')";
             
con.query(sql, function (err, result) {
   if (err) throw err;
   res.send(  "1 record inserted");
 });
});
   
   
});

app.post('/update', function (req,res) {
con.connect(function(err) {
 if (err) throw err;
 console.log("Connected!");
  var id = req.body.id;
var name = req.body.name, grade = req.body.grade, nrc = req.body.nrc, phone = req.body.phone, address = req.body.address;
var sql ="UPDATE student SET Name = '"+ name+"' , Grade = '"+ grade+"', NRC = '"+ nrc+"', Phone = '"+ phone+"', Address = '"+ address+"' WHERE Id = '"+ id+"'";
             
con.query(sql, function (err, result) {
   if (err) throw err;
   res.send(  "1 record update");
 });
});
   
   
});

app.get('/delete/:id', function (req,res) {
con.connect(function(err) {
 if (err) throw err;
 console.log("Connected!");
  var id = req.params.id;
var sql ="DELETE FROM student WHERE Id = '"+ id+"'";
             
con.query(sql, function (err, result) {
   if (err) throw err;
   res.send(  "1 record delete");
 });
});
   
   
});

var server = app.listen(8000, function () {

 var host = server.address().address
 var port = server.address().port
 console.log("Example app listening at http://%s:%s", host, port)

});