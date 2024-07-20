import { FublesPlusAPI } from './lib/fubles-plus.js'

const watchingMatches = [
  {
    id: 99999,
    starting_at: new Date(2024, 6, 22, 20, 0),
    title: "Calcio a 5",
    structure_name: "Sport Time Corsico",
    desired_side: "white",
  },
  {
    id: 99999,
    starting_at: new Date(2024, 6, 24, 20, 0),
    title: "Calcio a 5",
    structure_name: "Sport Time Corsico",
    desired_side: "black",
  }
];

document.querySelector('main').innerHTML = watchingMatches.map((match) => {
  return `
    <div class="match-card" onclick="window.open('https://app.fubles.com/it/app/matches/${match.id}')">
      <div class="match-card__date">
        ${match.starting_at.toLocaleString('it-IT', {
          weekday: 'short', //  values: 'long', 'short', 'narrow'
          day: 'numeric', //  values: 'numeric', '2-digit',
          month: 'long', //  values: 'numeric', '2-digit', 'long', 'short', 'narrow'
        })}
      </div>
      <div class="match-card__body">
        <div class="match-card__grid">
          <span class="match-card__sport-type">${match.title}</span>
          <div class="match-card__time">
            ${match.starting_at.toLocaleString('it-IT', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <span class="match-card__structure-name">${match.structure_name}</span>
          <div class="match-card__desired-side">
            <span class="${match.desired_side}"></span>
          </div>
        </div>
      </div>
    </div>`;
}).join("");
