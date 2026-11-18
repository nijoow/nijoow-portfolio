import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { WorkStudy } from './WorkStudy';
import { publicWorks } from '../data/worksData';
import { workStudyGuides } from '../data/workStudyGuides';

describe('project-specific sections', () => {
  it('presents public service screens before features, technology and technical cases', () => {
    const showcases = publicWorks.filter(
      (work) => workStudyGuides[work.pageName]?.layout === 'showcase',
    );
    expect(showcases.length).toBeGreaterThan(0);
    for (const work of showcases) {
      const guide = workStudyGuides[work.pageName];
      const html = renderToStaticMarkup(
        <WorkStudy
          pageName={work.pageName}
          media={<div>preview-marker</div>}
          context={<p>context-marker</p>}
          features={<p>feature-marker</p>}
          details={<p>details-marker</p>}
        />,
      );
      const markers = [
        'preview-marker',
        'context-marker',
        'id="study-features"',
        'id="study-tech"',
        ...(guide?.sections.details !== false ? ['id="study-cases"'] : []),
        ...(guide?.ai ? ['AI와 작업한 부분'] : []),
      ];
      const positions = markers.map((text) => html.indexOf(text));
      expect(
        positions.every((position) => position >= 0),
        work.pageName,
      ).toBe(true);
      expect(positions, work.pageName).toEqual(
        [...positions].sort((a, b) => a - b),
      );
    }
  });
  it('does not generate an empty impact section or its navigation link', () => {
    const html = renderToStaticMarkup(
      <WorkStudy pageName="fromis9-stickers" features={<p>편집 기능</p>} />,
    );
    expect(html).not.toContain('study-impact');
    expect(html).not.toContain('성과와 회고');
    expect(html).not.toContain('완성한 웹사이트를 공개하고');
  });
  it('uses artwork headings without inventing troubleshooting', () => {
    const html = renderToStaticMarkup(
      <WorkStudy
        pageName="catch-the-candy"
        features={<p>아이디어 및 콘셉트 기획</p>}
        details={<p>게임 흐름</p>}
      />,
    );
    expect(html).toContain('참여한 작업');
    expect(html).not.toContain('study-cases');
    expect(html).not.toContain('문제 해결');
  });
  it('keeps limited projects private and places diagram media with its diagram', () => {
    const limited = publicWorks.find(
      (work) => work.disclosure === 'limited' && workStudyGuides[work.pageName],
    );
    expect(limited).toBeDefined();
    if (!limited) return;
    const privateHtml = renderToStaticMarkup(
      <WorkStudy
        pageName={limited.pageName}
        features={<p>features</p>}
        media={<p>private-media</p>}
        diagramMedia={<p>private-diagram-media</p>}
        links={<p>private-link</p>}
      />,
    );
    expect(privateHtml).toContain(
      '보안상 화면과 내부 자료는 공개하지 않습니다.',
    );
    expect(privateHtml).not.toContain('private-media');
    expect(privateHtml).not.toContain('private-diagram-media');
    expect(privateHtml).not.toContain('private-link');
    const publicHtml = renderToStaticMarkup(
      <WorkStudy
        pageName="fromyou"
        features={<p>features</p>}
        diagramMedia={<p>diagram-media-marker</p>}
      />,
    );
    expect(publicHtml.indexOf('diagram-media-marker')).toBeGreaterThan(
      publicHtml.indexOf('id="study-diagram"'),
    );
  });
  it('only links to sections actually rendered on each page', () => {
    for (const work of publicWorks) {
      const html = renderToStaticMarkup(
        <WorkStudy
          pageName={work.pageName}
          features={<p>구현 내용</p>}
          details={<p>상세 내용</p>}
        />,
      );
      for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
        if (id !== 'work-overview')
          expect(html, work.pageName).toContain(`id="${id}"`);
      }
    }
  });
});
