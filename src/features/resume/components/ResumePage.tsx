import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import {
  getResumeProjectHref,
  resumeContent,
  type ResumeCareer,
  type ResumeProject,
  type ResumeRichText,
} from '../data/resumeData';
import { ResumeNavigation, ResumeProjectLink } from './ResumeNavigation';
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

function ProjectEntry({
  project,
  showOrganization,
}: {
  project: ResumeProject;
  showOrganization: boolean;
}) {
  const href = getResumeProjectHref(project.slug);
  return (
    <article id={`resume-project-${project.slug}`} className={styles.project}>
      <aside className={styles.projectMeta}>
        {project.periods.map((period) => (
          <p key={period}>{period}</p>
        ))}
        {showOrganization ? <p>{project.organization.join(' · ')}</p> : null}
      </aside>
      <div className={styles.projectContent}>
        <div className={styles.projectHeading}>
          <h4>{project.name}</h4>
        </div>
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
      </div>
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
      <div className={styles.careerOverview}>
        <aside className={styles.careerPeriod}>
          <p>{career.period}</p>
          {career.duration ? <span>{career.duration}</span> : null}
        </aside>
        <div className={styles.careerContent}>
          <header className={styles.careerHeading}>
            <h3 id={`career-heading-${career.id}`}>{career.company}</h3>
            <p>{career.position}</p>
          </header>
        </div>
      </div>
      <div className={styles.projects}>
        {career.projects.map((project) => (
          <ProjectEntry
            key={project.slug}
            project={project}
            showOrganization={career.id !== 'bmeks'}
          />
        ))}
      </div>
    </section>
  );
}

export function ResumePage() {
  const { profile, careers, education } = resumeContent;
  return (
    <div className={styles.page}>
      <section
        id="resume-introduction"
        className={styles.introduction}
        aria-labelledby="resume-name"
      >
        <p className={styles.kicker}>FRONTEND DEVELOPER · RESUME</p>
        <div className={styles.introductionHeading}>
          <div>
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
        <nav className={styles.nextSteps} aria-label="이력서 다음 탐색">
          <Link href="/works">
            <strong>
              전체 작업 보기 <ArrowUpRight size={18} aria-hidden />
            </strong>
          </Link>
          <Link href="/contact">
            <strong>
              연락하기 <ArrowUpRight size={18} aria-hidden />
            </strong>
          </Link>
        </nav>
      </div>
    </div>
  );
}
