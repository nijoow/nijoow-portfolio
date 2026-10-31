import CustomList from '../../_container/CustomList';
import WorkImage from '../../_container/WorkImage';
import WorkCarousel from '../../_container/WorkCarousel';
import { WorkLinks } from '../../_container/WorkLinks';
import { WorkStudy } from '@/features/works/components/WorkStudy';
import {
  createWorkMetadata,
  WorkStructuredData,
} from '../../_container/workMetadata';
const PAGE_NAME = 'fromyou';
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
              기자들이 기사 내용과 이미지, 요구사항을 전달했고, UI 구체화와
              프론트엔드 개발, 배포는 혼자 담당했습니다. 2025년 4월부터 12월
              사이 세 차례 외주로 작업했습니다.
            </p>
          </>
        }
        features={
          <>
            <CustomList>
              <CustomList.MainListItem>
                상세한 화면 설계가 없는 초기 단계부터{' '}
                <strong className="font-bold">
                  요구사항에 맞는 UI를 직접 구체화
                </strong>
                하고 프론트엔드 개발 진행
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                SVG 지도·드래그 앤 드롭·차트·스크롤 애니메이션 등을 활용한
                반응형 웹 구현
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                AWS Amplify 기반 배포 및 서브도메인 설정
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                신문방송편집인협회의 2025 지역신문 기획취재 제작 지원 대상으로
                선정된 프로젝트의 인터랙티브 결과물 제작
              </CustomList.MainListItem>
              <CustomList.MainListItem>
                인천일보 팀 이달의 기자상 수상에 기여
              </CustomList.MainListItem>
            </CustomList>
          </>
        }
        details={
          <>
            <h3 className="case-subheading">요구사항을 인터랙션으로 구체화</h3>
            <p>
              기사와 이미지, 표현하고 싶은 내용은 있었지만 상세 화면 설계는
              없었습니다. 먼저 전달받은 콘텐츠를 화면에 배치하고 조작 흐름을
              구현한 뒤, 기자들과 결과를 보며 구성과 동작을 조정했습니다. 구현한
              화면을 바탕으로 다음 구현 내용을 정했습니다.
            </p>
            <p>
              독자가 지역은 SVG 지도에서, 연령대는 차트에서 선택하고 관심사는
              4개 이상 고르고 드래그해 순서를 바꿀 수 있도록 구성했습니다. 화면
              전환과 스크롤 애니메이션도 각 콘텐츠에 맞춰 구현했습니다.
            </p>
          </>
        }
        media={
          <>
            <WorkImage imgSrc="fromyou.webp" />
            <WorkCarousel
              eager={false}
              background="dark"
              imgSrcList={[
                'fromyou/region.png',
                'fromyou/age.png',
                'fromyou/interests.png',
              ]}
              imageLabels={[
                '지도에서 지역 선택',
                '차트에서 연령대 선택',
                '관심사 선택과 순서 변경',
              ]}
            />
          </>
        }
        links={
          <>
            <WorkLinks
              links={[
                {
                  href: 'https://www.incheonilbo.com/news/articleView.html?idxno=1312711',
                  label: '기사 바로가기',
                },
              ]}
            />
          </>
        }
      />
    </>
  );
}
