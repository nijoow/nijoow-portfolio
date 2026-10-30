import CustomList from '../../_container/CustomList';
import WorkImage from '../../_container/WorkImage';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'treenow';
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
              반응형 웹과 React Native WebView 기반 앱의 프론트엔드를 혼자
              담당했습니다. 화면 개발과 함께 본인인증·전자계약 등 외부 서비스의
              프론트엔드 연동을 맡았고, 실제 서비스 출시와 앱스토어
              심사·배포까지 진행했습니다.
            </p>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                <strong className="font-bold">React/TypeScript</strong> 기반{' '}
                <strong className="font-bold">
                  프론트엔드 개발 환경 구성과 반응형 UI 개발
                </strong>
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                무통장입금, 본인인증, 전자계약 서명 등{' '}
                <strong className="font-bold">
                  외부 API의 프론트엔드 연동
                </strong>
                과 관련 화면 동작 구현
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                <strong className="font-bold">React Native WebView</strong>를
                활용한{' '}
                <strong className="font-bold">
                  하이브리드 앱 개발 및 앱스토어 심사·배포
                </strong>
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        media={
          <>
            <WorkImage imgSrc="treenow.webp" />
          </>
        }
      />
    </>
  );
}
