import CustomList from '../../_container/CustomList';
import PartSubTitle from '../../_container/PartSubTitle';
import TechStack from '../../_container/TechStack';
import WorkImage from '../../_container/WorkImage';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';

const PAGE_NAME = 'treenow';

export const metadata = createWorkMetadata(PAGE_NAME);

const TreenowPage = () => {
  return (
    <>
      <WorkStructuredData pageName={PAGE_NAME} />
      <WorkImage imgSrc="treenow.webp" />

      <div className="my-3" />

      <PartSubTitle title="기술 스택" />

      <TechStack
        stacks={[
          'React.js',
          'TypeScript',
          'Recoil',
          'Tailwind CSS',
          'React Native WebView',
        ]}
      />

      <PartSubTitle title="주요 작업" />

      <CustomList>
        <CustomList.MainListItem>
          <strong className="font-bold">디자인 시스템</strong>을 고려한{' '}
          <strong className="font-bold">React/TypeScript</strong> 기반{' '}
          <strong className="font-bold">
            프론트엔드 환경 설계 및 반응형 UI 개발
          </strong>
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          무통장입금, 본인인증, 전자계약 서명 등{' '}
          <strong className="font-bold">외부 API 연동</strong>을 통한 비즈니스
          로직 구현
        </CustomList.MainListItem>
        <CustomList.MainListItem>
          <strong className="font-bold">React Native WebView</strong>를 활용한{' '}
          <strong className="font-bold">
            하이브리드 앱 개발 및 앱스토어 심사·배포
          </strong>
        </CustomList.MainListItem>
      </CustomList>

      <div className="my-3" />
    </>
  );
};

export default TreenowPage;
