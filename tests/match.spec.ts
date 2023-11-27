import 'jest-extended';
import { Side, matchDetailsFrom, matchSummaryFrom } from '../src/match';
import fullWithMeMatchDetails from './api_samples/match_details/full_with_me.json';
import fullWithoutMeMatchDetails from './api_samples/match_details/full_without_me.json';
import openWithoutMeMatchDetails from './api_samples/match_details/open_without_me.json';
import playedWithMeMatchDetails from './api_samples/match_details/played_with_me.json';
import openWithMeMatchSummary from './api_samples/match_summary/open_with_me.json';

describe('build match details from api object', () => {

  test('full with me match', async () => {
    const match = matchDetailsFrom(fullWithMeMatchDetails)

    expect(match.id).toBe(3015825)
    expect(match.available_slots.white).toBe(0)
    expect(match.available_slots.black).toBe(0)
    expect(match.my_side).toBe(Side.BLACK)
    expect(match.starting_at.toISOString()).toBe("2023-11-28T19:00:00.000Z")
    expect(match.received_votes).toEqual([]) // wrong behavior, this should be null
  })

  test('full without me match', async () => {
    const match = matchDetailsFrom(fullWithoutMeMatchDetails)

    expect(match.id).toBe(3017265)
    expect(match.available_slots.white).toBe(0)
    expect(match.available_slots.black).toBe(0)
    expect(match.my_side).toBeNull()
    expect(match.starting_at.toISOString()).toBe("2023-11-30T18:00:00.000Z")
    expect(match.received_votes).toBeNull()
  })

  test('open without me match', async () => {
    const match = matchDetailsFrom(openWithoutMeMatchDetails)

    expect(match.id).toBe(3017267)
    expect(match.available_slots.white).toBe(4)
    expect(match.available_slots.black).toBe(2)
    expect(match.my_side).toBeNull()
    expect(match.starting_at.toISOString()).toBe("2023-12-07T18:00:00.000Z")
    expect(match.received_votes).toBeNull()
  })

  test('played with me match', async () => {
    const match = matchDetailsFrom(playedWithMeMatchDetails)

    expect(match.id).toBe(3009507)
    expect(match.available_slots.white).toBe(0)
    expect(match.available_slots.black).toBe(0)
    expect(match.my_side).toBe(Side.WHITE)
    expect(match.starting_at.toISOString()).toBe("2023-10-25T18:00:00.000Z")
    expect(match.received_votes).toHaveLength(8)
    expect(match.received_votes).toContainEqual({ "vote": 6.5, "voterId": 986622, "voterName": "Oliviero Giroud" })
  })

})

describe('build match summary from api object', () => {

  test('has properly fields values', async () => {
    const match = matchSummaryFrom(openWithMeMatchSummary)

    expect(match.id).toBe(3004643)
    expect(match.available_slots).toBe(2)
    expect(match.my_side).toBe(Side.WHITE)
    expect(match.starting_at.toISOString()).toBe("2023-09-11T18:00:00.000Z")
  })

  test('has properly my_side field value', async () => {
    const onBlackSide = {
      ...openWithMeMatchSummary,
      ref_player: {
        ...openWithMeMatchSummary.ref_player,
        side_key: 2
      }
    }

    const match = matchSummaryFrom(onBlackSide)

    expect(match.my_side).toBe(Side.BLACK)
  })

})
