import { logger } from "./logger"

export default function start() {
  setInterval(fiveMinutesLoop, 5 * 60 * 1000)
  setInterval(sixHourLoop, (6 * 60) * 60 * 1000)

  // trigger a run immediately since setInterval don't!
  fiveMinutesLoop()
  sixHourLoop()
}

function fiveMinutesLoop() {
  logger.info(`Five minutes deamon loop minutes ...`)
}

function sixHourLoop() {
  logger.info(`Six hour deamon loop minutes ...`)
}
