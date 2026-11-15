# Agent Instructions for obsidian-multi-tab

## Task scope and validation

Cache exact instructions per checkout/task; read guides only for changed areas.
Restore only missing/changed sections after compaction.
- Docs/instructions-only: text/link/format checks, not application tests/builds,
  browsers, installs or consumer sweeps. This qualifies completion gates below.
- Publication-only: reuse green checks/artifacts for unchanged code, dependencies,
  build inputs AND linked commons; validate unchecked pending source once.
- Source changes: targeted iteration tests, required final checks once; reuse
  composite steps and verify their bundle rather than rebundling.
Keep fresh Git branch/identity/message/hook checks and final remote-tip verification.

## Shared library: commons

Use commons for workspace/window/tab/focus, per-window timers/clipboard, modal,
search, geometry, page-color and line-flash helpers; never duplicate its
undocumented Obsidian adapters in plugin code. For an owned-area change, consult
the installed module exports and relevant commons guide sections. Change commons
with a regression test if needed, never a local copy. Docs/publication-only work
does not require opening the library or rebuilding its consumers.
Local adoption uses file:../obsidian-commons; obey the library's existing
commons-adoption branch and explicit-ref/tag-disabled publication rules.


## Commands

- `npm test` runs Vitest unit tests.
- `npm run build` runs `tsc -noEmit -skipLibCheck` followed by esbuild production bundle to `main.js`.

## Build verification rule

For changed source/build inputs, use the package's fast bundler only during an
actual runtime iteration. At completion, run its production build and required
unit tests once; skip steps already included in the composite build. Record the
build start and verify root main.js is newer and contains a unique changed
literal via the repository verifier or a line-length-safe Node check, not grep
for minified names. Reuse unchanged evidence for docs/publication-only follow-ups.
Never search for a vault, change its link or build/copy from another checkout.
