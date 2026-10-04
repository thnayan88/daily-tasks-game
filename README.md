const players = [
  {
    id: "thniyan",
    name: "ثنيان",
    tasks: [
      "تفريش الأسنان",
      "الصلاة في وقتها",
      "أذكار الصباح",
      "صفحة من القرآن",
      "حل الواجبات",
    ],
  },
  {
    id: "alin",
    name: "الين",
    tasks: [
      "تفريش الأسنان",
      "الصلاة في وقتها",
      "أذكار الصباح",
      "صفحة من القرآن",
      "حل الواجبات",
    ],
  },
  {
    id: "sultan",
    name: "سلطان",
    tasks: [
      "تفريش الأسنان",
      "الصلاة في وقتها",
      "أذكار الصباح",
      "صفحة من القرآن",
      "حل الواجبات",
    ],
  },
  {
    id: "rakan",
    name: "راكان",
    tasks: ["الاستحمام", "الرياضة"],
  },
  {
    id: "jood",
    name: "جود",
    tasks: ["الاستحمام", "الرياضة"],
  },
  {
    id: "muteb",
    name: "متعب",
    tasks: ["الاستحمام", "الرياضة"],
  },
  {
    id: "hind",
    name: "هند",
    tasks: ["الاستحمام", "الرياضة"],
  },
];

const STORAGE_KEY = "daily-tasks-game-state-v1";

const playersGrid = document.getElementById("playersGrid");
const totalTasksEl = document.getElementById("totalTasks");
const completedTasksEl = document.getElementById("completedTasks");
const winnerNameEl = document.getElementById("winnerName");
const resetBtn = document.getElementById("resetBtn");

function getInitialState() {
  const baseState = {};
  players.forEach((player) => {
    baseState[player.id] = Array(player.tasks.length).fill(false);
  });
  return baseState;
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return getInitialState();

  try {
    const parsed = JSON.parse(saved);
    const defaultState = getInitialState();

    return players.reduce((acc, player) => {
      acc[player.id] = Array.isArray(parsed[player.id])
        ? parsed[player.id].slice(0, player.tasks.length).concat(
            Array(Math.max(0, player.tasks.length - parsed[player.id].length)).fill(false)
          )
        : defaultState[player.id];
      return acc;
    }, {});
  } catch (error) {
    return getInitialState();
  }
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderPlayerCard(player) {
  const completedCount = state[player.id].filter(Boolean).length;
  const allCompleted = completedCount === player.tasks.length;

  const card = document.createElement("article");
  card.className = `player-card ${allCompleted ? "complete" : ""}`;

  const header = document.createElement("div");
  header.className = "player-header";
  header.innerHTML = `
    <h2 class="player-name">${player.name}</h2>
    <span class="progress-chip">${completedCount}/${player.tasks.length}</span>
  `;

  const taskList = document.createElement("ul");
  taskList.className = "task-list";

  player.tasks.forEach((task, taskIndex) => {
    const item = document.createElement("li");
    item.className = `task-item ${state[player.id][taskIndex] ? "completed" : ""}`;

    const label = document.createElement("span");
    label.className = "task-label";
    label.textContent = task;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-toggle";
    checkbox.checked = Boolean(state[player.id][taskIndex]);
    checkbox.setAttribute("aria-label", `${player.name}: ${task}`);
    checkbox.addEventListener("change", () => {
      state[player.id][taskIndex] = checkbox.checked;
      saveState();
      render();
    });

    item.append(label, checkbox);
    taskList.appendChild(item);
  });

  card.append(header, taskList);
  return card;
}

function updateSummary() {
  const total = players.reduce((sum, player) => sum + player.tasks.length, 0);
  const completed = players.reduce(
    (sum, player) => sum + state[player.id].filter(Boolean).length,
    0
  );

  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;

  const leaderboard = players
    .map((player) => ({
      name: player.name,
      score: state[player.id].filter(Boolean).length,
    }))
    .sort((a, b) => b.score - a.score);

  winnerNameEl.textContent = leaderboard[0]?.name || "-";
}

function render() {
  playersGrid.innerHTML = "";
  players.forEach((player) => {
    playersGrid.appendChild(renderPlayerCard(player));
  });
  updateSummary();
}

resetBtn.addEventListener("click", () => {
  state = getInitialState();
  saveState();
  render();
});

render();
