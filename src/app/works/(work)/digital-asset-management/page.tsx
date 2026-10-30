import CustomList from '../../_container/CustomList';
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
            <h2 className="case-subheading">작업 환경과 기여 범위</h2>
            <p>
              기존 솔루션을 신규 환경으로 이관하고, 변경된 자산 개념과 업무
              규칙에 맞춰 기능을 개발·수정하는 프로젝트입니다. 프론트엔드 개발자
              2명이 기능 개발과 수정을 분담했고, 일정에 여유가 생긴 구간에는
              리팩토링도 나누어 수행했습니다. 초기 기술 선택과 전환 방향은
              팀원들과 함께 검토했습니다.
            </p>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                담당 기능의 기존 코드와 요구사항을 파악하고, 신규 환경 이관과
                변경된 자산 개념에 따른 화면·처리 흐름·제약 로직 개발·수정
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                서버·UI 상태를 분리하고 React Hook Form·Zod 기반으로 폼 상태와
                검증 구조 정리
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                공통 UI와 반복 로직을 한곳에서 수정할 수 있도록 정리하고, 함수의
                추상화 수준과 데이터 처리·UI의 역할을 구분하며 미사용
                기능·의존성 정리
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
      />
    </>
  );
}
