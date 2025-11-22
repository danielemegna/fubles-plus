import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { Side, matchDetailsAsAnotherUser, matchDetailsFrom, matchSummaryFrom } from '../src/match';
import fullWithMeMatchDetails from './api_samples/match_details/full_with_me.json';
import fullWithoutMeMatchDetails from './api_samples/match_details/full_without_me.json';
import justFinishedWithMeDetails from './api_samples/match_details/just_finished_with_me.json';
import openWithoutMeMatchDetails from './api_samples/match_details/open_without_me.json';
import playedWithMeMatchDetails from './api_samples/match_details/played_with_me.json';
import playedWithoutMeMatchDetails from './api_samples/match_details/played_without_me.json';
import justFinishedWithMeSummary from './api_samples/match_summary/just_finished_with_me.json';
import openWithMeMatchSummary from './api_samples/match_summary/open_with_me.json';
import playedWithMeMatchSummary from './api_samples/match_summary/played_with_me.json';
import playedWithoutMeMatchSummary from './api_samples/match_summary/played_without_me.json';

describe('build match details from api object', () => {

  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-12T20:45:00+02:00'))
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  test('full with me match', async () => {
    const match = matchDetailsFrom(fullWithMeMatchDetails)

    expect(match.id).toBe(3015825)
    expect(match.available_slots.white).toBe(0)
    expect(match.available_slots.black).toBe(0)
    expect(match.my_side).toBe(Side.BLACK)
    expect(match.starting_at.toISOString()).toBe("2025-06-18T19:00:00.000Z")
    expect(match.received_votes).toBeNull()
    expect(match.points).toBeNull()
  })

  test('full without me match', async () => {
    const match = matchDetailsFrom(fullWithoutMeMatchDetails)

    expect(match.id).toBe(3017265)
    expect(match.available_slots.white).toBe(0)
    expect(match.available_slots.black).toBe(0)
    expect(match.my_side).toBeNull()
    expect(match.starting_at.toISOString()).toBe("2025-06-17T18:00:00.000Z")
    expect(match.received_votes).toBeNull()
    expect(match.points).toBeNull()
  })

  test('open without me match', async () => {
    const match = matchDetailsFrom(openWithoutMeMatchDetails)

    expect(match.id).toBe(3017267)
    expect(match.available_slots.white).toBe(4)
    expect(match.available_slots.black).toBe(2)
    expect(match.my_side).toBeNull()
    expect(match.starting_at.toISOString()).toBe("2025-06-20T17:30:00.000Z")
    expect(match.received_votes).toBeNull()
    expect(match.points).toBeNull()
  })

  describe('played with me match', () => {

    test('as myself', async () => {
      const match = matchDetailsFrom(playedWithMeMatchDetails)

      expect(match.id).toBe(3009507)
      expect(match.title).toBe("Calcio a 5")
      expect(match.starting_at.toISOString()).toBe("2023-10-25T18:00:00.000Z")
      expect(match.structure_name).toBe("Sport Time Corsico")
      expect(match.my_side).toBe(Side.WHITE)
      expect(match.available_slots.white).toBe(0)
      expect(match.available_slots.black).toBe(0)
      expect(match.received_votes).toHaveLength(8)
      expect(match.received_votes).toContainEqual({ "vote": 6.5, "voterId": 986622, "voterName": "Oliviero Giroud" })
      expect(match.points).toStrictEqual({ white: 7, black: 6 })
    })

    test('as another user', async () => {
      const matchAsAnotherUser = matchDetailsAsAnotherUser(playedWithMeMatchDetails, 688144)
      const matchAsNonPlayingUser = matchDetailsAsAnotherUser(playedWithMeMatchDetails, 999999)

      for (let matchDetails of [matchAsAnotherUser, matchAsNonPlayingUser]) {
        expect(matchDetails.id).toBe(3009507)
        expect(matchDetails.available_slots.white).toBe(0)
        expect(matchDetails.available_slots.black).toBe(0)
        expect(matchDetails.starting_at.toISOString()).toBe("2023-10-25T18:00:00.000Z")
        expect(matchDetails.points).toStrictEqual({ white: 7, black: 6 })
      }

      expect(matchAsAnotherUser.my_side).toBe(Side.BLACK)
      expect(matchAsAnotherUser.received_votes).toContainEqual({ "vote": 7, "voterId": 98353, "voterName": "Beppe Tarantino" })

      expect(matchAsNonPlayingUser.my_side).toBeNull();
      expect(matchAsNonPlayingUser.received_votes).toBeUndefined();
    })

    test('just finished as myself', async () => {
      const match = matchDetailsFrom(justFinishedWithMeDetails)

      expect(match.id).toBe(3083220)
      expect(match.title).toBe("Calcio a 5")
      expect(match.starting_at.toISOString()).toBe("2025-06-12T17:30:00.000Z")
      expect(match.structure_name).toBe("Sport Time Corsico")
      expect(match.my_side).toBe(Side.BLACK)
      expect(match.available_slots.white).toBe(0)
      expect(match.available_slots.black).toBe(0)
      expect(match.received_votes).toHaveLength(2)
      expect(match.received_votes).toContainEqual({ "vote": 6.5, "voterId": 992111, "voterName": "Antonio Turco" })
      expect(match.received_votes).toContainEqual({ "vote": 6.5, "voterId": 921880, "voterName": "Alessio Crudo" })
      expect(match.points).toStrictEqual({ white: 14, black: 5 })
    })
  })

  describe('played without me match', () => {

    test('as myself', async () => {
      const match = matchDetailsFrom(playedWithoutMeMatchDetails)

      expect(match.id).toBe(3022562)
      expect(match.title).toBe("Calcio a 5 • Coperto")
      expect(match.starting_at.toISOString()).toBe("2024-01-09T19:00:00.000Z")
      expect(match.structure_name).toBe("Sport Time Corsico")
      expect(match.my_side).toBeNull()
      expect(match.available_slots.white).toBe(0)
      expect(match.available_slots.black).toBe(0)
      expect(match.received_votes).toBeNull()
      expect(match.points).toStrictEqual({ white: 9, black: 14 })
    })

    test('as another user', async () => {
      const matchAsFirstUser = matchDetailsAsAnotherUser(playedWithoutMeMatchDetails, 874716)
      const matchAsSecondUser = matchDetailsAsAnotherUser(playedWithoutMeMatchDetails, 718115)
      const matchAsNonPlayingUser = matchDetailsAsAnotherUser(playedWithoutMeMatchDetails, 999999)

      for (let matchDetails of [matchAsFirstUser, matchAsSecondUser, matchAsNonPlayingUser]) {
        expect(matchDetails.id).toBe(3022562)
        expect(matchDetails.available_slots.white).toBe(0)
        expect(matchDetails.available_slots.black).toBe(0)
        expect(matchDetails.starting_at.toISOString()).toBe("2024-01-09T19:00:00.000Z")
        expect(matchDetails.points).toStrictEqual({ white: 9, black: 14 })
      }

      expect(matchAsFirstUser.my_side).toBe(Side.BLACK)
      expect(matchAsFirstUser.received_votes).toHaveLength(4)
      expect(matchAsFirstUser.received_votes).toContainEqual({ "vote": 9.5, "voterId": 997122, "voterName": "Alessandro Puntazza" })
      expect(matchAsFirstUser.received_votes).toContainEqual({ "vote": 9, "voterId": 919328, "voterName": "Donato Virgilio" })

      expect(matchAsSecondUser.my_side).toBe(Side.WHITE)
      expect(matchAsSecondUser.received_votes).toHaveLength(4)
      expect(matchAsSecondUser.received_votes).toContainEqual({ "vote": 7.5, "voterId": 874716, "voterName": "Tommaso Forte" })
      expect(matchAsSecondUser.received_votes).toContainEqual({ "vote": 7.5, "voterId": 928229, "voterName": "Cristian Benvenuto" })

      expect(matchAsNonPlayingUser.my_side).toBeNull();
      expect(matchAsNonPlayingUser.received_votes).toBeUndefined();
    })

  })


})

describe('build match summary from api object', () => {

  test('has proper match values', async () => {
    const match = matchSummaryFrom(openWithMeMatchSummary)

    expect(match.id).toBe(3004643)
    expect(match.startingAt.toISOString()).toBe("2125-06-23T18:00:00.000Z")
    expect(match.title).toBe("Calcio a 5")
  })

  test('has proper structure values', async () => {
    const match = matchSummaryFrom(openWithMeMatchSummary)

    expect(match.structure).toStrictEqual({
      name: "Sport Time Corsico",
      address: "Via Ammiraglio dei Conti, 16, 20094 Corsico MI, Italia",
    })
  })

  test('has proper mySide field value', async () => {
    let match = matchSummaryFrom(openWithMeMatchSummary)
    expect(match.mySide).toBe(Side.WHITE)

    const onBlackSide = {
      ...openWithMeMatchSummary,
      ref_player: {
        ...openWithMeMatchSummary.ref_player,
        side_key: 2
      }
    }
    match = matchSummaryFrom(onBlackSide)
    expect(match.mySide).toBe(Side.BLACK)
  })

  test('open future match has available slots, null points, and null vote', () => {
    const match = matchSummaryFrom(openWithMeMatchSummary)

    expect(match.availableSlots).toBe(2)
    expect(match.points).toBeNull()
    expect(match.avgReceivedVote).toBeNull()
  })

  test('played match has scored points', async () => {
    const match = matchSummaryFrom(playedWithMeMatchSummary)

    expect(match.id).toBe(3017993)
    expect(match.availableSlots).toBe(0)
    expect(match.mySide).toBe(Side.WHITE)
    expect(match.points).toStrictEqual({ white: 7, black: 9 })
    expect(match.avgReceivedVote).toBe(7.3)
  })

  test('played without me should have side and vote of reference player', async () => {
    const match = matchSummaryFrom(playedWithoutMeMatchSummary)

    expect(match.id).toBe(3094995)
    expect(match.availableSlots).toBe(0)
    expect(match.mySide).toBe(Side.WHITE)
    expect(match.points).toStrictEqual({ white: 12, black: 11 })
    expect(match.avgReceivedVote).toBe(7.6)
  })

  test('just finished played match has null vote but evaluated points', async () => {
    const match = matchSummaryFrom(justFinishedWithMeSummary)

    expect(match.id).toBe(3083226)
    expect(match.availableSlots).toBe(0)
    expect(match.mySide).toBe(Side.WHITE)
    expect(match.points).toStrictEqual({ white: 12, black: 13 })
    expect(match.avgReceivedVote).toBeNull()
  })
})
