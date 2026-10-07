import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';
import { WorkLinks } from '../../_container/WorkLinks';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'portfolio';

export const metadata = createWorkMetadata(PAGE_NAME);

const PortPolioPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage
        url="https://nijoow-portfolio.vercel.app"
        imgSrc="portfolio/01-portfolio-3d-logo-home.webp"
      />

      <div className="my-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        <WorkImage imgSrc="portfolio/02-portfolio-project-introduction.webp" />
        <WorkImage imgSrc="portfolio/03-portfolio-works-list.webp" />
      </div>

      <PartTitle title="프로젝트 개요" />

      <CustomList>
        <CustomList.MainListItem>
          작업 아카이브와 현재 관심사를 한곳에서 보여주기 위해 지속적으로
          개선하고 있는 개인 포트폴리오
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          손글씨 로고와 파티클 인터랙션을 중심으로 다크·코스믹 시각 정체성을
          구성
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="기술 스택" />

      <TechStack
        stacks={[
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'React Three Fiber',
          'Framer Motion',
          'TanStack Query',
        ]}
      />

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>
          Next.js App Router 기반으로 홈·작업 목록·상세·연락 페이지 구성
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          Three.js와 React Three Fiber로 손글씨 파티클 로고 및 포인터 인터랙션
          구현
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          작업 데이터를 한곳에서 관리하고 공개 상태에 따라 목록·상세
          메타데이터·사이트맵을 일관되게 생성
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          Spotify와 GitHub API 응답을 서버 경계에서 검증하고 최근 활동 UI에 연결
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          키보드 포커스, 모션 축소 설정, WebGL 미지원 환경의 정적 폴백을 포함한
          접근성 보완
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          초기 JavaScript·SCSS 구현을 TypeScript·Tailwind CSS 구조로 단계적으로
          마이그레이션
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="AI와 작업한 방식" />
      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        손글씨 로고와 화면의 분위기, 작업을 보여주는 순서는 직접 정하고 AI를
        활용해 구현과 리팩터링을 진행했습니다. 생성된 코드를 검토하고 실제
        화면에서 내용의 가독성, 모바일 배치, 인터랙션을 확인하며 수정했습니다.
      </p>

      <div className="my-3" />

      <PartTitle title="관련 링크" />

      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default PortPolioPage;
