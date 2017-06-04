var confs = {
	mongodb: { url: 'mongodb://localhost:27017/cryptocurrency' }
};


module.exports = {
	get: function() {
		return confs;
	}
};
