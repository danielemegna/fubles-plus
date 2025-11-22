import { FublesSDK } from './lib/fubles-plus-sdk.js'

/* ==== SETTINGS ==== */
const authenticatedUser = {
  id: 55576,
  bearerToken: "<Bearer Token Here>"
}
/* ==== END SETTINGS ==== */

const fublesSdk = new FublesSDK(authenticatedUser)
const userId = visitingUserId()
let fullDetailsOfLastPlayedMatches = await fetchMatches(userId, fublesSdk)

document.querySelector('main').innerHTML = fullDetailsOfLastPlayedMatches.map(([summary, details]) => {
  const levelVariationCssClass = levelVariationCssClassFrom(summary.levelVariation)
  const levelVariationText = levelVariationTextFrom(summary.levelVariation)

  return `
    <div class="match-card" onclick="window.open('https://app.fubles.com/it/app/matches/${summary.id}')">
      <div class="match-card__date">
        ${summary.startingAt.toLocaleString('it-IT', {
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
            <span class="${summary.mySide == 'white' ? 'match-card__self' : ''}">
              ${summary.points.white}
            </span>
            <span>-</span>
            <span class="${summary.mySide == 'black' ? 'match-card__self' : ''}">
              ${summary.points.black}
            </span>
          </div>
          <span class="match-card__level-variation-arrow ${levelVariationCssClass}"></span>
          <span class="match-card__structure-name">${details.structure_name}</span>
          <div class="match-card__average-vote">
            Voto: <span>${summary.avgReceivedVote ?? "--"}</span>
          </div>
          <span class="match-card__level-variation ${levelVariationCssClass}">${levelVariationText}</span>
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

function levelVariationCssClassFrom(levelVariation) {
  if (!levelVariation || levelVariation == 0)
    return ""

  return levelVariation > 0 ? "positive" : "negative"
}

function levelVariationTextFrom(levelVariation) {
  if (levelVariation == null)
    return "--"

  if(levelVariation <= 0)
    return levelVariation.toString()

  return "+" + levelVariation
}

function visitingUserId() {
  const userIdQueryParam = readUserIdQueryParam()
  return userIdQueryParam ?? authenticatedUser.id
}

function readUserIdQueryParam() {
  const urlParams = new URLSearchParams(window.location.search)
  const userIdParam = urlParams.get('userId') || urlParams.get('userid')
  const parsedUserIdParam = parseInt(userIdParam)
  if(!parsedUserIdParam || isNaN(parsedUserIdParam))
    return null

  return parsedUserIdParam
}

async function fetchMatches(userId, fublesSdk) {
  const summariesOfLastPlayedMatches = await fublesSdk.getLastPlayedMatchesFor(userId, 5);
  return await Promise.all(summariesOfLastPlayedMatches.map(async summary => {
    const details = await fublesSdk.matchDetailsAsAnotherUser(summary.id, userId);
    return [summary, details];
  }));
}
