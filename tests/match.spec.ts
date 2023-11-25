import 'jest-extended';
import { Side, matchFrom } from '../src/match';
import scheduledMatchSample from './api_samples/scheduled_match.json';
import matchDetailsFullWithMe from './api_samples/match_details/full_with_me.json';
import matchDetailsFullWithoutMe from './api_samples/match_details/full_without_me.json';

describe('Match', () => {

  test('build from scheduled match api object', async () => {
    const match = matchFrom(scheduledMatchSample)

    expect(match.id).toBe(3004643)
    expect(match.available_slots).toBe(2)
    expect(match.my_side).toBe(Side.WHITE)
    expect(match.starting_at.toISOString()).toBe("2023-09-11T18:00:00.000Z")
  })

  test('build from match details full with me api object', async () => {
    const match = matchFrom(matchDetailsFullWithMe)

    expect(match.id).toBe(3015825)
    expect(match.available_slots).toBe(0)
    expect(match.my_side).toBe(Side.BLACK)
    expect(match.starting_at.toISOString()).toBe("2023-11-28T19:00:00.000Z")
  })

  test('build from match details full without me api object', async () => {
    const match = matchFrom(matchDetailsFullWithoutMe)

    expect(match.id).toBe(3017265)
    expect(match.available_slots).toBe(0)
    expect(match.my_side).toBeNull()
    expect(match.starting_at.toISOString()).toBe("2023-11-30T18:00:00.000Z")
  })

  test('properly map my side field', async () => {
    const onBlackSide = sampleWithSideKey(2)

    const match = matchFrom(onBlackSide)

    expect(match.my_side).toBe(Side.BLACK)
  })

  function sampleWithSideKey(side_key_value: number): any {
    return {
      ...scheduledMatchSample,
      ref_player: {
        ...scheduledMatchSample.ref_player,
        side_key: side_key_value
      }
    }
  }

})