const express = require('express');
const router = express.Router();
const Joi = require("joi");

const genres = [

    { id:"1900700111", name:"Action"},
    { id:"1900700112", name:"Thriller"},
    { id:"1900700113", name:"Hollar"}

];

router.get('/',(req,res)=> {
    res.send(genres);
  });

//getting  agenre with a specific id
router.get('/:id',(req,res) => {
    const searchGenre = genres.find(genre => genre.id === req.params.id);
    if(!searchGenre){
       res.status(404).send("The genre with this id doesnot exist in the database.");
    }
    else {
        res.send(searchGenre); 
    }

  });

  
// posting requests or creating new resources

  router.post('/',(req,res) => {
    //input validation using joi
    const { error } = validateCourse(req.body);
       if(error) return res.status(400).send(error.details[0].message);
       
       const genre = {
       id: `190070011 ${genres.length + 1}`,
       name : req.body.name
      };

       genres.push(genre);
      res.send(genre);
  });

  // updating requests

  router.put('/:id',(req,res) => {

    const searchGenre = genres.find(genre => genre.id === req.params.id);
    if(!searchGenre){
       res.status(404).send("The genre with this id doesnot exist in the database.");
    }
    //vaidating
    const { error } = validateCourse(req.body);
       if(error){
         res.status(400).send(error.details[0].message);
         return;
       }
         
       // update the name and then send the response to the client.
       searchGenre.name = req.body.name;
       res.send(searchGenre);
  });


  // deleting a resource from the database

  router.delete('/:id',(req,res) => {

    const searchGenre = genres.find(genre => genre.id === req.params.id);
    if(!searchGenre){
       res.status(404).send("The genre with this id doesnot exist in the database.");
    }
    // deleting a course.
    const index = genres.indexOf(searchGenre);
    genres.splice(index,1);
    res.send(searchGenre);
  });



function validateCourse(genre){
    const schema = {
        name: Joi.string().min(3).required()
     };
 
     return result = Joi.validate(genre, schema);
}


module.exports = router;