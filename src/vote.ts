export type Vote = {
  voterId: string,
  voterName: string,
  vote: number
}

export function voteFrom(obj: any): Vote {
  return {
    voterId: obj.voter.id,
    voterName: obj.voter.first_name + " " + obj.voter.last_name,
    vote: obj.vote
  }
}
