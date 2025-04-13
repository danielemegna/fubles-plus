import ical, { ICalEventData } from 'ical-generator'
import { FublesSDK, MatchSummary } from "fubles-plus-sdk"
import { logger } from '../logger'

export default class GenerateUserIcsCalendarUseCase {
  private fublesSDK: FublesSDK

  constructor(fublesSDK: FublesSDK) {
    this.fublesSDK = fublesSDK
  }

  async run(userId: number): Promise<string> {
    logger.info(`Generating ics calendar file for user ${userId} ..`)

    logger.info(`Fetching matches from fubles ...`)
    const matches = await this.fublesSDK.getMyNextScheduledMatches()

    if (matches.length == 0) {
      logger.info(`No matches found.`)
      return ''
    }

    logger.info(`Found ${matches.length} matches!`)

    logger.info(`Generating ...`)
    const calendar = ical({ name: "Daniele's Fubles Matches Calendar" })
    for (const match of matches) {
      const event: ICalEventData = this.matchToICalEvent(match)
      calendar.createEvent(event)
    }

    return calendar.toString()
  }

  private matchToICalEvent(match: MatchSummary): ICalEventData {
    const endDate = new Date(match.startingAt.getTime())
    endDate.setHours(match.startingAt.getHours() + 1)

    const matchLink = 'https://app.fubles.com/it/app/matches/' + match.id
    const location = match.structure.name + ', ' + match.structure.address
    const description =
      'Metti la maglia ' + (match.mySide == 'black' ? 'NERA' : 'BIANCA') + '!' +
      '\n' + matchLink

    return {
      start: match.startingAt,
      end: endDate,
      summary: match.title,
      description: description,
      location: location,
      url: matchLink
    }
  }
}