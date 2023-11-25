import { Match, matchFrom } from "./match";
import { Vote, voteFrom } from "./vote";

export default class FublesAPI {
  private authenticatedUser: AutheticatedUser

  constructor(autheticatedUser: AutheticatedUser) {
    this.authenticatedUser = autheticatedUser
  }

  async getMyNextScheduledMatches(): Promise<Match[]> {
    const response = await fetch(`https://api.fubles.com/api/users/${this.authenticatedUser.id}/matches/scheduled`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${this.authenticatedUser.bearerToken}`,
      },
      "body": null,
      "method": "GET"
    })

    const responseBody = await response.json()
    const matches = responseBody.items as any[]
    return matches.map(matchFrom)
  }

  async receivedVotes(matchId: number): Promise<Vote[]> {
    const response = await fetch(`https://api.fubles.com/api/matches/${matchId}`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${this.authenticatedUser.bearerToken}`,
      },
      "body": null,
      "method": "GET"
    })

    const responseBody = await response.json()
    const votes = responseBody.match.ref_player.received_votes as any[]
    return votes.map(voteFrom)
  }

  async matchDetails(matchId: number): Promise<Match> {
    const response = await fetch(`https://api.fubles.com/api/matches/${matchId}`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${this.authenticatedUser.bearerToken}`,
      },
      "body": null,
      "method": "GET"
    })

    const responseBody = await response.json()
    return matchFrom(responseBody.match)
  }

}

export type AutheticatedUser = {
  id: string,
  bearerToken: string
}
