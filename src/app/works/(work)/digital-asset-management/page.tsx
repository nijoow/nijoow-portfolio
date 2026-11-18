import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'digital-asset-management';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        context={
          <>
            <h2 className="case-subheading">프로젝트 개요</h2>
            <p>
              기존 디지털 자산 관리 솔루션을 신규 환경으로 이관하고, 변경된 업무
              규칙에 맞춰 기능을 개발·개선하는 프로젝트입니다.
            </p>
          </>
        }
        features={
          <p>
            상태 관리와 API 요청 구조를 전환하고, 공용 테이블과 목록 액션을
            정리했습니다. 자산 유형·상속 관계를 보여주는 목록과
            워크스페이스·사용자 권한을 함께 관리하는 화면을 설계하고
            구현했습니다.
          </p>
        }
      />
    </>
  );
}
