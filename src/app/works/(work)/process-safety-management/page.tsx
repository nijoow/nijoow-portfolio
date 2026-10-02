import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import TechStack from '../../_container/TechStack';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'process-safety-management';

export const metadata = createWorkMetadata(PAGE_NAME);

export default function ProcessSafetyManagementPage() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />

      <PartSubTitle title="기술 스택" />
      <TechStack
        stacks={[
          'Next.js',
          'TypeScript',
          'Recoil',
          'React Query',
          'NextAuth',
          'Material UI',
          'PWA',
          'FCM',
        ]}
      />

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>
          Next.js 기반 반응형 웹 UI 개발 및 한·영 다국어 환경 구축
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          React Query 기반으로 데이터 페칭 구조 개선
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          MUI DataGrid에 서버사이드 페이지네이션·정렬·필터링을 연동해 10만 건
          이상 규모의 문서 목록 조회·관리
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          이미지 크롭·위치 매핑·SVG 마크업·드래그 이벤트 등 복합적인 도면
          인터랙션 개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          기존 모바일 WebView 사용 과정의 히스토리 관리 문제를 줄이기 위해 PWA
          적용
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          FCM 푸시 알림 연동 및 Jenkins 기반 빌드 자동화
        </CustomList.MainListItem>
      </CustomList>
    </>
  );
}
