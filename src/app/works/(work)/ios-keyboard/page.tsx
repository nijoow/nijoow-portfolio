import CustomList from '../../_container/CustomList';
import WorkCarousel from '../../_container/WorkCarousel';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'ios-keyboard';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        context={
          <>
            <h2 className="case-subheading">만들게 된 계기</h2>
            <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
              iPhone으로 글을 쓰면서 커서를 옮기는 별도 버튼이 없고, 숫자를
              입력할 때마다 기호 화면으로 전환해야 하는 점이 불편했습니다. 자주
              쓰는 기능을 원하는 위치에 두고, 제 입력 습관에 맞는 키보드를 직접
              사용하고 싶어 시작했습니다.
            </p>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                한글·영문 키 위에 숫자 행을 두어 화면을 전환하지 않고 숫자를
                입력하도록 구성했습니다.
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                상단에 커서 좌우 이동과 줄의 처음·끝으로 이동하는 버튼을
                배치하고, 스페이스바를 길게 누른 뒤 드래그해 커서를 움직이도록
                했습니다.
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                키보드 닫기 버튼을 추가하고, 원하는 배치와 높이·테마·햅틱 설정을
                적용할 수 있게 했습니다.
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        details={
          <>
            <h3 className="case-subheading">한글 조합과 커서 이동 보완</h3>
            <p>
              한글을 연속 입력할 때 앞 글자를 덮어쓰는 문제가 있어, 조합
              문자열에서 달라진 뒷부분만 삭제하고 삽입하도록 처리했습니다.
              커서를 움직이기 전에 한글 조합을 마무리해 입력과 이동이 서로
              꼬이지 않도록 했고, 키 사이와 가장자리의 터치 영역도 보정했습니다.
            </p>
          </>
        }
        media={
          <>
            <WorkCarousel
              imgSrcList={[
                'keyboard/keyboard-settings-and-theme-selection.webp',
                'keyboard/keyboard-typing-preview-and-emoji-layout.webp',
              ]}
              imageLabels={['키보드 설정과 테마', '입력 미리보기와 이모지']}
              background="dark"
              aspectRatio="portrait"
            />
          </>
        }
      />
    </>
  );
}
