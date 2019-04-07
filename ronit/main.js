const {BOOKINGS} = require(process.cwd() + '/models/BOOKINGS');
const {FEEDBACK} = require(process.cwd() + '/models/FEEDBACK');
var hbs = require('hbs');

// Use `.hbs` for extensions and find partials in `views/partials`.

module.exports = function(app, router){

  app.get('/bookings', (req,res) =>{
    BOOKINGS.find({}, (err,data) => {

      res.render('bookings', {data:data});
    });

  })
  app.post('/department', (req,res) =>{
    BOOKINGS.find({location:""}, (err,data) => {

      res.render('department', {data:data});
    });

  })



  app.get('/feedbacks', (req,res) =>{
    FEEDBACK.find({}, (err,data) => {
      res.render('feedbacks', {data:data});
    });

  })

  router.post('/feedbacks', (req,res) =>{
    FEEDBACK.find({}, (err,data) => {
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
