import CustomList from '../../_container/CustomList';
import WorkCarousel from '../../_container/WorkCarousel';
import { WorkLinks } from '../../_container/WorkLinks';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'lessor-panda-village';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        context={
          <p>
            레서판다 캐릭터로 마을을 산책하고 다른 방문자와 가볍게 상호작용하는
            웹 공간을 만들었습니다. 공간의 분위기와 캐릭터로 할 수 있는 동작을
            정하고, AI 도구를 활용해 구현과 수정을 진행했습니다.
          </p>
        }
        features={
          <CustomList>
            <CustomList.MainListItem>
              키보드와 마우스로 캐릭터를 움직이고 걷기·달리기·점프하기
            </CustomList.MainListItem>
            <CustomList.MainListItem>
              벤치에 앉기, 인사와 춤, 죽순 수확, 미니맵으로 위치 확인하기
            </CustomList.MainListItem>
            <CustomList.MainListItem>
              같은 마을에 접속한 방문자를 보고 채팅하기
            </CustomList.MainListItem>
            <CustomList.MainListItem>
              방명록에 쪽지를 남기고 확인하기
            </CustomList.MainListItem>
            <CustomList.MainListItem>
              낮과 밤에 따라 달라지는 조명과 벚꽃·반딧불이 효과
            </CustomList.MainListItem>
          </CustomList>
        }
        media={
          <WorkCarousel
            imgSrcList={[
              'lessor-panda-village/01-panda-village-overview.webp',
              'lessor-panda-village/02-panda-village-daytime.webp',
              'lessor-panda-village/03-panda-village-guestbook.webp',
            ]}
            imageLabels={[
              '마을 전경과 주요 공간',
              '마을과 캐릭터',
              '마을 방명록',
            ]}
            background="dark"
            aspectRatio="video"
          />
        }
        links={<WorkLinks pageName={PAGE_NAME} />}
      />
    </>
  );
}
