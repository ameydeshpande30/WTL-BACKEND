var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//Todo is the model
var BOOKINGS  = mongoose.model('BOOKINGS',{
	username : {
		type: 'String',
	},
	room_name: {
		type: 'String'
	},
	roomid: {
		type: 'String'
	},
	location: {
		type: 'String'
	},
	date : {
		type : 'Date'
	},
	comment : {
		type : 'String'
	},
	status : {
		type : 'Number'
	}
});

module.exports = {
 BOOKINGS
};
