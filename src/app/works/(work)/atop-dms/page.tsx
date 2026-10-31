import CustomList from '../../_container/CustomList';
import WorkCarousel from '../../_container/WorkCarousel';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'atop-dms';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                프로젝트에 중간 합류해 기능 개발과 기존 구현 개선을 맡아,{' '}
                <strong className="font-bold">데모용 MVP의 출시 기한</strong>을
                맞추는 데 기여
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                기존 엑셀 표 데이터를 MUI DataGrid에 맞게 전환하고, 가상 스크롤
                적용 및 엑셀 파일의 여러 시트 읽기·선택 전환
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                데이터 정제와 Apache ECharts를 활용한{' '}
                <strong className="font-bold">차트 시각화</strong> 기능 개발
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                사용자 정의 Formula의 수식 입력 UI, 변수 추가와 입력 오류 처리
                기능 개발
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                useState 기반의 폼 모달을{' '}
                <strong className="font-bold">React Hook Form</strong>으로
                리팩터링하여 폼 상태와 입력 처리를 정리
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        media={
          <>
            <WorkCarousel
              imgSrcList={[
                'atop-dms/main.webp',
                'atop-dms/excel.webp',
                'atop-dms/risk-matrix.webp',
                'atop-dms/chart.webp',
                'atop-dms/formula.webp',
              ]}
            />
          </>
        }
      />
    </>
  );
}
