import WatchingMatch, { DesiredSide } from "../entities/WatchingMatch";

export default class GetFlashEnrollmentsUsecase {
  run(userId: number): WatchingMatch[] {
    const watchingMatches: WatchingMatch[] = [
      {
        id: 99998,
        starting_at: new Date(2024, 6, 22, 20, 0),
        title: "Calcio a 5",
        structure_name: "Sport Time Corsico",
        desired_side: DesiredSide.WHITE,
      },
      {
        id: 99999,
        starting_at: new Date(2024, 6, 24, 20, 0),
        title: "Calcio a 5",
        structure_name: "Sport Time Corsico",
        desired_side: DesiredSide.BLACK,
      }
    ];
    return watchingMatches
  }
}
