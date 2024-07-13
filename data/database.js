const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MONGODB_URL = process.env.MONGODB_URL;

const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err; 
    }
};

const disconnectDb = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    } catch (err) {
        console.error('Error disconnecting from MongoDB:', err);
        throw err;
    }
};

module.exports = {
    connectDb,
    disconnectDb,
};
