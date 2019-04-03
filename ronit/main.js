const {BOOKINGS} = require(process.cwd() + '/models/BOOKINGS');
var hbs = require('hbs');

// Use `.hbs` for extensions and find partials in `views/partials`.

module.exports = function(app, router){

  app.get('/bookings', (req,res) =>{
    BOOKINGS.find({}, (err,data) => {
      res.render('bookings', data)
    });

  })

  app.get('/feedbacks', (req,res) =>{
    FEEDBACKS.find({}, (err,data) => {

    });

  })

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

  })

}
