export type Vote = {
  voterId: string,
  voterName: string,
  vote: number
}

export function voteFrom(receivedVote: any): Vote {
  const voter = receivedVote.voter
  return {
    voterId: voter.id,
    voterName: voter.first_name + " " + voter.last_name,
    vote: receivedVote.vote
  }
}
