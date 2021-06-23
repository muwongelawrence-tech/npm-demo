const express =  require("express");
const router = express.Router();
const Joi = require("joi");


router.get('/',(req,res)=> {
    res.send("we are working on api for courses if you wish to jion us you are warmy welcome.");
    //res.render('index',{title: 'My Express App',message:'Hello'});
  });

module.exports = router;