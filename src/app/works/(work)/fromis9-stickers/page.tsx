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

const PAGE_NAME = 'fromis9-stickers';

export const metadata = createWorkMetadata(PAGE_NAME);

const Fromis9StickersPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage
        url="https://fromis9-stickers.vercel.app/"
        imgSrc="fromis9-stickers.webp"
      />

      <div className="my-3" />

      <PartTitle title="프로젝트 개요" />

      <CustomList>
        <CustomList.MainListItem>
          좋아하는 멤버의 사진을 다양한 스티커로 꾸미고 이미지로 저장할 수 있는
          기능을 제공
        </CustomList.MainListItem>
      </CustomList>
      <PartSubTitle title="기술 스택" />
      <TechStack
        stacks={['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']}
      />

      <p className="text-ink-muted mt-3 text-sm leading-relaxed break-keep">
        Google Antigravity·Claude·Codex를 기획·디자인·구현 검토에 활용했습니다.
        UX/UI와 프론트엔드 개발은 직접 진행했습니다.
      </p>

      <PartSubTitle title="주요 작업" />
      <CustomList>
        <CustomList.MainListItem>
          스티커 커스텀: 스티커 추가·삭제, 회전, 크기 조절
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          레이어링 관리: 스티커와 멤버 사진의 레이어 순서 변경 및 잠금 기능
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          테마 및 색상: 배경 테마 변경 및 스티커 색상 필터 적용
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          이미지 저장: 꾸민 캔버스를 로컬 이미지 파일로 내보내기
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />

      <PartTitle title="관련 링크" />

      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default Fromis9StickersPage;
