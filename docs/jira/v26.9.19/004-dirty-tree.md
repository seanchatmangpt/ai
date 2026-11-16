# ai: commit or clean uncommitted changes

- Standing: OPEN
- Created: 2026-09-19 (v26.9.19 gh survey wave)
- Source: working tree dirty at survey time
- Evidence: `git status --porcelain` → 1327 path(s) (tracked-modified: 1326, untracked: 1); sample:  D examples/ai-core/.env.example; D examples/ai-core/.gitignore; D examples/ai-core/README.md;?? Justfile;

## Work to complete
- Review the 1326 tracked-modified path(s); commit them as atomic pieces on a purpose branch, or revert what is transient.
- For the 1 untracked path(s): add intentional files to git and commit; gitignore or delete build artifacts/temp files.
- Note: this survey's ticket files under docs/jira/v26.9.19/ are intentionally uncommitted; include or exclude them deliberately in the commit plan.

## Acceptance
- `git status --porcelain` is clean (except items deliberately deferred and recorded here).

## History
- 2026-09-19 | OPEN | survey found dirty tree | 1327 paths (T1326/U1) | commit/clean pending
