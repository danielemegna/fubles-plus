import { Match, matchFrom } from "./match";

export default class FublesAPI {

  private authenticatedUser: AutheticatedUser

  constructor(autheticatedUser: AutheticatedUser) {
    this.authenticatedUser = autheticatedUser
  }


  async getScheduledMatches(): Promise<Match[]> {
    const response = await fetch(`https://api.fubles.com/api/users/${this.authenticatedUser.id}/matches/scheduled`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${this.authenticatedUser.bearerToken}`,
      },
      "body": null,
      "method": "GET"
    });

    const responseBody = await response.json()
    const matches = responseBody.items as any[]
    return matches.map(matchFrom)
  }

}

export type AutheticatedUser = {
  id: string,
  bearerToken: string
}