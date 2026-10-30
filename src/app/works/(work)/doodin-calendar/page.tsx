import CustomList from '../../_container/CustomList';
import WorkCarousel from '../../_container/WorkCarousel';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'doodin-calendar';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        context={
          <>
            <h2 className="case-subheading">만든 이유</h2>
            <p className="text-ink-muted text-sm leading-relaxed break-keep">
              여자친구와 둘이 실제로 사용하는 비공개 캘린더입니다. 함께할 일정과
              할 일, 다녀온 날의 기록과 사진을 한곳에서 이어 보고 싶어
              만들었습니다. 기념일과 메모도 함께 관리하며, 직접 사용하면서
              필요한 기능과 불편한 흐름을 계속 다듬고 있습니다.
            </p>
          </>
        }
        features={
          <>
            <CustomList>
              <li className="mt-3 first:mt-0">
                <h3 className="text-base font-bold">
                  두 사람이 쓰는 비공개 서비스
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  접근을 제한하면서 여러 기기에서 사용하도록 PWA와 Cloudflare
                  기반으로 구성했습니다. 텍스트는 브라우저에서 암호화하고
                  사진·동영상 원본은 인증 API와 비공개 R2 저장소로 보호합니다.
                  날짜와 종류처럼 조회에 필요한 정보는 서버가 다루도록
                  구분했습니다.
                </p>
              </li>
              <li className="mt-3">
                <h3 className="text-base font-bold">
                  일정에서 기록으로 이어지는 흐름
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  일정을 기록으로 전환할 때 일정 메모를 기록의 초기 내용으로
                  복사하고, 전환 이후에는 각각 수정할 수 있도록 분리했습니다.
                  데이터 조회와 갱신은 TanStack Query, 날짜·필터·상세 대상은
                  URL, 저장 전 입력은 React Hook Form에서 관리합니다.
                </p>
              </li>
              <li className="mt-3">
                <h3 className="text-base font-bold">
                  저장 충돌과 불필요한 요청 처리
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  두 사람이 같은 내용을 수정할 때는 버전을 비교해 충돌을
                  확인하고, 저장 응답이 유실돼 생성 요청을 다시 보내도 항목이
                  중복되지 않도록 처리했습니다. 홈 사진과 썸네일은 세션별 메모리
                  캐시에서 재사용해 구도만 바뀌었을 때 파일을 다시 요청하지
                  않도록 했습니다. 연결 해제 시 캐시를 정리하고 이동할 화면의
                  기본 구조도 미리 불러옵니다.
                </p>
              </li>
            </CustomList>
          </>
        }
        details={
          <>
            <h3 className="case-subheading">실제 사용에서 시작한 개선</h3>
            <p className="text-ink-muted text-sm leading-relaxed break-keep">
              둘이 직접 사용하면서 편집 흐름을 정리했고, 받은 피드백을 바탕으로
              댓글·반응과 홈 사진 기능을 추가했습니다.
            </p>
            <CustomList>
              <li className="mt-3 first:mt-0">
                <h3 className="text-base font-bold">
                  편집 화면과 장소 조작 정리
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  일정·할 일·메모·기록·기념일은 입력 항목이 달라 추가와 수정
                  흐름이 서로 달랐습니다. 기본 입력은 같은 편집 화면에 모으고
                  날짜나 장소 같은 세부 설정은 필요할 때 열도록 정리했습니다.
                  기념일도 같은 방식으로 추가·수정하고, 장소를 새로 찾는 과정과
                  선택한 장소를 관리하는 과정을 분리했습니다.
                </p>
              </li>
              <li className="mt-3">
                <h3 className="text-base font-bold">기록에 댓글과 반응 추가</h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  함께 보는 기록에 각자의 댓글을 남기고 상대방 댓글에 이모지로
                  반응할 수 있도록 만들었습니다. 이후 댓글 영역을 기록 상세에
                  모으고 수정·삭제는 작성자 메뉴로 정리했습니다. 댓글 본문과
                  이모지 값도 암호화하면서 기존 댓글·반응과 백업의 호환성을
                  유지했습니다.
                </p>
              </li>
              <li className="mt-3">
                <h3 className="text-base font-bold">함께 고르는 홈 사진</h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  홈에 사진 한 장을 표시하던 기능을 여러 장을 함께 등록하고
                  각각의 구도를 조정할 수 있도록 확장했습니다. 사진 목록과
                  구도는 공유하되, 홈에 들어올 때 보여 줄 사진은 각 기기에서
                  무작위로 선택합니다. 홈용 사본을 따로 두어 사진첩 원본과 홈
                  사진을 독립적으로 관리합니다.
                </p>
              </li>
            </CustomList>
          </>
        }
        media={
          <>
            <WorkCarousel
              imgSrcList={[
                'doodin-calendar/home-overview.png',
                'doodin-calendar/month-calendar.png',
                'doodin-calendar/record-editor.png',
                'doodin-calendar/place-management.png',
                'doodin-calendar/entry-comments.png',
                'doodin-calendar/anniversary-detail.png',
                'doodin-calendar/upcoming-plans.png',
                'doodin-calendar/saved-notes.png',
                'doodin-calendar/photo-library.png',
              ]}
              imageLabels={[
                '홈',
                '월간 캘린더',
                '기록 편집',
                '장소 관리',
                '댓글과 반응',
                '기념일 상세',
                '다가오는 일정',
                '저장 메모',
                '사진첩',
              ]}
              background="light"
              aspectRatio="square"
            />
          </>
        }
      />
    </>
  );
}
