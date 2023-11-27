import { MatchDetails, MatchSummary, matchDetailsFrom, matchSummaryFrom } from "./match";

export default class FublesAPI {
  private authenticatedUser: AutheticatedUser

  constructor(autheticatedUser: AutheticatedUser) {
    this.authenticatedUser = autheticatedUser
  }

  async getMyNextScheduledMatches(): Promise<MatchSummary[]> {
    const response = await this.fetchAt(`/users/${this.authenticatedUser.id}/matches/scheduled`)
    const responseBody = await response.json()
    const matches = responseBody.items as any[]
    return matches.map(matchSummaryFrom)
  }

  async getMyLastPlayedMatches(): Promise<MatchSummary[]> {
    const response = await this.fetchAt(`/users/${this.authenticatedUser.id}/matches/played?offset=0&page_size=4`)
    const responseBody = await response.json()
    const matches = responseBody.items as any[]
    return matches.map(matchSummaryFrom)
  }

  async matchDetails(matchId: number): Promise<MatchDetails> {
    const response = await this.fetchAt(`/matches/${matchId}`)
    const responseBody = await response.json()
    return matchDetailsFrom(responseBody.match)
  }

  private async fetchAt(urlPath: string): Promise<Response> {
    return await fetch(`https://api.fubles.com/api${urlPath}`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${this.authenticatedUser.bearerToken}`,
      },
      "body": null,
      "method": "GET"
    })
  }
}

export type AutheticatedUser = {
  id: string,
  bearerToken: string
}
