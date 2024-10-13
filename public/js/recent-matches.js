import { FublesSDK } from './lib/fubles-plus.js'

/* ==== SETTINGS ==== */
const authenticatedUser = {
  id: 55576,
  bearerToken: "<Bearer Token Here>"
}
/* ==== END SETTINGS ==== */

const fublesSdk = new FublesSDK(authenticatedUser)
const userId = readUserIdQueryParam()
let fullDetailsOfLastPlayedMatches = await fetchMatches(userId, fublesSdk)

document.querySelector('main').innerHTML = fullDetailsOfLastPlayedMatches.map(([summary, details]) => {
  return `
    <div class="match-card" onclick="window.open('https://app.fubles.com/it/app/matches/${summary.id}')">
      <div class="match-card__date">
        ${summary.starting_at.toLocaleString('it-IT', {
          weekday: 'short', //  values: 'long', 'short', 'narrow'
          day: 'numeric', //  values: 'numeric', '2-digit',
          month: 'short', //  values: 'numeric', '2-digit', 'long', 'short', 'narrow'
          hour: '2-digit', // values: 'numeric', '2-digit',
          minute: '2-digit', // values: 'numeric', '2-digit',
        }).replace(', ', ' - ')}
      </div>
      <div class="match-card__body">
        <div class="match-card__grid">
          <span class="match-card__sport-type">${details.title}</span>
          <div class="match-card__outcome">
            <span class="${summary.my_side == 'white' ? 'match-card__self' : ''}">
              ${summary.points.white}
            </span>
            <span>-</span>
            <span class="${summary.my_side == 'black' ? 'match-card__self' : ''}">
              ${summary.points.black}
            </span>
          </div>
          <span class="match-card__structure-name">${details.structure_name}</span>
          <div class="match-card__average-vote">
            Voto: <span id="match-avg-vote-0">${summary.avg_received_vote ?? "--"}</span>
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

function readUserIdQueryParam() {
  const urlParams = new URLSearchParams(window.location.search)
  const userIdParam = urlParams.get('userId') || urlParams.get('userid')
  return parseInt(userIdParam)
}

async function fetchMatches(userId, fublesSdk) {
  if (!userId) {
    const summariesOfLastPlayedMatches = await fublesSdk.getMyLastPlayedMatches();
    return await Promise.all(summariesOfLastPlayedMatches.map(async summary => {
      const details = await fublesSdk.matchDetails(summary.id);
      return [summary, details];
    }));
  }

  const summariesOfLastPlayedMatches = await fublesSdk.getLastPlayedMatchesFor(userId);
  return await Promise.all(summariesOfLastPlayedMatches.map(async summary => {
    const details = await fublesSdk.matchDetailsAsAnotherUser(summary.id, userId);
    return [summary, details];
  }));
}
