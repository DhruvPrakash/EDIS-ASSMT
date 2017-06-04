const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySqlStore = require('express-mysql-session')(session);
let sessionStore = new MySqlStore(require('./config/database.js'));
require('./config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
	secret: 'asynchronoussynchronization',
	cookie: {
		maxAge: 15 * 60 * 1000,
		saveUninitialized: false,
		resave: false
	},
	rolling: true,
	store: sessionStore
}));

app.use(passport.initialize());
app.use(passport.session());

//========== routes==========
require('./app/routes.js')(app, passport);


app.listen(port, (err) => {
	if(err) {
		return console.log('something bad happened', err);
	}

	console.log(`server listening on ${port}`);
})



