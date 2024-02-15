import FublesAPI from './lib/fubles-api.js'

const fublesApi = new FublesAPI(
  {
    id: "55576",
    bearerToken: "<Bearer Token Here>"
  }
);

const matches = await fublesApi.getMyLastPlayedMatches();

console.log(matches)