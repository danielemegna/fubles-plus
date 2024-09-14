export default class FublesPlusSDK {

  private userId: number
  private baseUrl: string

  constructor(userId: number, baseUrl: string) {
    this.userId = userId;
    this.baseUrl = baseUrl
  }

  async getFlashEnrollmentWatchingMatches(): Promise<WatchingMatch[]> {
    const response = await fetch(`${this.baseUrl}/users/${this.userId}/flash-enrollments`, { method: "GET" })
    const responseBody = await response.json()
    return responseBody.map(this.watchingMatchFrom, this)
  }

  private watchingMatchFrom(data: any): WatchingMatch {
    return {
      id: data.id,
      title: data.title,
      startingAt: new Date(data.starting_at),
      structureName: data.structure_name,
      desiredSide: this.desiredSideFrom(data.desired_side)
    }
  }

  private desiredSideFrom(value: string): DesiredSide {
    switch(value) {
      case "white": return DesiredSide.WHITE
      case "black": return DesiredSide.BLACK
      case "any": return DesiredSide.ANY
      default: throw new TypeError(`Value [${value}] invalid desired side`)
    }
  }
}

export type WatchingMatch = {
  id: number,
  title: string,
  startingAt: Date,
  structureName: string,
  desiredSide: DesiredSide
}

export enum DesiredSide { WHITE, BLACK, ANY }

