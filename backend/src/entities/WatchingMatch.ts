type WatchingMatch = {
  id: number,
  title: string,
  startingAt: Date,
  structureName: string,
  desiredSide: DesiredSide
}

export enum DesiredSide { WHITE, BLACK, ANY }

export { WatchingMatch as default }
