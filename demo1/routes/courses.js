const express =  require("express");
const router = express.Router();
const Joi = require("joi");

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
    {id:4, name:'course4'}
];


router.get('/',(req,res)=> {
    res.send(courses);
  });

//getting an id with a specific id
router.get('/:id',(req,res) => {
    const searchCourse = courses.find(course => course.id === parseInt(req.params.id));
    if(!searchCourse){
       res.status(404).send("The course with this id doesnot exist in the database.");
    }
    else {
        res.send(searchCourse); 
    }

  });

  
 

  // posting requests or creating new resources

  router.post('/',(req,res) => {
    // input validation using joi
    const { error } = validateCourse(req.body);
       if(error){
         res.status(400).send(error.details[0].message);
         return;
       } 

     const course = {
       id: courses.length + 1,
       name: req.body.name
     };
      courses.push(course);
      res.send(course);
  });

  // updating requests

  router.put('/:id',(req,res) => {

    const searchCourse = courses.find(course => course.id === parseInt(req.params.id));
    if(!searchCourse){
       res.status(404).send("The course with this id doesnot exist in the database.");
    }
    //vaidating
    const { error} = validateCourse(req.body);
       if(error){
         res.status(400).send(error.details[0].message);
         return;
       }
         
       // update the name and then send the response to the client.

       searchCourse.name = req.body.name;
       res.send(searchCourse);
  });


  // deleting a resource from the database

  router.delete('/:id',(req,res) => {

    const searchCourse = courses.find(course => course.id === parseInt(req.params.id));
    if(!searchCourse){
       res.status(404).send("The course with this id doesnot exist in the database.");
    }
    // deleting a course.
    const index = courses.indexOf(searchCourse);
    courses.splice(index,1);
    res.send(searchCourse);
  });



function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
     };
 
     return result = Joi.validate(course, schema);
}


module.exports = router;