const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Social_Media_db', {useNewUrlParser : true, useUnifiedTopology : true});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to mongodb'));
db.once('open', function(){
    console.log('Connected to MongoDB');
});

module.exports = db;
