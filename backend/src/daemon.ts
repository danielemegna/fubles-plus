import { FublesSDK } from "fubles-plus-sdk"
import GenerateUserIcsCalendarUseCase from "./usecase/GenerateUserIcsCalendarUseCase"

const generateUserIcsCalendarUseCase = new GenerateUserIcsCalendarUseCase(
  new FublesSDK({
    id: 55576,
    bearerToken: process.env.FUBLES_BEARER_TOKEN!
  })
)

export default function start() {
  setInterval(fiveMinutesLoop, 5 * 60 * 1000)
  setInterval(sixHourLoop, (6 * 60) * 60 * 1000)

  // trigger a run immediately since setInterval don't!
  fiveMinutesLoop()
  sixHourLoop()
}

function fiveMinutesLoop() {
  console.log(`Five minutes deamon loop minutes ...`)
}

function sixHourLoop() {
  console.log(`Six hour deamon loop minutes ...`)
  generateUserIcsCalendarUseCase.run(55576)
}
