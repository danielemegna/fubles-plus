import 'jest-extended';
import FublesAPI from '../src/fubles_api';
import { Match } from '../src/match';

describe('Fubles API', () => {

  test('get scheduled matches', async () => {
    const api = new FublesAPI();

    const matches: Match[] = await api.getScheduledMatches();

    expect(matches).not.toBeEmpty()
  })

})

