test:
    pnpm test

test-full:
    pnpm run type-check:full && pnpm test

dev:
    pnpm run dev

build:
    pnpm run build

polish:
    pnpm run lint && pnpm run type-check && pnpm run prettier-check

clean:
    pnpm run clean

ci: polish test-full
