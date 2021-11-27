import config from "config"
import mongoose from "mongoose"
import { info, success, error, log } from "../utils/chalk.js"

const { connection, connect } = mongoose

const { host, port, dbName } = config.get("dbConfig")

const connectDB = async () => {
    const uri = `mongodb://${host}:${port}/${dbName}`

    try {
        // Demonstrate the readyState and on event emitters
        connection.on("connecting", () => {
            log(info(`${connection.readyState}: Connecting to database`))
        })
        connection.on("connected", () => {
            log(success(`${connection.readyState}: Connected to database`))
        })
        connection.on("disconnecting", () => {
            log(info(`${connection.readyState}: Disconnecting from database`))
        })
        connection.on("disconnected", () => {
            log(error(`${connection.readyState}: Disconnected from database`))
        })
        connection.on("close", () => {
            log(error(`${connection.readyState}: Connection closed`))
        })
        connection.on("reconnected", () => {
            log(success(`${connection.readyState}: Reconnected to database`))
        })

        await connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch {
        connection.on("error", (err) => {
            log(error(err))
        })
        // If Mongoose gave up trying to reconnect, kill the process.
        connection.on("reconnectFailed", () => {
            process.nextTick(() => {
                throw new Error(
                    "Mongoose could not reconnect to MongoDB server"
                )
            })
        })
        process.exit(1);
    }
}

export default connectDB
