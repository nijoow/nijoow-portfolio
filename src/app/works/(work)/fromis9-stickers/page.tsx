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

const PAGE_NAME = 'fromis9-stickers';

export const metadata = createWorkMetadata(PAGE_NAME);

const Fromis9StickersPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage
        url="https://fromis9-stickers.vercel.app/"
        imgSrc="fromis9-stickers.webp"
      />

      <div className="my-3" />

      <PartSubTitle title="만들게 된 계기" />
      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        팬덤을 위한 인터랙티브 웹사이트를 만들어보고 싶었습니다. 사진과 문구를
        자유롭게 배치하고, 완성한 화면을 이미지로 저장하는 스티커 꾸미기
        경험으로 구성했습니다.
      </p>

      <PartSubTitle title="사용 기술" />
      <TechStack
        stacks={[
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'Framer Motion',
          'Zustand',
          '@use-gesture/react',
          'modern-screenshot',
        ]}
      />

      <PartSubTitle title="구현하며 정한 부분" />
      <CustomList>
        <CustomList.MainListItem>
          사진 배치를 먼저 정한 뒤 문구를 꾸밀 수 있도록 멤버 사진 잠금과 뒤로
          보내기를 추가했습니다. 선택한 요소는 앞으로 가져오고, 텍스트 스티커는
          색상을 골라 추가할 수 있습니다.
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          데스크톱에서는 크기·회전 핸들을, 모바일에서는 두 손가락 확대·축소와
          회전 제스처를 사용합니다. 위치는 화면 크기에 대한 비율로 관리해 서로
          다른 화면 크기에 대응했습니다.
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          편집 메뉴와 꾸미기 영역을 분리해 결과 화면만 PNG로 저장하도록
          구성했습니다.
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="AI와 작업한 방식" />
      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        요구사항과 화면 흐름을 직접 정하고 AI를 활용해 구현했습니다. 생성된
        코드와 실제 동작을 검토하며 배치·선택 상태·모바일 조작을 수정했습니다.
      </p>

      <PartSubTitle title="공개한 결과" />
      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        완성한 웹사이트를 공개하고 커뮤니티에 공유했습니다.
      </p>

      <div className="my-3" />

      <PartTitle title="관련 링크" />

      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default Fromis9StickersPage;
