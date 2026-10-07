import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import TechStack from '../../_container/TechStack';
import WorkCarousel from '../../_container/WorkCarousel';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'ios-keyboard';

export const metadata = createWorkMetadata(PAGE_NAME);

const IosKeyboardPage = () => {
  return (
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

      <PartSubTitle title="만들게 된 계기" />
      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        iPhone으로 글을 쓰면서 커서를 옮기는 별도 버튼이 없고, 숫자를 입력할
        때마다 기호 화면으로 전환해야 하는 점이 불편했습니다. 자주 쓰는 기능을
        원하는 위치에 두고, 제 입력 습관에 맞는 키보드를 직접 사용하고 싶어
        시작했습니다.
      </p>

      <PartSubTitle title="사용 기술" />
      <TechStack stacks={['Swift', 'UIKit', 'SwiftUI', 'App Groups']} />

      <PartSubTitle title="추가한 기능" />
      <CustomList>
        <CustomList.MainListItem>
          한글·영문 키 위에 숫자 행을 두어 화면을 전환하지 않고 숫자를
          입력하도록 구성했습니다.
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          상단에 커서 좌우 이동과 줄의 처음·끝으로 이동하는 버튼을 배치하고,
          스페이스바를 길게 누른 뒤 드래그해 커서를 움직이도록 했습니다.
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          키보드 닫기 버튼을 추가하고, 원하는 배치와 높이·테마·햅틱 설정을
          적용할 수 있게 했습니다.
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="입력하면서 고친 점" />
      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        기능과 키 배치를 정하고 코드 구현에는 주로 AI를 사용했습니다. iPhone에
        설치해 글을 쓰면서 한글 조합과 터치 영역에서 생기는 문제를 고쳤습니다.
      </p>
      <CustomList>
        <CustomList.MainListItem>
          실제 입력을 담당하는 UIKit 키보드 확장과 SwiftUI 설정 앱을 나누고, App
          Groups로 설정을 공유하도록 구성했습니다.
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          한글을 연속 입력할 때 앞 글자를 덮어쓰는 문제가 있었습니다. 조합 중인
          문자열에서 달라진 뒷부분만 삭제하고 삽입하도록 수정했습니다.
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          키 사이와 가장자리의 터치 영역을 보정하고, 커서 이동을 시작할 때 한글
          조합을 마무리해 입력과 이동이 서로 꼬이지 않도록 보완했습니다.
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="현재 사용" />
      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        개인 iPhone에 설치해 사용하고 있습니다. 숫자를 입력하거나 커서를 옮길 때
        화면을 덜 전환해도 되는 점이 편합니다. 쓰다가 불편한 점이 생기면 조금씩
        고치고 있습니다.
      </p>
    </>
  );
};

export default IosKeyboardPage;
