# Next.js ESLint glob dependency

`@next/eslint-plugin-next@16.3.8` uses `fast-glob` only for `globSync(rootDir, { onlyDirectories: true })` in its root-directory helper. The upstream stable package still installs the unpatched `braces` vulnerability (CVE-2026-93687).

The version-scoped pnpm override replaces this dependency with `tinyglobby@0.2.17`, which exposes the required `globSync` API without `micromatch` or `braces`. The adjacent pnpm patch sets `expandDirectories: false`, as required by the [official migration guide](https://superchupu.dev/tinyglobby/migration), and preserves absolute/relative directory paths, trailing separators, and globstar base-directory matching. Both the override and patch are needed.

`pnpm test` includes `src/test/nextEslintGlob.test.ts`. It checks directory discovery, arrays, brace/extglob patterns, path separators, bounded handling of a malicious nested pattern, and the actual Next.js rule for internal links in App Router and Pages Router projects.

When upgrading the Next.js ESLint package, inspect its upstream dependency and glob API, then update or remove the override and patch together. Keep the compatibility tests until the unsafe dependency chain has been removed upstream. Do not remove lint rules or hide audit findings.
