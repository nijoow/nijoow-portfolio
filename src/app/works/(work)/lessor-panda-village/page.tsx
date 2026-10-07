import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkCarousel from '../../_container/WorkCarousel';
import { WorkLinks } from '../../_container/WorkLinks';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'lessor-panda-village';

export const metadata = createWorkMetadata(PAGE_NAME);

const LessorPandaVillagePage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkCarousel
        imgSrcList={[
          'lessor-panda-village/01-panda-village-overview.webp',
          'lessor-panda-village/02-panda-village-daytime.webp',
          'lessor-panda-village/03-panda-village-guestbook.webp',
        ]}
        imageLabels={['마을 전경과 주요 공간', '마을과 캐릭터', '마을 방명록']}
        background="dark"
        aspectRatio="video"
      />

      <div className="my-3" />

      <PartSubTitle title="기술 스택과 도구" />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-ink-muted text-sm font-bold">Core</span>
          <TechStack
            stacks={[
              'Next.js 16',
              'React 19',
              'TypeScript',
              'Supabase 2 (Auth · Postgres · Realtime)',
              'Zustand 5',
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-ink-muted text-sm font-bold">3D Rendering</span>
          <TechStack
            stacks={[
              'Three.js r183',
              'React Three Fiber 9',
              '@react-three/drei 10',
              '@react-three/postprocessing',
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-ink-muted text-sm font-bold">
            Styling & Animation
          </span>
          <TechStack stacks={['Tailwind CSS 4', 'Framer Motion']} />
        </div>
      </div>
      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        산책과 방문자 간 상호작용을 기획하고, Google Antigravity·Claude·Codex를
        활용해 구현·수정·리뷰했습니다. 생성형 3D 에셋을 사용하고 프론트엔드
        구성과 인터랙션을 다듬는 데 집중했습니다.
      </p>

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">3D 캐릭터 컨트롤 & 인터랙션</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          키보드/마우스를 통한 자유로운 이동(걷기, 달리기, 점프) 및 공간 해시
          그리드 기반의 충돌 판정
        </CustomList.SubListItem>
        <CustomList.SubListItem>
          벤치 앉기, 인사·춤, 죽순 수확과 미니맵 구현
        </CustomList.SubListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">실시간 멀티플레이어 시스템</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          Supabase Realtime을 활용하여 접속 중인 유저의 위치와 닉네임을
          실시간으로 동기화
        </CustomList.SubListItem>
        <CustomList.SubListItem>
          사용자별 인증 채널로 이동과 채팅 전달
        </CustomList.SubListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">방문자의 쪽지가 남는 방명록</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          쪽지 작성·조회·삭제와 데이터베이스 저장, 게시판 표시 및 캐시 갱신 구현
        </CustomList.SubListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">낮과 밤에 따른 시각효과 변화</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          낮과 밤의 실시간 전환에 따른 조명 변화 및 흩날리는 벚꽃, 반딧불이 등의
          파티클 시스템
        </CustomList.SubListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">연결 상태와 기기에 맞춘 체험</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          서버 연결이 어려울 때 불러온 마을에서 산책을 이어가는 로컬 모드 제공
        </CustomList.SubListItem>
        <CustomList.SubListItem>
          자동·수동 그래픽 품질 조절과 원격 캐릭터의 거리별 LOD 적용
        </CustomList.SubListItem>
      </CustomList>

      <PartSubTitle title="문제 해결" />

      <CustomList>
        <li className="mt-5 first:mt-0">
          <h3 className="text-base font-bold">월드 배치의 일관성</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            월드의 배치 데이터를 렌더링·충돌 판정·미니맵이 함께 참조하도록
            구성했습니다. 공간을 수정할 때 화면과 이동 가능한 영역, 지도에 같은
            배치가 반영되도록 했습니다.
          </p>
        </li>

        <li className="mt-5 first:mt-0">
          <h3 className="text-base font-bold">늦은 조회로 되돌아오는 쪽지</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            삭제한 쪽지가 늦게 도착한 조회 결과로 다시 표시되는 문제를
            수정했습니다. 확인된 삭제 이후에는 이전 조회를 무효화하고,
            목록·게시판·캐시에 같은 변경을 반영하도록 요청 수명을 관리했습니다.
          </p>
        </li>

        <li className="mt-5 first:mt-0">
          <h3 className="text-base font-bold">프레임 갱신과 위치 전송 분리</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            매 프레임의 움직임과 네트워크 전송을 분리했습니다. 위치·회전·동작이
            바뀐 경우 최대 초당 10회 전송하고, 수신한 움직임은 보간해 화면에
            반영하도록 구성했습니다.
          </p>
        </li>
      </CustomList>

      <PartSubTitle title="검증 범위와 남은 확인" />
      <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
        로컬 브라우저에서 이동·방명록 캐시·설정·키보드 포커스를 확인하고, 자동
        검사로 전송 로직과 데이터 권한을 점검했습니다. 실서버에서 3~4명이 함께
        접속하거나 재연결하는 동작, 실제 모바일 입력과 저사양 GPU 성능은 추가
        검증이 필요합니다.
      </p>
      <div className="my-3" />

      <PartTitle title="관련 링크" />
      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default LessorPandaVillagePage;
