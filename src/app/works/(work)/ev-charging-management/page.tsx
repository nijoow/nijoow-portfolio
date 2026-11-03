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
              데모를 앞두고 기존 개발팀에 합류해 기획자·디자이너·백엔드 개발자와
              전기차 충전소 관리 시스템을 개발했습니다. 미완성 페이지의 기능과
              API 연동을 마무리해 데모 일정을 맞추는 데 기여했습니다. 기존
              테이블·검색 필터 패턴에 맞춘 조회·등록·수정 화면과 인증 처리를
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
                Access Token(메모리)·Refresh Token(HttpOnly Cookie) 분리 보관,
                401 응답 시 자동 토큰 갱신 및 실패 요청 재시도, 무한 루프 방지와
                새로고침 세션 복원을 포함한 인증 프로세스 구현
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                Zustand createStore와 테이블 식별자 기반 sessionStorage
                persist로 테이블별 정렬·페이지 상태를 독립적으로 유지하도록 개선
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
      />
    </>
  );
}
