const express = require('express');
const bodyParser = require("body-parser");
const routes= require('./controller/mpesa')

const port = process.env.PORT || 5000
const app = express();


//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use("/api/mpesa",routes)

//listen
app.listen(port, () => {
    console.log(`Server has started listening on port ${port}!!!`);
});
