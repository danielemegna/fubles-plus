export type MatchDetails = MatchSummary

export type MatchSummary = {
  id: number,
  available_slots: number,
  my_side: Side | null,
  starting_at: Date
}

export const enum Side {
  WHITE = 'white',
  BLACK = 'black'
}

export function matchDetailsFrom(matchDetails: any): MatchDetails {
  return {
    id: matchDetails.id,
    available_slots: matchDetails.available_slots,
    my_side: mySideFrom(matchDetails),
    starting_at: new Date(matchDetails.start_datetime)
  }
}

export function matchSummaryFrom(matchDetails: any): MatchSummary {
  return {
    id: matchDetails.id,
    available_slots: matchDetails.available_slots,
    my_side: mySideFrom(matchDetails),
    starting_at: new Date(matchDetails.start_datetime)
  }
}

function mySideFrom(matchDetails: any): Side | null {
  if (!matchDetails.me.is_playing)
    return null;

  return matchDetails.ref_player.side_key === 1 ? Side.WHITE : Side.BLACK
}
