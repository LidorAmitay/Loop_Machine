const express = require('express');
const ExpressError = require('./utils/ExpressError');
const morgan = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');
const Track = require('./models/track');
const asyncHandler = require('./utils/asyncHandler');

const app = express();
const PORT = 8001;

mongoose.connect('mongodb://localhost:27017/loopMachineApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection to Mongoose Open !")
    })
    .catch(err => {
        console.log('Connection to Mongoose Failed !')
        console.log(err);
    })

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.get('/get_song', asyncHandler( async(req, res, next) => {
    const track_name = req.query.name;
    if (!track_name) {
        next(new Error('Track name is required!', 400));
    }
    const track = await Track.find({title:track_name})
    if(!track) {
        next(new Error('Track Not Found!', 400));
    }
    res.send(track);
}));

app.get('/get_all_songs',  asyncHandler( async (req, res) => {
    const tracks = await Track.find({title:{$ne:"ALL TRACK"}});
    res.send(tracks);
}));

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = 'Oh No, Something Went Wrong!';
//     res.status(statusCode).render('error', { err });
// })

app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
});
