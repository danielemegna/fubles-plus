import fs from 'fs'
import ical from 'ical-generator'
import { FublesSDK } from "fubles-plus-sdk"

export default class GenerateUserIcsCalendarUseCase {
  private fublesSDK: FublesSDK

  constructor(fublesSDK: FublesSDK) {
    this.fublesSDK = fublesSDK
  }

  async run(userId: number): Promise<void> {
    //const matches = await this.fublesSDK.getMyNextScheduledMatches()
    //console.debug('next matches:', matches)

    const calendar = ical({ name: "Daniele's Fubles Matches Calendar" })
    calendar.createEvent({
      start: new Date(2025, 3, 18, 19, 30),
      end: new Date(2025, 3, 18, 20, 30),
      summary: 'Calcetto a 5',
      description: '',
      location: 'Sport Time Corsico',
      url: 'https://app.fubles.com/it/app/matches/3083151'
    })

    fs.writeFileSync(`./calendars/${userId}.ics`, calendar.toString())
  }

}