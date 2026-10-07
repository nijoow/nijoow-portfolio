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
          <span className="text-ink-muted text-sm font-bold">
            3D Rendering & Physics
          </span>
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
        Google Antigravity·Claude·Codex를 3D 로직 설계·구현·리뷰에 활용했습니다.
        실시간 동기화 기능은 직접 검증했습니다.
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
        <CustomList.MainListItem>
          <strong className="font-bold">실시간 멀티플레이어 시스템</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          Supabase Realtime을 활용하여 접속 중인 유저의 위치와 닉네임을
          실시간으로 동기화
        </CustomList.SubListItem>
        <CustomList.SubListItem>실시간 채팅 기능 구현</CustomList.SubListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">낮과 밤에 따른 시각효과 변화</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          낮과 밤의 실시간 전환에 따른 조명 변화 및 흩날리는 벚꽃, 반딧불이 등의
          파티클 시스템
        </CustomList.SubListItem>
      </CustomList>

      <PartSubTitle title="문제 해결" />

      <CustomList>
        <li className="mt-5 first:mt-0">
          <h3 className="text-base font-bold">하이드레이션(Hydration) 에러</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            랜덤 파티클의 배치가 서버와 클라이언트에서 달라 하이드레이션 오류가
            발생했습니다. 3D 씬을 dynamic import와 ssr: false로 분리하고
            파티클은 클라이언트에서 초기화했습니다.
          </p>
        </li>

        <li className="mt-5 first:mt-0">
          <h3 className="text-base font-bold">캐릭터를 따라 움직이는 닉네임</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            Html 컴포넌트로 표시한 닉네임이 움직이는 캐릭터의 위치를 제대로
            따라가지 못했습니다. 3D 씬 안의 Text 컴포넌트로 바꿔 닉네임의 3D
            좌표를 캐릭터와 동기화했습니다.
          </p>
        </li>

        <li className="mt-5 first:mt-0">
          <h3 className="text-base font-bold">
            실시간 멀티플레이어 동기화 최적화
          </h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            Supabase Realtime의 잦은 업데이트로 네트워크 부하와 리렌더링이
            늘어났습니다. 위치 정보를 useRef로 관리하고 전송 주기를 100ms로
            제한해 위치 업데이트 트래픽을 제어했습니다.
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
