import 'jest-extended';
import { Side, matchFrom } from '../src/match';
import scheduledMatchSample from './api_samples/scheduled_match.json';

describe('Match', () => {

  test('build from api object', async () => {
    const match = matchFrom(scheduledMatchSample)

    expect(match.id).toBe(3004643)
    expect(match.available_slots).toBe(2)
    expect(match.side).toBe(Side.WHITE)
    expect(match.starting_at.toISOString()).toBe("2023-09-11T18:00:00.000Z")
  })

  test('properly map side', async () => {
    const onBlackSide = sampleWithSideKey(2)
    const match = matchFrom(onBlackSide)

    expect(match.side).toBe(Side.BLACK)
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