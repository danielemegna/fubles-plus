import { FublesPlusSDK } from './lib/fubles-plus-sdk.js'

/* ==== SETTINGS ==== */
const userId = 55576
const fublesPlusBackendBaseurl = "http://localhost:4321"
/* ==== END SETTINGS ==== */

const fublesPlusSdk = new FublesPlusSDK(userId, fublesPlusBackendBaseurl);
//const watchingMatches = await fublesPlusSdk.getFlashEnrollmentWatchingMatches()

const watchingMatches = [
  {
    id: 98725,
    title: "Calcio a 5",
    startingAt: new Date(2024, 10, 18, 20, 30),
    structureName: "Sport Time Corsico",
    desiredSide: 0
  },
  {
    id: 98725,
    title: "Calcio a 5",
    startingAt: new Date(2024, 10, 20, 20, 0),
    structureName: "Tennis Calcetto Barona (T.C.B.)",
    desiredSide: 1
  },
  {
    id: 98725,
    title: "Calcio a 5",
    startingAt: new Date(2024, 10, 26, 19, 30),
    structureName: "Sport Time Corsico",
    desiredSide: 2
  },
]

document.querySelector('main').innerHTML = watchingMatches.map((match) => {
  return `
    <div class="match-card" onclick="window.open('https://app.fubles.com/it/app/matches/${match.id}')">
      <div class="match-card__date">${formatStartingAtDate(match.startingAt)}</div>
      <div class="match-card__body">
        <div class="match-card__grid">
          <span class="match-card__sport-type">${match.title}</span>
          <div class="match-card__time">${formatStartingAtTime(match.startingAt)}</div>
          <span class="match-card__structure-name">${match.structureName}</span>
          <div class="match-card__desired-side">
            <span class="${desiredSideCssClassFor(match.desiredSide)}"></span>
          </div>
        </div>
      </div>
    </div>`;
}).join("");

function formatStartingAtDate(dateTime) {
  return dateTime.toLocaleString('it-IT', {
    weekday: 'short', //  values: 'long', 'short', 'narrow'
    day: 'numeric', //  values: 'numeric', '2-digit',
    month: 'long', //  values: 'numeric', '2-digit', 'long', 'short', 'narrow'
  })
}

function formatStartingAtTime(dateTime) {
  return dateTime.toLocaleString('it-IT', { hour: '2-digit', minute: '2-digit' });
}

function desiredSideCssClassFor(value) {
  switch(value) {
    case 0: return 'white';
    case 1: return 'black';
    default: return 'any';
  }
}
