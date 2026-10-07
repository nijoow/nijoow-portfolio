import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkCarousel from '../../_container/WorkCarousel';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'doodin-calendar';

export const metadata = createWorkMetadata(PAGE_NAME);

export default function DoodinCalendarPage() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkCarousel
        imgSrcList={[
          'doodin-calendar/home-overview.webp',
          'doodin-calendar/month-calendar.webp',
          'doodin-calendar/record-editor.webp',
          'doodin-calendar/place-management.webp',
          'doodin-calendar/entry-comments.webp',
          'doodin-calendar/anniversary-detail.webp',
          'doodin-calendar/upcoming-plans.webp',
          'doodin-calendar/saved-notes.webp',
          'doodin-calendar/photo-library.webp',
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
      <div className="my-3" />

      <PartTitle title="만든 이유" />
      <p className="text-ink-muted text-sm leading-relaxed break-keep">
        여자친구와 둘이 쓰는 비공개 캘린더입니다. 함께할 일정과 할 일, 다녀온
        날의 기록과 사진을 한곳에 모아 보고 싶어 만들었습니다. 기념일과 메모도
        함께 관리합니다. 필요한 기능과 화면을 정하고 설계와 코드 구현에는 AI를
        활용했습니다. 둘이 쓰면서 불편한 점을 찾고, 코드를 살펴보며 고치고
        있습니다.
      </p>

      <PartSubTitle title="기술 스택" />
      <TechStack
        stacks={[
          'React',
          'TypeScript',
          'Vinext',
          'Tailwind CSS',
          'TanStack Query',
          'React Hook Form',
          'Zod',
          'Cloudflare Workers · D1 · R2',
          'Cloudflare Access',
          'PWA',
        ]}
      />

      <PartTitle title="둘이 쓰기 위한 구성" />
      <CustomList>
        <li className="mt-3 first:mt-0">
          <h3 className="text-base font-bold">비공개 데이터 관리</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            둘만 접속할 수 있게 하고, 여러 기기에서 설치해 쓰도록 PWA로
            만들었습니다. Cloudflare를 사용하며 텍스트는 브라우저에서
            암호화하고, 사진·동영상 원본은 인증 API와 비공개 R2 저장소로
            보호합니다. 날짜와 종류처럼 조회에 필요한 정보는 서버가 다루도록
            구분했습니다.
          </p>
        </li>
        <li className="mt-3">
          <h3 className="text-base font-bold">종류가 달라도 같은 편집 화면</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            일정·할 일·메모·기록·기념일마다 입력할 내용은 다릅니다. 그래도
            추가하고 수정하는 방법은 같게 맞췄습니다. 기본 항목은 편집 화면에
            모으고, 날짜나 장소 설정은 필요할 때 열도록 했습니다.
          </p>
        </li>
      </CustomList>

      <PartTitle title="구현 과정" />
      <CustomList>
        <CustomList.MainListItem>
          서버 데이터, 탐색 상태, 작성 중인 입력을 구분했습니다. 조회와 갱신은
          TanStack Query, 날짜·필터·상세 대상은 URL, 저장 전 입력은 React Hook
          Form에서 관리합니다.
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          두 사람이 같은 내용을 수정하거나 저장 응답이 유실되는 경우를
          다뤘습니다. 버전을 비교해 변경 충돌을 확인하고, 동일한 생성 요청을
          재전송해도 항목이 중복 생성되지 않도록 처리했습니다.
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          데이터 변환과 저장 로직에는 단위·서버 테스트를 작성했습니다. 글을 쓰고
          저장하거나 뒤로 가는 동작, 사진과 댓글 기능은 브라우저 테스트로
          점검합니다. 사용 중 발견한 문제도 수정에 반영했습니다.
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          홈 사진과 썸네일은 세션별 메모리 캐시에서 재사용하고, 구도만 바뀌었을
          때는 파일을 다시 요청하지 않도록 했습니다. 연결 해제 시 캐시를
          정리하고, 이동할 화면의 기본 구조는 미리 불러오도록 보완했습니다.
        </CustomList.MainListItem>
      </CustomList>

      <PartTitle title="실제 사용과 개선" />
      <p className="text-ink-muted text-sm leading-relaxed break-keep">
        둘이 써 보면서 편집 화면을 고쳤고, 받은 피드백으로 댓글과 이모지 반응,
        홈 사진을 추가했습니다.
      </p>
      <CustomList>
        <li className="mt-3">
          <h3 className="text-base font-bold">편집 화면과 장소 선택</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            종류마다 달랐던 편집 화면을 맞추고, 기념일도 같은 화면에서
            추가·수정하게 바꿨습니다. 장소를 새로 찾는 화면과 이미 선택한 장소를
            관리하는 화면도 나눴습니다. 검색 결과와 선택한 장소가 한 화면에서
            섞이지 않게 하려는 변경입니다.
          </p>
        </li>
        <li className="mt-3">
          <h3 className="text-base font-bold">기록에 남기는 댓글과 이모지</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            함께 보는 기록에 각자의 댓글을 남기고 상대방 댓글에 이모지로 반응할
            수 있도록 추가했습니다. 이후 댓글 영역을 기록 상세에 모으고,
            수정·삭제는 작성자 메뉴로 정리했습니다. 댓글 본문과 이모지 값도
            암호화하며, 기존 댓글·반응과 백업의 호환성을 유지했습니다.
          </p>
        </li>
        <li className="mt-3">
          <h3 className="text-base font-bold">함께 고르는 홈 사진</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            홈에 사진을 표시하는 기능을 추가한 뒤, 여러 장을 함께 등록하고
            구도를 조정할 수 있도록 확장했습니다. 등록한 목록과 구도는 공유하고,
            앱을 새로 열 때 보여 줄 사진은 기기마다 선택합니다. 홈용 사본을 따로
            두어 사진첩의 원본과 홈 사진을 독립적으로 관리합니다.
          </p>
        </li>
      </CustomList>
    </>
  );
}
