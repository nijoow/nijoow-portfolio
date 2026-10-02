import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import TechStack from '../../_container/TechStack';
import WorkCarousel from '../../_container/WorkCarousel';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'atop-dms';

export const metadata = createWorkMetadata(PAGE_NAME);

const AtopDmsPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkCarousel
        imgSrcList={[
          'atop-dms/main.webp',
          'atop-dms/excel.webp',
          'atop-dms/risk-matrix.webp',
          'atop-dms/chart.webp',
          'atop-dms/formula.webp',
        ]}
      />
      <div className="my-3" />

      <PartSubTitle title="기술 스택" />

      <TechStack
        stacks={[
          'Next.js',
          'TypeScript',
          'Recoil',
          'React Query',
          'Material UI',
        ]}
      />

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>
          프로젝트에 중간 합류하여 비즈니스 로직과 라이브러리를 신속하게
          파악하고,{' '}
          <strong className="font-bold">데모용 MVP의 출시 기한</strong>을
          맞추는데 기여
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          엑셀 라이브러리를 교체하고 가상화 렌더링을 적용해 대용량 파일 처리
          성능을 개선하고, 다중 워크시트 기능을 추가해 사용성 보완
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          Apache ECharts를 활용한{' '}
          <strong className="font-bold">데이터 정제 및 차트 시각화</strong> 기능
          개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          사용자 정의 변수와 사칙연산, 함수를 수식으로 입력하여 결과값을
          가져오는 Formula 기능 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          useState 기반의 폼 모달을{' '}
          <strong className="font-bold">React Hook Form</strong>으로
          리팩터링하여 코드 복잡도 및 유지보수성 개선
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />
    </>
  );
};

export default AtopDmsPage;
