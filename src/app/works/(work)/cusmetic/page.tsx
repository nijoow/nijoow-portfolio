import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import TechStack from '../../_container/TechStack';
import WorkCarousel from '../../_container/WorkCarousel';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'cusmetic';

export const metadata = createWorkMetadata(PAGE_NAME);

const CusmeticPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkCarousel
        imgSrcList={[
          'cusmetic/landing.webp',
          'cusmetic/skin-type-check.webp',
          'cusmetic/skin-type-result.webp',
          'cusmetic/search.webp',
          'cusmetic/cosmetic-result.webp',
        ]}
        aspectRatio="square"
      />

      <div className="my-3" />

      <p className="text-ink-muted mt-4 text-sm leading-relaxed break-keep">
        피부타입 설문과 화장품 매칭률을 제공하는 서비스입니다.
      </p>

      <PartSubTitle title="기술 스택" />

      <TechStack stacks={['Next.js', 'TypeScript', 'Recoil', 'Tailwind CSS']} />

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">Next.js/TypeScript</strong> 기반의{' '}
          <strong className="font-bold">
            프론트엔드 아키텍처 설계 및 인터페이스 구현
          </strong>
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">Next.js</strong>와 서버 사이드 세션을
          활용해 인증에 따른 컴포넌트 깜빡임 제거 및 초기 렌더링 속도 개선
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">NextAuth.js</strong>를 활용해 프론트엔드
          환경에서{' '}
          <strong className="font-bold">소셜 로그인 기반의 인증 체계</strong>를
          신속하게 구현
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          검색 상태를 <strong className="font-bold">URL 쿼리 스트링</strong>으로
          관리하여 새로고침이나 링크 공유 시 맥락 유지
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          검색 <strong className="font-bold">디바운스</strong>와{' '}
          <strong className="font-bold">무한 스크롤</strong>을 적용해 불필요한
          API 호출과 초기 렌더링 부담을 줄이고 검색 흐름 개선
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          AWS Amplify를 활용한{' '}
          <strong className="font-bold">배포 자동화 파이프라인</strong>을
          구축하여{' '}
          <strong className="font-bold">개발 및 배포 프로세스 단축</strong>
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="문제 해결" />

      <CustomList>
        <li className="mt-5 first:mt-0">
          <h3 className="text-base font-bold">
            서버 컴포넌트 데이터 캐싱 문제
          </h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            fetch 함수에 no-store 옵션을 적용했지만 클라이언트 Router Cache
            때문에 새 데이터를 약 30초 동안 불러오지 못했습니다. 페이지 진입 시
            router.refresh()를 호출해 클라이언트 캐시를 무효화하고 최신 데이터를
            보여주도록 했습니다.
          </p>
        </li>
      </CustomList>
      <div className="my-3" />
    </>
  );
};

export default CusmeticPage;
