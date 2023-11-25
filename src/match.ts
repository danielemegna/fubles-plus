export type Match = {
  id: number,
  available_slots: number,
  my_side: Side|null,
  starting_at: Date
}

export const enum Side {
  WHITE = 'white',
  BLACK = 'black'
}

export function matchFrom(obj: any): Match {
  return {
    id: obj.id,
    available_slots: obj.available_slots,
    my_side: mySideFrom(obj),
    starting_at: new Date(obj.start_datetime)
  }
}

function mySideFrom(matchDetails: any) : Side|null {
  if (!matchDetails.me.is_playing)
    return null;

  return matchDetails.ref_player.side_key === 1 ? Side.WHITE : Side.BLACK
}