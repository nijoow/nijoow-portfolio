import CustomList from '../../_container/CustomList';
import WorkImage from '../../_container/WorkImage';
import { WorkLinks } from '../../_container/WorkLinks';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'return-to-blank';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        context={
          <>
            <h2 className="case-subheading">콘셉트</h2>
            <p className="font-bold">제자리걸음(Return to blank)</p>
            <p>
              선행성 기억상실증을 소재로 한 인터랙티브 작품입니다. 관객이 붓으로
              스크린을 누르면 그림이 이어지고, 손을 떼면 잔상이 사라져 화면이
              다시 비워집니다. 그리기와 사라짐을 반복하는 경험으로
              제자리걸음이라는 작품의 주제를 표현했습니다.
            </p>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                Unity VFX Graph를 사용해 파티클로 물감이 번지는 듯한 시각 효과
                구현
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                Kinect v1 Depth 카메라를 통해 스크린에 가장 깊게 눌려진 위치와
                손을 떼었는지를 인식
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        media={
          <>
            <WorkImage
              url="https://www.youtube.com/watch?v=11Wplgnpt90"
              imgSrc="return-to-blank.webp"
            />
          </>
        }
        links={
          <>
            <WorkLinks pageName={PAGE_NAME} liveLabel="졸업전시회 시연 영상" />
          </>
        }
      />
    </>
  );
}
