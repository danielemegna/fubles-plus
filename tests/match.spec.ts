import 'jest-extended';
import { Side, matchSummaryFrom, matchDetailsFrom } from '../src/match';
import scheduledMatchSample from './api_samples/scheduled_match.json';
import matchDetailsFullWithMe from './api_samples/match_details/full_with_me.json';
import matchDetailsFullWithoutMe from './api_samples/match_details/full_without_me.json';
import matchDetailsOpenWithoutMe from './api_samples/match_details/open_without_me.json';

describe('build match details from api object', () => {

  test('full with me match', async () => {
    const match = matchDetailsFrom(matchDetailsFullWithMe)

    expect(match.id).toBe(3015825)
    expect(match.available_slots.white).toBe(0)
    expect(match.available_slots.black).toBe(0)
    expect(match.my_side).toBe(Side.BLACK)
    expect(match.starting_at.toISOString()).toBe("2023-11-28T19:00:00.000Z")
  })

  test('full without me match', async () => {
    const match = matchDetailsFrom(matchDetailsFullWithoutMe)

    expect(match.id).toBe(3017265)
    expect(match.available_slots.white).toBe(0)
    expect(match.available_slots.black).toBe(0)
    expect(match.my_side).toBeNull()
    expect(match.starting_at.toISOString()).toBe("2023-11-30T18:00:00.000Z")
  })

  test('open without me match', async () => {
    const match = matchDetailsFrom(matchDetailsOpenWithoutMe)

    expect(match.id).toBe(3017267)
    expect(match.available_slots.white).toBe(4)
    expect(match.available_slots.black).toBe(2)
    expect(match.my_side).toBeNull()
    expect(match.starting_at.toISOString()).toBe("2023-12-07T18:00:00.000Z")
  })

})

describe('build match summary from api object', () => {

  test('has properly fields values', async () => {
    const match = matchSummaryFrom(scheduledMatchSample)

    expect(match.id).toBe(3004643)
    expect(match.available_slots).toBe(2)
    expect(match.my_side).toBe(Side.WHITE)
    expect(match.starting_at.toISOString()).toBe("2023-09-11T18:00:00.000Z")
  })

  test('has properly my_side field value', async () => {
    const onBlackSide = {
      ...scheduledMatchSample,
      ref_player: {
        ...scheduledMatchSample.ref_player,
        side_key: 2
      }
    }

    const match = matchSummaryFrom(onBlackSide)

    expect(match.my_side).toBe(Side.BLACK)
  })

})
