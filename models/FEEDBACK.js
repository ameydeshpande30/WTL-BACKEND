var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//Todo is the model
var FEEDBACK  = mongoose.model('FEEDBACK',{
	username : {
		type: 'String',
	},
	comment : {
		type : 'String'
	}
});

module.exports = {
 FEEDBACK
};
