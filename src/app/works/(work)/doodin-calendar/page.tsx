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
        imgSrcList={['doodin-calendar/saved-notes.webp']}
        imageLabels={['저장 메모']}
        background="light"
        aspectRatio="square"
      />
      <div className="my-3" />

      <PartTitle title="만든 이유" />
      <p className="text-ink-muted text-sm leading-relaxed break-keep">
        여자친구와 둘이 실제로 사용하는 비공개 캘린더입니다. 함께할 일정과 할
        일, 다녀온 날의 기록과 사진을 한곳에서 이어 보고 싶어 만들었습니다.
        기념일과 메모도 함께 관리하며, 직접 사용하면서 필요한 기능과 불편한
        흐름을 계속 다듬고 있습니다.
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

      <PartTitle title="직접 판단한 부분" />
      <CustomList>
        <li className="mt-3 first:mt-0">
          <h3 className="text-base font-bold">둘이 쓰는 범위에 맞춘 구조</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            두 사람의 접근을 제한하고 여러 기기에서 사용할 수 있도록 PWA와
            Cloudflare 기반으로 구성했습니다. 텍스트는 브라우저에서 암호화하고,
            사진·동영상 원본은 인증 API와 비공개 R2 저장소로 보호합니다. 날짜와
            종류처럼 조회에 필요한 정보는 서버가 다루도록 구분했습니다.
          </p>
        </li>
        <li className="mt-3">
          <h3 className="text-base font-bold">입력 방식의 일관성</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            일정·할 일·메모·기록·기념일은 목적과 입력 항목이 다르지만, 추가하고
            수정하는 흐름은 같은 방식으로 사용할 수 있도록 정했습니다. 기본
            입력은 편집 화면에 모으고, 날짜나 장소 같은 세부 설정은 필요한
            순간에 열도록 나눴습니다.
          </p>
        </li>
        <li className="mt-3">
          <h3 className="text-base font-bold">
            요구사항과 검증을 직접 맡는 AI 활용
          </h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            AI를 설계와 코드 구현에 활용하고, 필요한 기능의 범위와 화면 흐름은
            직접 결정했습니다. 생성된 코드를 검토하고 실제 사용 흐름에서 동작을
            확인한 뒤, 복잡한 조작이나 저장·이동 과정의 문제를 다시 수정하는
            방식으로 진행했습니다.
          </p>
        </li>
      </CustomList>

      <PartTitle title="구현 과정" />
      <CustomList>
        <CustomList.MainListItem>
          일정에서 기록으로 이어지는 흐름을 만들고, 전환할 때 일정 메모를 기록의
          초기 내용으로 복사하도록 구성했습니다. 전환 이후에는 각각 수정할 수
          있도록 분리했습니다.
        </CustomList.MainListItem>
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
          데이터 변환과 저장 경계는 단위·서버 테스트로, 작성·저장·뒤로가기와
          사진·댓글 흐름은 브라우저 테스트로 확인할 수 있도록 구성했습니다. 실제
          사용에서 발견한 문제를 다음 수정의 기준으로 삼았습니다.
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          홈 사진과 썸네일은 세션별 메모리 캐시에서 재사용하고, 구도만 바뀌었을
          때는 파일을 다시 요청하지 않도록 했습니다. 연결 해제 시 캐시를
          정리하고, 이동할 화면의 기본 구조는 미리 불러오도록 보완했습니다.
        </CustomList.MainListItem>
      </CustomList>

      <PartTitle title="실제 사용과 개선" />
      <p className="text-ink-muted text-sm leading-relaxed break-keep">
        둘이 사용하며 복잡했던 편집 흐름을 정리하고, 받은 피드백으로 댓글·반응과
        홈 사진을 추가했습니다. 기능을 늘리는 과정에서도 자주 쓰는 조작과 내용을
        확인하는 흐름을 함께 다듬었습니다.
      </p>
      <CustomList>
        <li className="mt-3">
          <h3 className="text-base font-bold">편집 화면과 장소 조작 정리</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            종류마다 달랐던 편집 흐름을 하나로 맞추고, 기념일도 같은 방식으로
            추가·수정하도록 바꿨습니다. 장소를 새로 찾고 추가하는 과정과 이미
            선택한 장소를 관리하는 과정을 분리해, 한 화면에서 여러 목적의 조작이
            섞이지 않도록 정리했습니다.
          </p>
        </li>
        <li className="mt-3">
          <h3 className="text-base font-bold">
            기록에 각자의 말을 남기는 댓글과 반응
          </h3>
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
