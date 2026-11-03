import CustomList from '../../_container/CustomList';
import WorkCarousel from '../../_container/WorkCarousel';
import { WorkLinks } from '../../_container/WorkLinks';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'ml3yp';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                <strong className="font-bold">3D 공간과 카메라</strong>
              </CustomList.MainListItem>
              <CustomList.SubListItem>
                <strong className="font-bold">TV 화면 속 영상</strong>: TV 화면
                내에 YouTube 플레이어를 매핑해 실제 TV에서 재생되는 듯한 장면
                구현
              </CustomList.SubListItem>
              <CustomList.SubListItem>
                <strong className="font-bold">카메라 시점</strong>: 드래그로
                거실을 둘러보거나 기본·거실·TV 정면 시점으로 전환
              </CustomList.SubListItem>

              <CustomList.MainListItem>
                <strong className="font-bold">영상과 플레이리스트</strong>
              </CustomList.MainListItem>
              <CustomList.SubListItem>
                <strong className="font-bold">커스텀 플레이리스트</strong>:
                나만의 영상 플레이리스트를 만들어 연속 영상 시청 가능.
              </CustomList.SubListItem>
              <CustomList.SubListItem>
                <strong className="font-bold">실시간 검색</strong>: YouTube API
                연동을 통해 영상을 검색해 플레이리스트에 추가 가능
              </CustomList.SubListItem>
              <CustomList.SubListItem>
                <strong className="font-bold">재생 제어</strong>: 하단 제어
                컨트롤러 패널에서 재생·볼륨·플레이리스트 관리
              </CustomList.SubListItem>
              <CustomList.MainListItem>
                <strong className="font-bold">집중 타이머와 분위기</strong>
              </CustomList.MainListItem>
              <CustomList.SubListItem>
                집중 시간과 취침 예약을 설정하고, 비 오는 새벽·조용한 밤·노을
                지는 방으로 분위기 전환
              </CustomList.SubListItem>
            </CustomList>
          </>
        }
        media={
          <>
            <WorkCarousel
              imgSrcList={[
                'ml3yp/01-midnight-room.webp',
                'ml3yp/02-music-panel.webp',
                'ml3yp/03-focus-timer.webp',
              ]}
              imageLabels={[
                '거실과 재생 화면',
                '음악 선택 패널',
                '집중 타이머',
              ]}
              background="dark"
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
