const players = [
  "متعب",
  "هند",
  "راكان",
  "جود",
  "الين",
  "ثنيان",
  "سلطان",
];

const tasks = [
  "🪥 تفريش الأسنان",
  "🕌 الصلاة في وقتها",
  "🚿 الاستحمام",
  "🤲 أذكار الصباح",
  "📖 قراءة صفحة من القرآن",
  "📚 إكمال الواجبات",
];

const STORAGE_KEY = "dailyTasksChallengeStateV1";

const defaultState = () => ({
  players: players.map((name) => ({
    name,
    score: 0,
    completed: {},
  })),
});

const state = loadState();

const leaderboardEl = document.getElementById("leaderboard");
const playerBoardEl = document.getElementById("playerBoard");
const winnerTextEl = document.getElementById("winnerText");
const resetBtn = document.getElementById("resetBtn");
const toastEl = document.getElementById("toast");

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState();

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed.players)) return defaultState();

    return {
      players: parsed.players.map((player) => ({
        name: player.name || "لاعب",
        score: Number(player.score) || 0,
        completed: player.completed || {},
      })),
    };
  } catch (error) {
    console.error("فشل تحميل الحالة:", error);
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getSortedPlayers() {
  return [...state.players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return players.indexOf(a.name) - players.indexOf(b.name);
  });
}

function getPlayerByName(name) {
  return state.players.find((player) => player.name === name);
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 1200);
}

function renderLeaderboard() {
  const sortedPlayers = getSortedPlayers();
  leaderboardEl.innerHTML = sortedPlayers
    .map((player, index) => {
      const medal =
        index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}`;
      const rankClass = index < 3 ? "special" : "";

      return `
        <div class="leader-row">
          <div class="rank-pill ${rankClass}">${medal}</div>
          <div class="leader-meta">
            <strong>${player.name}</strong>
            <span>النقاط: ${player.score} / ${tasks.length}</span>
          </div>
          <div class="score-tag">${player.score}</div>
        </div>
      `;
    })
    .join("");

  const winner = sortedPlayers[0];
  winnerTextEl.textContent = winner ? `${winner.name} (${winner.score} نقطة)` : "—";
}

function renderBoard() {
  playerBoardEl.innerHTML = state.players
    .map((player) => {
      const totalTasks = tasks.length;
      const completedCount = Object.keys(player.completed).filter(Boolean).length;
      const percent = (player.score / totalTasks) * 100;

      return `
        <article class="player-card">
          <div class="player-head">
            <h3 class="player-name">${player.name}</h3>
            <div class="player-score">
              <span>⭐</span>
              <span>${player.score}</span>
            </div>
          </div>

          <div class="progress-wrap">
            <div class="progress-top">
              <span>التقدم</span>
              <strong>${player.score}/${totalTasks}</strong>
            </div>
            <div class="progress-bar" aria-label="تقدم ${player.name}">
              <div class="progress-fill" style="width: ${percent}%"></div>
            </div>
          </div>

          <div class="task-grid">
            ${tasks
              .map((taskName, taskIndex) => {
                const taskId = `task-${taskIndex + 1}`;
                const done = Boolean(player.completed[taskId]);
                return `
                  <div class="task-item">
                    <span class="task-label">${taskName}</span>
                    <button
                      class="task-btn ${done ? "done" : ""}"
                      type="button"
                      data-player-name="${player.name}"
                      data-task-id="${taskId}"
                      ${done ? "disabled" : ""}
                    >
                      ${done ? "تم الإنجاز" : "إضافة نقطة"}
                    </button>
                  </div>
                `;
              })
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function completeTask(playerName, taskId) {
  const player = getPlayerByName(playerName);
  if (!player || player.completed[taskId]) return;

  player.completed[taskId] = true;
  player.score += 1;
  saveState();
  render();
  showToast(`+1 نقطة لـ ${player.name}`);
}

function resetDay() {
  const confirmation = confirm("هل تريد إعادة تعيين اليوم؟ سيتم حذف جميع النقاط الحالية.");
  if (!confirmation) return;

  const freshState = defaultState();
  state.players = freshState.players;
  saveState();
  render();
  showToast("تم إعادة تعيين اليوم بنجاح");
}

function render() {
  renderLeaderboard();
  renderBoard();
}

resetBtn.addEventListener("click", resetDay);

document.addEventListener("click", (event) => {
  const button = event.target.closest(".task-btn");
  if (!button) return;

  const playerName = button.dataset.playerName;
  const taskId = button.dataset.taskId;

  if (!playerName || !taskId) return;

  completeTask(playerName, taskId);
});

render();
