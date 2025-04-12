import fs from 'fs'
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
    const endDate = new Date(match.starting_at.getTime())
    endDate.setHours(match.starting_at.getHours() + 1)

    const matchLink = 'https://app.fubles.com/it/app/matches/' + match.id
    const description =
      'Metti la maglia ' + (match.my_side == 'black' ? 'NERA' : 'BIANCA') + '!' +
      '\n' + matchLink

    // TODO to create a detailed match we should use MatchDetails
    // but it is available only with separated api call using
    // this.fublesSDK.matchDetails(matchId)

    return {
      start: match.starting_at,
      end: endDate,
      summary: 'Calcetto a 5',
      description: description,
      location: 'Sport Time Corsico, Via Visconti di Modrone, 2, 20094 Corsico MI, Italia',
      url: 'https://app.fubles.com/it/app/matches/' + match.id
    }
  }
}