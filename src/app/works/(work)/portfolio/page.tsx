import CustomList from '../../_container/CustomList';
import WorkImage from '../../_container/WorkImage';
import { WorkLinks } from '../../_container/WorkLinks';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'portfolio';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        context={
          <>
            <h2 className="case-subheading">프로젝트 개요</h2>
            <CustomList>
              <CustomList.MainListItem>
                작업 아카이브와 현재 관심사를 한곳에서 보여주기 위해 지속적으로
                개선하고 있는 개인 포트폴리오
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                손글씨 로고와 파티클 인터랙션을 중심으로 다크·코스믹 시각
                정체성을 구성
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                Next.js App Router 기반으로 홈·작업 목록·상세·연락 페이지 구성
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                Three.js와 React Three Fiber로 손글씨 파티클 로고 및 포인터
                인터랙션 구현
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                작업 데이터를 한곳에서 관리하고 공개 상태에 따라 목록·상세
                메타데이터·사이트맵을 일관되게 생성
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                Spotify와 GitHub API 응답을 서버 경계에서 검증하고 최근 활동
                UI에 연결
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                키보드 포커스, 모션 축소 설정, WebGL 미지원 환경의 정적 폴백을
                포함한 접근성 보완
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                초기 JavaScript·SCSS 구현을 TypeScript·Tailwind CSS 구조로
                단계적으로 마이그레이션
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        media={
          <>
            <WorkImage
              url="https://nijoow-portfolio.vercel.app"
              imgSrc="portfolio/01-portfolio-3d-logo-home.webp"
            />
            <div className="my-3 grid grid-cols-1 gap-4 md:grid-cols-2">
              <WorkImage imgSrc="portfolio/02-portfolio-project-introduction.webp" />
              <WorkImage imgSrc="portfolio/03-portfolio-works-list.webp" />
            </div>
          </>
        }
        links={
          <>
            <WorkLinks pageName={PAGE_NAME} />
          </>
        }
      />
    </>
  );
}
