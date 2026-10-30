import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { WorkStudy } from './WorkStudy';
import { publicWorks } from '../data/worksData';

describe('project-specific sections', () => {
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
