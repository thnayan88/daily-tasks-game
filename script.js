* {
  box-sizing: border-box;
}

:root {
  --bg: #f3f6ff;
  --card: #ffffff;
  --primary: #4f46e5;
  --primary-soft: #e0e7ff;
  --success: #22c55e;
  --success-soft: #dcfce7;
  --warning: #f59e0b;
  --text: #1f2937;
  --muted: #6b7280;
  --shadow: 0 16px 40px rgba(79, 70, 229, 0.12);
}

body {
  margin: 0;
  font-family: "Tahoma", "Segoe UI", sans-serif;
  background: linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%);
  color: var(--text);
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 48px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.7);
  padding: 22px 24px;
  border-radius: 20px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--primary);
  font-size: 0.9rem;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
}

.reset-btn {
  border: none;
  background: var(--primary);
  color: white;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.reset-btn:hover {
  transform: translateY(-1px);
}

.summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 18px;
  margin-bottom: 26px;
}

.summary-card {
  background: var(--card);
  border-radius: 18px;
  padding: 18px 20px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-card span {
  color: var(--muted);
  font-size: 0.9rem;
}

.summary-card strong {
  font-size: clamp(1.4rem, 2vw, 2.2rem);
}

.summary-card.success {
  background: linear-gradient(135deg, var(--success-soft), #f0fdf4);
}

.summary-card.winner {
  background: linear-gradient(135deg, #fff7ed, #ffedd5);
}

.players-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 22px;
}

.player-card {
  background: var(--card);
  border-radius: 22px;
  padding: 18px 18px 14px;
  box-shadow: var(--shadow);
  border: 2px solid transparent;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.player-card:hover {
  transform: translateY(-2px);
}

.player-card.complete {
  border-color: var(--success);
  background: linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%);
}

.player-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.player-name {
  margin: 0;
  font-size: 1.4rem;
}

.progress-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.82rem;
  background: var(--primary-soft);
  color: var(--primary);
  font-weight: 700;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px 12px;
}

.task-item.completed {
  background: var(--success-soft);
  border-color: rgba(34, 197, 94, 0.5);
}

.task-label {
  font-size: 0.96rem;
}

.task-toggle {
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: 2px solid #cbd5e1;
  background: white;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

.task-toggle:checked {
  background: var(--success);
  border-color: var(--success);
}

.task-toggle:checked::after {
  content: "✓";
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: white;
  font-size: 1rem;
  font-weight: 700;
}

@media (max-width: 640px) {
  .topbar {
    flex-direction: column;
    align-items: stretch;
  }

  .summary {
    grid-template-columns: 1fr;
  }
}
