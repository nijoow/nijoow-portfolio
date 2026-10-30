import CustomList from '../../_container/CustomList';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'ev-charging-management';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        context={
          <>
            <h2 className="case-subheading">작업 환경과 기여 범위</h2>
            <p>
              기존 프론트엔드 팀에 합류해 기획자·디자이너·백엔드 개발자와 함께
              전기차 충전소 관리 시스템을 개발했습니다. 기존 테이블·검색 필터
              패턴을 활용한 조회·등록·수정 화면과 API 연동, 인증 처리를
              맡았습니다.
            </p>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                기존 관리 화면의 패턴에 맞춰 잔여 페이지 UI와 조회·등록·수정 API
                연동
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                Refresh Token 기반 인증 프로세스 구현
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                Zustand 테이블 상태를 테이블별로 독립적으로 관리하도록 정리
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        details={
          <>
            <p>
              여러 관리 페이지에서 공통으로 사용하던 Zustand 상태 관리 코드를
              정리해 각 테이블의 상태를 독립적으로 관리하도록 수정했습니다.
            </p>
          </>
        }
      />
    </>
  );
}
