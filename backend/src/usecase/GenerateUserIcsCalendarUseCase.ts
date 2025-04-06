import fs from 'fs'
import ical, { ICalEventData } from 'ical-generator'
import { FublesSDK, MatchSummary } from "fubles-plus-sdk"

export default class GenerateUserIcsCalendarUseCase {
  private fublesSDK: FublesSDK

  constructor(fublesSDK: FublesSDK) {
    this.fublesSDK = fublesSDK
  }

  async run(userId: number): Promise<void> {
    const matches = await this.fublesSDK.getMyNextScheduledMatches()
    console.debug('next matches:', matches)

    const calendar = ical({ name: "Daniele's Fubles Matches Calendar" })

    for (const match of matches) {
      const event: ICalEventData = this.matchToICalEvent(match)
      calendar.createEvent(event)
    }

    fs.writeFileSync(`./calendars/${userId}.ics`, calendar.toString())
  }

  private matchToICalEvent(match: MatchSummary): ICalEventData {
    const endDate = new Date(match.starting_at.getTime())
    endDate.setHours(match.starting_at.getHours() + 1)
    const description = 'Metti la maglia ' + (match.my_side == 'black' ? 'NERA' : 'BIANCA') + '!'

    // TODO to create a detailed match we should use MatchDetails
    // but it is available only with separated api call using
    // this.fublesSDK.matchDetails(matchId)

    return {
      start: match.starting_at,
      end: endDate,
      summary: 'Calcetto a 5',
      description: description,
      location: 'Sport Time Corsico',
      url: 'https://app.fubles.com/it/app/matches/' + match.id
    }
  }
}