(function bootstrap(global) {
  "use strict";

  const STORAGE_KEY = "northstar-daily-state-v1";
  const VIEW_IDS = ["today", "plan", "habits", "focus", "review"];
  const FILTER_IDS = ["today", "upcoming", "inbox"];
  const todayIso = () => new Date().toISOString().slice(0, 10);
  const addDays = (iso, days) => {
    const date = new Date(`${iso}T12:00:00`);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  };

  function uid(prefix) {
    return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`;
  }

  function cleanText(value, fallback) {
    const text = String(value || "").trim();
    return text || fallback;
  }

  function boundedNumber(value, fallback, min, max) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.min(max, Math.max(min, Math.round(number)));
  }

  function cleanIsoDate(value) {
    const text = String(value || "").trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
  }

  function cleanTags(tags) {
    if (!Array.isArray(tags)) return [];
    return tags
      .map((tag) => String(tag || "").trim().toLowerCase().replace(/^#/, ""))
      .filter(Boolean)
      .slice(0, 8);
  }

  function cleanColor(value, fallback = "#1f7a5b") {
    const text = String(value || "").trim();
    return /^#[0-9a-fA-F]{6}$/.test(text) ? text : fallback;
  }

  function defaultState() {
    const today = todayIso();
    return {
      profile: {
        name: "Builder",
        dailyCapacityMinutes: 300,
        shutdownTime: "17:30"
      },
      activeView: "today",
      filter: "today",
      focusTaskId: null,
      focusRemainingMinutes: 25,
      tasks: [
        createTask({
          title: "Choose the one outcome that makes today a win",
          project: "Life OS",
          due: today,
          estimate: 20,
          priority: 1,
          importance: 4,
          urgency: 4,
          tags: ["planning"]
        }),
        createTask({
          title: "Draft the weekly investor update",
          project: "Work",
          due: today,
          estimate: 45,
          priority: 1,
          importance: 4,
          urgency: 3,
          tags: ["deepwork"]
        }),
        createTask({
          title: "Prepare grocery list for Sunday meal prep",
          project: "Home",
          due: addDays(today, 1),
          estimate: 15,
          priority: 3,
          importance: 2,
          urgency: 2,
          tags: ["home"]
        }),
        createTask({
          title: "Book annual physical",
          project: "Health",
          due: addDays(today, 3),
          estimate: 10,
          priority: 2,
          importance: 3,
          urgency: 1,
          tags: ["health"]
        })
      ],
      habits: [
        createHabit({
          name: "Walk after lunch",
          cue: "After placing the lunch plate in the sink",
          tinyAction: "Put shoes by the door",
          color: "#1f7a5b",
          motivation: 4,
          ability: 5,
          prompt: 4,
          log: [addDays(today, -3), addDays(today, -2), addDays(today, -1)]
        }),
        createHabit({
          name: "Shutdown note",
          cue: "When the last meeting ends",
          tinyAction: "Write one sentence for tomorrow",
          color: "#315c96",
          motivation: 5,
          ability: 4,
          prompt: 4,
          log: [addDays(today, -1)]
        }),
        createHabit({
          name: "Read one page",
          cue: "After brushing teeth",
          tinyAction: "Open the book",
          color: "#a97819",
          motivation: 3,
          ability: 5,
          prompt: 3,
          log: []
        })
      ],
      reviews: []
    };
  }

  function createTask(input) {
    const now = new Date().toISOString();
    const priority = boundedNumber(input.priority, 3, 1, 4);
    const estimate = boundedNumber(input.estimate, 25, 1, 600);
    const due = cleanIsoDate(input.due);
    const importanceFallback = Math.max(1, 5 - priority);
    return {
      id: input.id || uid("task"),
      title: cleanText(input.title, "Untitled task"),
      project: cleanText(input.project, "Inbox"),
      due,
      estimate,
      priority,
      importance: boundedNumber(input.importance, importanceFallback, 1, 5),
      urgency: boundedNumber(input.urgency, due === todayIso() ? 4 : 2, 1, 5),
      tags: cleanTags(input.tags),
      status: ["open", "done", "archived"].includes(input.status) ? input.status : "open",
      createdAt: input.createdAt || now,
      completedAt: input.completedAt || ""
    };
  }

  function createHabit(input) {
    return {
      id: input.id || uid("habit"),
      name: cleanText(input.name, "Tiny habit"),
      cue: cleanText(input.cue, "After an existing routine"),
      tinyAction: cleanText(input.tinyAction, "Do the smallest visible version"),
      color: cleanColor(input.color),
      motivation: boundedNumber(input.motivation, 4, 1, 5),
      ability: boundedNumber(input.ability, 4, 1, 5),
      prompt: boundedNumber(input.prompt, 4, 1, 5),
      log: Array.isArray(input.log) ? [...new Set(input.log.map(cleanIsoDate).filter(Boolean))] : []
    };
  }

  function normalizeState(input) {
    const base = defaultState();
    if (!input || typeof input !== "object") return base;
    const profile = input.profile && typeof input.profile === "object" ? input.profile : {};
    return {
      ...base,
      profile: {
        ...base.profile,
        name: cleanText(profile.name, base.profile.name),
        dailyCapacityMinutes: boundedNumber(profile.dailyCapacityMinutes, base.profile.dailyCapacityMinutes, 30, 900),
        shutdownTime: /^\d{2}:\d{2}$/.test(String(profile.shutdownTime || "")) ? profile.shutdownTime : base.profile.shutdownTime
      },
      activeView: VIEW_IDS.includes(input.activeView) ? input.activeView : base.activeView,
      filter: FILTER_IDS.includes(input.filter) ? input.filter : base.filter,
      focusTaskId: typeof input.focusTaskId === "string" ? input.focusTaskId : null,
      focusRemainingMinutes: boundedNumber(input.focusRemainingMinutes, base.focusRemainingMinutes, 1, 180),
      tasks: Array.isArray(input.tasks) ? input.tasks.map((task) => createTask(task)).slice(0, 250) : base.tasks,
      habits: Array.isArray(input.habits) ? input.habits.map((habit) => createHabit(habit)).slice(0, 80) : base.habits,
      reviews: Array.isArray(input.reviews)
        ? input.reviews.map((review) => ({
          date: cleanIsoDate(review.date) || todayIso(),
          note: cleanText(review.note, "")
        })).filter((review) => review.note).slice(-120)
        : base.reviews
    };
  }

  function parseQuickAdd(text, baseDate = todayIso()) {
    const tokens = String(text || "").trim().split(/\s+/).filter(Boolean);
    const tags = tokens.filter((token) => token.startsWith("#")).map((token) => token.slice(1).toLowerCase());
    const priorityToken = tokens.find((token) => /^p[1-4]$/i.test(token));
    const estimateToken = tokens.find((token) => /^\d+m$/i.test(token));
    const dueToken = tokens.find((token) => /^(today|tomorrow)$/i.test(token));
    const isHabit = tokens[0] && tokens[0].toLowerCase().startsWith("habit:");
    const title = tokens
      .filter((token) => !token.startsWith("#"))
      .filter((token) => !/^p[1-4]$/i.test(token))
      .filter((token) => !/^\d+m$/i.test(token))
      .filter((token) => !/^(today|tomorrow)$/i.test(token))
      .join(" ")
      .replace(/^habit:\s*/i, "")
      .trim();

    if (isHabit) {
      return {
        kind: "habit",
        habit: createHabit({
          name: title || "New tiny habit",
          cue: "After a reliable daily anchor",
          tinyAction: "Do a two-minute version",
          motivation: 4,
          ability: 4,
          prompt: 4
        })
      };
    }

    const priority = priorityToken ? Number(priorityToken.slice(1)) : 3;
    const due = dueToken && dueToken.toLowerCase() === "tomorrow" ? addDays(baseDate, 1) : dueToken ? baseDate : "";
    return {
      kind: "task",
      task: createTask({
        title: title || "New task",
        due,
        estimate: estimateToken ? Number(estimateToken.slice(0, -1)) : 25,
        priority,
        importance: priority <= 2 ? 4 : 2,
        urgency: due === baseDate ? 4 : 2,
        tags
      })
    };
  }

  function habitStreak(habit, baseDate = todayIso()) {
    const days = new Set(habit.log || []);
    let cursor = baseDate;
    let streak = 0;
    while (days.has(cursor)) {
      streak += 1;
      cursor = addDays(cursor, -1);
    }
    return streak;
  }

  function calculateStats(state, baseDate = todayIso()) {
    const todayTasks = state.tasks.filter((task) => task.due === baseDate && task.status !== "archived");
    const completedToday = todayTasks.filter((task) => task.status === "done");
    const plannedMinutes = todayTasks
      .filter((task) => task.status !== "done")
      .reduce((sum, task) => sum + Number(task.estimate || 0), 0);
    const capacity = state.profile.dailyCapacityMinutes || 300;
    const habitsChecked = state.habits.filter((habit) => habit.log.includes(baseDate)).length;
    return {
      todayTaskCount: todayTasks.length,
      completedTodayCount: completedToday.length,
      completionPercent: todayTasks.length ? Math.round((completedToday.length / todayTasks.length) * 100) : 0,
      plannedMinutes,
      capacityPercent: capacity ? Math.round((plannedMinutes / capacity) * 100) : 0,
      habitPercent: state.habits.length ? Math.round((habitsChecked / state.habits.length) * 100) : 0,
      habitsChecked
    };
  }

  function planAudit(state, baseDate = todayIso()) {
    const stats = calculateStats(state, baseDate);
    const todayOpen = state.tasks.filter((task) => task.status === "open" && task.due === baseDate);
    const highPriorityOpen = todayOpen.filter((task) => task.priority <= 2);
    const deepWork = todayOpen.filter((task) => task.tags.includes("deepwork"));
    const noEstimate = todayOpen.filter((task) => !task.estimate || Number(task.estimate) <= 0);
    const audit = [];
    if (stats.capacityPercent > 100) {
      audit.push({
        level: "danger",
        title: "Over capacity",
        detail: `Today is planned at ${stats.capacityPercent} percent. Defer lower-priority work before focus.`
      });
    } else if (stats.capacityPercent > 85) {
      audit.push({
        level: "warn",
        title: "Tight day",
        detail: `Today is planned at ${stats.capacityPercent} percent. Leave a buffer before adding more.`
      });
    } else {
      audit.push({
        level: "good",
        title: "Capacity is realistic",
        detail: `Today is planned at ${stats.capacityPercent} percent of capacity.`
      });
    }
    if (highPriorityOpen.length > 3) {
      audit.push({
        level: "warn",
        title: "Too many top priorities",
        detail: `${highPriorityOpen.length} P1/P2 tasks are open today. Pick the one irreversible outcome.`
      });
    }
    if (deepWork.length > 2) {
      audit.push({
        level: "warn",
        title: "Deep work crowding",
        detail: `${deepWork.length} deep-work tasks compete for attention. Protect one long block.`
      });
    }
    if (noEstimate.length) {
      audit.push({
        level: "warn",
        title: "Missing estimates",
        detail: `${noEstimate.length} tasks need estimates before the plan is trustworthy.`
      });
    }
    return audit;
  }

  function habitFrictionInsights(state, baseDate = todayIso()) {
    if (!state.habits.length) {
      return [{
        level: "warn",
        title: "No habits yet",
        detail: "Add one tiny habit with a cue and a two-minute action."
      }];
    }
    return state.habits
      .map((habit) => {
        const weakest = [
          ["motivation", habit.motivation],
          ["ability", habit.ability],
          ["prompt", habit.prompt]
        ].sort((a, b) => a[1] - b[1])[0][0];
        const score = habit.motivation + habit.ability + habit.prompt;
        const doneToday = habit.log.includes(baseDate);
        return {
          level: doneToday ? "good" : score < 11 ? "danger" : "warn",
          title: habit.name,
          detail: `Weakest lever: ${weakest}. Next tiny move: ${habit.tinyAction}.`,
          score,
          doneToday
        };
      })
      .sort((a, b) => a.score - b.score || Number(a.doneToday) - Number(b.doneToday))
      .slice(0, 3);
  }

  function taskVisible(task, filter, baseDate = todayIso()) {
    if (task.status === "archived") return false;
    if (filter === "today") return task.due === baseDate || (!task.due && task.priority <= 2);
    if (filter === "upcoming") return task.due && task.due > baseDate;
    return !task.due;
  }

  function planTasks(state, baseDate = todayIso()) {
    const open = state.tasks
      .filter((task) => task.status === "open")
      .filter((task) => task.due === baseDate || task.priority <= 2)
      .sort((a, b) => a.priority - b.priority || b.urgency - a.urgency || b.importance - a.importance);
    let minutes = 9 * 60;
    return open.map((task) => {
      const start = minutes;
      minutes += Number(task.estimate || 25);
      return {
        task,
        start: formatClock(start),
        end: formatClock(minutes)
      };
    });
  }

  function formatClock(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  function loadState() {
    if (typeof localStorage === "undefined") return defaultState();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaultState();
      const parsed = JSON.parse(stored);
      return normalizeState(parsed);
    } catch {
      return defaultState();
    }
  }

  function saveState(state) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }

  function init() {
    let state = loadState();
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => Array.from(document.querySelectorAll(selector));

    function render() {
      const today = todayIso();
      const stats = calculateStats(state, today);
      $("#current-date").textContent = new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric"
      }).format(new Date(`${today}T12:00:00`));
      $("#metric-planned").textContent = `${Math.round(stats.plannedMinutes / 60 * 10) / 10}h`;
      $("#metric-capacity").textContent = `${stats.capacityPercent} percent of capacity`;
      $("#metric-completion").textContent = `${stats.completionPercent}%`;
      $("#metric-completion-detail").textContent = `${stats.completedTodayCount} of ${stats.todayTaskCount} done`;
      $("#metric-habits").textContent = `${stats.habitPercent}%`;
      $("#metric-habits-detail").textContent = `${stats.habitsChecked} checked today`;
      $("#metric-next").textContent = stats.capacityPercent > 100 ? "Defer" : "Focus";
      $("#metric-next-detail").textContent = stats.capacityPercent > 100 ? "Workload exceeds capacity" : "No overload detected";
      $("#view-title").textContent = state.activeView[0].toUpperCase() + state.activeView.slice(1);

      $$(".view").forEach((view) => view.classList.toggle("active", view.id === `view-${state.activeView}`));
      $$(".nav-button").forEach((button) => {
        const active = button.dataset.view === state.activeView;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      $$(".segment").forEach((button) => {
        const active = button.dataset.filter === state.filter;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });

      renderTasks();
      renderHabits();
      renderPlan();
      renderFocus();
      renderReviews();
      saveState(state);
    }

    function renderTasks() {
      const list = $("#task-list");
      list.innerHTML = "";
      const tasks = state.tasks.filter((task) => taskVisible(task, state.filter));
      if (!tasks.length) {
        list.innerHTML = '<p class="empty-state">No tasks here.</p>';
        return;
      }
      tasks.forEach((task) => list.appendChild(taskElement(task)));
    }

    function taskElement(task) {
      const card = document.createElement("article");
      card.className = `task-card ${task.status === "done" ? "done" : ""}`;
      card.innerHTML = `
        <button class="check-button" type="button" aria-pressed="${task.status === "done"}" aria-label="${task.status === "done" ? "Reopen" : "Mark done"} ${escapeHtml(task.title)}">${task.status === "done" ? "&#10003;" : ""}</button>
        <div>
          <p class="task-title">${escapeHtml(task.title)}</p>
          <div class="task-meta">
            <span class="pill ${task.priority <= 2 ? `priority-${task.priority}` : ""}">P${task.priority}</span>
            <span class="pill">${escapeHtml(task.project)}</span>
            <span class="pill">${task.estimate}m</span>
            ${task.due ? `<span class="pill">${escapeHtml(task.due)}</span>` : ""}
            ${task.tags.map((tag) => `<span class="pill">#${escapeHtml(tag)}</span>`).join("")}
          </div>
        </div>
        <button class="tiny-button" type="button">Focus</button>
      `;
      card.querySelector(".check-button").addEventListener("click", () => toggleTask(task.id));
      card.querySelector(".tiny-button").addEventListener("click", () => {
        state.focusTaskId = task.id;
        state.activeView = "focus";
        render();
      });
      return card;
    }

    function renderHabits() {
      const today = todayIso();
      const strip = $("#habit-strip");
      const board = $("#habit-board");
      strip.innerHTML = "";
      board.innerHTML = "";
      state.habits.forEach((habit) => {
        const element = habitElement(habit, today);
        strip.appendChild(element.cloneNode(true));
        board.appendChild(habitElement(habit, today));
      });
      Array.from(strip.querySelectorAll("[data-habit-id]")).forEach((button) => {
        button.addEventListener("click", () => toggleHabit(button.dataset.habitId));
      });
      renderHabitInsights();
    }

    function habitElement(habit, today) {
      const done = habit.log.includes(today);
      const score = habit.motivation + habit.ability + habit.prompt;
      const card = document.createElement("article");
      card.className = "habit-card";
      card.style.borderLeftColor = habit.color;
      card.innerHTML = `
        <h5>${escapeHtml(habit.name)}</h5>
        <p>${escapeHtml(habit.cue)}: ${escapeHtml(habit.tinyAction)}</p>
        <div class="task-meta">
          <span class="pill">${habitStreak(habit, today)} day streak</span>
          <span class="pill">MAP ${score}/15</span>
        </div>
        <div class="habit-actions">
          <span>${done ? "Checked today" : "Open today"}</span>
          <button data-habit-id="${habit.id}" type="button" aria-pressed="${done}" aria-label="${done ? "Undo" : "Check"} ${escapeHtml(habit.name)} for today">${done ? "Undo" : "Check"}</button>
        </div>
      `;
      card.querySelector("[data-habit-id]").addEventListener("click", () => toggleHabit(habit.id));
      return card;
    }

    function renderPlan() {
      const timeline = $("#timeline");
      timeline.innerHTML = "";
      planTasks(state).forEach((slot) => {
        const item = document.createElement("article");
        item.className = "timeline-item";
        item.innerHTML = `
          <div class="time-slot">${slot.start}<br>${slot.end}</div>
          <div>
            <p class="task-title">${escapeHtml(slot.task.title)}</p>
            <div class="task-meta"><span class="pill">${escapeHtml(slot.task.project)}</span><span class="pill">P${slot.task.priority}</span></div>
          </div>
        `;
        timeline.appendChild(item);
      });
      renderMatrix();
      renderPlanAudit();
    }

    function renderPlanAudit() {
      $("#plan-audit").innerHTML = planAudit(state).map((item) => auditItem(item)).join("");
    }

    function renderMatrix() {
      const cells = [
        ["Do", (task) => task.importance >= 3 && task.urgency >= 3],
        ["Schedule", (task) => task.importance >= 3 && task.urgency < 3],
        ["Delegate", (task) => task.importance < 3 && task.urgency >= 3],
        ["Drop", (task) => task.importance < 3 && task.urgency < 3]
      ];
      $("#matrix").innerHTML = cells.map(([title, predicate]) => {
        const items = state.tasks.filter((task) => task.status === "open").filter(predicate).slice(0, 5);
        return `<section class="matrix-cell"><strong>${title}</strong><ul>${items.map((task) => `<li>${escapeHtml(task.title)}</li>`).join("") || "<li>Clear</li>"}</ul></section>`;
      }).join("");
    }

    function renderHabitInsights() {
      $("#habit-insight").innerHTML = habitFrictionInsights(state).map((item) => auditItem(item)).join("");
    }

    function renderFocus() {
      const queue = $("#focus-queue");
      queue.innerHTML = "";
      const active = state.tasks.find((task) => task.id === state.focusTaskId && task.status === "open")
        || state.tasks.find((task) => task.status === "open" && task.due === todayIso())
        || state.tasks.find((task) => task.status === "open");
      if (active) state.focusTaskId = active.id;
      $("#focus-task-title").textContent = active ? active.title : "Choose a task to begin.";
      $("#focus-minutes").textContent = state.focusRemainingMinutes;
      document.documentElement.style.setProperty("--focus-progress", `${Math.max(0, 100 - (state.focusRemainingMinutes / 25) * 100)}%`);
      state.tasks.filter((task) => task.status === "open").slice(0, 5).forEach((task) => queue.appendChild(taskElement(task)));
    }

    function renderReviews() {
      const history = $("#review-history");
      history.innerHTML = state.reviews.length ? "" : '<p class="empty-state">No reviews yet.</p>';
      state.reviews.slice().reverse().forEach((review) => {
        const article = document.createElement("article");
        article.innerHTML = `<strong>${escapeHtml(review.date)}</strong><p>${escapeHtml(review.note)}</p>`;
        history.appendChild(article);
      });
    }

    function toggleTask(taskId) {
      state.tasks = state.tasks.map((task) => task.id === taskId
        ? { ...task, status: task.status === "done" ? "open" : "done", completedAt: task.status === "done" ? "" : new Date().toISOString() }
        : task);
      render();
    }

    function toggleHabit(habitId) {
      const today = todayIso();
      state.habits = state.habits.map((habit) => {
        if (habit.id !== habitId) return habit;
        const done = habit.log.includes(today);
        return { ...habit, log: done ? habit.log.filter((date) => date !== today) : [...habit.log, today] };
      });
      render();
    }

    $$(".nav-button").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeView = button.dataset.view;
        render();
      });
    });
    $$(".segment").forEach((button) => {
      button.addEventListener("click", () => {
        state.filter = button.dataset.filter;
        render();
      });
    });
    $("#quick-add-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const input = $("#quick-add-input");
      const parsed = parseQuickAdd(input.value);
      if (parsed.kind === "habit") state.habits.push(parsed.habit);
      if (parsed.kind === "task") state.tasks.push(parsed.task);
      input.value = "";
      render();
    });
    $("#rebalance-plan").addEventListener("click", () => {
      state.tasks = state.tasks.map((task) => task.status === "open" && task.due === todayIso() && task.priority >= 3
        ? { ...task, due: addDays(todayIso(), 1) }
        : task);
      render();
    });
    $("#add-sample-habit").addEventListener("click", () => {
      state.habits.push(createHabit({
        name: "Two-minute reset",
        cue: "After opening the laptop",
        tinyAction: "Clear the desk surface"
      }));
      render();
    });
    $("#start-focus").addEventListener("click", () => {
      state.focusRemainingMinutes = Math.max(5, state.focusRemainingMinutes - 5);
      render();
    });
    $("#complete-focus").addEventListener("click", () => {
      if (state.focusTaskId) toggleTask(state.focusTaskId);
    });
    $("#save-review").addEventListener("click", () => {
      const note = $("#review-note").value.trim();
      if (!note) return;
      state.reviews.push({ date: todayIso(), note });
      $("#review-note").value = "";
      render();
    });
    $("#export-state").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "northstar-daily-export.json";
      link.click();
      URL.revokeObjectURL(url);
    });

    render();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function auditItem(item) {
    return `
      <article class="audit-item ${escapeHtml(item.level)}">
        <span class="audit-dot" aria-hidden="true"></span>
        <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.detail)}</span></div>
      </article>
    `;
  }

  const api = {
    addDays,
    calculateStats,
    createHabit,
    createTask,
    defaultState,
    habitStreak,
    habitFrictionInsights,
    normalizeState,
    parseQuickAdd,
    planAudit,
    planTasks,
    taskVisible
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  global.NorthstarDaily = api;
  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", init);
  }
})(typeof window !== "undefined" ? window : globalThis);
