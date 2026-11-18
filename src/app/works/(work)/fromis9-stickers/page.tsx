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
        팬들이 멤버 사진과 문구로 화면을 꾸밀 수 있는 사이트를 만들어보고
        싶었습니다. 사진을 옮기거나 돌리고, 텍스트 스티커를 붙인 뒤 이미지로
        저장할 수 있습니다. 꾸미기 방식과 화면을 기획하고 AI를 활용해
        구현했습니다.
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

      <PartSubTitle title="사진과 스티커 편집" />
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

      <div className="my-3" />

      <PartTitle title="관련 링크" />

      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default Fromis9StickersPage;
