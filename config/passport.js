var LocalStrategy = require('passport-local').Strategy;

const mysql = require('mysql');

const dbConfig = require('./database.js');
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
	if(err){
		console.log('error connecting to db');
		return;
	}
	console.log('connection established');
});


module.exports = (passport) => {
	passport.serializeUser( (user, done) => {
		done(null, user.username);
	});

	passport.deserializeUser((username, done) => {
		connection.query(`SELECT * FROM auth WHERE username = '${username}' `, (err, rows) => {
			done(err, rows[0]);
		})
	});


	passport.use('local-login', new LocalStrategy((username, password, done) => {
		connection.query(`SELECT * FROM auth WHERE username = '${username}' AND password = '${password}'`, (err,rows) => {
			if(rows[0] === undefined) {
				return done(null);
			}
			return done(null,rows[0]);
		});
	}))


}