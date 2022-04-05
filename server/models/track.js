const mongoose = require('mongoose');
// const { stringify } = require('nodemon/lib/utils');


const trackSchema = new mongoose.Schema({
    title:String,
    path:String
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;