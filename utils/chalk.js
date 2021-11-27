import chalk from "chalk"

const primary = chalk.bold.blue
const secondary = chalk.bold.grey
const success = chalk.bold.green
const error = chalk.bold.red
const warning = chalk.bold.yellow
const info = chalk.bold.cyan
const serverStatus = chalk.magenta

const { log } = console

export { primary, secondary, success, error, warning, info, serverStatus, log }
