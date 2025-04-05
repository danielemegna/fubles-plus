import { FublesSDK } from 'fubles-plus'

const LOOP_INTERVAL_IN_MINUTES = 5

export default async function start() {
  await loopHit()
  setInterval(loopHit, LOOP_INTERVAL_IN_MINUTES * 60 * 1000)
}

async function loopHit() {
  console.log(`Deamon loop hit (next in ${LOOP_INTERVAL_IN_MINUTES} minutes)...`)
  await writeIcsCalendarFile()
}

async function writeIcsCalendarFile() {
  const authenticatedUser = {
    id: 55576,
    bearerToken: "<Bearer Token Here>"
  }

  const fublesSdk = new FublesSDK(authenticatedUser)
  const matches = await fublesSdk.getMyNextScheduledMatches()
  console.debug('next matches:', matches)
}
