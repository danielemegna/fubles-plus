import WatchingMatch, { DesiredSide } from "../entities/WatchingMatch";

export default class GetFlashEnrollmentsUsecase {
  run(userId: number): WatchingMatch[] {
    const watchingMatches: WatchingMatch[] = [
      {
        id: 99997,
        title: "Calcio a 5",
        starting_at: new Date(2024, 10, 18, 20, 30),
        structure_name: "Sport Time Corsico",
        desired_side: DesiredSide.WHITE,
      },
      {
        id: 99998,
        title: "Calcio a 5",
        starting_at: new Date(2024, 10, 20, 20, 0),
        structure_name: "Tennis Calcetto Barona (T.C.B.)",
        desired_side: DesiredSide.BLACK,
      },
      {
        id: 99999,
        title: "Calcio a 5",
        starting_at: new Date(2024, 10, 26, 19, 30),
        structure_name: "Sport Time Corsico",
        desired_side: DesiredSide.ANY,
      }
    ];
    return watchingMatches
  }
}
