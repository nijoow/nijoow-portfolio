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
        레서판다로 산책하고 다른 방문자와 인사하거나 쪽지를 남길 수 있는 마을을
        만들었습니다. 생성형 3D 에셋을 사용했고, 마을의 기능과 화면은 Google
        Antigravity·Claude·Codex를 활용해 구현했습니다.
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
            건물과 사물의 위치를 화면, 충돌 판정, 미니맵에서 따로 관리하면 서로
            어긋날 수 있습니다. 세 곳에서 같은 배치 데이터를 읽게 해, 위치를 한
            번 바꾸면 화면과 이동 가능한 영역, 지도에 함께 반영되도록 했습니다.
          </p>
        </li>

        <li className="mt-5 first:mt-0">
          <h3 className="text-base font-bold">늦은 조회로 되돌아오는 쪽지</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            삭제한 쪽지가 늦게 도착한 조회 결과로 다시 표시되는 문제를
            수정했습니다. 삭제가 완료되면 그보다 먼저 시작한 조회 결과는
            무시하고, 목록과 게시판, 캐시에서도 해당 쪽지를 지우도록 바꿨습니다.
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

      <div className="my-3" />

      <PartTitle title="관련 링크" />
      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default LessorPandaVillagePage;
