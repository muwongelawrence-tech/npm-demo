const root = require('./routes/home');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

//middle wares to be used 
app.use(express.json());
app.use(express.static('public'));
app.use('/',root);
app.use('/api/genres',genres);



// environment variables and this heps to set the port dynamically
const port = process.env.PORT || 3400;
app.listen(port, () => {
    console.log(`listening on port ${port}..........`);
});
