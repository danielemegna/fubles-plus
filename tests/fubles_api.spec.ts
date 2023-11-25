import 'jest-extended';
import FublesAPI, { AutheticatedUser } from '../src/fubles_api';
import { Match } from '../src/match';

describe('Fubles API', () => {

  test('get my next scheduled matches', async () => {
    const api = new FublesAPI(validAuthenticatedUser());

    const matches: Match[] = await api.getMyNextScheduledMatches();

    expect(matches).not.toBeEmpty()
  })

})

function validAuthenticatedUser(): AutheticatedUser {
  return {
    id: "55576",
    bearerToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  };
}
