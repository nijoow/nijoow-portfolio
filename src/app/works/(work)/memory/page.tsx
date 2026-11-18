import CustomList from '../../_container/CustomList';
import WorkImage from '../../_container/WorkImage';
import { WorkLinks } from '../../_container/WorkLinks';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'memory';
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
                졸업전시회와 전시 정보 소개
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                전시 콘셉트와 작품 설명 (전시회 도록 대체)
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                전시회 작품 시연 영상 링크
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                기획 및 디자인 참여
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                전체적인 레이아웃, About 페이지, Header 반응형 퍼블리싱
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                가로 스크롤 페이지, 스크롤 타임라인 구현
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                스크롤·호버 애니메이션 구현
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        media={
          <>
            <WorkImage
              url="https://nijoow.github.io/PNUDT12/pages/about.html"
              imgSrc="pnudt12.webp"
            />
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
