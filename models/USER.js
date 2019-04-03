var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//Todo is the model
var USER  = mongoose.model('USER',{
	userid: {
		type: 'String',
		unique:true,
	},
	password: {
		type: 'String'
	},
	role: {
		type: 'String'
	}
});

module.exports = {
 USER
};
