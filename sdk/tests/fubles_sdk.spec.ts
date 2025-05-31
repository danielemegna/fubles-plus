import { describe, expect, test } from 'vitest';
import FublesSDK, { AutheticatedUser } from '../src/fubles_sdk';
import { MatchDetails, MatchSummary, Side } from '../src/match';

// set TEST_BEARER_TOKEN env variabile in order to run this tests
const describe_withtoken = process.env.TEST_BEARER_TOKEN ? describe : describe.skip;

describe_withtoken('Fubles SDK integration tests', () => {

  const sdk = new FublesSDK(validAuthenticatedUser())

  describe('match summaries reading', () => {

    test('get my next scheduled matches summaries', async () => {
      const matches: MatchSummary[] = await sdk.getMyNextScheduledMatches()
      expect(matches).not.to.be.empty
      const nextMatch = matches[0]
      expect(nextMatch.mySide).not.toBeNull()
      expect(nextMatch.avgReceivedVote).toBeNull()
      expect(nextMatch.points).toBeNull()
    })

    test('get next scheduled matches of another user', async () => {
      const matches: MatchSummary[] = await sdk.getNextScheduledMatchesFor(1044)
      expect(matches).not.to.be.empty
      const nextMatch = matches[0]
      expect(nextMatch.mySide).not.toBeNull()
      expect(nextMatch.avgReceivedVote).toBeNull()
      expect(nextMatch.points).toBeNull()
    })

    test('get my last played matches summaries', async () => {
      const matches: MatchSummary[] = await sdk.getMyLastPlayedMatches()
      expect(matches).toHaveLength(4)
      const pastMatch = matches[3]
      expect(pastMatch.availableSlots).toBe(0)
      expect(pastMatch.avgReceivedVote).not.toBeNull()
      expect(pastMatch.mySide).not.toBeNull()
      expect(pastMatch.points).not.toBeNull()
    })

    test('get last played matches summaries of another user', async () => {
      const matches: MatchSummary[] = await sdk.getLastPlayedMatchesFor(1044)
      expect(matches).toHaveLength(4)
      const pastMatch = matches[3]
      expect(pastMatch.availableSlots).toBe(0)
      expect(pastMatch.avgReceivedVote).not.toBeNull()
      expect(pastMatch.mySide).not.toBeNull()
      expect(pastMatch.points).not.toBeNull()
    })

  })

  describe('match details reading', () => {

    test('try to get unexisting match details', async () => {
      await expect(async () =>
        sdk.matchDetails(1000000)
      ).rejects.toThrowError('Match 1000000 not found !')
    })

    test('get a past played match details', async () => {
      const match: MatchDetails = await sdk.matchDetails(3009514)

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
      const match: MatchDetails = await sdk.matchDetails(3022886)

      expect(match.id).toBe(3022886)
      expect(match.available_slots.white).toBe(0)
      expect(match.available_slots.black).toBe(0)
      expect(match.my_side).toBeNull()
      expect(match.starting_at.toISOString()).toBe("2024-01-09T19:00:00.000Z")
      expect(match.points).toStrictEqual({ white: 9, black: 14 })
      expect(match.received_votes).toBeNull()
    })

    test('get a past match details played as another user', async () => {
      const match: MatchDetails = await sdk.matchDetailsAsAnotherUser(3022886, 774702)

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

    test.skip('follow and unfollow an already played match', async () => {
      await sdk.matchFollow(2998153)
      await sdk.matchUnfollow(2998153)
    })

    test('unfollow an already played match never followed', async () => {
      await sdk.matchUnfollow(3034162)
    })

    test('try to follow or unfollow unexisting match', async () => {
      const unexistingMatchId = 1000000;

      await expect(async () =>
        sdk.matchFollow(unexistingMatchId)
      ).rejects.toThrow('Match 1000000 not found !')

      await expect(async () =>
        sdk.matchUnfollow(unexistingMatchId)
      ).rejects.toThrow('Match 1000000 not found !')
    })

  })

  describe('match enrolling', () => {

    test('enroll to already played match do not throws errors', async () => {
      await sdk.matchEnroll(2498015, Side.WHITE)
    })

    test('try to change side in already played match', async () => {
      await expect(async () =>
        sdk.matchEnroll(2498015, Side.BLACK)
      ).rejects.toThrow('Operation not allowed in match 2498015, cannot change side')
    })

    test('try to enroll to completed match not played', async () => {
      await expect(async () =>
        sdk.matchEnroll(3038184, Side.WHITE)
      ).rejects.toThrow('Operation not allowed, match 3038184 not subscribable')
    })

    test('try to enroll to unexisting match', async () => {
      await expect(async () =>
        sdk.matchEnroll(1000000, Side.BLACK)
      ).rejects.toThrow('Match 1000000 not found !')
    })

    test('try to unenroll from already played match', async () => {
      await expect(async () =>
        sdk.matchUnenroll(2498015)
      ).rejects.toThrow('Cannot unenroll user from match 2498015, forbidden')
    })

    test('try to unenroll to completed match not played', async () => {
      await expect(async () =>
        sdk.matchUnenroll(3038184)
      ).rejects.toThrow('Cannot unenroll user from match 3038184, user not present')
    })

    test('try to unenroll from unexisting match', async () => {
      await expect(async () =>
        sdk.matchUnenroll(1000000)
      ).rejects.toThrow('Match 1000000 not found !')
    })

  })

})

function validAuthenticatedUser(): AutheticatedUser {
  return {
    id: process.env.TEST_USER_ID ? parseInt(process.env.TEST_USER_ID) : 55576,
    bearerToken: process.env.TEST_BEARER_TOKEN!
  }
}
