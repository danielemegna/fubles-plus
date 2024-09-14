import { expect, describe, test } from 'vitest'
import JsonWatchingMatchRepository from '../src/repository/JsonWatchingMatchRepository'
import WatchingMatch, { DesiredSide } from '../src/entities/WatchingMatch'

describe('getFlashEnrollmentsWatchingMatches', () => {
  
  const repository = new JsonWatchingMatchRepository()

  test('returns empty array for non-existing user id', () => {
    const matches: WatchingMatch[] = repository.getFlashEnrollmentsWatchingMatches(999)
    expect(matches).toHaveLength(0)
  })

  test.skip('store watching match and retrieve it', () => {
    const userId = 987;

    repository.storeFlashEnrollment(37549, DesiredSide.BLACK, userId)
    const matches: WatchingMatch[] = repository.getFlashEnrollmentsWatchingMatches(userId)

    expect(matches).toHaveLength(1)
  })

})
