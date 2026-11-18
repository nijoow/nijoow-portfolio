import type { ReactNode } from 'react';
import { getWork } from '../data/worksData';
import {
  workStudyGuides,
  type StudyCase,
  type StudyGuide,
} from '../data/workStudyGuides';
import { WorkDiagram } from './WorkDiagram';
import { DisclosureNotice } from './LimitedProject';
import { WorkStudyNavigation } from './WorkStudyNavigation';

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
    /CSS|SCSS|Tailwind|Motion|Three|Fiber|drei|postprocessing|SVG|moveable|mapper|dnd|Nivo|ECharts|Material|DataGrid|Spreadsheet|mentions|gesture|screenshot|VFX/i.test(
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
      <div className="study-case-part" data-step="problem">
        <h4 className="study-label" data-step="problem">
          문제
        </h4>
        {item.problem.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {item.diagram ? <WorkDiagram diagram={item.diagram} /> : null}
      <div className="study-case-part" data-step="solution">
        <h4 className="study-label" data-step="solution">
          구현
        </h4>
        {item.approach.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {item.outcome.length ? (
        <div className="study-case-result" data-step="result">
          <h4 className="study-label" data-step="result">
            결과
          </h4>
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
  diagramMedia?: ReactNode;
  features: ReactNode;
  details?: ReactNode;
  links?: ReactNode;
}
export function WorkStudy({
  pageName,
  context,
  media,
  diagramMedia,
  features,
  details,
  links,
}: Props) {
  const guide = workStudyGuides[pageName],
    work = getWork(pageName);
  if (!guide || !work) return null;
  const visibleDiagramMedia =
    work.disclosure === 'limited' ? undefined : diagramMedia;
  const showDetails =
    guide.sections.details !== false && Boolean(guide.cases?.length || details);
  const sections = navigation(guide, showDetails);
  const contextContent = context ? (
    <div className="study-context">{context}</div>
  ) : null;
  const mediaContent =
    media && work.disclosure !== 'limited' ? (
      <div className="study-media">{media}</div>
    ) : null;
  const detailsContent = showDetails ? (
    <DetailsSection guide={guide} details={details} />
  ) : null;
  const featuresContent = (
    <section id="study-features" className="study-section">
      <h2>{guide.sections.features}</h2>
      <div className="study-prose">{features}</div>
    </section>
  );
  return (
    <div className="work-study">
      <StudyToc sections={sections} />
      <DisclosureNotice limited={work.disclosure === 'limited'} />
      {guide.layout === 'showcase' ? (
        <>
          {mediaContent}
          {contextContent}
          {featuresContent}
          <DiagramSection guide={guide} media={visibleDiagramMedia} />
          <TechnologySection guide={guide} />
          {detailsContent}
        </>
      ) : (
        <>
          {contextContent}
          {!guide.mediaAfterDetails ? mediaContent : null}
          {detailsContent}
          <DiagramSection guide={guide} media={visibleDiagramMedia} />
          {featuresContent}
          {guide.mediaAfterDetails ? mediaContent : null}
          <TechnologySection guide={guide} />
        </>
      )}
      <StudyAfterword
        guide={guide}
        links={work.disclosure !== 'limited' ? links : undefined}
      />
    </div>
  );
}

function StudyToc({ sections }: { sections: [string, string][] }) {
  return sections.length > 3 ? (
    <WorkStudyNavigation sections={sections} />
  ) : null;
}

function navigation(
  guide: StudyGuide,
  showDetails: boolean,
): [string, string][] {
  const details: [string, string][] =
    showDetails && guide.sections.details
      ? [['study-cases', guide.sections.details]]
      : [];
  const diagram: [string, string][] =
    guide.sections.diagram && guide.diagram
      ? [['study-diagram', guide.sections.diagram]]
      : [];
  const features: [string, string] = [
    'study-features',
    guide.sections.features,
  ];
  const technology: [string, string] = ['study-tech', '사용 기술'];
  return [
    ['work-overview', '개요'],
    ...(guide.layout === 'showcase'
      ? [features, ...diagram, technology, ...details]
      : [...details, ...diagram, features, technology]),
    ...(guide.result
      ? [['study-impact', guide.sections.impact ?? '결과'] as [string, string]]
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
  media,
}: {
  guide: StudyGuide;
  media?: ReactNode;
}) {
  if (!guide.sections.diagram || !guide.diagram) return null;
  return (
    <section id="study-diagram" className="study-section">
      <h2>{guide.sections.diagram}</h2>
      <WorkDiagram diagram={guide.diagram} />
      {media ? <div className="study-media">{media}</div> : null}
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

function StudyAfterword({
  guide,
  links,
}: {
  guide: StudyGuide;
  links?: ReactNode;
}) {
  return (
    <>
      {' '}
      {guide.ai ? (
        <aside className="study-ownership">
          <h3>AI와 작업한 부분</h3>
          <p>{guide.ai}</p>
        </aside>
      ) : null}
      {guide.result ? (
        <section id="study-impact" className="study-section">
          <h2>{guide.sections.impact ?? '결과'}</h2>
          <p>{guide.result}</p>
        </section>
      ) : null}
      {links ? <div className="study-links">{links}</div> : null}
    </>
  );
}
