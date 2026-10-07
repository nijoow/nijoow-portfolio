import PartSubTitle from '../../_container/PartSubTitle';
import WorkCarousel from '../../_container/WorkCarousel';
import { WorkLinks } from '../../_container/WorkLinks';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'doodin-calendar';

export const metadata = createWorkMetadata(PAGE_NAME);

const DoodinCalendarPage = () => (
  <>
    <WorkStructuredData pageName={PAGE_NAME} />
    <WorkCarousel
      imgSrcList={['doodin-calendar/saved-notes.webp']}
      imageLabels={['저장 메모']}
      background="light"
      aspectRatio="square"
    />
    <div className="my-3" />
    <PartSubTitle title="프로젝트" />
    <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
      일정과 기록, 사진을 함께 모아 관리하는 비공개 캘린더 앱입니다.
    </p>
    <div className="my-3" />
    <WorkLinks pageName={PAGE_NAME} />
  </>
);

export default DoodinCalendarPage;
