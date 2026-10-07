import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import TechStack from '../../_container/TechStack';
import WorkCarousel from '../../_container/WorkCarousel';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'moimcity';

export const metadata = createWorkMetadata(PAGE_NAME);

const MoimcityPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkCarousel
        imgSrcList={[
          'moimcity/moimcity.webp',
          'moimcity/meetups.webp',
          'moimcity/wishlist.webp',
          'moimcity/filters.webp',
          'moimcity/meetup-detail.webp',
          'moimcity/profile-detail.webp',
        ]}
        aspectRatio="square"
      />

      <div className="my-3" />

      <PartSubTitle title="기술 스택" />
      <TechStack
        stacks={[
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'Zustand',
          'Framer Motion',
        ]}
      />

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>
          서비스 리뉴얼에 따른 프론트엔드 고도화 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          크로스 브라우저 환경에서의{' '}
          <strong className="font-bold">터치 동작 오류 해결</strong> 등 모바일
          UX 개선
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">
            Prettier 및 플러그인 설정·코드 리팩터링
          </strong>
          을 통해 가독성 및 유지보수성 개선
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">
            600개 이상의 불필요한 파일과 약 9만 줄의 데드 코드 정리
          </strong>
          로 코드베이스 탐색과 유지보수 범위 축소
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="문제 해결" />

      <CustomList>
        <li className="mt-5 first:mt-0">
          <h3 className="text-base font-bold">
            중복 코드와 서로 다른 작성 규칙
          </h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            여러 개발자가 참여하면서 코딩 컨벤션이 달라지고 중복 파일과 사용하지
            않는 익스포트가 쌓여 유지보수가 어려워졌습니다. Knip으로 미사용
            파일·익스포트·의존성을 찾아 정리했습니다.
          </p>
        </li>

        <li className="mt-5 first:mt-0">
          <h3 className="text-base font-bold">
            키보드가 올라올 때 생기는 하단 여백
          </h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            모바일 웹뷰에서 키보드가 나타나면 화면 하단에 불필요한 여백이
            생겼습니다. 뷰포트 단위를 dvh로 바꾸고 레이아웃의 height와 overflow
            설정을 조정했습니다.
          </p>
        </li>
      </CustomList>

      <div className="my-3" />
    </>
  );
};

export default MoimcityPage;
