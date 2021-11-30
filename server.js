import express from "express"
import session from "express-session"
import errorHandler from "errorhandler"
import config from "config"
import cors from "cors"
import helmet from "helmet"

import connectDB from "./database/connect.js"
import { serverStatus, error } from "./utils/colorLogging.js"
import morganLogger from "./utils/logger.js"
import routes from "./routes/index.js"
import responseHandler from "./middlewares/responseHandler.js"

const app = express()

app.set("view engine", "ejs")

// Middlewares
app.use(morganLogger())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())
app.use(helmet())
app.use(express.static("public"))

app.use(errorHandler())
app.use(
    session({
        resave: false, // don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
        secret: "shhhh, very secret",
    })
)

// Connect to the database
connectDB()

// Error handling

// app.use((err, req, res, next) => {
//     console.log("inside middleware")
//     res.status(err.status || 500);
//     res.json({ err });
//     next();
// })

app.use((err, req, res, next) => {
    console.log("inside err middleware")
    console.log(error(err.stack))
    res.sendStatus(500)
})

// Routes
app.use("/api/v1", responseHandler, routes)
// v2, v3 can be added here

// Start the server
const port = config.get("port")
app.listen(port, () => {
    console.log(serverStatus(`Server is running on port ${port}`))
})
