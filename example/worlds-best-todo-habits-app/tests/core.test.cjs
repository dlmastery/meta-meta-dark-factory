const assert = require("node:assert/strict");
const app = require("../app/app.js");

const baseDate = "2026-04-25";

{
  const parsed = app.parseQuickAdd("write launch memo p1 today 45m #work #deep", baseDate);
  assert.equal(parsed.kind, "task");
  assert.equal(parsed.task.title, "write launch memo");
  assert.equal(parsed.task.priority, 1);
  assert.equal(parsed.task.due, baseDate);
  assert.equal(parsed.task.estimate, 45);
  assert.deepEqual(parsed.task.tags, ["work", "deep"]);
}

{
  const parsed = app.parseQuickAdd("habit: drink water after coffee", baseDate);
  assert.equal(parsed.kind, "habit");
  assert.equal(parsed.habit.name, "drink water after coffee");
  assert.equal(parsed.habit.ability, 4);
}

{
  const habit = app.createHabit({
    name: "Read",
    log: ["2026-04-22", "2026-04-23", "2026-04-24", "2026-04-25"]
  });
  assert.equal(app.habitStreak(habit, baseDate), 4);
}

{
  const state = app.defaultState();
  state.profile.dailyCapacityMinutes = 60;
  state.tasks = [
    app.createTask({ title: "A", due: baseDate, estimate: 30, status: "open" }),
    app.createTask({ title: "B", due: baseDate, estimate: 30, status: "done" }),
    app.createTask({ title: "C", due: baseDate, estimate: 45, status: "open" })
  ];
  state.habits = [app.createHabit({ name: "H", log: [baseDate] })];
  const stats = app.calculateStats(state, baseDate);
  assert.equal(stats.todayTaskCount, 3);
  assert.equal(stats.completedTodayCount, 1);
  assert.equal(stats.completionPercent, 33);
  assert.equal(stats.plannedMinutes, 75);
  assert.equal(stats.capacityPercent, 125);
  assert.equal(stats.habitPercent, 100);
  const audit = app.planAudit(state, baseDate);
  assert.equal(audit[0].level, "danger");
  assert.match(audit[0].title, /Over capacity/);
}

{
  const state = app.defaultState();
  state.tasks = [
    app.createTask({ title: "P1", due: baseDate, estimate: 20, priority: 1 }),
    app.createTask({ title: "P3", due: baseDate, estimate: 20, priority: 3 }),
    app.createTask({ title: "Future", due: "2026-04-30", estimate: 20, priority: 2 })
  ];
  const plan = app.planTasks(state, baseDate);
  assert.equal(plan[0].task.title, "P1");
  assert.ok(plan.some((slot) => slot.task.title === "Future"));
}

{
  const state = app.defaultState();
  state.habits = [
    app.createHabit({ name: "Hard prompt", motivation: 5, ability: 5, prompt: 1, tinyAction: "Put card on keyboard", log: [] }),
    app.createHabit({ name: "Done", motivation: 5, ability: 5, prompt: 5, tinyAction: "Smile", log: [baseDate] })
  ];
  const insights = app.habitFrictionInsights(state, baseDate);
  assert.equal(insights[0].title, "Hard prompt");
  assert.match(insights[0].detail, /prompt/);
}

{
  const normalized = app.normalizeState({
    profile: { name: "", dailyCapacityMinutes: "not-a-number", shutdownTime: "late" },
    activeView: "broken",
    filter: "missing",
    focusRemainingMinutes: 1000,
    tasks: [
      { title: "", estimate: "bad", priority: 99, due: "not-date", tags: "bad-tags", status: "weird" }
    ],
    habits: [
      { name: "", motivation: 99, ability: "bad", prompt: 0, color: "red", log: ["2026-04-25", "bad"] }
    ],
    reviews: [{ date: "bad", note: "Recovered note" }, { date: "2026-04-25", note: "" }]
  });
  assert.equal(normalized.profile.name, "Builder");
  assert.equal(normalized.profile.dailyCapacityMinutes, 300);
  assert.equal(normalized.profile.shutdownTime, "17:30");
  assert.equal(normalized.activeView, "today");
  assert.equal(normalized.filter, "today");
  assert.equal(normalized.focusRemainingMinutes, 180);
  assert.equal(normalized.tasks[0].title, "Untitled task");
  assert.equal(normalized.tasks[0].estimate, 25);
  assert.equal(normalized.tasks[0].priority, 4);
  assert.deepEqual(normalized.tasks[0].tags, []);
  assert.equal(normalized.tasks[0].status, "open");
  assert.equal(normalized.habits[0].name, "Tiny habit");
  assert.equal(normalized.habits[0].motivation, 5);
  assert.equal(normalized.habits[0].ability, 4);
  assert.equal(normalized.habits[0].prompt, 1);
  assert.equal(normalized.habits[0].color, "#1f7a5b");
  assert.deepEqual(normalized.habits[0].log, ["2026-04-25"]);
  assert.equal(normalized.reviews.length, 1);
}

console.log("Core behavior tests passed.");
