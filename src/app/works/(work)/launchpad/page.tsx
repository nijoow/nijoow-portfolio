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

const PAGE_NAME = 'launchpad';

export const metadata = createWorkMetadata(PAGE_NAME);

const LaunchpadPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage
        url="https://nijoow-launchpad.vercel.app/"
        imgSrc="nijoow-launchpad.webp"
      />

      <div className="my-3" />

      <PartSubTitle title="기술 스택" />

      <TechStack stacks={['Next.js', 'TypeScript', 'Tailwind CSS']} />

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>
          마우스·키보드·터치 입력으로 런치패드를 누를 때마다 사운드 재생
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          피아노와 드럼을 포함한 두 가지 사운드 모드 제공
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="문제 해결" />

      <CustomList>
        <li className="mt-5 first:mt-0">
          <h3 className="text-base font-bold">연속 클릭 시 사운드 중첩 문제</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            onClick으로 사운드를 재생하면 빠르게 연속 클릭할 때 소리가 끊기지
            않고 겹쳤습니다. 마우스를 누를 때와 뗄 때의 이벤트를 분리하고 모바일
            Touch 이벤트도 별도로 처리해 재생 시점을 제어했습니다.
          </p>
        </li>
      </CustomList>

      <div className="my-3" />
      <PartTitle title="관련 링크" />
      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default LaunchpadPage;
