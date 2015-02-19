
//Import dependences
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mailer = require('nodemailer');

//Initialze app
var app = express();
var router = express.Router();
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/card-collections');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

//Define schema for our theme model.
var Schema = mongoose.Schema;
var ThemeSchema = new Schema({
	data : [{id: Number,  value : String , background : String, count: Number }]
});
	
//Authentication for sending mail. DO NOT LEAVE THIS IN SOURCE CONTROL.
var smtpTransport = mailer.createTransport("SMTP",{
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: 
       pass: 
   }
});

//Define our API
app.use('/api', router);
router.route('/themes/:theme_type/:theme_index')
	.get(function(req, res){
		//Set theme type to correct model
		var Theme = mongoose.model(req.params.theme_type, ThemeSchema);
		//Get total entries in collection
		var totalEntries = 0;
		Theme.count({},function(err,count){
			if(err)
				res.send(err);
			totalEntries = count;

			Theme.find(function(err, themes){
			if(err){
				res.send(err);
			}
			var randomIndex = 1;
			do {
				randomIndex = Math.floor(Math.random() * totalEntries);
			} while ( randomIndex == req.params.theme_index);
			var result = { theme : themes[randomIndex].data, themeIndex : randomIndex};
			res.json(result); 
			});
		});
	});


//Api for submit msg
router.route('/submitMsg/')
	.post(function(req, res){
		var data = req.body;
		var textSent = "Name: " + data.Name + "\nEmail: " + data.Email + "\nMsg: " + data.Msg;
		//Send mail
		smtpTransport.sendMail({  //email options
			transport: smtpTransport,
			from: "The Mailman <dragonvzmisc@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
			to: "Ryan Huynh <chienhhuynh@gmail.com>", // receiver
			subject: 'Folio MSG', // subject
			text: textSent // body
		}, function(error, response){  //callback
		if(error){
			console.log(error);
		}else{
			console.log("Message sent: " + response.message);
			res.json({ message: "Email is sent."});
		}

		smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
		});

	});

//Assign port for our app.
app.listen(port);
console.log('App is listening in port ' + port);

