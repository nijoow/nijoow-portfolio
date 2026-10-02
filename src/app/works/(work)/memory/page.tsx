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

const PAGE_NAME = 'memory';

export const metadata = createWorkMetadata(PAGE_NAME);

const MemoryPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage
        url="https://nijoow.github.io/PNUDT12/pages/about.html"
        imgSrc="pnudt12.webp"
      />
      <div className="my-3" />
      <p className="text-ink-muted mt-4 text-sm leading-relaxed break-keep">
        부산대학교 디자인학과 디자인엔테크놀로지 전공 12회 졸업전시회 웹사이트
      </p>

      <PartTitle title="프로젝트 개요" />
      <CustomList>
        <CustomList.MainListItem>
          졸업전시회 소개 및 전시 정보 소개
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          컨셉 및 작품 설명 (전시회 도록 대체)
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          전시회 작품 시연 영상 링크
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="기술 스택" />

      <TechStack stacks={['HTML', 'CSS', 'JavaScript']} />

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>기획 및 디자인 참여</CustomList.MainListItem>
        <CustomList.MainListItem>
          전체적인 레이아웃, About 페이지, Header 반응형 퍼블리싱
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          가로스크롤 페이지, 스크롤 타임라인 구현
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          스크롤·호버 애니메이션 구현
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title="관련 링크" />

      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default MemoryPage;
