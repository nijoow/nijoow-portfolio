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

const PAGE_NAME = 'catch-the-candy';

export const metadata = createWorkMetadata(PAGE_NAME);

const CatchTheCandyPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage
        url="https://nijoow.github.io/CatchTheCandy_p5/"
        imgSrc="catchTheCandy.webp"
      />

      <div className="my-3" />

      <p className="text-ink-muted mt-4 text-sm leading-relaxed break-keep">
        졸업전시회 팀 인터랙티브아트 (p5.js ver.)
      </p>

      <PartSubTitle title="콘셉트" />

      <span className="font-bold">&quot;Bias&quot;</span>
      <span className="pl-1">
        바구니를 선택하면 게임은 시작된다. 높은 점수를 얻기 위해 이리저리
        움직이며 떨어지는 사탕들을 받아보자. 게임에 온전히 몰입하고 빠져들어보는
        것이다. 다양한 사탕을 제대로 받고 있는 것이 맞을까? 예상과는 다른 결과가
        나올지도 모른다.
      </span>

      <PartSubTitle title="게임 흐름" />

      <CustomList>
        <li>1) 빨간색 바구니와 파란색 바구니중 하나를 클릭하면 게임 시작</li>
        <li>
          2) 마우스 위치에 따라 바구니가 양옆으로 움직이며 하늘에서 떨어지는
          사탕을 받으며 게임 진행
        </li>
        <li>3) 타이머가 끝나고 게임이 종료되면 결과를 확인</li>
      </CustomList>

      <PartSubTitle title="기술 스택과 도구" />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-ink-muted text-sm font-bold">졸업 작품</span>
          <TechStack stacks={['Processing', 'Arduino', 'Kinect v1']} />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-ink-muted text-sm font-bold">웹 버전</span>
          <TechStack stacks={['JavaScript (p5.js)']} />
        </div>
      </div>

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>아이디어 및 컨셉 기획</CustomList.MainListItem>
        <CustomList.MainListItem>게임 기능 개발</CustomList.MainListItem>
        <CustomList.MainListItem>인터랙션 연동</CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title="관련 링크" />
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
  );
};

export default CatchTheCandyPage;
