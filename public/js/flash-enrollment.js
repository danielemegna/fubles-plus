import { FublesPlusSDK } from './lib/fubles-plus.js'

/* ==== SETTINGS ==== */
const userId = 55576
const fublesPlusBackendBaseurl = "http://localhost:4321"
/* ==== END SETTINGS ==== */

const fublesPlusSdk = new FublesPlusSDK(userId, fublesPlusBackendBaseurl);
const watchingMatches = await fublesPlusSdk.getFlashEnrollmentWatchingMatches()

document.querySelector('main').innerHTML = watchingMatches.map((match) => {
  return `
    <div class="match-card" onclick="window.open('https://app.fubles.com/it/app/matches/${match.id}')">
      <div class="match-card__date">
        ${match.startingAt.toLocaleString('it-IT', {
          weekday: 'short', //  values: 'long', 'short', 'narrow'
          day: 'numeric', //  values: 'numeric', '2-digit',
          month: 'long', //  values: 'numeric', '2-digit', 'long', 'short', 'narrow'
        })}
      </div>
      <div class="match-card__body">
        <div class="match-card__grid">
          <span class="match-card__sport-type">${match.title}</span>
          <div class="match-card__time">
            ${match.startingAt.toLocaleString('it-IT', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <span class="match-card__structure-name">${match.structureName}</span>
          <div class="match-card__desired-side">
            <span class="${desiredSideCssClassFor(match.desiredSide)}"></span>
          </div>
        </div>
      </div>
    </div>`;
}).join("");

function desiredSideCssClassFor(value) {
  switch(value) {
    case 0: return 'white';
    case 1: return 'black';
    default: return 'any';
  }
}
