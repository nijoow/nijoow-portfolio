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

const PAGE_NAME = 'return-to-blank';

export const metadata = createWorkMetadata(PAGE_NAME);

const ReturnToBlankPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage
        url="https://www.youtube.com/watch?v=11Wplgnpt90"
        imgSrc="return-to-blank.webp"
      />

      <div className="my-3" />

      <p className="text-ink-muted mt-4 text-sm leading-relaxed break-keep">
        졸업전시회 개인 인터랙티브아트
      </p>

      <PartSubTitle title="콘셉트" />

      <span className="font-bold">
        &quot;제자리걸음(Return to blank) &quot;
      </span>

      <span className="pl-1">
        단기기억을 장기기억으로 바꾸지 못하고 주기적으로 기억을 잃어버리는 현상,
        &quot;선행성 기억상실증[Anterograde amnesia] &quot;. 새로운 정보나
        경험을 완전히 받아들이지 못하고 돌아서는 순간 그 기억들이 사라지게 된다.
        계속해서 자신이 무엇을 하고 있었는지, 무엇을 하려고 했는지, 자신이 처한
        상황 판단조차 할 수 없고 머릿속은 백지상태[白紙狀態]로 돌아간다. 앞으로
        나아가지 못하고 현재에 머무르며 평생 &quot;제자리걸음 &quot;을 하는
        것이다.
        <br /> <br />
        [인터랙티브 아트] 자유롭게 그림을 그릴 수 있는 스크린이 있다. 붓을 들고
        그림을 그리는 것에만 온전히 집중하면 그림을 계속해서 그려나갈 수 있고
        물감의 잔상이 오랫동안 남아있을 것이다. 하지만 스크린에서 손을 떼는 순간
        그려지던 그림의 잔상들은 모두 사라지고 스크린 속에는 아무것도 남아있지
        않을 것이다. 인터랙티브 아트를 통해 계속해서 백지상태로 돌아가며 앞으로
        나아가지 못하고 제자리걸음을 하는 선행성 기억상실증을 표현하였다.
      </span>
      <PartSubTitle title="작품 흐름" />
      <ul>
        <li>1) 사용자가 붓으로 천스크린을 누르는 동안 그림이 그려진다.</li>
        <li>2) 스크린에서 붓을 떼는 순간 그리던 그림이 사라진다.</li>
        <li>3) 백지상태로 돌아간다.</li>
      </ul>
      <PartSubTitle title="기술 스택과 도구" />

      <TechStack
        stacks={['Unity', '빔프로젝터', 'Kinect v1', '패브릭 스크린']}
      />

      <PartSubTitle title="주요 작업" />
      <CustomList>
        <CustomList.MainListItem>
          Unity VFX Graph를 사용해 파티클로 물감이 번지는 듯한 시각 효과 구현
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          Kinect v1 Depth 카메라를 통해 스크린에 가장 깊게 눌려진 위치와 손을
          떼었는지를 인식
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title="관련 링크" />

      <WorkLinks pageName={PAGE_NAME} liveLabel="졸업전시회 시연 영상" />
    </>
  );
};

export default ReturnToBlankPage;
