import { describe, expect, it } from 'vitest';
import { getResumeProjectHref, resumeContent } from './resumeData';
import { parseResumeReturn } from '../lib/resumeReturn';

describe('public general resume', () => {
  it('only exposes the approved email and GitHub contacts', () => {
    expect(resumeContent.profile.contacts.map(({ label }) => label)).toEqual([
      '이메일',
      'GitHub',
    ]);
    expect(Object.keys(resumeContent.profile).sort()).toEqual([
      'contacts',
      'name',
      'role',
      'summary',
    ]);
    expect(resumeContent.careers.map(({ id }) => id)).toEqual([
      'freelance',
      'bmeks',
    ]);
  });
  it('connects every general-resume project to a published detail', () => {
    const projects = resumeContent.careers.flatMap(({ projects }) => projects);
    expect(projects).toHaveLength(9);
    expect(new Set(projects.map(({ slug }) => slug)).size).toBe(9);
    for (const project of projects) {
      expect(getResumeProjectHref(project.slug)).toBe(`/works/${project.slug}`);
    }
    expect(getResumeProjectHref('missing-project')).toBeUndefined();
  });
});

describe('resume return position', () => {
  const now = 10_000_000;
  it('restores a recent project visit', () => {
    expect(
      parseResumeReturn(
        JSON.stringify({
          anchor: 'resume-project-atop-dms',
          scrollY: 2200,
          savedAt: now - 1000,
        }),
        now,
      ),
    ).toEqual({ anchor: 'resume-project-atop-dms', scrollY: 2200 });
  });
  it.each([
    null,
    '{invalid json',
    JSON.stringify({ anchor: 'contact', scrollY: 200, savedAt: now }),
    JSON.stringify({
      anchor: 'resume-project-atop-dms',
      scrollY: -1,
      savedAt: now,
    }),
    JSON.stringify({
      anchor: 'resume-project-atop-dms',
      scrollY: 200,
      savedAt: now - 1_800_001,
    }),
    JSON.stringify({
      anchor: 'resume-project-atop-dms',
      scrollY: 200,
      savedAt: now + 1000,
    }),
  ])('ignores malformed or stale navigation state: %s', (value) => {
    expect(parseResumeReturn(value, now)).toBeNull();
  });
});
