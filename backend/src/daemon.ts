import fs from 'fs'
import { FublesSDK } from 'fubles-plus'
import ical from 'ical-generator'

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

  const calendar = ical({ name: "Daniele's Fubles Matches Calendar" })
  calendar.createEvent({
    start: new Date(2025, 3, 18, 19, 30),
    end: new Date(2025, 3, 18, 20, 30),
    summary: 'Calcetto a 5',
    description: '',
    location: 'Sport Time Corsico',
    url: 'https://app.fubles.com/it/app/matches/3083151'
  })


  fs.writeFileSync(`./calendars/${authenticatedUser.id}.ics`, calendar.toString())
}
