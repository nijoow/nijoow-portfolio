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
              담당 테이블의 정렬 기준과 페이지 위치를 새로고침 뒤에도
              유지하면서, 여러 테이블의 상태를 구분해야 했습니다. 공통 생성
              함수를 두고 Zustand의 createStore로 테이블별 상태를 만들었습니다.
            </p>
            <p>
              persist로 상태를 sessionStorage에 저장하되 테이블 식별자를 저장
              키에 포함했습니다. 각 테이블의 정렬·페이지 상태를 해당 키로
              복원하도록 구성했습니다.
            </p>
          </>
        }
      />
    </>
  );
}
