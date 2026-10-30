import CustomList from '../../_container/CustomList';
import WorkImage from '../../_container/WorkImage';
import { WorkLinks } from '../../_container/WorkLinks';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'fromis9-stickers';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        context={
          <>
            <h2 className="case-subheading">만들게 된 계기</h2>
            <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
              팬덤을 위한 인터랙티브 웹사이트를 만들어보고 싶었습니다. 사진과
              문구를 자유롭게 배치하고, 완성한 화면을 이미지로 저장하는 스티커
              꾸미기 경험으로 구성했습니다.
            </p>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                사진을 배치한 뒤 문구를 꾸밀 때 사진이 움직이지 않도록 잠금
                기능을 추가했습니다. 사진을 뒤로 보내거나 선택한 요소를 앞으로
                가져와 겹치는 순서를 조정하고, 텍스트 스티커는 색상을 골라
                추가할 수 있습니다.
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                데스크톱에서는 크기·회전 핸들을, 모바일에서는 두 손가락
                확대·축소와 회전 제스처를 사용합니다. 다른 화면 크기에서도
                배치를 다룰 수 있도록 위치는 화면 크기에 대한 비율로
                관리했습니다.
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                편집 메뉴와 꾸미기 영역을 분리해 결과 화면만 PNG로 저장하도록
                구성했습니다.
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        media={
          <>
            <WorkImage
              url="https://fromis9-stickers.vercel.app/"
              imgSrc="fromis9-stickers.webp"
            />
          </>
        }
        links={
          <>
            <WorkLinks pageName={PAGE_NAME} />
          </>
        }
      />
    </>
  );
}
