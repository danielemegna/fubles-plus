export type MatchDetails = {
  id: number,
  starting_at: Date,
  my_side: Side | null,
  available_slots: {
    white: number,
    black: number
  },
}

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
  const whitePlayers = playingPlayersCountFor(matchDetails.side_1)
  const blackPlayers = playingPlayersCountFor(matchDetails.side_2)
  return {
    id: matchDetails.id,
    starting_at: new Date(matchDetails.start_datetime),
    my_side: mySideFrom(matchDetails),
    available_slots: {
      white: 5 - whitePlayers,
      black: 5 - blackPlayers
    }
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

function playingPlayersCountFor(side: any): number {
  return side.players.filter((p: any) => p.status == 4).length
}
