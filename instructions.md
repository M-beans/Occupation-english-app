# Agent Instructions

These instructions apply to all code changes in this repository, especially UI and TypeScript work.

- Preserve the existing user interface and visual layout.
- Make the smallest possible change needed to fix the issue.
- Avoid unnecessary refactoring or broad rewrites.
- Do not alter Tailwind CSS design intent or existing styling unless the fix requires it.
- Maintain TypeScript type safety and existing type contracts.
- Prefer incremental, localized edits over sweeping changes.
- If a change would impact UI structure or styling significantly, ask for confirmation before proceeding.

Example prompts that follow these instructions:
- "Fix the bug in `ConversationScreen.tsx` without changing the current UI layout."
- "Update the component logic in `ScenarioSelectionScreen.tsx` with minimal edits and keep Tailwind styling intact."
- "Improve type safety in the app while leaving the current design unchanged."
