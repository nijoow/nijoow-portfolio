import CustomList from '../../_container/CustomList';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'process-safety-management';
export const metadata = createWorkMetadata(PAGE_NAME);
export default function Page() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkStudy
        pageName={PAGE_NAME}
        context={
          <>
            <h2 className="case-subheading">기여 범위</h2>
            <p>
              초기 프론트엔드 개발을 단독으로 담당했고, 이후 현장실습생이 합류해
              일부 기능 개발에 참여했습니다. 도면 관리와 PWA 적용은 직접
              담당했습니다.
            </p>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                Next.js 기반 반응형 웹 UI 개발 및 한·영 다국어 환경 구축
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                React Query 기반으로 데이터 페칭 구조 개선
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                MUI DataGrid에 서버사이드 페이지네이션·정렬·필터링을 연동해 10만
                건 이상 규모의 문서 목록 조회·관리
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                이미지 크롭·위치 매핑·SVG 마크업·드래그 이벤트 등 복합적인 도면
                인터랙션 개발
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                기존 앱 WebView의 외부 링크 이동·뒤로가기 문제에 대응해 PWA 도입
                제안 및 적용
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                FCM 푸시 알림 연동 및 Jenkins 기반 빌드 자동화
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
      />
    </>
  );
}
