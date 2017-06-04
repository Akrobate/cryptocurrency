var MongoClient = require('mongodb').MongoClient;
var confserver = require('../conf/confserver').get();
var assert = require('assert');
var url = confserver.mongodb.url;

module.exports = {

	init: function(data) {
		url = data;
	},


	/**
	 *	Methode de recherche dans collection
	 *
	 */

	find: function(collection, find, options, callback) {
		var data = [];
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			var cursor = db.collection(collection).find(find, options);
			cursor.each(function(err, doc) {
				assert.equal(err, null);
				if (doc != null) {
					data.push(doc);
				} else {
					db.close();
					callback(data);
				}
			});
		});
	},


	/**
	 *	Methode d'insert dans collection
	 *
	 */

	insert: function(collection, data, callback) {
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			db.collection(collection).insertOne(data, function(err, result) {
				assert.equal(err, null);
				callback(result);
				db.close();
			});
		});
	},


	/**
	 *	Methode d'update dans collection
	 *
	 */

	update: function(collection, find, data, callback) {
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			db.collection(collection).update(find, data, function(err, result) {
				assert.equal(err, null);
				callback(result);
				db.close();
			});
		});
	},


	/**
	 *	Methode d'updateMany dans collection
	 *
	 */

	updateMany: function(collection, find, data, callback) {
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			db.collection(collection).updateMany(find, data, function(err, result) {
				assert.equal(err, null);
				callback(result);
				db.close();
			});
		});
	},


	/**
	 *	Methode de verification de connection
	 *
	 */

	checkConnection: function(callback){
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server.");
			db.close();
			callback(1);
		});
	},


	/**
	 *	Methode de recherche dans collection
	 *
	 */

	count: function(collection, find, callback) {
		var i = 0;
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			db.collection(collection).find(find).count(function(err, count) {
				console.log(count);
				db.close();
				callback(count);
			});
		});
	},


	/**
	 *	Methode de suppression multiple dans collection
	 *
	 */

	remove: function(collection, find, callback) {
		var i = 0;
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			db.collection(collection).deleteMany(find, function(err, data) {
				console.log(data.result);
				db.close();
				callback(data);
			});
		});
	}
};
