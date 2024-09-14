import WatchingMatch, { DesiredSide } from "../entities/WatchingMatch";

export default class GetFlashEnrollmentsUsecase {
  run(userId: number): WatchingMatch[] {
    const watchingMatches: WatchingMatch[] = [
      {
        id: 99997,
        title: "Calcio a 5",
        startingAt: new Date(2024, 10, 18, 20, 30),
        structureName: "Sport Time Corsico",
        desiredSide: DesiredSide.WHITE,
      },
      {
        id: 99998,
        title: "Calcio a 5",
        startingAt: new Date(2024, 10, 20, 20, 0),
        structureName: "Tennis Calcetto Barona (T.C.B.)",
        desiredSide: DesiredSide.BLACK,
      },
      {
        id: 99999,
        title: "Calcio a 5",
        startingAt: new Date(2024, 10, 26, 19, 30),
        structureName: "Sport Time Corsico",
        desiredSide: DesiredSide.ANY,
      }
    ];
    return watchingMatches
  }
}
