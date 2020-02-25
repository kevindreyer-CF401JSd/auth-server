require('dotenv').config();
const mongoose = require('mongoose');
const mongooseOptions = {
    useNewUrlParser:true,
    useCreateIndex:true,
};
mongoose.connect(process.env.MONGODB_URI, mongooseOptions, () => {
    console.log('Connected to MongoDB');
});

// Start Express Server
const server = require('./src/server');
server.start(process.env.PORT);