import { Vote, voteFrom } from "./vote"

// TODO every domain types should have camel-case fields
export type MatchDetails = {
  id: number,
  title: string,
  starting_at: Date,
  structure_name: string,
  my_side: Side | null,
  available_slots: {
    white: number,
    black: number
  },
  received_votes: Vote[] | null,
  points: MatchPoints | null,
}

export type MatchSummary = {
  id: number,
  startingAt: Date,
  title: string,
  structure: Structure,
  mySide: Side | null,
  availableSlots: number,
  points: MatchPoints | null,
  avgReceivedVote: number | null
  levelVariation: number | null
}

type MatchPoints = {
  white: number,
  black: number
}

type Structure = {
  name: string,
  address: string
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
    title: matchDetails.title,
    starting_at: new Date(matchDetails.start_datetime),
    structure_name: matchDetails.structure.name,
    my_side: mySideFrom(matchDetails),
    available_slots: {
      white: 5 - whitePlayers,
      black: 5 - blackPlayers
    },
    received_votes: receivedVotesFrom(matchDetails),
    points: matchPointsFrom(matchDetails)
  }
}

export function matchDetailsAsAnotherUser(matchDetails: any, userId: number): MatchDetails {
  const result = matchDetailsFrom(matchDetails);
  result.my_side = sideFor(matchDetails, userId);
  result.received_votes = receivedVotesFor(matchDetails, userId);
  return result;
}

export function matchSummaryFrom(matchSummary: any): MatchSummary {
  return {
    id: matchSummary.id,
    title: matchSummary.title,
    startingAt: new Date(matchSummary.start_datetime),
    structure: {
      name: matchSummary.structure.name,
      address: matchSummary.structure.address,
    },
    mySide: mySideFrom(matchSummary),
    availableSlots: matchSummary.available_slots,
    points: matchPointsFrom(matchSummary),
    avgReceivedVote: matchSummary.ref_player.avg_vote ?? null,
    levelVariation: levelVariationFrom(matchSummary)
  }
}

function mySideFrom(match: any): Side | null {
  if (!match.ref_player)
    return null;

  return match.ref_player.side_key === 1 ? Side.WHITE : Side.BLACK
}

function sideFor(matchDetails: any, userId: number): Side | null {
  const user = findUserIn(matchDetails, userId);
  if (user == null) return null;

  return user.side_key === 1 ? Side.WHITE : Side.BLACK
}

function playingPlayersCountFor(side: any): number {
  return side.players.filter((p: any) => p.status == 4).length
}

function receivedVotesFrom(matchDetails: any): Vote[] | null {
  if (!matchDetails.me.is_playing)
    return null;
  if (!hasBeenPlayed(matchDetails))
    return null;

  const votesNodes = matchDetails.ref_player.received_votes as any[]
  return votesNodes.map(voteFrom)
}

function receivedVotesFor(matchDetails: any, userId: number): Vote[] | null {
  if (!hasBeenPlayed(matchDetails))
    return null;

  const user = findUserIn(matchDetails, userId);
  return user?.received_votes.map(voteFrom)
}

function findUserIn(matchDetails: any, userId: number): any | null {
  const found = [
    ...matchDetails.side_1.players,
    ...matchDetails.side_2.players
  ].find((player: any) => player.user.id == userId)
  return found ?? null;
}

function matchPointsFrom(match: any): MatchPoints | null {
  if (!hasBeenPlayed(match))
    return null;

  return {
    white: match.side_1.points,
    black: match.side_2.points,
  }
}

function levelVariationFrom(matchSummary: any): number | null {
  // check for avg_vote since level_variation seems always present
  if (matchSummary.ref_player?.avg_vote == null)
    return null

  if (!hasBeenPlayed(matchSummary))
    return null

  return matchSummary.ref_player.level_variation
}

function hasBeenPlayed(matchDetails: any): boolean {
  if ([MatchStatus.VOTING, MatchStatus.CONCLUDED].includes(matchDetails.status))
    return true

  if (matchDetails.me.can_report_score)
    return true

  if (new Date(matchDetails.start_datetime) < new Date())
    return true

  return false
}
