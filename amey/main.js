const {ROOM}  = require(process.cwd() + '/models/ROOM');
const {BOOKINGS}  = require(process.cwd() + '/models/BOOKINGS');
module.exports = function(app, router){

  router.get('/room',(req, res) => {
    ROOM.find({}, {'__v' : 0}, (err, data) => {
      if(err){
        res.sendStatus(500)
      }
      else {
        res.send(data)
      }
    })
  })

  router.post('/room', (req, res) => {
    var timeDate = req.body.date
    var roomid = req.body.roomid
    var userid = res.locals.userid
    var location = req.body.location
    var comment = req.body.comment
    var status = 0
    console.log(req.body);
    var book = new BOOKINGS({
          username : userid,
          roomid : roomid,
          location: location,
          date : timeDate,
          comment: comment,
          status, status
        });
        console.log(book);
       book.save().then(function(){
            console.log('aircraft saved')
        }).catch(function(err){
          console.log(err);
            // want to handle errors here
        });
    res.sendStatus(200)
  })
}
