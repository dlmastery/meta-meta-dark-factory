# Research And Competitive Benchmark

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## Research Question

What should a best-in-class todo and habits app demonstrate in a compact greenfield example without overfitting the dark-factory method to this one app?

## Source Trace

- Todoist features page: quick add, recurring dates, reminders, projects, priorities, labels, sections, Today/Upcoming, filters, flexible list/calendar/board views, shared workspaces, comments, productivity visualizations, activity history, and Karma. Source: [Todoist Features](https://www.todoist.com/features)
- TickTick features page: habit tracker, Pomodoro, Eisenhower Matrix, countdown, statistics, keyboard shortcuts, calendar/integration, collaboration, time zones, and themes. Source: [TickTick Features](https://ticktick.com/features)
- Sunsama daily planning: guided planning, reflection, selecting tasks, predicted workload, deferring overcommitment, finalizing a plan, timeboxing, sharing, and shutdown time. Sources: [Sunsama Daily Planning](https://www.sunsama.com/features/daily-planning-and-shutdown), [Sunsama Daily Planning Help](https://help.sunsama.com/docs/usage-guides/daily-planning/)
- Streaks App Store listing: tile-based habit dashboard, visual progress, customization, widgets, accessibility notes such as VoiceOver and dark interface support. Source: [Streaks App Store](https://apps.apple.com/us/app/streaks-daily-habit-tracker/id6448960901)
- Fogg Behavior Model: behavior occurs when motivation, ability, and prompt converge; missing behavior means at least one of those elements is missing. Sources: [Fogg Behavior Model](https://www.behaviormodel.org/), [Stanford Behavior Design Lab](https://behaviordesign.stanford.edu/resources/fogg-behavior-model)
- Implementation intentions: if-then plans link a situational cue to a response and help translate intentions into action. Sources: [PubMed review](https://pubmed.ncbi.nlm.nih.gov/26236214/), [NCI/DCCPS reference](https://cancercontrol.cancer.gov/brp/research/constructs/implementation-intentions)

## Pattern Extraction

The strongest product patterns are:

1. Capture must be faster than context switching.
2. Tasks need multiple lenses: today, upcoming, inbox, priority, time, project, and labels.
3. Planning must protect the user from overcommitment, not merely list more work.
4. Habits need cue, tiny behavior, visibility, streak feedback, and low-friction completion.
5. Focus mode should narrow attention to one action.
6. Review/shutdown closes the loop and preserves learning for tomorrow.
7. Visual progress should make state legible without turning the app into a game.
8. Testing must cover not only functions but also scenario flows and WYSIWYG layout.

## Product Decision

Northstar Daily will combine:

- Todoist-like quick capture and flexible task metadata.
- TickTick-like habit, priority matrix, focus, and statistics coverage.
- Sunsama-like daily planning, capacity guard, and shutdown ritual.
- Behavior-design habit structure using cue, tiny action, motivation, ability, and prompt.

## Transfer Guard

These sources guide the example app only. The dark-factory meta-meta process remains product-tailored and must not require every future product to have tasks, habits, streaks, daily planning, or browser UI.

