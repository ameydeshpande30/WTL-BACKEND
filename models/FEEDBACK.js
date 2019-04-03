var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//Todo is the model
var FEEDBACKS  = mongoose.model('FEEDBACKS',{
	username : {
		type: 'String',
	},
	comment : {
		type : 'String'
	}
});

module.exports = {
 FEEDBACKS
};
