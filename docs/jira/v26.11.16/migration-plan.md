# ai migration plan v26.11.16

Standing: UNVERIFIED

## Identity
- path: /Users/sac/ai
- remote: https://github.com/seanchatmangpt/ai (fork of vercel/ai)
- branch@sha: main@1db2762cc, last commit 2025-10-15, 4678 commits, 74 MB
- languages/build: TypeScript pnpm/turbo monorepo (package.json, pnpm-workspace.yaml,
  turbo.json), Justfile
- nested repos: none

## Observed state
- dirty=1326: 1325 are `D` (deleted-in-worktree, not staged) under examples/ai-core/**,
  examples/** -- the examples tree was wiped on disk; 1 `M`
- untracked=6: Justfile, docs/ (docs/jira/v26.9.19 catalogue)
- ahead 0 / behind 115 origin/main; stash 0; unpushed branches 0
- build dirs: no node_modules present
- submodules: none

## What it is
Fork of the Vercel AI SDK (TypeScript toolkit for AI-powered apps). Sean's only local delta
is one commit ("Update dashboard ... MTG tournament features") on top of upstream.

## Classification
DORMANT (census agrees; last commit 13 months ago, 115 behind upstream fork).

## Migration risk
LOW. The 1325 deletions are unintentional worktree damage, not work -- upstream has the
files. The one local commit (1db2762cc) is already on origin/main (ahead=0). Only the
untracked Justfile and docs/jira are local-only.

## Recommended action
CLONE-FRESH
1. Preserve the catalogue + Justfile:
   `cp -R /Users/sac/ai/docs/jira /Users/sac/ai/Justfile <archive>/ai/` (or commit them).
2. DECISION: discard the 1325 example deletions (`git checkout -- examples`) or leave them;
   they are not work product. Recommend discard before any commit.
3. Optional: `git add docs/jira Justfile && git commit -m "docs: v26.11.16 catalogue"`
   then `git push origin main`.
4. Do not copy the directory; re-clone on the new machine.

## First commands on the new machine
`git clone https://github.com/seanchatmangpt/ai && cd ai && pnpm install && pnpm build`

## See Also
- ../v26.9.19/
- /Users/sac/docs/jira/v26.11.16/README.md
