import { DesiredSide } from "../entities/WatchingMatch";
import WatchingMatchRepository from "./WatchingMatchRepository";

export default class JsonWatchingMatchRepository implements WatchingMatchRepository {

  storeFlashEnrollment(matchId: number, desiredSide: DesiredSide, userId: number): void {
    
  }

  getFlashEnrollmentsWatchingMatches(userId: number): any[] {
    // introduce new type with just id and desiredSide
    return [];
  }

}
