# Next.js ESLint 의존성 패치

- 대상: `@next/eslint-plugin-next@16.4.1`
- `fast-glob`을 `tinyglobby@0.2.17`로 교체해 `micromatch`·`braces` 의존성 제거
- `package.json`의 pnpm override와 이 폴더의 patch를 함께 적용
- 패치에서 `expandDirectories: false`를 설정해 기존 디렉터리 검색 방식 유지
- 참고: [tinyglobby 마이그레이션](https://superchupu.dev/tinyglobby/migration)

## 테스트

`pnpm test`의 `src/test/nextEslintGlob.test.ts`에서 디렉터리 검색, glob 패턴, 경로 구분자, 중첩 패턴 처리와 Next.js 내부 링크 규칙을 확인한다.

Next.js ESLint 패키지를 올릴 때 upstream 의존성과 glob API를 확인하고 override·patch를 함께 갱신하거나 제거한다.
