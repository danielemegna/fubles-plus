import { Vote, voteFrom } from "./vote"

export type MatchDetails = {
  id: number,
  starting_at: Date,
  my_side: Side | null,
  available_slots: {
    white: number,
    black: number
  },
  received_votes: Vote[] | null,
}

export type MatchSummary = {
  id: number,
  starting_at: Date,
  my_side: Side | null,
  available_slots: number,
  points: MatchPoints | null,
}

type MatchPoints = {
  white: number,
  black: number
}

export const enum Side {
  WHITE = 'white',
  BLACK = 'black'
}

// these are just guesses :)
export const enum MatchStatus {
  OPEN_SCHEDULED = 1,
  VOTING = 3,
  CONCLUDED = 4,
  FULL_SCHEDULED = 5,
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
    },
    received_votes: receivedVotesFrom(matchDetails)
  }
}

export function matchSummaryFrom(matchDetails: any): MatchSummary {
  return {
    id: matchDetails.id,
    starting_at: new Date(matchDetails.start_datetime),
    my_side: mySideFrom(matchDetails),
    available_slots: matchDetails.available_slots,
    points: matchPointsFrom(matchDetails)
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

function receivedVotesFrom(matchDetails: any) {
  if (!matchDetails.me.is_playing)
    return null;
  if (!hasBeenPlayed(matchDetails))
    return null;

  const votesNodes = matchDetails.ref_player.received_votes as any[]
  return votesNodes.map(voteFrom)
}

function matchPointsFrom(matchDetails: any): MatchPoints | null {
  if (!hasBeenPlayed(matchDetails))
    return null;

  return {
    white: matchDetails.side_1.points,
    black: matchDetails.side_2.points,
  }
}

function hasBeenPlayed(matchDetails: any) {
  return [
    MatchStatus.VOTING,
    MatchStatus.CONCLUDED
  ].includes(matchDetails.status)
}
