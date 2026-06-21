// game.js — Turing's Mirror core logic

const rounds = [
  {
    messages: [
      { text: "Hello! I am doing well today. The weather is pleasant. How may I assist you?", isAI: true },
      { text: "ugh it's so hot today lol, can't even think straight", isAI: false }
    ],
    difficulty: "1926 — Before the Test"
  },
  {
    messages: [
      { text: "I understand your feelings of sadness. It is important to process emotions.", isAI: true },
      { text: "I don't know man, just feels like nothing I do matters lately", isAI: false }
    ],
    difficulty: "1936 — Turing's Paper"
  },
  {
    messages: [
      { text: "That's a really tough situation. Have you tried talking to someone close to you about it?", isAI: true },
      { text: "honestly i did and it helped a bit but then we argued about something stupid", isAI: false }
    ],
    difficulty: "1950 — The Turing Test"
  },
  {
    messages: [
      { text: "Ugh I hate when that happens. You open up and somehow it becomes about them.", isAI: true },
      { text: "yeah exactly but also maybe i came in too hot, idk it's complicated", isAI: false }
    ],
    difficulty: "1966 — ELIZA"
  },
  {
    messages: [
      { text: "I think the complicated feeling is the honest one. The clean versions of things usually aren't real.", isAI: true },
      { text: "that's... actually kind of what I needed to hear. weird how the right words help", isAI: false }
    ],
    difficulty: "2026 — Today"
  }
];

let currentRound = 0;
let score = 0;
let totalAnswers = 0;

function renderRound() {
  const container = document.getElementById('game-container');
  if (currentRound >= rounds.length) {
    showFinalScore(container);
    return;
  }

  const round = rounds[currentRound];
  const shuffled = [...round.messages].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div class="round-label">Year: ${round.difficulty} — Round ${currentRound + 1} of ${rounds.length}</div>
    ${shuffled.map((msg, i) => `
      <div class="message-card" id="card-${i}">
        <p>"${msg.text}"</p>
        <button class="btn-human" onclick="guess(${i}, ${msg.isAI}, false)">🧠 Human</button>
        <button class="btn-ai" onclick="guess(${i}, ${msg.isAI}, true)">🤖 AI</button>
      </div>
    `).join('')}
  `;
}

function guess(cardIndex, isActuallyAI, guessedAI) {
  totalAnswers++;
  const correct = isActuallyAI === guessedAI;
  if (correct) score++;

  const card = document.getElementById(`card-${cardIndex}`);
  card.style.border = correct ? '2px solid #40f040' : '2px solid #f04040';
  card.querySelector('p').insertAdjacentHTML('beforeend',
    `<br><span class="${correct ? 'result-correct' : 'result-wrong'}">
      ${correct ? '✓ Correct!' : '✗ Wrong!'} That was ${isActuallyAI ? 'an AI 🤖' : 'a human 🧠'}
    </span>`
  );

  card.querySelectorAll('button').forEach(b => b.disabled = true);

  const allCards = document.querySelectorAll('.message-card');
  const allAnswered = [...allCards].every(c => c.querySelector('button:disabled'));
  if (allAnswered) {
    setTimeout(() => {
      currentRound++;
      renderRound();
    }, 2000);
  }
}

function showFinalScore(container) {
  const pct = Math.round((score / totalAnswers) * 100);
  const passed = pct >= 60;

  if (passed) document.body.classList.add('enlightened');

  container.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <h2>${passed ? '🌅 You passed the Turing Test!' : '🌑 The machines fooled you.'}</h2>
      <div class="score">${score} / ${totalAnswers} correct (${pct}%)</div>
      <p>${passed
        ? "Alan Turing would be proud. You can still tell the human from the machine — for now."
        : "Turing predicted this in 1950. By 2000, he said, machines would fool us 30% of the time. They already do."
      }</p>
      <p style="font-size: 0.85rem; color: #888; margin-top: 2rem;">
        Alan Turing (1912–1954). He gave us the test to define intelligence.<br>
        He was persecuted for who he loved. He was pardoned in 2013 — 59 years too late.<br>
        The light he switched on for computing never went out.
      </p>
      <button class="btn-human" onclick="location.reload()">Play Again</button>
    </div>
  `;
}

renderRound();
