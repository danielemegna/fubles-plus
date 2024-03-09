import FublesAPI from './lib/fubles-api.js'

const authenticatedUser = {
  id: 55576,
  bearerToken: "<Bearer Token Here>"
}
const fublesApi = new FublesAPI(authenticatedUser);
const urlParams = new URLSearchParams(window.location.search);
const userId = parseInt(urlParams.get('userId')) || null;
let fullDetailsOfLastPlayedMatches = await fetchMatches(userId, fublesApi)

document.querySelector('main').innerHTML = fullDetailsOfLastPlayedMatches.map(([summary, details]) => {
  return `
    <div class="match-card">
      <div class="match-card__date">
        ${summary.starting_at.toLocaleString('it-IT', {
          weekday: 'long', //  values: 'long', 'short', 'narrow'
          month: 'long', //  values: 'numeric', '2-digit', 'long', 'short', 'narrow'
          day: 'numeric', //  values: 'numeric', '2-digit'
        })}
      </div>
      <div class="match-card__body">
        <div class="match-card__grid">
          <span class="match-card__sport-type">Calcio a 5 &bull; Coperto</span>
          <div class="match-card__outcome">
            <span class="${summary.my_side == 'white' ? 'match-card__self' : ''}">
              ${summary.points.white}
            </span>
            <span>-</span>
            <span class="${summary.my_side == 'black' ? 'match-card__self' : ''}">
              ${summary.points.black}
            </span>
          </div>
          <span class="match-card__structure-name">Sport Time Corsico</span>
          <div class="match-card__average-vote">
            Voto: <span id="match-avg-vote-0">${summary.avg_received_vote}</span>
          </div>
        </div>
        <div class="match-card__votes">
          ${details.received_votes.map(vote => {
            return `
              <span>${vote.voterName}</span>
              <span>${vote.vote}</span>
            `
          }).join("")}
        </div>
      </div>
    </div>`;
}).join("");

async function fetchMatches(userId, fublesApi) {
  if (!userId) {
    const summariesOfLastPlayedMatches = await fublesApi.getMyLastPlayedMatches();
    return await Promise.all(summariesOfLastPlayedMatches.map(async summary => {
      const details = await fublesApi.matchDetails(summary.id);
      return [summary, details];
    }));
  }

  const summariesOfLastPlayedMatches = await fublesApi.getLastPlayedMatchesFor(userId);
  return await Promise.all(summariesOfLastPlayedMatches.map(async summary => {
    const details = await fublesApi.matchDetailsAsAnotherUser(summary.id, userId);
    return [summary, details];
  }));
}
