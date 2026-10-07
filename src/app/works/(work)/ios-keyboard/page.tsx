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

      <PartSubTitle title="직접 정한 입력 방식" />
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

      <PartSubTitle title="AI와 구현하고 사용하면서 다듬은 과정" />
      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        필요한 기능과 화면 배치, 입력 방식을 직접 정하고 AI를 중심으로 코드를
        구현했습니다. 생성된 코드를 검토하고 실제 입력 동작을 확인하면서, 원하는
        동작과 다른 부분을 다시 설명하고 수정하는 과정을 반복했습니다.
      </p>
      <CustomList>
        <CustomList.MainListItem>
          실제 입력을 담당하는 UIKit 키보드 확장과 SwiftUI 설정 앱을 나누고, App
          Groups로 설정을 공유하도록 구성했습니다.
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          한글을 연속 입력할 때 앞 글자를 덮어쓰는 문제를 다루며, 조합
          문자열에서 달라진 뒷부분만 삭제·삽입하는 방식으로 정리했습니다.
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          키 사이와 가장자리의 터치 영역을 보정하고, 커서 이동을 시작할 때 한글
          조합을 마무리해 입력과 이동이 서로 꼬이지 않도록 보완했습니다.
        </CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="현재 사용" />
      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        개인 iPhone에 설치해 혼자 사용하고 있습니다. 숫자 입력과 커서 이동을
        자주 쓰는 위치에서 바로 할 수 있어, 지금은 제게 익숙하고 편한 키보드로
        사용하고 있습니다. 직접 쓰며 느끼는 불편을 다음 수정의 기준으로 삼고
        있습니다.
      </p>
    </>
  );
};

export default IosKeyboardPage;
