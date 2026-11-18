import CustomList from '../../_container/CustomList';
import WorkCarousel from '../../_container/WorkCarousel';
import { WorkLinks } from '../../_container/WorkLinks';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'launchpad';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        context={
          <p>
            초기 건반 UI와 마우스·키보드·터치 입력, 사운드 재생을 직접
            구현했습니다. 누름·해제 이벤트를 나누고 연속 입력 시 소리가 겹치는
            문제를 수정했으며, 이후 AI를 활용해 기능을 확장했습니다.
          </p>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                마우스·키보드·터치 입력으로 런치패드를 누를 때마다 사운드 재생
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                피아노와 드럼을 포함한 두 가지 사운드 모드 제공
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        details={
          <>
            <CustomList>
              <li className="mt-5 first:mt-0">
                <h3 className="text-base font-bold">
                  연속 클릭 시 사운드 중첩 문제
                </h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
                  onClick으로 사운드를 재생하면 빠르게 연속 클릭할 때 소리가
                  끊기지 않고 겹쳤습니다. 마우스를 누를 때와 뗄 때의 이벤트를
                  분리하고 모바일 Touch 이벤트도 별도로 처리해 재생 시점을
                  제어했습니다. 같은 패드를 다시 누르면 재생 중인 사운드를 멈춘
                  뒤 새로 재생하도록 처리했습니다.
                </p>
              </li>
            </CustomList>
          </>
        }
        media={
          <WorkCarousel
            imgSrcList={[
              'launchpad/01-launchpad-drum-mode.png',
              'launchpad/02-launchpad-piano-mode.png',
              'launchpad/03-launchpad-drum-controls.png',
              'launchpad/04-launchpad-piano-controls.png',
            ]}
            imageLabels={[
              '드럼 모드',
              '피아노 모드',
              '드럼 설정',
              '피아노 설정',
            ]}
          />
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
