import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

// Read the resolved general variant; never publish raw application variants,
// profile photos, telephone numbers, or careers omitted from that document.
const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const sourceRoot = path.resolve(
  process.argv[2] ?? path.join(projectRoot, '../resume/app/data'),
);
async function loadGeneralResume() {
  const staging = fs.mkdtempSync(
    path.join(os.tmpdir(), 'nijoow-resume-export-'),
  );
  try {
    for (const name of ['generalResume', 'resume']) {
      const source = fs.readFileSync(
        path.join(sourceRoot, `${name}.ts`),
        'utf8',
      );
      const code = ts
        .transpileModule(source, {
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2022,
          },
        })
        .outputText.replace(
          "from './generalResume'",
          "from './generalResume.mjs'",
        );
      fs.writeFileSync(path.join(staging, `${name}.mjs`), code);
    }
    const data = await import(
      pathToFileURL(path.join(staging, 'resume.mjs')).href
    );
    return data.getResumeVariant('general').resume;
  } finally {
    fs.rmSync(staging, { recursive: true, force: true });
  }
}

const projectRoutes = {
  '디지털 자산 관리 시스템 고도화': 'digital-asset-management',
  'QUVE 홈페이지': 'quve',
  모임특별시: 'moimcity',
  '전기차 충전소 관리 시스템': 'ev-charging-management',
  '독자시점주의 <From You>': 'fromyou',
  'ATOP.DMS': 'atop-dms',
  Cusmetic: 'cusmetic',
  '공정 안전 관리 시스템': 'process-safety-management',
  트리나우: 'treenow',
};
const careerSections = [
  {
    id: 'freelance',
    company: '프리랜서',
    section: 'general-freelance-projects',
  },
  {
    id: 'bmeks',
    company: '주식회사 비멕스 (BMEKS Co., Ltd.)',
    section: 'general-company-projects',
  },
];
const resume = await loadGeneralResume();
const rich = (segments) =>
  segments.map(({ text, strong }) => ({
    text,
    ...(strong ? { strong: true } : {}),
  }));
const contacts = resume.profile.contacts.flatMap(({ label, value, href }) => {
  if (label === '이메일') return [{ label, value, href: `mailto:${value}` }];
  if (label === '깃허브') return [{ label: 'GitHub', value, href }];
  return [];
});
const careers = careerSections.map(({ id, company, section }) => {
  const career = resume.careers.find(
    (item) => item.company === company && !item.omitFromDocument,
  );
  const projects = resume.projectSections.find(
    (item) => item.id === section,
  )?.projects;
  if (!career || !projects)
    throw new Error(`Missing general-resume career: ${id}`);
  return {
    id,
    company: career.company,
    period: career.period,
    duration: career.duration ?? null,
    position: career.position,
    highlights: career.highlights.map(({ title, details }) => ({
      title: rich(title),
      details: (details ?? []).map(rich),
    })),
    projects: projects.map(
      ({ name, periods, organization, description, skills, achievements }) => {
        const slug = projectRoutes[name];
        if (!slug)
          throw new Error(`Map a portfolio route before exporting: ${name}`);
        return {
          slug,
          name,
          periods,
          organization,
          description,
          skills,
          achievements: achievements.map(rich),
        };
      },
    ),
  };
});
const content = {
  profile: {
    name: resume.profile.name,
    role: resume.profile.role,
    summary: resume.profile.summary.map(rich),
    contacts,
  },
  careers,
  education: resume.education.map(({ period, badge, school, major }) => ({
    period,
    badge,
    school,
    major,
  })),
  coverLetter: resume.coverLetter.sections.map(({ title, paragraphs }) => ({
    title,
    paragraphs,
  })),
};
const destination = path.join(
  projectRoot,
  'src/features/resume/data/generalResume.json',
);
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, `${JSON.stringify(content, null, 2)}\n`);
console.log(
  `Exported general resume: ${careers.length} careers, ${careers.flatMap((career) => career.projects).length} projects; email and GitHub only.`,
);
