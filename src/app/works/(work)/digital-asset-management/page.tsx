import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import TechStack from '../../_container/TechStack';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'digital-asset-management';

export const metadata = createWorkMetadata(PAGE_NAME);

export default function DigitalAssetManagementPage() {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />

      <PartSubTitle title="기술 스택" />
      <TechStack
        stacks={[
          'Next.js',
          'TypeScript',
          'TanStack Query',
          'Zustand',
          'React Hook Form',
          'Zod',
        ]}
      />

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>
          기존 솔루션을 신규 환경으로 이관하고 자산
          목록·검색·카테고리·메타데이터 등 주요 기능을 요구사항에 맞게 변경·개발
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          새로운 자산 분류 개념 추가에 따른 기존 처리 흐름 및 제약 로직 변경
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          Redux·Redux-Saga 기반 서버 상태를 TanStack Query로 단계적으로 이관하고
          화면 상태를 Zustand로 분리
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          React Hook Form·Zod 기반으로 폼 상태와 검증 구조 정리
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          목록 UI와 반복 로직을 공통화하고 미사용 기능·의존성을 정리해 전체 코드
          규모를 약 20% 축소
        </CustomList.MainListItem>
      </CustomList>
    </>
  );
}
