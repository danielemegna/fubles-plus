type WatchingMatch = {
  id: number,
  title: string,
  starting_at: Date,
  structure_name: string,
  desired_side: DesiredSide
}

export enum DesiredSide { WHITE, BLACK, ANY }

export { WatchingMatch as default }
