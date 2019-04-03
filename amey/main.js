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
  router.get('/mybookings', (req, res) => {
    BOOKINGS.find({username : res.locals.userid}, {'__v' : 0}, (err, data) => {
        res.send(data)
    });
  })
  app.get('/approve/:id', (req, res) => {
      var id = req.params.id
      console.log(id);
      BOOKINGS.findOneAndUpdate({_id: id}, {status: 1}, {upsert: true}, (err,data) => {
        console.log(err);
      });
      res.redirect('/admin/check');
  })
  app.get('/reject/:id', (req, res) => {
      var id = req.params.id
      console.log(id);
      BOOKINGS.findOneAndUpdate({_id: id}, {status: 2}, {upsert: true}, (err,data) => {
        console.log(err);
      });
      res.redirect('/admin/check');
  })
  app.get('/admin/check', (req, res) => {
    BOOKINGS.find({status : 0}, {'__v' : 0}, (err, data) => {
        console.log(data);
        res.render('admin-check', {data : data})
    });
  })

  router.post('/room', (req, res) => {
    var timeDate = req.body.date
    var roomid = req.body.roomid
    var userid = res.locals.userid
    var location = req.body.location
    var comment = req.body.comment
    var room_name = req.body.roomname
    var status = 0
    var book = new BOOKINGS({
          username : userid,
          roomid : roomid,
          room_name : room_name,
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
