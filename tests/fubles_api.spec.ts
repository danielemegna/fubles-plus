import 'jest-extended';
import FublesAPI, { AutheticatedUser } from '../src/fubles_api';
import { MatchDetails, MatchSummary, Side } from '../src/match';
import { Vote } from '../src/vote';

// set TEST_BEARER_TOKEN env variabile in order to run this tests
const describe_withtoken = process.env.TEST_BEARER_TOKEN ? describe : describe.skip;

describe_withtoken('Fubles API integration tests', () => {

  test('get my next scheduled matches', async () => {
    const api = new FublesAPI(validAuthenticatedUser())

    const matches: MatchSummary[] = await api.getMyNextScheduledMatches()

    expect(matches).not.toBeEmpty()
  })

  test('get received votes in a match', async () => {
    const api = new FublesAPI(validAuthenticatedUser())

    const votes: Vote[] = await api.receivedVotes(3015820)

    expect(votes).not.toBeEmpty()
    expect(votes).toContainEqual({
      voterId: 877011,
      voterName: 'Alessandro Pulvirenti',
      vote: 7
    })
  })

  test('get match details', async () => {
    const api = new FublesAPI(validAuthenticatedUser())

    const match: MatchDetails = await api.matchDetails(3009514)

    expect(match.id).toBe(3009514)
    expect(match.available_slots).toBe(0)
    expect(match.my_side).toBe(Side.BLACK)
    expect(match.starting_at.toISOString()).toBe("2023-11-03T19:00:00.000Z")
  })

})

function validAuthenticatedUser(): AutheticatedUser {
  return {
    id: process.env.TEST_USER_ID ?? "55576",
    bearerToken: process.env.TEST_BEARER_TOKEN!
  }
}
