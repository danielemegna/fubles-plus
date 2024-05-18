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

  async matchFollow(matchId: number): Promise<void> {
    const response = await this.postAt(`/matches/${matchId}/followers`)
    if (response.ok) return

    if (response.status === 404)
      throw new MatchNotFoundError(matchId)

    throw new Error("Something went wrong during match follow: " + response.status + " - " + response.statusText)
  }

  async matchUnfollow(matchId: number): Promise<void> {
    const response = await this.deleteAt(`/matches/${matchId}/followers`)
    if (response.ok) return

    if (response.status === 404)
      throw new MatchNotFoundError(matchId)

    throw new Error("Something went wrong during match unfollow: " + response.status + " - " + response.statusText)
  }

  private async fetchMatchDetails(matchId: number): Promise<any> {
    const response = await this.fetchAt(`/matches/${matchId}`);
    if (response.ok) {
      const responseBody = await response.json();
      return responseBody.match;
    }

    if (response.status === 404)
      throw new MatchNotFoundError(matchId)

    throw new Error("Something went wrong during match details fetch: " + response.status + " - " + response.statusText)
  }

  private async fetchAt(urlPath: string): Promise<Response> {
    return await fetch(`https://api.fubles.com/api${urlPath}`, {
      method: "GET",
      headers: { "authorization": `Bearer ${this.authenticatedUser.bearerToken}` },
      body: null,
    })
  }

  private async postAt(urlPath: string, body?: any): Promise<Response> {
    return await fetch(`https://api.fubles.com/api${urlPath}`, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${this.authenticatedUser.bearerToken}`,
        "content-type": "application/json",
      },
      body: body ? JSON.stringify(body) : null
    })
  }

  private async deleteAt(urlPath: string): Promise<Response> {
    return await fetch(`https://api.fubles.com/api${urlPath}`, {
      method: "DELETE",
      headers: { "authorization": `Bearer ${this.authenticatedUser.bearerToken}` },
      body: null,
    })
  }

}

export type AutheticatedUser = {
  id: number,
  bearerToken: string
}

export class MatchNotFoundError extends Error {
  constructor(matchId: number) {
    super(`Match ${matchId} not found !`);
  }
}
