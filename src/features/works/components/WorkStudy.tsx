import type { ReactNode } from 'react';
import { getWork } from '../data/worksData';
import {
  workStudyGuides,
  type StudyCase,
  type StudyGuide,
} from '../data/workStudyGuides';
import { WorkDiagram } from './WorkDiagram';

const GROUPS = ['언어·프레임워크', '상태·데이터', '화면·인터랙션', '배포·도구'];
function techGroup(name: string) {
  if (
    /Supabase|Cloudflare|PWA|FCM|Jenkins|AWS|Auth|App Groups|빔프로젝터|Kinect|패브릭|Arduino|Knip|Prettier/i.test(
      name,
    )
  )
    return 3;
  if (/Query|Zustand|Recoil|Form|Zod|SQLite|PostgreSQL/i.test(name)) return 1;
  if (
    /CSS|SCSS|Tailwind|Motion|Three|Fiber|drei|postprocessing|SVG|moveable|mapper|dnd|Nivo|ECharts|Material|DataGrid|gesture|screenshot|VFX/i.test(
      name,
    )
  )
    return 2;
  return 0;
}
function CaseCard({ item }: { item: StudyCase }) {
  return (
    <article className="study-case">
      <h3>{item.title}</h3>
      <div className="study-case-part">
        <h4 className="study-label">문제</h4>
        {item.problem.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="study-case-part">
        <h4 className="study-label">구현</h4>
        {item.approach.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {item.outcome.length ? (
        <div className="study-case-result">
          <h4 className="study-label">결과</h4>
          {item.outcome.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      ) : null}
    </article>
  );
}
interface Props {
  pageName: string;
  context?: ReactNode;
  media?: ReactNode;
  features: ReactNode;
  details?: ReactNode;
  links?: ReactNode;
}
export function WorkStudy({
  pageName,
  context,
  media,
  features,
  details,
  links,
}: Props) {
  const guide = workStudyGuides[pageName],
    work = getWork(pageName);
  if (!guide || !work) return null;
  const showDetails =
    guide.sections.details !== false && Boolean(guide.cases?.length || details);
  const sections = navigation(guide, showDetails);
  return (
    <div className="work-study">
      <nav className="study-nav" aria-label="프로젝트 상세 목차">
        <p className="study-nav-title">이 프로젝트에서</p>
        <ol>
          {sections.map(([id, label], index) => (
            <li key={String(id)}>
              <a href={'#' + id}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      {context ? <div className="study-context">{context}</div> : null}
      {links && work.disclosure !== 'limited' ? (
        <div className="study-links">{links}</div>
      ) : null}
      {media && work.disclosure !== 'limited' ? (
        <div className="study-media">{media}</div>
      ) : null}
      <TechnologySection guide={guide} />
      <DiagramSection guide={guide} pageName={pageName} />
      <section id="study-features" className="study-section">
        <h2>{guide.sections.features}</h2>
        <div className="study-prose">{features}</div>
      </section>
      {showDetails ? <DetailsSection guide={guide} details={details} /> : null}
      {guide.ai ? (
        <aside className="study-ownership">
          <h3>AI-assisted development</h3>
          <p>{guide.ai}</p>
        </aside>
      ) : null}
      {guide.result ? (
        <section id="study-impact" className="study-section">
          <h2>{guide.sections.impact ?? '결과'}</h2>
          <p>{guide.result}</p>
        </section>
      ) : null}
    </div>
  );
}

function navigation(guide: StudyGuide, showDetails: boolean) {
  return [
    ['work-overview', '개요'],
    ['study-tech', '사용 기술'],
    ...(guide.sections.diagram && guide.diagram
      ? [['study-diagram', guide.sections.diagram]]
      : []),
    ['study-features', guide.sections.features],
    ...(showDetails ? [['study-cases', guide.sections.details]] : []),
    ...(guide.result
      ? [['study-impact', guide.sections.impact ?? '결과']]
      : []),
  ];
}
function TechnologySection({ guide }: { guide: StudyGuide }) {
  return (
    <section id="study-tech" className="study-section">
      <h2>사용 기술</h2>
      <div className="study-tech-groups">
        {GROUPS.map((label, index) => {
          const names = guide.stacks.filter((s) => techGroup(s) === index);
          return names.length ? (
            <div key={label}>
              <h3>{label}</h3>
              <div className="study-chips">
                {names.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </div>
          ) : null;
        })}
      </div>
      <dl className="study-reasons">
        {guide.reasons.map(([name, reason]) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>{reason}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
function DiagramSection({
  guide,
  pageName,
}: {
  guide: StudyGuide;
  pageName: string;
}) {
  if (!guide.sections.diagram || !guide.diagram) return null;
  return (
    <section id="study-diagram" className="study-section">
      <h2>{guide.sections.diagram}</h2>
      <WorkDiagram diagram={guide.diagram} />
      {pageName === 'digital-asset-management' ? (
        <WorkDiagram
          diagram={{
            kind: 'responsibilities',
            title: '서버 상태·UI 상태·폼 입력',
            nodes: [
              { label: 'TanStack Query', detail: '서버 조회·갱신 상태' },
              { label: 'Zustand', detail: '클라이언트 UI 상태' },
              {
                label: 'React Hook Form · Zod',
                detail: '입력 상태·유효성 검증',
              },
            ],
          }}
        />
      ) : null}
    </section>
  );
}
function DetailsSection({
  guide,
  details,
}: {
  guide: StudyGuide;
  details?: ReactNode;
}) {
  return (
    <section id="study-cases" className="study-section">
      <h2>{guide.sections.details}</h2>
      {guide.cases?.length ? (
        guide.cases.map((item) => <CaseCard key={item.title} item={item} />)
      ) : (
        <div className="study-prose">{details}</div>
      )}
    </section>
  );
}
