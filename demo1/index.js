const logger = require("./middeware/logger");
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express =  require("express");
const app = express();
// creating middewre functions each has a value in the pipeline.
 app.use(express.json());
 // using a function from an imported module.
 app.use(logger);
 app.use(express.static('public'));
 app.use(helmet());
 app.use('/api/courses',courses);
 app.use('/',home);

 if(app.get("env") === 'development'){
    app.use(morgan('tiny'));
    console.log('morgan enabled');
 }

// this is an example of a middleware function
 app.use((req,res,next) => {
    console.log("Authenticating****");
     next();
   });

   // reading query parameters
app.get('/api/posts/:year',(req,res)=> {
    res.send(req.params);
  });


// environment variables and this heps to set the port dynamically
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on port ${port}..........`);
});

