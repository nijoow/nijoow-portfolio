import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';
import WorkCarousel from '../../_container/WorkCarousel';
import { WorkLinks } from '../../_container/WorkLinks';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'fromyou';

export const metadata = createWorkMetadata(PAGE_NAME);

const FromYouPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage imgSrc="fromyou.webp" />

      <div className="my-3" />

      <PartSubTitle title="기술 스택" />

      <TechStack
        stacks={[
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'Motion',
          'dnd-kit',
          'Nivo',
        ]}
      />

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>
          요구사항이 구체화되지 않은 초기 단계에서{' '}
          <strong className="font-bold">
            UX/UI 디자인과 프론트엔드 개발을 함께 진행
          </strong>
          하고, 피드백에 따라 화면과 인터랙션을 반복 개선
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          SVG 지도·드래그 앤 드롭·차트·스크롤 애니메이션 등을 활용한 반응형 웹
          구현
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          AWS Amplify 기반 배포 및 서브도메인 설정
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          신문방송편집인협회의 2025 지역신문 기획취재 제작 지원 대상으로 선정된
          프로젝트의 인터랙티브 결과물 제작
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          인천일보 팀 이달의 기자상 수상에 기여
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />
      <PartTitle title="사용자 선택 흐름" />
      <p className="text-ink-muted mb-3 text-sm leading-relaxed break-keep">
        지도에서 지역을 고르고, 연령대와 관심사를 선택해 기사를 읽는 흐름입니다.
        관심사는 드래그로 담고 순서를 바꿀 수 있습니다.
      </p>
      <WorkCarousel
        eager={false}
        background="dark"
        imgSrcList={[
          'fromyou/region.png',
          'fromyou/age.png',
          'fromyou/interests.png',
        ]}
        imageLabels={[
          '지도에서 지역 선택',
          '차트에서 연령대 선택',
          '관심사 선택과 순서 변경',
        ]}
      />

      <div className="my-3" />
      <PartTitle title="관련 링크" />
      <WorkLinks
        links={[
          {
            href: 'https://www.incheonilbo.com/news/articleView.html?idxno=1312711',
            label: '기사 바로가기',
          },
        ]}
      />
    </>
  );
};

export default FromYouPage;
