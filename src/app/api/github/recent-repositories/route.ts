import { githubRepositoriesSchema } from '@/features/home/schemas/githubActivitySchemas';
import { createApiError, createApiSuccess } from '@/lib/api';
import { NextResponse } from 'next/server';

const GITHUB_REPOSITORIES_URL =
  'https://api.github.com/users/nijoow/repos?type=owner&sort=pushed&direction=desc&per_page=6';

export async function GET() {
  try {
    const response = await fetch(GITHUB_REPOSITORIES_URL, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 15 * 60 },
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      return NextResponse.json(
        createApiError(
          'INTERNAL_GITHUB_ACTIVITY',
          'GitHub 프로젝트를 불러오지 못했습니다.',
        ),
        { status: 502 },
      );
    }

    const parsed = githubRepositoriesSchema.safeParse(await response.json());
    if (!parsed.success) throw new Error('Invalid GitHub response');

    const repositories = parsed.data
      .filter((repository) => !repository.fork && repository.name !== 'nijoow')
      .slice(0, 3)
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        description: repository.description,
        url: repository.html_url,
        language: repository.language,
        stars: repository.stargazers_count,
        pushedAt: repository.pushed_at,
        topics: repository.topics.slice(0, 3),
      }));

    return NextResponse.json(createApiSuccess(repositories));
  } catch {
    return NextResponse.json(
      createApiError(
        'INTERNAL_GITHUB_ACTIVITY',
        'GitHub 프로젝트를 불러오지 못했습니다.',
      ),
      { status: 500 },
    );
  }
}
