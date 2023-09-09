import { Match, matchFrom } from "./match";

export default class FublesAPI {

  private authenticatedUser: AutheticatedUser = {
    id: "55576",
    bearerToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
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

type AutheticatedUser = {
  id: string,
  bearerToken: string
}