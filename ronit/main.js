const {BOOKINGS} = require(process.cwd() + '/models/BOOKINGS');
module.exports = function(app, router){
  app.post('/bookings', (req,res) =>{
    BOOKINGS.find({}, (err,data) => {

    });

  }

  app.get('/feedbacks', (req,res) =>{
    FEEDBACKS.find({}, (err,data) => {

    });

  }

  router.post('/feedbacks', (req,res) =>{
    FEEDBACKS.find({}, (err,data) => {
    var username = res.locals.userid;
    var comment = req.body.comments;
    var user = new FEEDBACKS({
          userid : userid,
          comment : comment,

        });
       user.save()
    });

  }

}
