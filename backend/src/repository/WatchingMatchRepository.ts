import { DesiredSide } from "../entities/WatchingMatch";

export default interface WatchingMatchRepository {
  storeFlashEnrollment(matchId: number, desiredSide: DesiredSide, userId: number): void
  getFlashEnrollmentsWatchingMatches(userId: number): any[] // introduce new type with just id and desiredSide
}
