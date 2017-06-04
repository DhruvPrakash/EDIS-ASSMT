const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');

//move this to ./config/database.js
const dbConfig = require('../config/database.js')
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
	if(err){
		console.log('error connecting to db');
		return;
	}
	console.log('connection established');
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({secret: 'asynchronoussynchronization'}))

app.post('/login', (req, res) => {
	//check if this is the users creds in the db...
	let username = req.body.username;
	let password = req.body.password;
	connection.query(`select * from auth where username = '${username}' and password = '${password}'`, (err,rows, fields) => {
		if(rows[0] === undefined) {
			res.json({"message":"There seems to be an issue with the username/password combination that you entered"});
		} else {
			res.json({"message": `Welcome ${rows[0].first_name}`});
		}
	})
})




app.post('/add', (req, res) => {
	let result = +req.body.num1 + +req.body.num2;
	res.json({"message": "The action was successful", "result": `${result}`});
});

app.post('/divide', (req, res) => {
	let result = +req.body.num1 / +req.body.num2;
	res.json({"message": "The action was successful", "result": `${result}`});
});

app.post('/multiply', (req, res) => {
	let result = +req.body.num1 * +req.body.num2;
	res.json({"message": "The action was successful", "result": `${result}`});
});

app.listen(port, (err) => {
	if(err) {
		return console.log('something bad happened', err);
	}

	console.log(`server listening on ${port}`);
})



