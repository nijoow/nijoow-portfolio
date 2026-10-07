import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkCarousel from '../../_container/WorkCarousel';
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
      <WorkCarousel
        imgSrcList={[
          'portfolio/01-portfolio-3d-logo-home.png',
          'portfolio/02-portfolio-project-introduction.png',
          'portfolio/03-portfolio-works-list.png',
        ]}
        imageLabels={['홈 3D 로고', '프로젝트 소개', 'Works 목록']}
        background="dark"
        aspectRatio="video"
      />

      <div className="my-3" />

      <PartTitle title="프로젝트 개요" />

      <CustomList>
        <CustomList.MainListItem>
          그동안 만든 작업과 요즘 관심 있는 것들을 모아 둔 개인 포트폴리오
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          손글씨 로고를 파티클로 표현하고, 어두운 배경에 별과 빛을 더한 화면
        </CustomList.MainListItem>
      </CustomList>

      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        로고와 화면의 분위기를 정하고, 구현과 리팩터링에 AI를 함께 사용했습니다.
        작업이 추가될 때마다 내용을 갱신하고 모바일 배치와 인터랙션도 손보고
        있습니다.
      </p>

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
          Spotify와 GitHub API로 최근 들은 음악과 저장소를 불러오고, 서버에서
          응답 형식을 확인한 뒤 화면에 표시
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

      <div className="my-3" />

      <PartTitle title="관련 링크" />

      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default PortPolioPage;
