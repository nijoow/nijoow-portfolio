import CustomList from '../../_container/CustomList';
import WorkCarousel from '../../_container/WorkCarousel';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'cusmetic';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        context={
          <>
            <h2 className="case-subheading">기여 범위</h2>
            <p>
              설문과 진단 결과, 화장품 검색 등 고객용 화면과 관리자 페이지를
              포함해 전체 프론트엔드를 담당했습니다. Next.js App Router를
              사용하며 개발 환경과 UI를 구성하고, 인증과 API 연동, 서비스 배포를
              진행했습니다.
            </p>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                <strong className="font-bold">Next.js/TypeScript</strong> 기반의{' '}
                <strong className="font-bold">
                  개발 환경 구성과 고객용·관리자 화면 구현
                </strong>
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                <strong className="font-bold">Next.js</strong>와 서버 사이드
                세션을 활용해 인증 상태에 따른 화면 깜빡임 개선
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                <strong className="font-bold">NextAuth.js</strong>를 활용해
                프론트엔드 환경에서{' '}
                <strong className="font-bold">소셜 로그인</strong> 구현
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                검색 상태를{' '}
                <strong className="font-bold">URL 쿼리 스트링</strong>으로
                관리하여 새로고침이나 링크 공유 시 맥락 유지
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                검색 <strong className="font-bold">디바운스</strong>와{' '}
                <strong className="font-bold">무한 스크롤</strong>을 적용해
                불필요한 API 요청을 줄이고 목록을 이어서 조회할 수 있도록 구현
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                AWS Amplify를 활용한{' '}
                <strong className="font-bold">배포 환경 구성</strong>
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        details={
          <>
            <CustomList>
              <li className="mt-5 first:mt-0">
                <h3 className="text-base font-bold">
                  인증 상태에 맞는 화면 표시
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  클라이언트에서 로그인 여부를 확인하는 동안 화면이 바뀌어
                  보였습니다. 서버에서 세션을 먼저 확인해 초기 화면부터 인증
                  상태에 맞는 내용을 표시하도록 했습니다. 소셜 로그인은
                  NextAuth로 구현했습니다.
                </p>
              </li>
              <li className="mt-5 first:mt-0">
                <h3 className="text-base font-bold">
                  검색 조건 유지와 목록 이어보기
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  검색 조건을 URL 쿼리로 관리해 새로고침하거나 링크를 공유해도
                  같은 조건으로 조회하도록 했습니다. 검색 입력에는 디바운스를
                  적용해 입력 중 발생하는 요청을 줄이고, 무한 스크롤로 목록을
                  이어서 불러오도록 구현했습니다.
                </p>
              </li>
              <li className="mt-5 first:mt-0">
                <h3 className="text-base font-bold">
                  페이지 이동 후 Router Cache의 이전 데이터 표시
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  데이터를 변경해도 목록에 바로 반영되지 않고 새로고침해야
                  갱신되는 문제가 있었습니다. fetch 옵션과 재검증 설정을
                  조정해도 해결되지 않아 페이지 이동 시 재사용되는 클라이언트
                  Router Cache를 확인했습니다. 당시에는 페이지 진입 시
                  router.refresh()로 캐시를 갱신하고 데이터를 다시 받아오도록
                  처리했습니다.
                </p>
              </li>
            </CustomList>
          </>
        }
        media={
          <>
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
          </>
        }
      />
    </>
  );
}
