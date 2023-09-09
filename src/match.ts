export type Match = {
  id: number,
  available_slots: number,
  side: Side,
  starting_at: Date
}

export const enum Side {
  WHITE = 'white',
  BLACK = 'black'
}

export function matchFrom(obj: any): Match {
  const side = obj.ref_player.side_key === 1 ? Side.WHITE : Side.BLACK
  return {
    id: obj.id,
    available_slots: obj.available_slots,
    side: side,
    starting_at: new Date(obj.start_datetime)
  }
}