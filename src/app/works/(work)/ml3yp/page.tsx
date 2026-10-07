import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import PartTitle from '../../_container/PartTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';
import { WorkLinks } from '../../_container/WorkLinks';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'ml3yp';

export const metadata = createWorkMetadata(PAGE_NAME);

const TelevisionPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage url="https://ml3yp.vercel.app/" imgSrc="ml3yp.webp" />

      <div className="my-3" />

      <PartSubTitle title="기술 스택" />

      <TechStack
        stacks={[
          'Next.js',
          'TypeScript',
          'Three.js',
          'React Three Fiber',
          'Framer Motion',
          'Tailwind CSS',
        ]}
      />

      <PartSubTitle title="주요 작업" />
      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">3D 공간과 카메라</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          <strong className="font-bold">TV 화면 속 영상</strong>: TV 화면 내에
          YouTube 플레이어를 매핑해 실제 TV에서 재생되는 듯한 장면 구현
        </CustomList.SubListItem>
        <CustomList.SubListItem>
          <strong className="font-bold">인터랙티브 카메라</strong>: Orbit
          Controls를 통해 원하는 각도에서 공간을 탐색하고 감상 가능
        </CustomList.SubListItem>

        <CustomList.MainListItem>
          <strong className="font-bold">영상과 플레이리스트</strong>
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          <strong className="font-bold">커스텀 플레이리스트</strong>: 나만의
          영상 플레이리스트를 만들어 연속 영상 시청 가능.
        </CustomList.SubListItem>
        <CustomList.SubListItem>
          <strong className="font-bold">실시간 검색</strong>: YouTube API 연동을
          통해 영상을 검색해 플레이리스트에 추가 가능
        </CustomList.SubListItem>
        <CustomList.SubListItem>
          <strong className="font-bold">재생 제어</strong>: 하단 제어 컨트롤러
          패널에서 재생·볼륨·플레이리스트 관리
        </CustomList.SubListItem>
      </CustomList>

      <PartSubTitle title="AI와 작업한 방식" />
      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        영상을 감상할 공간의 분위기와 재생 제어 방식을 정하고 AI를 활용해 3D
        장면과 플레이어를 구현했습니다. 생성된 코드와 화면 동작을 검토하며
        카메라 조작, 영상 배치, 플레이리스트 흐름을 다듬었습니다.
      </p>

      <div className="my-3" />
      <PartTitle title="관련 링크" />
      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default TelevisionPage;
