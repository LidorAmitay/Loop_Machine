const mongoose = require('mongoose');
const helper = require('./storeHelpers');
const Track = require('../models/track');

mongoose.connect('mongodb://localhost:27017/loopMachineApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection to Mongoose Open !")
    })
    .catch(err => {
        console.log('Connection to Mongoose Failed !')
        console.log(err);
    })

const seedDB = async () => {
    tracksNames = helper.tracksNames;
    await Track.deleteMany({});
    for (const trackName of tracksNames ) {
        const name = trackName;
        const path = `https://github.com/LidorAmitay/audioFiles/blob/main/${trackName}.mp3?raw=true`;
        const track = new Track({title:name, path});
        await track.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})