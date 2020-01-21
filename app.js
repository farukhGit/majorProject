const express = require('express');
const app = express();
const port = 8000;

app.listen(port, (err)=>{
    if(err){
        console.log('Error listening to port : ', port);
        return;
    }

    return console.log('Listening to port : ', port);
})