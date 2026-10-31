import CustomList from '../../_container/CustomList';
import WorkImage from '../../_container/WorkImage';
import { WorkLinks } from '../../_container/WorkLinks';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'catch-the-candy';
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
            <span className="font-bold">&quot;Bias&quot;</span>
            <p>
              바구니를 선택하고 마우스로 움직여 떨어지는 사탕을 받는 게임입니다.
              제한 시간이 끝나면 결과를 확인할 수 있습니다. 바구니의 선택과
              사탕을 받는 경험을 통해 편향이라는 주제를 표현했습니다.
            </p>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                아이디어 및 콘셉트 기획
              </CustomList.MainListItem>
              <CustomList.MainListItem>게임 기능 개발</CustomList.MainListItem>
              <CustomList.MainListItem>인터랙션 연동</CustomList.MainListItem>
            </CustomList>
          </>
        }
        media={
          <>
            <WorkImage
              url="https://nijoow.github.io/CatchTheCandy_p5/"
              imgSrc="catchTheCandy.webp"
            />
          </>
        }
        links={
          <>
            <WorkLinks
              pageName={PAGE_NAME}
              links={[
                {
                  href: 'https://www.youtube.com/watch?v=vcJvQrc6k_w',
                  label: '졸업전시회 시연 영상',
                },
              ]}
            />
          </>
        }
      />
    </>
  );
}
