import CustomList from '../../_container/CustomList';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'quve';
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
              출시 3주 전 기존 프론트엔드 팀에 합류해 서비스 소개 홈페이지의
              랜딩·멤버십·마이페이지 개발을 맡았습니다. 미완성 화면을 완성하는
              작업과 새 화면 구현을 함께 진행했고, 결제 등 필요한 기능은
              백엔드에서 제공한 API를 연동했습니다.
            </p>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                정적 페이지 기준으로 작성된 외주 HTML/CSS 퍼블리싱 코드를
                Next.js 컴포넌트 구조와 반응형 레이아웃에 맞게 재구성
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                랜딩·멤버십·마이페이지의 미완성 화면 보완과 신규 화면 개발,
                디바이스별 반응형 CSS 조정
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                결제·멤버십 조회 등 백엔드 API 연동과 화면 상태 처리 구현
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
      />
    </>
  );
}
