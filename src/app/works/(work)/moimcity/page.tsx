import CustomList from '../../_container/CustomList';
import WorkCarousel from '../../_container/WorkCarousel';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'moimcity';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                서비스 리뉴얼에 따른 프론트엔드 고도화 개발
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                크로스 브라우저 환경에서의{' '}
                <strong className="font-bold">터치 동작 오류 해결</strong> 등
                모바일 UX 개선
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                <strong className="font-bold">
                  Prettier 및 플러그인 설정·코드 리팩터링
                </strong>
                을 통해 가독성 및 유지보수성 개선
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                <strong className="font-bold">
                  Knip을 활용한 미사용 코드 분석과 중복·불필요한 파일 정리
                </strong>
                로 코드베이스 탐색과 유지보수 범위 축소
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        details={
          <>
            <CustomList>
              <li className="mt-5 first:mt-0">
                <h3 className="text-base font-bold">
                  중복 코드와 서로 다른 작성 규칙
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  기존 코드 기반으로 리뉴얼을 진행하면서 한 폴더에 모인 이전
                  코드와 새 코드 사이에 의존성이 남아 있었고, 중복되거나 더 이상
                  사용하지 않는 코드도 섞여 있었습니다. Knip으로 미사용 코드를
                  분석하고 참조 관계를 확인하며 중복 코드와 불필요한 파일을
                  정리했습니다. Prettier 설정도 정비해 작성 규칙을 맞췄습니다.
                </p>
              </li>

              <li className="mt-5 first:mt-0">
                <h3 className="text-base font-bold">
                  앱에서 동작하지 않는 날짜 선택
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  PC 브라우저의 모바일 보기에서는 동작하던 날짜 선택 팝업이 실제
                  앱에서 휠로 스크롤되지 않았습니다. 앱에서 발생하는 스크롤 동작
                  오류를 수정해 날짜를 선택할 수 있도록 했습니다.
                </p>
              </li>

              <li className="mt-5 first:mt-0">
                <h3 className="text-base font-bold">
                  키보드가 올라올 때 생기는 하단 여백
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  앱에서 키보드가 나타나면 키보드 높이만큼 화면이 더 드래그되어
                  하단에 빈 공간이 생겼습니다. html과 body에 지정된 height:
                  100%를 제거해 콘텐츠에 따라 문서 높이가 잡히도록 바꿨습니다.
                  키보드가 열린 상태에서 불필요하게 늘어나던 스크롤 영역과 하단
                  여백을 줄였습니다.
                </p>
              </li>
            </CustomList>
          </>
        }
        media={
          <>
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
          </>
        }
      />
    </>
  );
}
