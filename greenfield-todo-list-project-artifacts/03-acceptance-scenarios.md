# 03. Acceptance Scenarios

Status: scenario seeds, not final holdouts.

## Scenario 1: Add A Task

Given the user is on the todo list screen  
When the user enters "Buy milk" and submits  
Then "Buy milk" appears as an active task

Links: REQ-TODO-001.

## Scenario 2: Complete A Task

Given an active task "Buy milk" exists  
When the user marks it complete  
Then the task is shown as completed  
And the active count decreases

Links: REQ-TODO-002.

## Scenario 3: Edit A Task

Given a task "Buy milk" exists  
When the user renames it to "Buy oat milk"  
Then the task title is updated  
And the update remains after refresh

Links: REQ-TODO-004, REQ-TODO-008.

## Scenario 4: Delete A Task

Given a task "Buy milk" exists  
When the user deletes it  
Then the task no longer appears  
And it does not reappear after refresh

Links: REQ-TODO-005, REQ-TODO-008.

## Scenario 5: Filter Tasks

Given one active task and one completed task exist  
When the user selects the active filter  
Then only active tasks are shown  
When the user selects the completed filter  
Then only completed tasks are shown

Links: REQ-TODO-006.

## Holdout Candidates

These should be hidden from the implementation agent if running a dark-factory loop:

- Refresh immediately after editing a task.
- Add a task with leading/trailing spaces.
- Try to save an empty task.
- Create many tasks and filter repeatedly.
- Toggle complete state multiple times.

