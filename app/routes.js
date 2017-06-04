let auth = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.json({"message": "You are not currently logged in"});
}


let hasError = (num1, num2, oper) => {
	let err = false;
	if(Number.isInteger(num1) && Number.isInteger(num2)) {
		err = (num2 === 0 && oper === 'divide') ? true : false;
	} else {
		err = true;
	}
	return err;
}


module.exports = (app, passport) => {
	app.post('/login',(req, res, next) => {
		passport.authenticate('local-login', (err, user,info) => {
			if(!user) {
				res.json({"message":"There seems to be an issue with the username/password combination that you entered"});
			} else {
				req.login(user, (err) => {
					res.json({"message": `Welcome ${user.first_name}`})
				});
				
			}
		})(req, res, next);
	});




	app.post('/add', auth, (req, res) => {
		
		let err = hasError(req.body.num1, req.body.num2, 'add');
		if (err) {
			res.json({"message": "The numbers you entered are not valid"});
		} else {
			let result = req.body.num1 + req.body.num2;
			res.json({"message": "The action was successful", "result": result});
		}		
	});

	app.post('/divide', (req, res) => {
		
		let err = hasError(req.body.num1, req.body.num2, 'divide');
		if (err) {
			res.json({"message": "The numbers you entered are not valid"});
		} else {
			let result = req.body.num1 / req.body.num2;
			res.json({"message": "The action was successful", "result": result});
		}

	});

	app.post('/multiply', (req, res) => {
		
		let err = hasError(req.body.num1, req.body.num2, 'divide');
		if (err) {
			res.json({"message": "The numbers you entered are not valid"});
		} else {
			let result = req.body.num1 * req.body.num2;
			res.json({"message": "The action was successful", "result": result});
		}

	});


	app.post('/logout', (req, res) => {
		//check if user has a session... 
		if(req.user) {
			req.session.destroy(function (err) {
		   		res.json({"message" : "You have been successfully logged out"});
			});
		} else {
			res.json({"message" : "You are not currently logged in"});
		}
	})
}

