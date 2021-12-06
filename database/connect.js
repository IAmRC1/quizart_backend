import config from "config"
import mongoose from "mongoose"
import { info, success, error } from "../utils/colorLogging.js"
import seedDB from "./seed.js"

const { connection, connect } = mongoose

const { host, port, dbName } = config.get("dbConfig")

const connectDB = async () => {
    const uri = `mongodb://${host}:${port}/${dbName}`

    try {
    // Demonstrate the readyState and on event emitters
        connection.on("connecting", () => {
            console.log(info(`${connection.readyState}: Connecting to DB`))
        })
        connection.on("connected", () => {
            console.log(success(`${connection.readyState}: Connected to DB`))
        })
        connection.on("disconnecting", () => {
            console.log(info(`${connection.readyState}: Disconnecting from DB`))
        })
        connection.on("disconnected", () => {
            console.log(error(`${connection.readyState}: Disconnected from DB`))
        })
        connection.on("close", () => {
            console.log(error(`${connection.readyState}: Connection closed`))
        })
        connection.on("reconnected", () => {
            console.log(success(`${connection.readyState}: Reconnected to DB`))
        })

        await connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        await mongoose.connection.db.dropDatabase()
        await seedDB()
    } catch {
        connection.on("error", (err) => {
            console.log(error(err))
        })
        // If Mongoose gave up trying to reconnect, kill the process.
        connection.on("reconnectFailed", () => {
            process.nextTick(() => {
                throw new Error("Mongoose could not reconnect to MongoDB server")
            })
        })
        process.exit(1)
    }
}

export default connectDB
