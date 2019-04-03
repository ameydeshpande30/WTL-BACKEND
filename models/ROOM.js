var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//Todo is the model
var ROOM  = mongoose.model('ROOM',{
	name : {
		type: 'String',
	},
	location: {
		type: 'String'
	},
	path: {
		type: 'String'
	},
	bookings : [
		{
			date : {
				type : 'Date'
			},
				userid : {
					type : 'String'
				}
		}
	]
});

module.exports = {
 ROOM
};
