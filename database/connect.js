const config = require('config');
const { info, success, error, log } = require('../utils/chalk');
const mongoose = require('mongoose');

const { connection, connect } = mongoose;

const {
    host,
    port,
    dbName,
} = config.get('dbConfig');

const connectDB = async () => {

    // Demonstrate the readyState and on event emitters
    connection.on('connecting', () => { 
        log(info(`${connection.readyState}: Connecting to database`))
    });
    connection.on('connected', () => {
        log(success(`${connection.readyState}: Connected to database`))
    });
    connection.on('disconnecting', () => {
        log(info(`${connection.readyState}: Disconnecting from database`))
    });
    connection.on('disconnected', () => {
        log(error(`${connection.readyState}: Disconnected from database`))
    });
    

    await connect(`mongodb://${host}:${port}/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // If Mongoose gave up trying to reconnect, kill the process.
    connection.on('reconnectFailed', () => {
        process.nextTick(() => {
            throw new Error('Mongoose could not reconnect to MongoDB server');
        });
    });
}

module.exports = connectDB;