import 'jest-extended';
import FublesAPI, { AutheticatedUser } from '../src/fubles_api';
import { MatchDetails, MatchSummary, Side } from '../src/match';

// set TEST_BEARER_TOKEN env variabile in order to run this tests
const describe_withtoken = process.env.TEST_BEARER_TOKEN ? describe : describe.skip;

describe_withtoken('Fubles API integration tests', () => {

  test('get my next scheduled matches summaries', async () => {
    const api = new FublesAPI(validAuthenticatedUser())

    const matches: MatchSummary[] = await api.getMyNextScheduledMatches()

    expect(matches).not.toBeEmpty()
  })

  test('get my last played matches summaries', async () => {
    const api = new FublesAPI(validAuthenticatedUser())

    const matches: MatchSummary[] = await api.getMyLastPlayedMatches()

    expect(matches).toHaveLength(4)
  })

  test('get last played matches summaries of another user', async () => {
    const api = new FublesAPI(validAuthenticatedUser())

    const matches: MatchSummary[] = await api.getLastPlayedMatchesFor(774702)

    expect(matches).toHaveLength(4)
  })

  test('get a past played match details', async () => {
    const api = new FublesAPI(validAuthenticatedUser())

    const match: MatchDetails = await api.matchDetails(3009514)

    expect(match.id).toBe(3009514)
    expect(match.title).toBe("Calcio a 5")
    expect(match.starting_at.toISOString()).toBe("2023-11-03T19:00:00.000Z")
    expect(match.structure_name).toBe("Sport Time Corsico")
    expect(match.my_side).toBe(Side.BLACK)
    expect(match.available_slots.white).toBe(0)
    expect(match.available_slots.black).toBe(0)
    expect(match.received_votes).not.toBeNull()
    expect(match.received_votes).toHaveLength(5)
    expect(match.received_votes).toContainEqual({"vote": 7.5, "voterId": 196726, "voterName": "Simone Ferraro"})
    expect(match.points).toStrictEqual({ white: 10, black: 11})
  })

  test('get a past match details played without me', async () => {
    const api = new FublesAPI(validAuthenticatedUser())

    const match: MatchDetails = await api.matchDetails(3022886)

    expect(match.id).toBe(3022886)
    expect(match.available_slots.white).toBe(0)
    expect(match.available_slots.black).toBe(0)
    expect(match.my_side).toBeNil()
    expect(match.starting_at.toISOString()).toBe("2024-01-09T19:00:00.000Z")
    expect(match.points).toStrictEqual({ white: 9, black: 14})
    expect(match.received_votes).toBeNil()
  })

  test('get a past match details played as another user', async () => {
    const api = new FublesAPI(validAuthenticatedUser())

    const match: MatchDetails = await api.matchDetailsAsAnotherUser(3022886, 774702)

    expect(match.id).toBe(3022886)
    expect(match.available_slots.white).toBe(0)
    expect(match.available_slots.black).toBe(0)
    expect(match.my_side).toBe(Side.BLACK)
    expect(match.starting_at.toISOString()).toBe("2024-01-09T19:00:00.000Z")
    expect(match.points).toStrictEqual({ white: 9, black: 14})
    expect(match.received_votes).toHaveLength(4)
    expect(match.received_votes).toContainEqual({"vote": 9, "voterId": 948124, "voterName": "Cristian Bonvegna"})
  })

})

function validAuthenticatedUser(): AutheticatedUser {
  return {
    id: process.env.TEST_USER_ID ? parseInt(process.env.TEST_USER_ID) : 55576,
    bearerToken: process.env.TEST_BEARER_TOKEN!
  }
}
