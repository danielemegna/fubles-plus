import 'jest-extended';
import FublesAPI, { AutheticatedUser, MatchEnrollError, MatchNotFoundError } from '../src/fubles_api';
import { MatchDetails, MatchSummary, Side } from '../src/match';

// set TEST_BEARER_TOKEN env variabile in order to run this tests
const describe_withtoken = process.env.TEST_BEARER_TOKEN ? describe : describe.skip;

describe_withtoken('Fubles API integration tests', () => {

  const api = new FublesAPI(validAuthenticatedUser())

  describe('match summaries reading', () => {

    test('get my next scheduled matches summaries', async () => {
      const matches: MatchSummary[] = await api.getMyNextScheduledMatches()
      expect(matches).not.toBeEmpty()
    })

    test('get my last played matches summaries', async () => {
      const matches: MatchSummary[] = await api.getMyLastPlayedMatches()
      expect(matches).toHaveLength(4)
    })

    test('get last played matches summaries of another user', async () => {
      const matches: MatchSummary[] = await api.getLastPlayedMatchesFor(774702)
      expect(matches).toHaveLength(4)
    })

  })

  describe('match details reading', () => {

    test('try to get unexisting match details', async () => {
      await expect(async () =>
        api.matchDetails(1000000)
      ).rejects.toThrowWithMessage(MatchNotFoundError, 'Match 1000000 not found !')
    })

    test('get a past played match details', async () => {
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
      expect(match.received_votes).toContainEqual({ "vote": 7.5, "voterId": 196726, "voterName": "Simone Ferraro" })
      expect(match.points).toStrictEqual({ white: 10, black: 11 })
    })

    test('get a past match details played without me', async () => {
      const match: MatchDetails = await api.matchDetails(3022886)

      expect(match.id).toBe(3022886)
      expect(match.available_slots.white).toBe(0)
      expect(match.available_slots.black).toBe(0)
      expect(match.my_side).toBeNil()
      expect(match.starting_at.toISOString()).toBe("2024-01-09T19:00:00.000Z")
      expect(match.points).toStrictEqual({ white: 9, black: 14 })
      expect(match.received_votes).toBeNil()
    })

    test('get a past match details played as another user', async () => {
      const match: MatchDetails = await api.matchDetailsAsAnotherUser(3022886, 774702)

      expect(match.id).toBe(3022886)
      expect(match.available_slots.white).toBe(0)
      expect(match.available_slots.black).toBe(0)
      expect(match.my_side).toBe(Side.BLACK)
      expect(match.starting_at.toISOString()).toBe("2024-01-09T19:00:00.000Z")
      expect(match.points).toStrictEqual({ white: 9, black: 14 })
      expect(match.received_votes).toHaveLength(4)
      expect(match.received_votes).toContainEqual({ "vote": 9, "voterId": 948124, "voterName": "Cristian Bonvegna" })
    })

  })

  describe('match following', () => {

    test('follow and unfollow an already played match', async () => {
      await api.matchFollow(2998153)
      await api.matchUnfollow(2998153)
    })

    test('unfollow an already played match never followed', async () => {
      await api.matchUnfollow(3034162)
    })

    test('try to follow or unfollow unexisting match', async () => {
      const unexistingMatchId = 1000000;

      await expect(async () =>
        api.matchFollow(unexistingMatchId)
      ).rejects.toThrowWithMessage(MatchNotFoundError, 'Match 1000000 not found !')

      await expect(async () =>
        api.matchUnfollow(unexistingMatchId)
      ).rejects.toThrowWithMessage(MatchNotFoundError, 'Match 1000000 not found !')
    })

  })

  describe('match enrolling', () => {

    test('enroll to already played match do not throws errors', async () => {
      await api.matchEnroll(2498015, Side.WHITE)
    })

    test('try to change side in already played match', async () => {
      await expect(async () =>
        api.matchEnroll(2498015, Side.BLACK)
      ).rejects.toThrowWithMessage(MatchEnrollError, 'Operation not allowed in match 2498015, cannot change side')
    })

    test('try to enroll to completed match not played', async () => {
      await expect(async () =>
        api.matchEnroll(3038184, Side.WHITE)
      ).rejects.toThrowWithMessage(MatchEnrollError, 'Operation not allowed, match 3038184 not subscribable')
    })

    test('try to enroll to unexisting match', async () => {
      await expect(async () =>
        api.matchEnroll(1000000, Side.BLACK)
      ).rejects.toThrowWithMessage(MatchNotFoundError, 'Match 1000000 not found !')
    })

    test('try to unenroll from already played match', async () => {
      await expect(async () =>
        api.matchUnenroll(2498015)
      ).rejects.toThrowWithMessage(MatchEnrollError, 'Cannot unenroll user from match 2498015, forbidden')
    })

    test('try to unenroll to completed match not played', async () => {
      await expect(async () =>
        api.matchUnenroll(3038184)
      ).rejects.toThrowWithMessage(MatchEnrollError, 'Cannot unenroll user from match 3038184, user not present')
    })

    test('try to unenroll from unexisting match', async () => {
      await expect(async () =>
        api.matchUnenroll(1000000)
      ).rejects.toThrowWithMessage(MatchNotFoundError, 'Match 1000000 not found !')
    })

  })

})

function validAuthenticatedUser(): AutheticatedUser {
  return {
    id: process.env.TEST_USER_ID ? parseInt(process.env.TEST_USER_ID) : 55576,
    bearerToken: process.env.TEST_BEARER_TOKEN!
  }
}
