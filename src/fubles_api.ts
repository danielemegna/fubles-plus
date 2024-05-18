import { MatchDetails, MatchSummary, matchDetailsFrom, matchDetailsAsAnotherUser, matchSummaryFrom } from "./match";

export default class FublesAPI {
  private authenticatedUser: AutheticatedUser

  constructor(autheticatedUser: AutheticatedUser) {
    this.authenticatedUser = autheticatedUser
  }

  async getMyNextScheduledMatches(): Promise<MatchSummary[]> {
    const response = await this.fetchAt(`/users/${this.authenticatedUser.id}/matches/scheduled`)
    const responseBody = await response.json()
    return responseBody.items.map(matchSummaryFrom)
  }

  async getMyLastPlayedMatches(): Promise<MatchSummary[]> {
    return this.getLastPlayedMatchesFor(this.authenticatedUser.id)
  }

  async getLastPlayedMatchesFor(userId: number): Promise<MatchSummary[]> {
    const response = await this.fetchAt(`/users/${userId}/matches/played?offset=0&page_size=4`)
    const responseBody = await response.json()
    return responseBody.items.map(matchSummaryFrom)
  }

  async matchDetails(matchId: number): Promise<MatchDetails> {
    const rawMatchDetails = await this.fetchMatchDetails(matchId);
    return matchDetailsFrom(rawMatchDetails)
  }

  async matchDetailsAsAnotherUser(matchId: number, userId: number): Promise<MatchDetails> {
    const rawMatchDetails = await this.fetchMatchDetails(matchId);
    return matchDetailsAsAnotherUser(rawMatchDetails, userId)
  }

  private async fetchMatchDetails(matchId: number): Promise<any> {
    const response = await this.fetchAt(`/matches/${matchId}`);
    const responseBody = await response.json();
    return responseBody.match;
  }

  private async fetchAt(urlPath: string): Promise<Response> {
    return await fetch(`https://api.fubles.com/api${urlPath}`, {
      method: "GET",
      headers: { "authorization": `Bearer ${this.authenticatedUser.bearerToken}` },
      body: null,
    })
  }

}

export type AutheticatedUser = {
  id: number,
  bearerToken: string
}
