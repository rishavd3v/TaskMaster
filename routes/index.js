var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const taskModel = require("./data");
const letterModel = require("./newsletter");

const { router: authRoutes, isLoggedIn } = require('./auth');
router.use(authRoutes);

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/dashboard',isLoggedIn,function(req, res, next) {
  res.render('dashboard',{username: req.session.user.username});
});

router.get('/task',isLoggedIn,function(req, res, next) {
  res.render('task');
});

router.get('/loginPage',function(req, res, next) {
  res.render('login');
});

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile', {username: req.session.user.username, email:req.session.user.email});
});

// save task to db
router.get('/tasks', (req, res) => {
  let newTask = new taskModel({
    userId: req.session.user._id,
    title: req.query.title,
    description: req.query.description,
    date: req.query.date
  });
  newTask.save()
    .catch(err => res.status(500).json({ error: err.message }));
});


// display task from db
router.get('/getTasks', (req, res) => {
  const userId = req.session.user._id;

  taskModel.find({ userId: userId })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error fetching tasks', error: err });
    });
});


// delete task from db
router.get('/deleteTask', async (req, res) => {
  const title = req.query.title;
  await taskModel.findOneAndDelete({ userId:req.session.user._id,title: title });
});

//task completition status
router.get("/completeTask", async (req, res) => {
  const title = req.query.title;
  await taskModel.findOneAndUpdate({ userId:req.session.user._id,title: title}, { isCompleted: true});
});

//isLoggedIn route
router.get('/isLoggedIn', function(req, res) {
  if(req.session.user){
    res.json({isLoggedIn: true});
  } else {
    res.json({isLoggedIn: false});
  }
});

router.get("/addEmail", async (req, res) => {
  let email = req.query.email;
  let newEmail = new letterModel({
    userId: req.session.user._id,
    email: email
  });
  await newEmail.save()
    .catch(err => res.status(500).json({ error: err.message }));
  
  sendMail(email);
  res.redirect("/#newsletter");
});


// function to send mail
function sendMail(email){

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "mrx6794@gmail.com",
      pass: "rvoj cetx nkxt xvij",
    },
  });

  
  const reciever = {
    from: '"Rishav from TaskMaster" <mrx6794@gmail.com>',
    to: email,
    subject: "Hello",
    text: "Welcome to TaskMaster Newsletter",
  }
  transporter.sendMail(reciever, (err)=>{
    if(err){
      console.log(err);
    }
    else console.log("Email sent");
  });

}

module.exports = router;