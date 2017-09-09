const express = require('express');
const app = express();//Initiate Express Application
const router = express.Router();
const mongoose = require('mongoose');//Node tool for MongoDB
const config = require('./config/database');//Mongoose Config
const path = require('path'); //NodeJS package for file paths
const multer = require('multer');
const User = require('./models/user');


const authentication = require('./routes/authentication')(router);

const bodyParser = require('body-parser');

const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri , (err) => {
    if(err){
        console.log('COULD NOT connect to my database '+ err);
    } else {
        console.log('Connected to database ' + config.db);
    }
});

app.use(cors({
    origin : 'http://localhost:4200'
}));
 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Provide static directry for front-end
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/authentication',authentication);

var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  // rename file
  filename: function (req, file, cb) {
    //console.log("Name is --> "+req.body.Name);
    cb(null, req.body.Name+req.body.Age+path.extname(file.originalname));
  }
});

//upload folder
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

var upload = multer({ storage: storage });

app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
  
  console.log(req.body);
  console.log(req.files[0].filename)
  
  let user = new User({
      name : req.body.Name,
      age : req.body.Age,
      image : req.files[0].filename
  });

  user.save((err)=>{
      if(err){
        res.json({success:false , message:err});
      } else {
          res.json({success:true , message:'User saved'});
      }
  });

});

app.get('/getDetails',(req,res)=>{
    User.find((err,data)=>{
        if(err){
            res.json({ success:false , message:err});
        } else{
            res.json({ success:true , message:data});
        }
    });
});

// Connect server to Angular 2 index.html
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});




// Start server : Listen on port : 3000
app.listen(3000, () => {
    console.log('Listening on port 3000');
});