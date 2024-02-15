import FublesAPI from './lib/fubles-api.js'

const fublesApi = new FublesAPI(
  {
    id: "55576",
    bearerToken: "<Bearer Token Here>"
  }
);

const matches = await fublesApi.getMyLastPlayedMatches();

document.querySelector('main').innerHTML = matches.map((matchSummary) => {
  return `
    <div class="match-card">
      <div class="match-card__date">
        ${matchSummary.starting_at.toLocaleString('it-IT', {
          weekday: 'long', //  values: 'long', 'short', 'narrow'
          month: 'long', //  values: 'numeric', '2-digit', 'long', 'short', 'narrow'
          day: 'numeric', //  values: 'numeric', '2-digit'
        })}
      </div>
      <div class="match-card__body">
        <div class="match-card__grid">
          <span class="match-card__sport-type">Calcio a 5 &bull; Coperto</span>
          <div class="match-card__outcome">
            <span class="${matchSummary.my_side == 'white' ? 'match-card__self' : ''}">
              ${matchSummary.points.white}
            </span>
            <span>-</span>
            <span class="${matchSummary.my_side == 'black' ? 'match-card__self' : ''}">
              ${matchSummary.points.black}
            </span>
          </div>
          <span class="match-card__structure-name">Sport Time Corsico</span>
          <div class="match-card__average-vote">
            Voto: <span id="match-avg-vote-0">${matchSummary.avg_received_vote}</span>
          </div>
        </div>
        <div class="match-card__votes">
          <span>Donato Betulle</span>
          <span>8</span>
          <span>Giuseppe Domai</span>
          <span>7.5</span>
          <span>Ivan Lama</span>
          <span>7.5</span>
          <span>Emilio Ferro</span>
          <span>7</span>
        </div>
      </div>
    </div>`;
}).join("");