// @vitest-environment node
import { ESLint } from 'eslint';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const projectRequire = createRequire(import.meta.url);
const configRequire = createRequire(
  projectRequire.resolve('eslint-config-next/core-web-vitals'),
);
const pluginRequire = createRequire(
  configRequire.resolve('@next/eslint-plugin-next/package.json'),
);
const { getRootDirs } = pluginRequire('./dist/utils/get-root-dirs.js') as {
  getRootDirs: (context: {
    cwd: string;
    settings: { next?: { rootDir?: string | string[] } };
  }) => string[];
};
const plugin = pluginRequire('@next/eslint-plugin-next').default;
let fixture: string;

beforeAll(() => {
  fixture = mkdtempSync(path.join(tmpdir(), 'next-eslint-glob-'));
  for (const directory of [
    'packages/alpha/app/target',
    'packages/beta/pages/works',
    'packages/ignored/nested',
    '.hidden',
  ]) {
    mkdirSync(path.join(fixture, directory), { recursive: true });
  }
  writeFileSync(path.join(fixture, 'packages/file.txt'), 'not a directory');
  writeFileSync(path.join(fixture, 'packages/alpha/app/target/page.tsx'), '');
  writeFileSync(path.join(fixture, 'packages/alpha/app/page.tsx'), '');
  writeFileSync(path.join(fixture, 'packages/beta/pages/works/index.tsx'), '');
});

afterAll(() => rmSync(fixture, { recursive: true, force: true }));

const roots = (rootDir?: string | string[]) =>
  getRootDirs({ cwd: fixture, settings: { next: { rootDir } } }).sort();
const absolute = (relative: string) => path.join(fixture, relative);

describe('Next ESLint directory discovery with the safe glob dependency', () => {
  it('resolves the scoped dependency to tinyglobby', () => {
    expect(pluginRequire('fast-glob/package.json').name).toBe('tinyglobby');
  });

  it('keeps the current directory when rootDir is not configured', () => {
    expect(roots()).toEqual([fixture]);
  });

  it.each([
    ['packages/alpha', ['packages/alpha']],
    ['packages/*', ['packages/alpha', 'packages/beta', 'packages/ignored']],
    ['packages/{alpha,beta}', ['packages/alpha', 'packages/beta']],
    ['packages/@(alpha|beta)', ['packages/alpha', 'packages/beta']],
    ['packages/missing', []],
    [
      'packages/**',
      [
        'packages/alpha',
        'packages/alpha/app',
        'packages/alpha/app/target',
        'packages/beta',
        'packages/beta/pages',
        'packages/beta/pages/works',
        'packages/ignored',
        'packages/ignored/nested',
      ],
    ],
  ])('preserves directory matches for %s', (pattern, expected) => {
    expect(roots(absolute(pattern))).toEqual(expected.map(absolute).sort());
  });

  it('preserves relative root paths', () => {
    const relative = path.relative(process.cwd(), absolute('packages/alpha'));
    expect(roots(relative)).toEqual([relative]);
  });

  it('includes dynamic globstar bases but excludes static brace bases', () => {
    expect(roots(absolute('packages/*/**'))).toEqual(
      [
        'packages/alpha',
        'packages/alpha/app',
        'packages/alpha/app/target',
        'packages/beta',
        'packages/beta/pages',
        'packages/beta/pages/works',
        'packages/ignored',
        'packages/ignored/nested',
      ]
        .map(absolute)
        .sort(),
    );
    expect(roots(absolute('packages/{alpha,beta}/**'))).toEqual(
      [
        'packages/alpha/app',
        'packages/alpha/app/target',
        'packages/beta/pages',
        'packages/beta/pages/works',
      ]
        .map(absolute)
        .sort(),
    );
  });

  it('supports arrays of project root patterns', () => {
    expect(
      roots([absolute('packages/alpha'), absolute('packages/beta')]),
    ).toEqual([absolute('packages/alpha'), absolute('packages/beta')]);
  });

  it('normalizes Windows separators before globbing', () => {
    expect(
      roots(
        absolute('packages/alpha').replaceAll('/', String.fromCharCode(92)),
      ),
    ).toEqual([absolute('packages/alpha')]);
  });

  it('finishes or rejects a deeply nested malicious pattern within a deadline', () => {
    const result = spawnSync(
      process.execPath,
      [
        '-e',
        `const glob = require(${JSON.stringify(pluginRequire.resolve('fast-glob'))});
         try {
           glob.globSync('{'.repeat(4500) + 'x' + '}'.repeat(4500), {
             onlyDirectories: true, expandDirectories: false
           });
         } catch (error) {
           if (!(error instanceof Error)) process.exit(2);
         }`,
      ],
      { cwd: fixture, timeout: 3000, encoding: 'utf8' },
    );
    expect(result.error).toBeUndefined();
    expect(result.signal).toBeNull();
    expect(result.status).toBe(0);
  });

  it('still reports internal anchor links across app and pages roots', async () => {
    const eslint = new ESLint({
      cwd: fixture,
      overrideConfigFile: true,
      overrideConfig: {
        files: ['**/*.jsx'],
        languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
        settings: { next: { rootDir: absolute('packages/{alpha,beta}') } },
        plugins: { '@next/next': plugin },
        rules: { '@next/next/no-html-link-for-pages': 'error' },
      },
    });
    const [invalid] = await eslint.lintText(
      'const content = <><a href="/">App</a><a href="/works">Pages</a></>;',
      { filePath: absolute('fixture.jsx') },
    );
    expect(invalid?.messages.map((message) => message.ruleId)).toEqual([
      '@next/next/no-html-link-for-pages',
      '@next/next/no-html-link-for-pages',
    ]);
    const [valid] = await eslint.lintText(
      'const content = <><Link href="/">App</Link><a href="https://example.com">External</a></>;',
      { filePath: absolute('fixture.jsx') },
    );
    expect(valid?.messages).toEqual([]);
  });
});
