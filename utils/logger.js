// const fs = require("fs")
// const path = require("path")
import morgan from "morgan"

// module.exports = morgan(':method :url :status :response-time ms');

// const pino = require('pino');
// const pinoPretty = require('pino-pretty');

// const customLogger = () => pino({
//     transport: {
//         target: pinoPretty,
//         options: {
//             colorize: true
//         }
//     },
// });

// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'morgan.log'))
const morganLogger = () =>
    morgan("dev", {
    // stream: accessLogStream,
    // skip: (req, res) => res.statusCode < 400
    })

export default morganLogger
