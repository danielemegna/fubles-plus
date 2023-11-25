import 'jest-extended';
import FublesAPI, { AutheticatedUser } from '../src/fubles_api';
import { Match, Side } from '../src/match';
import { Vote } from '../src/vote';

// set a valid bearerToken in order to run this tests
describe.skip('Fubles API integration tests', () => {

  test('get my next scheduled matches', async () => {
    const api = new FublesAPI(validAuthenticatedUser())

    const matches: Match[] = await api.getMyNextScheduledMatches()

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

    const match: Match = await api.matchDetails(3015825)

    expect(match.id).toBe(3015825)
    expect(match.available_slots).toBe(0)
    expect(match.side).toBe(Side.BLACK)
    expect(match.starting_at.toISOString()).toBe("2023-11-28T19:00:00.000Z")
  })

})

function validAuthenticatedUser(): AutheticatedUser {
  return {
    id: "55576",
    bearerToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
