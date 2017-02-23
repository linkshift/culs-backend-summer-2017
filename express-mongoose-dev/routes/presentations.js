var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var User = require('../models/user');
var Presentation = require('../models/presentation');

router.post('/', (req, res, next) => {
	var token = req.headers.token;
	var body = req.body;

	var user = User.findOne({_id: ObjectID(token)}, (err, user) => {
		if (err) {
			res.status(500);
			res.send();
		} else {
			if (user != null) {
				var presentation = new Presentation({name: body.name, document: body.document, user_id: ObjectID(token)});
				presentation.save((err, presentation) => {
					if (err) {
						res.status(422);
						res.send();
					} else {
						res.status(201);
						res.location("/presentations/" + presentation.id);
						res.send();
					}
				})
			} else {
				res.status(401);
				res.send();
			}
		}
	});
});

router.get('/', (req, res, next) => {
	var token = req.headers.token;
	var body = req.body;

	var user = User.findOne({_id: ObjectID(token)}, (err, user) => {
		if (err) {
			res.status(500);
			res.send();
		} else {
			if (user != null) {
				Presentation.find({user_id: ObjectID(token)}, (err, presentations) => {
					if (err) {
						res.status(500);
						res.send();
					} else {
						console.log(presentations);
						res.status(200);
						res.send(presentations);
					}
				});
			} else {
				res.status(401);
				res.send();
			}
		}
	});
});

router.get('/:id', (req, res, next) => {
	var token = req.headers.token;
	var body = req.body;

	var user = User.findOne({_id: ObjectID(token)}, (err, user) => {
		if (err) {
			res.status(500);
			res.send();
		} else {
			if (user != null) {
				Presentation.findOne({
					_id: ObjectID(req.params.id),
					user_id: ObjectID(token)
				}, (err, presentation) => {
					if (err) {
						res.status(500);
						res.send();
					} else {
						console.log(presentation);
						res.status(200);
						res.send(presentation);
					}
				});
			} else {
				res.status(401);
				res.send();
			}
		}
	});
});

router.delete('/:id', (req, res, next) => {
	var token = req.headers.token;
	var body = req.body;

	
	var user = User.findOne({_id: ObjectID(token)}, (err, user) => {
		if (err) {
			res.status(500);
			res.send();
		} else {
			if (user != null) {
				Presentation.findOneAndRemove({
					_id: ObjectID(req.params.id),
					user_id: ObjectID(token)
				}, (err) => {
					if (err) {
						res.status(500);
						res.send();
					} else {
						res.status(204);
						res.send();
					}
				});
			} else {
				res.status(401);
				res.send();
			}
		}
	});
});

module.exports = router;
