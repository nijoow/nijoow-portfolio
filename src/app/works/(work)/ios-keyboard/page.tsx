import PartSubTitle from '../../_container/PartSubTitle';
import WorkCarousel from '../../_container/WorkCarousel';
import { WorkLinks } from '../../_container/WorkLinks';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'ios-keyboard';

export const metadata = createWorkMetadata(PAGE_NAME);

const IosKeyboardPage = () => (
  <>
    <WorkStructuredData pageName={PAGE_NAME} />
    <WorkCarousel
      imgSrcList={[
        'keyboard/keyboard-settings-and-theme-selection.webp',
        'keyboard/keyboard-typing-preview-and-emoji-layout.webp',
      ]}
      imageLabels={['키보드 설정과 테마', '입력 미리보기와 이모지']}
      background="dark"
      aspectRatio="square"
    />
    <div className="my-3" />
    <PartSubTitle title="프로젝트" />
    <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
      숫자 입력과 커서 이동을 편하게 하도록 직접 구성해 사용하는 iPhone
      키보드입니다.
    </p>
    <div className="my-3" />
    <WorkLinks pageName={PAGE_NAME} />
  </>
);

export default IosKeyboardPage;
