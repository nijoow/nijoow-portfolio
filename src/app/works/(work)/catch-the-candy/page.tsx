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
            <span className="pl-1">
              바구니를 선택하면 게임은 시작된다. 높은 점수를 얻기 위해 이리저리
              움직이며 떨어지는 사탕들을 받아보자. 게임에 온전히 몰입하고
              빠져들어보는 것이다. 다양한 사탕을 제대로 받고 있는 것이 맞을까?
              예상과는 다른 결과가 나올지도 모른다.
            </span>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                아이디어 및 컨셉 기획
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
