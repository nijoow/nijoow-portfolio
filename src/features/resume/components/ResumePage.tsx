import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import {
  getResumeProjectHref,
  resumeContent,
  type ResumeCareer,
  type ResumeProject,
  type ResumeRichText,
} from '../data/resumeData';
import { ResumeNavigation, ResumeProjectLink } from './ResumeNavigation';
import { ResumeSignature } from './ResumeSignature';
import styles from './ResumePage.module.css';

function RichText({ value }: { value: ResumeRichText }) {
  return value.map((part, index) =>
    part.strong ? (
      <strong key={index}>{part.text}</strong>
    ) : (
      <span key={index}>{part.text}</span>
    ),
  );
}

function ProjectEntry({ project }: { project: ResumeProject }) {
  const href = getResumeProjectHref(project.slug);
  return (
    <article id={`resume-project-${project.slug}`} className={styles.project}>
      <div className={styles.projectHeading}>
        <h4>{project.name}</h4>
      </div>
      <p className={styles.projectMeta}>
        {project.periods.join(' · ')}
        <span aria-hidden> / </span>
        {project.organization.join(' · ')}
      </p>
      <p className={styles.projectDescription}>{project.description}</p>
      <ul className={styles.skills} aria-label={`${project.name} 사용 기술`}>
        {project.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <ul className={styles.achievements}>
        {project.achievements.map((achievement, index) => (
          <li key={index}>
            <RichText value={achievement} />
          </li>
        ))}
      </ul>
      {href ? (
        <ResumeProjectLink
          href={href}
          slug={project.slug}
          name={project.name}
        />
      ) : null}
    </article>
  );
}

function CareerEntry({ career }: { career: ResumeCareer }) {
  return (
    <section
      id={`career-${career.id}`}
      className={styles.career}
      aria-labelledby={`career-heading-${career.id}`}
    >
      <aside className={styles.careerPeriod}>
        <p>{career.period}</p>
        {career.duration ? <span>{career.duration}</span> : null}
      </aside>
      <div className={styles.careerContent}>
        <header className={styles.careerHeading}>
          <h3 id={`career-heading-${career.id}`}>{career.company}</h3>
          <p>{career.position}</p>
        </header>
        <ul className={styles.careerHighlights}>
          {career.highlights.map((highlight, index) => (
            <li key={index}>
              <RichText value={highlight.title} />
              {highlight.details.map((detail, detailIndex) => (
                <p key={detailIndex}>
                  <RichText value={detail} />
                </p>
              ))}
            </li>
          ))}
        </ul>
        <div className={styles.projects}>
          {career.projects.map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResumePage() {
  const { profile, careers, education, coverLetter } = resumeContent;
  return (
    <div className={styles.page}>
      <ResumeSignature />
      <section
        id="resume-introduction"
        className={styles.introduction}
        aria-labelledby="resume-name"
      >
        <div className={styles.introductionHeading}>
          <div>
            <p className={styles.kicker}>이력 · 경력</p>
            <h1 id="resume-name">{profile.name}</h1>
            <p className={styles.role}>{profile.role}</p>
          </div>
          <div className={styles.profileLinks}>
            {profile.contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                {...(contact.label === 'GitHub'
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {contact.label}
                {contact.label === 'GitHub' ? (
                  <ArrowUpRight size={15} aria-hidden />
                ) : (
                  <Mail size={15} aria-hidden />
                )}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.introText}>
          {profile.summary.map((paragraph, index) => (
            <p key={index}>
              <RichText value={paragraph} />
            </p>
          ))}
        </div>
        <Link href="#career-freelance" className={styles.startLink}>
          경력과 프로젝트 보기 <ArrowRight size={17} aria-hidden />
        </Link>
      </section>
      <ResumeNavigation />
      <div className={styles.readingSurface}>
        <section
          aria-labelledby="resume-careers-heading"
          className={styles.careers}
        >
          <h2 id="resume-careers-heading" className={styles.sectionHeading}>
            경력
          </h2>
          {careers.map((career) => (
            <CareerEntry key={career.id} career={career} />
          ))}
        </section>
        <section
          id="resume-education"
          className={styles.education}
          aria-labelledby="resume-education-heading"
        >
          <h2 id="resume-education-heading" className={styles.sectionHeading}>
            학력
          </h2>
          {education.map((entry) => (
            <div
              className={styles.educationEntry}
              key={`${entry.school}-${entry.period}`}
            >
              <p>
                {entry.period}
                <span>{entry.badge}</span>
              </p>
              <div>
                <h3>{entry.school}</h3>
                <p>{entry.major}</p>
              </div>
            </div>
          ))}
        </section>
        <section
          id="resume-story"
          className={styles.story}
          aria-labelledby="resume-story-heading"
        >
          <h2 id="resume-story-heading" className={styles.sectionHeading}>
            자기소개
          </h2>
          <details className={styles.storyDetails}>
            <summary>
              <span>개발 경험과 작업 방식</span>
              <span className={styles.expandHint} aria-hidden>
                펼쳐 읽기
              </span>
            </summary>
            <div>
              {coverLetter.map((section) => (
                <section key={section.title}>
                  <h3>{section.title}</h3>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
          </details>
        </section>
        <nav className={styles.nextSteps} aria-label="이력서 다음 탐색">
          <Link href="/works">
            <span>개인 프로젝트와 다른 작업도 궁금하다면</span>
            <strong>
              전체 작업 보기 <ArrowUpRight size={18} aria-hidden />
            </strong>
          </Link>
          <Link href="/contact">
            <span>프로젝트나 협업에 관한 이야기</span>
            <strong>
              연락하기 <ArrowUpRight size={18} aria-hidden />
            </strong>
          </Link>
        </nav>
      </div>
    </div>
  );
}
