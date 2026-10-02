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

const PAGE_NAME = 'svg-drawing';

export const metadata = createWorkMetadata(PAGE_NAME);

const SVGDrawingPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage
        url="https://nijoow-drawing.vercel.app/"
        imgSrc="nijoow-drawing.webp"
      />

      <div className="my-3" />

      <PartTitle title="프로젝트 개요" />
      <CustomList>
        <CustomList.MainListItem>🚧 개발 임시 중단 🚧</CustomList.MainListItem>
      </CustomList>

      <PartSubTitle title="기술 스택" />

      <TechStack stacks={['Next.js', 'TypeScript', 'Recoil', 'Tailwind CSS']} />

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>
          마우스 드래그로 사각형, 삼각형, 원 그리기
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          면 색·선 색·선 굵기·투명도 조절
        </CustomList.MainListItem>
        <CustomList.SubListItem>
          선택된 도형이 없을 경우 새로 그리는 도형에 적용
        </CustomList.SubListItem>
        <CustomList.SubListItem>
          선택된 도형이 있을 경우 선택된 도형에 적용
        </CustomList.SubListItem>
        <CustomList.MainListItem>도형 핸들러 구현</CustomList.MainListItem>
        <CustomList.SubListItem>
          드래그 이동, 크기 조절, 회전, 꼭짓점 수정
        </CustomList.SubListItem>
        <CustomList.MainListItem>
          컨텍스트 메뉴 기능 개발
        </CustomList.MainListItem>
        <CustomList.SubListItem>삭제 및 앞뒤 순서 변경</CustomList.SubListItem>
      </CustomList>

      <PartSubTitle title="문제 해결" />

      <CustomList>
        <li className="mt-5 first:mt-0">
          <h3 className="text-base font-bold">회전한 도형의 크기 조절</h3>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed break-keep">
            회전된 도형의 크기를 조절할 때 드래그 거리와 실제 크기 변화가
            일치하지 않았습니다. 중심점을 기준으로 꼭짓점의 상대 좌표를 계산하고
            회전각을 적용한 벡터 연산으로 크기 조절 로직을 보정했습니다.
          </p>
        </li>
      </CustomList>

      <div className="my-3" />

      <PartTitle title="관련 링크" />

      <WorkLinks pageName={PAGE_NAME} />
    </>
  );
};

export default SVGDrawingPage;
